import React from 'react';
import SearchBar from './SearchBar'; 

function Header() {
  return (
    <header className="main-header"> 
      <div className="header-content"> {/* Um contêiner para alinhar o conteúdo */}
        <h1 className="site-title">
          <a href="/" className="site-logo-link">Digital Store</a> 
        </h1>
        {/* Futuramente, poderemos ter links de navegação aqui */}
        <nav className="main-nav">
          <ul>
            <li><a href="/categorias">Categorias</a></li>
            <li><a href="/carrinho">Carrinho</a></li>
            {/* Adicione mais links conforme necessário */}
          </ul>
        </nav>
        <SearchBar />
        {/* Futuramente, podemos adicionar ícones de usuário/carrinho aqui */}
      </div>
    </header>
  );
}

export default Header;