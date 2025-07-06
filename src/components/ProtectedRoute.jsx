// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Importe Navigate e Outlet
import { useAuth } from '../context/AuthContext'; // Importe o hook useAuth

// O Outlet é usado em rotas que possuem "filhos" (nested routes),
// mas aqui ele serve para renderizar o componente filho da Route protegida.
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth(); // Obtém o status de login e se o contexto está carregando

  // Se ainda estiver carregando a autenticação do localStorage, pode mostrar um spinner ou null
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 text-2xl">
        Verificando autenticação...
      </div>
    );
  }

  // Se não estiver logado, redireciona para a página de login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // 'replace' impede que o usuário volte para a rota protegida com o botão "voltar" do navegador
  }

  // Se estiver logado, renderiza o componente filho ou o Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;