import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const IconMapPin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const IconCreditCard = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9.75h19.5m-16.5 0a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 002.25 2.25h1.381m-4.5-4.5H21a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H2.25A2.25 2.25 0 000 6.75v4.5a2.25 2.25 0 002.25 2.25h1.381M11.25 10.5H12a2.25 2.25 0 00-2.25-2.25V6.75a2.25 2.25 0 002.25-2.25H2.25A2.25 2.25 0 000 6.75v4.5a2.25 2.25 0 002.25 2.25h1.381m-4.5-4.5H21a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H2.25A2.25 2.25 0 000 6.75v4.5a2.25 2.25 0 002.25 2.25h1.381M12 18.75h.008v.008H12v-.008z" />
  </svg>
);

const IconClipboardList = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12H12m-8.25-3.375h1.5A1.125 1.125 0 0110.5 11.25v-1.5A3.375 3.375 0 007.125 6.375H5.25m5.55 12.09L12 21.75l3.493-2.625m-6.986 0H7.5m6.986 0H16.5M12 3v16.5" />
  </svg>
);

const IconExclamationTriangle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.389 3.375 2.077 3.375h14.006c1.688 0 2.943-1.875 2.077-3.375l-7.155-12.449a1.5 1.5 0 00-2.632 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);


function CheckoutPage() {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems: initialCartItems, totalPrice: initialTotalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); 
  const [error, setError] = useState(''); 

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 0 ? 15.00 : 0; 
  const finalTotal = subtotal + shippingCost;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        alert("Para finalizar sua compra, pedimos que faça login. É rapidinho!");
        navigate('/login', { state: { from: '/checkout' } });
      } else if (!cartItems || cartItems.length === 0) {
        alert("Ops! Parece que seu carrinho está vazio. Adicione alguns produtos antes de prosseguir com a compra.");
        navigate('/');
      }
    }, 500); 

    return () => clearTimeout(timer); 
  }, [isLoggedIn, cartItems, navigate]);
  if (!isLoggedIn || !cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-700 font-body p-8 text-center">
        <IconExclamationTriangle className="animate-bounce h-12 w-12 text-pink-500 mb-6" />
        <p className="text-xl font-semibold text-gray-800 font-display mb-4">
          Aguarde um momento...
        </p>
        <p className="text-gray-600 max-w-md">
          Estamos verificando seu carrinho ou o status do seu login. Você será redirecionado em breve!
        </p>
      </div>
    );
  }

  const handleConfirmPurchase = (e) => {
    e.preventDefault();
    setError(''); 

    if (!address.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      setError("Por favor, preencha todos os campos de endereço para que possamos enviar seu pedido.");
      return;
    }
    if (cartItems.length === 0) {
      setError("Seu carrinho está vazio. Adicione produtos para prosseguir com a compra.");
      return;
    }

    const orderDetails = {
      user: user.email,
      items: cartItems.map(item => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      address: { address, city, state, zipCode },
      paymentMethod: paymentMethod,
      subtotal: subtotal.toFixed(2),
      shipping: shippingCost.toFixed(2),
      total: finalTotal.toFixed(2),
      date: new Date().toLocaleString()
    };

    console.log("Detalhes da Compra Simulada:", orderDetails);
    alert(` 🎉 Parabéns pela sua compra, ${user.name || user.email}! 🎉\n\nSeu pedido foi processado com sucesso (SIMULADO)!\n\nDetalhes:\nTotal: R$ ${finalTotal.toFixed(2).replace('.', ',')}\nForma de Pagamento: ${paymentMethod === 'credit_card' ? 'Cartão de Crédito' : paymentMethod === 'pix' ? 'Pix' : 'Boleto'}\n\nEm uma aplicação real, você receberia um e-mail de confirmação e veria seu histórico de pedidos atualizado.\n\nObrigado por escolher Nex!`);


    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 bg-gray-50 min-h-screen font-body">
      <h1 className="text-4xl md:text-5xl font-display text-gray-900 mb-12 text-center leading-tight">
        Finalizar Sua <span className="text-pink-600">Compra</span>
      </h1>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto text-center">
        Quase lá! Preencha os detalhes para envio e escolha a forma de pagamento para concluir seu pedido.
      </p>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg relative mb-8 shadow-md flex items-center max-w-4xl mx-auto">
          <IconExclamationTriangle className="h-6 w-6 text-red-500 mr-3" />
          <strong className="font-bold mr-2">Atenção!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-display text-gray-900 mb-6 flex items-center border-b pb-4 border-gray-100">
            <IconMapPin className="w-8 h-8 text-blue-500 mr-3" />
            Detalhes para Envio
          </h2>
          <form className="space-y-6" onSubmit={handleConfirmPurchase}> 
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
              <input
                type="text"
                id="address"
                className="
                  mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                  focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none
                  transition-all duration-200
                "
                placeholder="Rua, Número, Bairro, Complemento"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                <input
                  type="text"
                  id="city"
                  className="
                    mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none
                    transition-all duration-200
                  "
                  placeholder="Ex: Rio de Janeiro"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <input
                  type="text"
                  id="state"
                  className="
                    mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none
                    transition-all duration-200
                  "
                  placeholder="Ex: RJ"
                  maxLength="2"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
              <input
                type="text"
                id="zipCode"
                className="
                  mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                  focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none
                  transition-all duration-200
                "
                placeholder="00000-000"
                maxLength="9"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2'))}
                required
              />
            </div>
            <h2 className="text-3xl font-display text-gray-900 mt-10 mb-6 flex items-center border-b pb-4 border-gray-100">
              <IconCreditCard className="w-8 h-8 text-pink-500 mr-3" />
              Sua Forma de Pagamento
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  name="paymentMethod"
                  id="payment-credit-card"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="payment-credit-card" className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
                  Cartão de Crédito
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500 cursor-pointer"
                  name="paymentMethod"
                  id="payment-pix"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="payment-pix" className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
                  Pix
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer"
                  name="paymentMethod"
                  id="payment-boleto"
                  value="boleto"
                  checked={paymentMethod === 'boleto'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="payment-boleto" className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
                  Boleto Bancário
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="
                w-full bg-green-600 text-white py-4 px-6 rounded-lg
                hover:bg-green-700 transition-all duration-300 text-xl font-semibold shadow-md
                transform hover:scale-105 active:scale-95 mt-10
                inline-flex items-center justify-center
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Confirmar Compra Agora!
            </button>
          </form>
        </div>
        <div className="lg:w-1/3 bg-blue-50 p-8 rounded-xl shadow-inner border border-blue-100 lg:sticky lg:top-8 lg:h-fit">
          <h2 className="text-3xl font-display text-blue-900 mb-6 flex items-center border-b pb-4 border-blue-200">
            <IconClipboardList className="w-8 h-8 text-blue-600 mr-3" />
            Seu Pedido
          </h2>

          {user && (
            <div className="mb-6 border-b pb-4 border-gray-200">
              <p className="text-lg text-gray-700 flex justify-between">
                <span className="font-semibold">Comprador:</span>
                <span className="font-medium text-gray-800">{user.name || user.email}</span>
              </p>
              <p className="text-lg text-gray-700 flex justify-between">
                <span className="font-semibold">Email:</span>
                <span className="font-medium text-gray-800">{user.email}</span>
              </p>
            </div>
          )}

          {cartItems.length > 0 ? (
            <>
              <ul className="mb-6 max-h-96 overflow-y-auto pr-2"> 
                {cartItems.map((item) => (
                  <li key={item._id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                    <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4 shadow-sm" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 leading-tight">{item.name}</p>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity} x R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    
                  </li>
                ))}
              </ul>

              <div className="border-t border-blue-200 pt-6 mt-6">
                <div className="flex justify-between text-xl text-gray-700 mb-3">
                  <span>Subtotal:</span>
                  <span className="font-bold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-xl text-gray-700 mb-3">
                  <span>Frete:</span>
                  <span className="font-bold">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between items-center text-3xl font-bold mb-4 pt-4 border-t border-blue-200">
                  <span>Total:</span>
                  <span className="text-pink-600">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <p className="text-center text-gray-600 text-sm mt-8 p-3 bg-blue-100 rounded-lg border border-blue-200 italic">
                <IconExclamationTriangle className="inline-block w-4 h-4 mr-1 text-blue-500" />
                Esta é uma **simulação** de compra para testes. Nenhum valor será cobrado e seus dados não serão armazenados.
              </p>
            </>
          ) : (
            <div className="text-center text-gray-600 text-xl mt-4 p-8 bg-gray-50 rounded-lg">
              <IconShoppingBag className="w-10 h-10 mx-auto text-gray-400 mb-4" />
              <p>Seu carrinho está vazio.</p>
              <p className="text-sm mt-2">Adicione itens para ver o resumo aqui.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;