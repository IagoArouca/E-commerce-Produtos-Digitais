// src/pages/AdminDashboardPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Painel de Administração</h2>
      <p className="text-lg text-gray-600">Bem-vindo, <span className="font-semibold text-blue-600">{user?.name}</span>!</p>
      <p className="text-md text-gray-500 mt-2">Esta é uma área restrita para administradores.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Gerenciar Produtos</h3>
          <p className="text-gray-600">Adicione, edite ou remova produtos do seu catálogo.</p>
          {/* NOVO LINK para a página de gerenciamento de produtos */}
          <Link to="/admin/products" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Ir para Produtos
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Gerenciar Pedidos</h3>
          <p className="text-gray-600">Visualize e atualize o status dos pedidos dos clientes.</p>
          <button disabled className="mt-4 inline-block bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed">
            Em Breve
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Gerenciar Usuários</h3>
          <p className="text-gray-600">Crie, edite ou bloqueie contas de usuários.</p>
          <button disabled className="mt-4 inline-block bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed">
            Em Breve
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;