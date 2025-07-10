import React from 'react';
import ProductCard from './ProductCard'; 

function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 lg:p-8"> 
      {products.map(product => (
        <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;