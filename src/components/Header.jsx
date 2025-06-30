// src/components/Header.jsx
import React from 'react';
import SearchBar from './SearchBar'; 
import { ShoppingCartIcon } from '@heroicons/react/24/outline';


function Header() {
  return (
    // O header principal agora é um flexbox que alinha os itens entre si e verticalmente ao centro
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      
      {/* Seção 1: Logo (sempre à esquerda) */}
      <div className="flex items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <a href="/" className="hover:text-blue-400 transition duration-300">Digital Store</a> 
        </h1>
      </div>

      {/* Seção 2: Navegação (hidden em mobile, mas ocupa espaço e centraliza em telas maiores) */}
      {/* 'flex-grow' faz com que esta div ocupe todo o espaço disponível no meio */}
      {/* 'justify-center' centraliza o conteúdo (os links) dentro deste espaço expandido */}
      <nav className="hidden sm:flex justify-center flex-1">
        <ul className="flex space-x-6 text-lg">
          <li><a href="/categorias" className="hover:text-blue-400 transition duration-300">Categorias</a></li>
          <li>
              <a href="/carrinho" className="flex items-center gap-1 hover:text-blue-400 transition duration-300">
              Carrinho
              <ShoppingCartIcon className="h-5 w-5" />
              
            </a>
          </li>

        </ul>
      </nav>  

      {/* Seção 3: SearchBar (sempre à direita) */}
      {/* 'w-full sm:w-auto' para responsividade, 'justify-end' para alinhar à direita */}
      <div className="w-full sm:w-auto flex justify-end">
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;