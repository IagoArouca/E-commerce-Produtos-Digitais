import React, { useEffect, useRef } from 'react';
function CartOverlay({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) {
  const overlayContentRef = useRef(null); 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && overlayContentRef.current && !overlayContentRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-end items-start pt-0 z-50 transition-opacity duration-300"
      aria-hidden={!isOpen}
    >
      <div
        ref={overlayContentRef}
        className="bg-white w-full max-w-sm h-full shadow-lg transform transition-transform duration-300 translate-x-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-sidebar-title"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 id="cart-sidebar-title" className="text-2xl font-bold text-gray-800">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
            aria-label="Fechar carrinho"
          >
            &times;
          </button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center mt-8">Seu carrinho está vazio.</p>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-blue-600 font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
                    aria-label="Diminuir quantidade"
                  >
                    -
                  </button>
                  <span className="font-medium text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    aria-label="Remover item"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-blue-700">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold text-lg"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartOverlay;