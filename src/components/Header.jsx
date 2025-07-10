import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Header({ onOpenCart, onSearchSubmit, onClearSearch, cartItemCount }) {
  const { isLoggedIn, user, logout } = useAuth();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleSearchToggle = () => {
    if (isSearchActive) {
      setSearchTerm('');
      onClearSearch();
    }
    setIsSearchActive(prev => !prev);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchSubmit(searchTerm);
    } else {
      onClearSearch();
    }
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative text-lg text-gray-700 hover:text-gray-900 font-medium group" 
    >
      {children}
      <span
        className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
      ></span>
    </Link>
  );

  return (
    <header className="bg-white text-gray-800 p-4 shadow-sm sticky top-0 z-30 font-body">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center" 
        >
          <img
            src="/logo-wear.png" 
            alt="Logo Wear"
            className="h-10 md:h-12 w-auto" 
          />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          {isLoggedIn && user && user.isAdmin && (
            <NavLink to="/admin">Admin</NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/profile">Perfil</NavLink>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center h-full">
            <form
              onSubmit={handleSubmit}
              className={`flex items-center space-x-2 transition-all duration-300 ease-in-out
                ${isSearchActive ? 'opacity-100 scale-100 w-full' : 'opacity-0 scale-95 w-0 pointer-events-none overflow-hidden'}`}
              style={{ minWidth: isSearchActive ? '200px' : '0' }}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-grow"
              />
              <button
                type="submit"
                className="text-gray-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 transition-colors duration-200"
                aria-label="Confirmar Pesquisa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleSearchToggle}
                className="text-gray-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0 transition-colors duration-200"
                aria-label="Fechar Pesquisa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
            <button
              onClick={handleSearchToggle}
              className={`text-gray-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300 ease-in-out absolute
                ${isSearchActive ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
              style={{ right: isSearchActive ? '0' : '0' }}
              aria-label="Abrir Pesquisa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={onOpenCart}
              className="text-gray-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              aria-label="Abrir carrinho"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0-8a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
            </button>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors duration-300 text-lg font-semibold shadow-sm"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors duration-300 text-lg font-semibold shadow-sm"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;