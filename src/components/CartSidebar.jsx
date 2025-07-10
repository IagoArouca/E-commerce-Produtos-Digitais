import React from 'react';
import { Link } from 'react-router-dom'; 

function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose} 
      ></div>
      <div
        className={`fixed top-0 right-0 w-80 bg-white h-full shadow-lg z-50 transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
            aria-label="Fechar carrinho"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(100vh-180px)]"> 
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center mt-8">Seu carrinho está vazio.</p>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item._id, parseInt(e.target.value))}
                    className="w-16 p-1 border rounded-md text-center text-gray-800"
                  />
                  <button
                    onClick={() => onRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-1"
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          <div className="flex justify-between items-center mb-4 text-gray-900">
            <span className="text-xl font-bold">Subtotal:</span>
            <span className="text-xl font-bold">R$ {subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-colors duration-200
              ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
          >
            Finalizar Compra
          </button>
          <Link to="/carrinho" onClick={onClose} className="block mt-2 text-center text-sm text-blue-600 hover:underline">
            Ver carrinho completo
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;