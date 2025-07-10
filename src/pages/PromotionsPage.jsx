import React from 'react';
import ProductPromoBanner from '../components/ProductPromoBanner'; 

function PromotionsPage() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="my-8">
        <ProductPromoBanner /> 
      </div>

      <h2 className="text-3xl font-bold text-center my-8 text-gray-800">
        Produtos em Super Promoção!
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-700">
          
        </p>
        <ProductList products={displayedProducts} onAddToCart={handleAddToCart} />
        
      </div>
    </div>
  );
}

export default PromotionsPage;