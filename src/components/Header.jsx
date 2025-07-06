// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import { useAuth } from '../context/AuthContext';

function Header({ onOpenCart, onOpenSearch, onCloseSearch }) { 
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center z-30 relative">
      
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <Link to="/" className="hover:text-blue-400 transition duration-300">Digital Store</Link>
        </h1>
      </div>

      <nav className="flex-grow flex justify-center hidden sm:flex">
        <ul className="flex space-x-6 text-lg items-center">
          <li><Link to="/categorias" className="hover:text-blue-400 transition duration-300">Categorias</Link></li>
          <li>
            <button onClick={onOpenCart} className="hover:text-blue-400 transition duration-300 bg-transparent border-none text-white cursor-pointer p-0 text-lg">
              Carrinho
            </button>
          </li>
          {isLoggedIn ? (
            <>
              {/* NOVO: Link para o perfil */}
              <li><Link to="/profile" className="hover:text-blue-400 transition duration-300">Perfil</Link></li> 
              <li>
                <span className="text-blue-300">Olá, {user?.name || user?.email}!</span>
              </li>
              <li>
                <button onClick={logout} className="hover:text-blue-400 transition duration-300 bg-transparent border-none text-white cursor-pointer p-0 text-lg">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-blue-400 transition duration-300">Login</Link></li>
              <li><Link to="/register" className="hover:text-blue-400 transition duration-300">Registrar</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
        <SearchBar onOpen={onOpenSearch} onClose={onCloseSearch} /> 
      </div>
    </header>
  );
}

export default Header;