// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Cria o contexto
const AuthContext = createContext(null);

// 2. Provedor do Contexto
export const AuthProvider = ({ children }) => {
  // Tenta carregar o usuário e o token do localStorage na inicialização
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

  // Salva o usuário e o token no localStorage sempre que eles mudam
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

  // Função para fazer login
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  // Função para fazer logout
  const logout = () => {
    setUser(null);
    setToken(null);
    // O useEffect se encarregará de remover do localStorage
  };

  // O valor que será disponibilizado para os componentes filhos
  const authContextValue = {
    user,
    token,
    isLoggedIn: !!user, // Booleano para verificar se está logado
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook customizado para usar o contexto facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};