// src/components/ProductCard.jsx
import React from 'react';

function ProductCard({ product }) {
  if (!product || !product.name || !product.price || !product.imageUrl) {
    return <p className="text-center text-red-500">Produto inválido ou incompleto.</p>;
  }

  const handleAddToCart = () => {
    alert(`"${product.name}" adicionado ao carrinho!`);
  };

  return (
    // Card principal: mantém o bg-white, shadow-lg, rounded-lg e h-full
    <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden h-full">
      {/* Contêiner da Imagem: Agora sem cor de fundo, apenas para estruturar */}
      {/* w-full para ocupar toda a largura, h-48 para altura fixa */}
      <div className="w-full h-48 flex justify-center items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          // A imagem ocupa 100% da largura e altura do contêiner
          // object-cover para preencher o espaço, top-rounded para as bordas superiores
          className="w-full h-full object-cover rounded-t-lg" // <--- Mudanças aqui
        />
      </div>

      {/* Conteúdo do Produto - p-6 para padding */}
      <div className="p-6 flex flex-col flex-grow items-center text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p>
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;