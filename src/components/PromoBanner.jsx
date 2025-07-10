
import React from 'react';

function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-700 text-white p-4 text-center shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
        <p className="text-xl md:text-2xl font-bold">
          🎉 Mega Promoção de Verão!
        </p>
        <p className="text-lg md:text-xl">
          Até <span className="font-extrabold text-yellow-300">50% OFF</span> em produtos selecionados!
        </p>
        <a
          href="/promocoes" 
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Confira Agora!
        </a>
      </div>
    </div>
  );
}

export default PromoBanner;