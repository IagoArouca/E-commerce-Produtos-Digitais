import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';

const IconProducts = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const IconNewUsers = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.75v-3.375m0 0a3 3 0 00-3-3h1.375c.621 0 1.125.504 1.125 1.125v.375M18 18.75h-7.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-3.375M18 18.75h.008v.008H18v-.008zm0 0a3 3 0 013-3h1.375c.621 0 1.125.504 1.125 1.125v.375M18 18.75h-.008v.008H18v-.008zm0 0A3 3 0 0015 15.375V12c0-.621.504-1.125 1.125-1.125h3.375a1.125 1.125 0 011.125 1.125v3.375M6 10.25a6.25 6.25 0 1 0 0-12.5a6.25 6.25 0 0 0 0 12.5Z" />
  </svg>
);

const IconPendingOrders = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.04 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const IconRevenue = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l-.75.681A1.5 1.5 0 019 16.5V16c0-.538.214-1.055.595-1.436.38-.38.897-.595 1.436-.595h2.04c.538 0 1.055.214 1.436.595.38.38.595.897.595 1.436v.5c0 .538-.214 1.055-.595 1.436a2.25 2.25 0 01-1.436.595h-2.04M12 6h.008v.008H12V6z" />
  </svg>
);


function AdminDashboardPage() {
  const { user } = useAuth(); 
  const metrics = [
    { title: "Produtos Ativos", value: "1,245", icon: IconProducts, color: "text-green-500", bgColor: "bg-green-50" },
    { title: "Novos Usuários", value: "540", icon: IconNewUsers, color: "text-blue-500", bgColor: "bg-blue-50" },
    { title: "Pedidos Pendentes", value: "27", icon: IconPendingOrders, color: "text-yellow-500", bgColor: "bg-yellow-50" },
    { title: "Receita (Últimos 30 dias)", value: "R$ 15.670,00", icon: IconRevenue, color: "text-purple-500", bgColor: "bg-purple-50" },
  ];

  const recentActivities = [
    { id: '001', type: 'Pedido Novo', description: 'Novo pedido de Usuario1 (#54321)', time: '5 min atrás' },
    { id: '002', type: 'Usuário Registrado', description: 'Novo cadastro: Usuario2', time: '12 min atrás' },
    { id: '003', type: 'Produto Atualizado', description: 'Preço do "Fone Bluetooth XPTO" alterado', time: '1 hora atrás' },
    { id: '004', type: 'Pedido Concluído', description: 'Pedido #54318 foi finalizado', time: '2 horas atrás' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gray-50 font-body">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display text-gray-900 mb-4 leading-tight">
          Bem-vindo ao <span className="text-blue-600">Painel de Gestão</span>
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Olá, <span className="font-semibold text-pink-600">{user?.name || 'Administrador'}</span>! Esta é sua plataforma. Aqui você tem o controle total.
        </p>
      </div>
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-display">Visão Geral</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon; 
            return (
              <div
                key={index}
                className={`
                  ${metric.bgColor} p-6 rounded-xl shadow-md border border-gray-100
                  flex flex-col items-center justify-center text-center
                  transform hover:scale-105 transition-transform duration-300 ease-in-out
                `}
              >
                <Icon className={`w-12 h-12 mb-4 ${metric.color}`} />
                <p className="text-lg text-gray-600">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-display">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            to="/admin/products"
            className="
              bg-white p-6 rounded-xl shadow-lg border border-gray-100
              flex flex-col items-start text-left
              hover:shadow-2xl hover:scale-103 transition-all duration-300 ease-in-out
              group relative overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2 font-body leading-tight">
              Gerenciar Produtos
            </h4>
            <p className="text-gray-600 text-base mb-4 flex-grow">
              Adicione, edite ou remova produtos do seu catálogo, mantendo tudo atualizado.
            </p>
            <span className="
                mt-auto text-gray-800 font-semibold relative inline-flex items-center
                group-hover:text-blue-600 transition-colors duration-300
              ">
              Acessar
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <div className="
            bg-white p-6 rounded-xl shadow-lg border border-gray-100
            flex flex-col items-start text-left
            opacity-70 cursor-not-allowed
          ">
            <h4 className="text-2xl font-semibold text-gray-900 mb-2 font-body leading-tight">
              Gerenciar Pedidos
            </h4>
            <p className="text-gray-600 text-base mb-4 flex-grow">
              Em breve: Visualize e atualize o status dos pedidos de forma eficiente.
            </p>
            <span className="mt-auto text-gray-500 font-semibold">
              Em Breve
            </span>
          </div>
          <div className="
            bg-white p-6 rounded-xl shadow-lg border border-gray-100
            flex flex-col items-start text-left
            opacity-70 cursor-not-allowed
          ">
            <h4 className="text-2xl font-semibold text-gray-900 mb-2 font-body leading-tight">
              Gerenciar Usuários
            </h4>
            <p className="text-gray-600 text-base mb-4 flex-grow">
              Em breve: Crie, edite ou bloqueie contas de usuários e gerencie permissões.
            </p>
            <span className="mt-auto text-gray-500 font-semibold">
              Em Breve
            </span>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-display">Últimas Atividades</h3>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hora
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{activity.id}</p>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{activity.type}</p>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{activity.description}</p>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <p className="text-gray-600 whitespace-no-wrap">{activity.time}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="text-sm text-gray-500 mt-16 text-center">
        Painel de Controle.
      </p>
    </div>
  );
}

export default AdminDashboardPage;