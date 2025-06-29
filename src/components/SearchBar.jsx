import React, { useState } from 'react';

function SearchBar() {
  const [termoDeBusca, setTermoDeBusca] = useState('');

  const handleInputChange = (event) => {
    setTermoDeBusca(event.target.value); 
  };
  const handleSearchClick = () => {
    alert(`Buscando por: ${termoDeBusca}`); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite para buscar..."
        value={termoDeBusca} 
        onChange={handleInputChange} 
      />
      <button onClick={handleSearchClick}>Buscar</button>
      <p>Você está buscando por: {termoDeBusca}</p>
    </div>
  );
}

export default SearchBar;