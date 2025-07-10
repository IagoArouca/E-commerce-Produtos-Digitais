import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth(); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 text-2xl">
        Verificando autenticação...
      </div>
    );
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; 
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;