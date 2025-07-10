
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api'


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch (error) {
      console.error("Erro ao carregar token do localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

  };

  const updateProfile = async (newProfileData) => {
    try {
      if (!user?._id) {
        throw new Error('ID de usuário não disponível para atualização.');
      }
      const response = await authApi.updateUserProfile(user._id, newProfileData, token);
      const updatedUser = response.user; 
      setUser(updatedUser); 
      localStorage.setItem('user', JSON.stringify(updatedUser)); 
      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar perfil no AuthContext:', error);
      throw new Error(error.message || 'Falha ao atualizar perfil');
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (!user?._id) {
        throw new Error('ID de usuário não disponível para alteração de senha.');
      }
      await authApi.changeUserPassword(user._id, { currentPassword, newPassword }, token);
      return true; 
    } catch (error) {
      console.error('Erro ao alterar senha no AuthContext:', error);
      throw new Error(error.message || 'Falha ao alterar senha');
    }
  };
  const authContextValue = {
    user,
    token,
    isLoggedIn: !!user, 
    isAdmin: user ? user.isAdmin : false,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};