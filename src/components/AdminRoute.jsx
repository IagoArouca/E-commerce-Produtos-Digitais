// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 text-2xl">
        Verificando permissões...
      </div>
    );
  }

  // Se não estiver logado OU não for admin, redireciona para o login (ou para a home, etc.)
  if (!isLoggedIn || !isAdmin) {
    // Você pode redirecionar para uma página de "Acesso Negado" também
    return <Navigate to="/login" replace />; 
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;