
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api'; 

const IconUserPlus = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.72c.552-.12.552-.12 1.104-.24a6.75 6.75 0 0110.158 1.488c.394.506.634 1.107.747 1.76l-.164.033A11.026 11.026 0 0112 21.75c-4.717 0-8.647-3.322-9.75-7.75a4.004 4.004 0 01-.25-1.077c-.12-.552-.12-1.104-.24-1.656A6.75 6.75 0 011 7.28a6.75 6.75 0 0110.158-1.488c.394-.506.634 1.107.747 1.76l.164-.033z" />
  </svg>
);


function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem! Por favor, verifique e tente novamente.');
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.register({ name, email, password });
      login({ _id: data._id, name: data.name, email: data.email, isAdmin: data.isAdmin }, data.token);
      navigate('/');

    } catch (err) {
      console.error('Erro de registro:', err);
      setError(err.message || 'Erro ao registrar. Tente novamente ou verifique se o e-mail já está em uso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-body p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <IconUserPlus className="w-16 h-16 text-blue-600" />
        </div>
        <h2 className="text-4xl font-display text-center text-gray-900 mb-8 leading-tight">
          Crie sua  <span className="text-blue-600">Conta!</span>
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg relative mb-6 shadow-sm flex items-center">
            <svg className="h-6 w-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="block sm:inline font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Nome Completo:</label>
            <input
              type="text"
              id="name"
              className="
                shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4
                text-gray-800 leading-tight focus:outline-none focus:border-gray-300 transition-all duration-200
                text-base
              "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="
                shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4
                text-gray-800 leading-tight focus:outline-none focus:border-gray-300 transition-all duration-200
                text-base
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Senha:</label>
            <input
              type="password"
              id="password"
              className="
                shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4
                text-gray-800 leading-tight focus:outline-none focus:border-gray-300 transition-all duration-200
                text-base
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirme a Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              className="
                shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4
                text-gray-800 leading-tight focus:outline-none focus:border-gray-300 transition-all duration-200
                text-base
              "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="
                w-full bg-green-600 text-white py-3 px-4 rounded-lg
                hover:bg-green-700 transition-all duration-300
                text-lg font-bold shadow-md
                transform hover:scale-105 active:scale-95
                flex items-center justify-center
              "
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </>
              ) : 'Cadastrar'}
            </button>
          </div>

          <p className="text-center text-gray-600 text-base mt-6">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
            >
              Faça Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;