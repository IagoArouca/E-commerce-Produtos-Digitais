// src/components/ProductList.jsx (sem mudanças, apenas para referência)
import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart }) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-gray-600 text-lg mt-8">Nenhum produto disponível no momento.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* O gap-6 ajuda no espaçamento e h-full nos cards garantirá a altura uniforme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;