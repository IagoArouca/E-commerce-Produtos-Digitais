// frontend/src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react'; // Adicionei useState e useEffect
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Tenta obter os itens do carrinho e o total passados via 'state'
  const { cartItems: initialCartItems, totalPrice: initialTotalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  // Estados locais para simular dados do formulário de checkout
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Default para cartão
  
  // Usar o estado real do carrinho e total passados via props
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  // Calcula o subtotal e um frete fictício
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 0 ? 15.00 : 0; // Frete fictício de R$15,00 se houver itens
  const finalTotal = subtotal + shippingCost;

  // Efeito para redirecionar se não houver itens no carrinho ou se não estiver logado
  useEffect(() => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para finalizar a compra.");
      navigate('/login', { state: { from: '/checkout' } });
    } else if (!cartItems || cartItems.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
      navigate('/');
    }
  }, [isLoggedIn, cartItems, navigate]);

  // Se o componente estiver redirecionando, não renderiza nada ainda
  if (!isLoggedIn || !cartItems || cartItems.length === 0) {
    return <div className="text-center p-8 text-gray-600">Redirecionando para a página inicial ou login...</div>;
  }

  const handleConfirmPurchase = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit do formulário
    
    // Validação básica
    if (!address || !city || !state || !zipCode) {
      alert("Por favor, preencha todos os campos de endereço.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra!");
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
    alert(`Compra simulada realizada com sucesso!\n\nTotal: R$ ${finalTotal.toFixed(2).replace('.', ',')}\nForma de Pagamento: ${paymentMethod === 'credit_card' ? 'Cartão de Crédito' : paymentMethod === 'pix' ? 'Pix' : 'Boleto'}\n\n(Esta é uma simulação. Nenhum valor foi cobrado e o carrinho não foi esvaziado automaticamente.)`);
    
    // Em uma aplicação real, aqui você enviaria orderDetails para o backend
    // e, em caso de sucesso, esvaziaria o carrinho (setCartItems([])) e redirecionaria.
    
    // Por agora, apenas redireciona para a home
    navigate('/'); 
    // Para realmente esvaziar o carrinho, você precisaria de um contexto ou prop `clearCart`
    // No estado atual, o carrinho ainda estará visível até o próximo login/recarregamento.
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center my-8 text-gray-800">Finalizar Compra</h2>
      
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        {/* Coluna da Esquerda: Informações de Envio e Pagamento */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Informações de Envio</h3>
          <form onSubmit={handleConfirmPurchase}>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Endereço Completo:</label>
              <input
                type="text"
                id="address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Rua, Número, Bairro"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">Cidade:</label>
                <input
                  type="text"
                  id="city"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ex: São Paulo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">Estado:</label>
                <input
                  type="text"
                  id="state"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ex: SP"
                  maxLength="2"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">CEP:</label>
              <input
                type="text"
                id="zipCode"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="00000-000"
                maxLength="9" // Formato CEP: 00000-000
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2'))} // Formata o CEP
                required
              />
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 mt-8">Forma de Pagamento</h3>
            <div className="mb-6">
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 h-5 w-5"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700 font-medium">Cartão de Crédito</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 h-5 w-5"
                    name="paymentMethod"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700 font-medium">Pix</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 h-5 w-5"
                    name="paymentMethod"
                    value="boleto"
                    checked={paymentMethod === 'boleto'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700 font-medium">Boleto Bancário</span>
                </label>
              </div>
            </div>

            <button
              type="submit" // Agora é um submit de formulário
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out mt-6"
            >
              Confirmar Compra (Simulação)
            </button>
          </form>
        </div>

        {/* Coluna da Direita: Resumo do Pedido */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Resumo do Pedido</h3>
          
          {user && (
            <div className="mb-6 border-b pb-4 border-gray-200">
              <p className="text-lg text-gray-700">Comprador: <span className="font-medium">{user.name || user.email}</span></p>
              <p className="text-lg text-gray-700">Email: <span className="font-medium">{user.email}</span></p>
            </div>
          )}

          {cartItems.length > 0 ? (
            <>
              <ul className="mb-6 max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {cartItems.map((item) => (
                  <li key={item._id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <img src={item.imageUrl} alt={item.name} className="h-14 w-14 object-cover rounded mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-800">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg text-gray-700 mb-2">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-700 mb-2">
                  <span>Frete:</span>
                  <span>R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold mb-4 pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-blue-600">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <p className="text-center text-gray-700 text-md mt-6">
                  Esta é uma simulação. Nenhuma transação real será efetuada.
                  Os dados inseridos não serão salvos.
              </p>
            </>
          ) : (
            <p className="text-center text-gray-600 text-xl mt-4">Nenhum item no carrinho.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;