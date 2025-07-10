import React from 'react';

function ProductPromoBanner() {
  return (
    <div className="bg-gray-100 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16 rounded-lg shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50 z-0"></div>
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <p className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">SALE</p>
        <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-4">UP TO</p>
        <p className="text-gray-900 text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-4">50%</p>
        <p className="text-gray-600 text-2xl md:text-3xl lg:text-4xl font-semibold">OFF</p>
      </div>

      <div className="relative z-10 flex-shrink-0">
        <img
          src="https://i.imgur.com/your-cap-image.png" 
          alt="Boné em promoção"
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

export default ProductPromoBanner;