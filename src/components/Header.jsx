// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

function Header({ onOpenCart, onOpenSearch, onCloseSearch }) {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center z-30 relative">
      
      {/* Seção 1: Logo */}
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-extrabold tracking-tight">
         <Link to="/" className="hover:text-blue-400 transition duration-300">Wear</Link> {/* Use Link to="/" */}
        </h1>
      </div>

      {/* Seção 2: Links centralizados */}
      <nav className="hidden sm:flex justify-center flex-1">
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link to="/categorias" className="hover:text-blue-400 transition duration-300">Categorias</Link>
          </li>
          <li>
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1 hover:text-blue-400 transition duration-300 bg-transparent border-none text-white cursor-pointer p-0 text-lg"
            >
              Carrinho
              <ShoppingCartIcon className="h-5 w-5" />
              
            </button>
            {/* <Link to="/carrinho" className="hover:text-blue-400 transition duration-300">Carrinho</Link> */}
          </li>
        </ul>
      </nav>

      {/* Seção 3: SearchBar */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <SearchBar onOpen={onOpenSearch} onClose={onCloseSearch} />
      </div>
    </header>
  );
}

export default Header;
