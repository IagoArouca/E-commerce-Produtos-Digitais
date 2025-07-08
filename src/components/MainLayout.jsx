// frontend/src/components/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate aqui
import { useAuth } from '../context/AuthContext'; // Importe useAuth

import ProductList from './ProductList';
import CartSidebar from './CartSidebar';

import { productApi } from '../services/api';

function MainLayout({ isCartOpen, setIsCartOpen }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (e) {
      console.error("Erro ao carregar carrinho do LocalStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getProducts(); 
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(err.message || "Não foi possível carregar os produtos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Agora, useNavigate pode ser chamado aqui!
  const navigate = useNavigate(); 
  const { isLoggedIn } = useAuth();

  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === productToAdd._id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item._id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra!");
      return;
    }
    
    if (!isLoggedIn) {
        alert("Você precisa estar logado para finalizar a compra.");
        navigate('/login', { state: { from: '/checkout' } });
        return;
    }

    navigate('/checkout', { 
        state: { 
            cartItems: cartItems, 
            totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        } 
    });
    setIsCartOpen(false);
  };

  // Funções para abrir/fechar carrinho que agora são passadas como props para MainLayout
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <main className="container mx-auto p-4 bg-gray-100 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)] text-gray-800 text-2xl">
          Carregando produtos...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)] bg-red-100 text-red-800 text-xl p-4">
          Erro: {error}
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center my-8 text-gray-800">Nossos Produtos Digitais</h2>
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </>
      )}

      {/* CartSidebar agora dentro do MainLayout, mas ainda passa props para ele */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={handleCloseCart} 
        cartItems={cartItems} 
        onRemoveItem={handleRemoveFromCart} 
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout} 
      />
    </main>
  );
}

export default MainLayout;