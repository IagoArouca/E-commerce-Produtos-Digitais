import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  if (!product || !product.name || !product.price || !product.imageUrl) {
    return <p className="text-center text-red-500">Produto inválido ou incompleto.</p>;
  }

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    e.preventDefault(); 
    onAddToCart(product);
  };

  return (
    <div
      className="
        bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col
        border border-gray-100
        hover:shadow-xl hover:scale-103 transition-all duration-300 ease-in-out
      "
    >
      <Link to={`/produtos/${product._id}`} className="block flex-grow">
        <div className="w-full h-48 flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-t-lg"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow items-center text-center font-body">
          <h3 className="font-semibold text-xl text-gray-900 mb-2 truncate">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <p className="text-blue-500 text-2xl font-bold mt-auto">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </Link>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <button
          onClick={handleAddToCart}
          className="
            w-full bg-gray-800 text-white py-2 px-4 rounded-md shadow-md
            hover:bg-gray-900 active:bg-black
            transition-all duration-300 font-semibold text-lg
            transform hover:-translate-y-0.5
          "
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductCard;