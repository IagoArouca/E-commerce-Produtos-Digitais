import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const IconUserCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 9 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconLockClosed = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 1.5h11.55a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-6.75a.75.75 0 01.75-.75z" />
  </svg>
);

const IconShoppingBag = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const IconEdit = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.262-8.262zm0 0V21" />
  </svg>
);

const IconLogout = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);


function ProfilePage() {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await updateProfile(profileData);
      setMessage('Seu perfil foi atualizado com sucesso! Que bom te ver evoluindo por aqui.');
      setIsEditing(false); 
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError(err.message || 'Ops! Não conseguimos atualizar seu perfil. Tente novamente ou verifique os dados.');
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError('As senhas não batem! Por favor, confirme a nova senha corretamente.');
      return;
    }
    if (passwordData.newPassword.length < 6) { 
      setError('Sua nova senha precisa ter no mínimo 6 caracteres para ser segura.');
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setMessage('Sua senha foi alterada com sucesso! Agora você está ainda mais seguro.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      setError(err.message || 'Erro ao alterar sua senha. Verifique se a senha atual está correta.');
    }
  };
  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };
  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-700 font-body p-8 text-center">
        <svg className="animate-bounce h-12 w-12 text-pink-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-xl font-semibold text-gray-800 font-display mb-4">
          Estamos buscando suas informações...
        </p>
        <p className="text-gray-600 max-w-md">
          Parece que você ainda não está conectado. Por favor, faça login para acessar seu perfil e ver tudo de perto!
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Ir para Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 bg-gray-50 min-h-screen font-body">
      <h1 className="text-4xl md:text-5xl font-display text-gray-900 mb-12 text-center leading-tight">
        Seu Espaço<span className="text-blue-600"> Pessoal</span>
      </h1>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto text-center">
        Aqui você tem o controle total das suas informações e da sua segurança. Mantenha seu perfil sempre atualizado!
      </p>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg relative mb-8 shadow-md flex items-center max-w-4xl mx-auto">
          <svg className="h-6 w-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <strong className="font-bold mr-2">Sucesso!</strong>
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg relative mb-8 shadow-md flex items-center max-w-4xl mx-auto">
          <svg className="h-6 w-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <strong className="font-bold mr-2">Incorreto!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-display text-gray-900 mb-6 flex items-center border-b pb-4 border-gray-100">
            <IconUserCircle className="w-8 h-8 text-blue-500 mr-3" />
            Seus Detalhes da Conta
          </h2>

          {!isEditing ? (
            <div className="space-y-5">
              <p className="text-gray-700 text-lg flex items-center">
                <span className="font-semibold text-gray-900 w-24">Nome:</span>
                <span className="flex-1 ml-4">{user.name}</span>
              </p>
              <p className="text-gray-700 text-lg flex items-center">
                <span className="font-semibold text-gray-900 w-24">Email:</span>
                <span className="flex-1 ml-4">{user.email}</span>
              </p>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => { setIsEditing(true); setMessage(''); setError(''); }}
                  className="
                    inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-md
                    text-base font-semibold text-white bg-blue-600
                    hover:bg-blue-700 transition-colors duration-200
                    transform hover:scale-105 active:scale-95
                  "
                >
                  <IconEdit className="w-5 h-5 mr-2" />
                  Editar Perfil
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="
                    mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none
                    transition-all duration-200
                  "
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="
                    mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none
                    transition-all duration-200
                  "
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                    setMessage('');
                    setProfileData({ name: user.name, email: user.email });
                  }}
                  className="
                    px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400
                    transition-all duration-200 text-base shadow-sm
                    transform hover:scale-105 active:scale-95
                  "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="
                    px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700
                    transition-all duration-200 text-base shadow-sm
                    transform hover:scale-105 active:scale-95
                  "
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-display text-gray-900 mb-6 flex items-center border-b pb-4 border-gray-100">
            <IconLockClosed className="w-8 h-8 text-blue-500 mr-3" /> 
            Sua Segurança
          </h2>
          <form onSubmit={handleChangePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="
                  mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                  focus:ring-yellow-500 focus:border-yellow-500 sm:text-base outline-none
                  transition-all duration-200
                "
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="
                  mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                  focus:ring-green-500 focus:border-green-500 sm:text-base outline-none
                  transition-all duration-200
                "
                required
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className="
                  mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                  focus:ring-green-500 focus:border-green-500 sm:text-base outline-none
                  transition-all duration-200
                "
                required
              />
            </div>
            <button
              type="submit"
              className="
                w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700
                transition-all duration-200 text-lg font-semibold shadow-md
                transform hover:scale-105 active:scale-95
              "
            >
              Alterar Minha Senha
            </button>
          </form>
        </div>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 mt-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-display text-gray-900 mb-6 flex items-center border-b pb-4 border-gray-100">
          <IconShoppingBag className="w-8 h-8 text-green-500 mr-3" /> 
          Seu Histórico de Pedidos
        </h2>
        <div className="text-gray-700">
          <p className="mb-6 leading-relaxed">
              Você pode acompanhar o status de cada pedido, ver os detalhes dos itens e muito mais.
          </p>
          <div className="border-t border-gray-200 pt-6 mt-6 first:border-none first:pt-0 first:mt-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <p className="text-lg font-semibold text-gray-900">Pedido #P1001</p>
              <p className="text-sm text-gray-500 md:ml-4">Data: 01 de Julho, 2024</p>
            </div>
            <p className="text-md text-gray-700 mb-2">
              Total: <span className="font-bold text-green-700">R$ 250,00</span>
              - Status: <span className="font-medium text-green-600">Entregue</span>
            </p>
            <button className="
              text-blue-600 hover:text-blue-800 hover:underline mt-1 text-sm
              inline-flex items-center group
            ">
              Ver Detalhes do Pedido
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <p className="text-lg font-semibold text-gray-900">Pedido #P1002</p>
              <p className="text-sm text-gray-500 md:ml-4">Data: 05 de Julho, 2024</p>
            </div>
            <p className="text-md text-gray-700 mb-2">
              Total: <span className="font-bold text-gray-700">R$ 85,50</span>
              - Status: <span className="font-medium text-yellow-600">Em Processamento</span>
            </p>
            <button className="
              text-blue-600 hover:text-blue-800 hover:underline mt-1 text-sm
              inline-flex items-center group
            ">
              Ver Detalhes do Pedido
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={handleLogout}
          className="
            inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-lg
            hover:bg-red-700 transition-all duration-300 text-xl font-semibold shadow-lg
            transform hover:scale-105 active:scale-95 group
          "
        >
          <IconLogout className="h-7 w-7 mr-3 group-hover:animate-pulse" />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;