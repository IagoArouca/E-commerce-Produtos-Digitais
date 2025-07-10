import React, { useState } from 'react';

function SearchBar({ onOpen, onClose }) { 
  const [termoDeBusca, setTermoDeBusca] = useState('');

  const handleInputChange = (event) => {
    setTermoDeBusca(event.target.value);
  };

  const handleSearchClick = () => {
    alert(`Buscando por: ${termoDeBusca}`);
    onClose(); 
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={termoDeBusca}
        onChange={handleInputChange}
        onFocus={onOpen} 
        onBlur={onClose} 
        className="
          p-2 rounded-md border border-gray-600 bg-gray-700 text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          w-48 sm:w-64 md:w-60 transition-all duration-300
        "
      />
      <button
        onClick={handleSearchClick}
        className="
          bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4
          rounded-md transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
        "
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;