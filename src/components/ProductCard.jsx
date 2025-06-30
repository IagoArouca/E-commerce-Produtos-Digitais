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
    <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden h-full"> {/* Card principal: bg-white, h-full para altura igual */}
      {/* Contêiner da Imagem com fundo diferente */}
      <div className="bg-blue-100 p-4 flex justify-center items-center"> {/* Fundo azul claro para a imagem, centraliza */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-48 h-48 object-contain rounded-md" // object-contain para não cortar a imagem
        />
      </div>

      {/* Conteúdo do Produto - p-6 para padding */}
      <div className="p-6 flex flex-col flex-grow items-center text-center"> {/* flex-grow para ocupar espaço restante */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p>
        {/* Adicionei um div para o botão para controlar melhor o alinhamento e espaçamento */}
        <div className="mt-auto"> {/* mt-auto empurra o botão para o final do card */}
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