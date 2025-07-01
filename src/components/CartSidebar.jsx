// src/components/CartSidebar.jsx
import React from 'react';

function CartSidebar({ isOpen, onClose }) {
  // O carrinho só será renderizado se isOpen for true
  if (!isOpen) return null;

  return (
    // Div principal do carrinho lateral
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"> {/* Overlay de fundo */}
      <div className="fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg p-6 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out">
        {/* Cabeçalho do carrinho */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Seu Carrinho</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">
            &times; {/* Símbolo "x" para fechar */}
          </button>
        </div>

        {/* Conteúdo do carrinho (por enquanto, apenas um placeholder) */}
        <div className="text-gray-600">
          <p>Seu carrinho está vazio.</p>
          <p className="mt-4">Adicione produtos para começar a comprar!</p>
        </div>

        {/* Botão de checkout ou outras ações (fixo no final, por exemplo) */}
        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors duration-300">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

// ESTA LINHA É CRUCIAL!
export default CartSidebar;