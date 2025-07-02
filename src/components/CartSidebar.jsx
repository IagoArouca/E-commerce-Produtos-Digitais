// src/components/CartSidebar.jsx
// src/components/CartSidebar.jsx
import React from 'react';

// Recebe as novas props: onRemoveItem, onUpdateQuantity, onCheckout
function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) { 
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40">
      <div className="fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg p-6 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Seu Carrinho ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2> {/* Mostra a quantidade TOTAL de itens */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">
            &times; 
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-gray-600 text-center py-10">
            <p>Seu carrinho está vazio.</p>
            <p className="mt-4">Adicione produtos para começar a comprar!</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 mb-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2"> {/* Altura máxima e scroll, adicionado pr-2 para espaçamento da barra de rolagem */}
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"> {/* last: para remover borda do último item */}
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" /> {/* flex-shrink-0 para img não encolher */}
                <div className="flex-grow flex flex-col">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.name}</h3>
                  <p className="font-bold text-blue-600 mb-2">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  
                  {/* Controles de Quantidade */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                      className="bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                      className="bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold"
                    >
                      +
                    </button>
                    {/* Botão Remover Individual */}
                    <button 
                      onClick={() => onRemoveItem(item.id)} 
                      className="ml-auto text-red-500 hover:text-red-700 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Rodapé do carrinho: Total e botão de Finalizar Compra */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t pt-4 bg-white"> {/* Fundo branco para garantir que o rodapé não seja transparente no scroll */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-blue-600">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button 
            onClick={onCheckout} // Chama a função de checkout
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors duration-300"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;