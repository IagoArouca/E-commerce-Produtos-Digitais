// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartSidebar from "./components/CartSidebar";
import SearchOverlay from "./components/SearchOverlay";

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

// NOVO: Importe o ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute'; 

// Componente temporário para a página de Categorias
const CategoriesPage = () => (
  <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Página de Categorias</h2>
    <p className="text-lg text-gray-600">Aqui você verá as categorias de produtos. Em breve, mais conteúdo!</p>
  </div>
);

// Componente temporário para a página do Carrinho
const CartPage = () => (
  <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Página do Carrinho</h2>
    <p className="text-lg text-gray-600">Esta é a página dedicada ao carrinho. O carrinho lateral já mostra seus itens!</p>
  </div>
);

// NOVO: Componente temporário para uma página de Perfil protegida
const ProfilePage = () => {
  const { user } = useAuth(); // Acessa o usuário do contexto
  return (
    <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Página do Perfil</h2>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md inline-block">
          <p className="text-xl text-gray-700">Bem-vindo, <span className="font-semibold text-blue-600">{user.name || user.email}</span>!</p>
          <p className="text-lg text-gray-600 mt-2">Email: {user.email}</p>
          {/* Adicione outras informações do perfil aqui */}
          <p className="text-sm text-gray-500 mt-4">Esta é uma página que só pode ser acessada se você estiver logado.</p>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Você precisa estar logado para ver esta página.</p>
      )}
    </div>
  );
};


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
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
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
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
        return prevItems.filter(item => item.id !== productId);
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
    alert("Funcionalidade de Checkout em desenvolvimento! Carrinho será esvaziado.");
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
    setIsSearchOverlayOpen(false);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleOpenSearchOverlay = () => {
    setIsSearchOverlayOpen(true);
  };

  const handleCloseSearchOverlay = () => {
    setIsSearchOverlayOpen(false);
  };

  // Removendo o loading/error da API de produtos aqui, pois AuthProvider já faz algo similar.
  // Você pode ajustar a lógica de carregamento global se quiser uma tela de loading única.
  // Por simplicidade, vamos deixar o loading de produtos no useEffect apenas.

  return (
    <Router>
      <Header onOpenCart={handleOpenCart} onOpenSearch={handleOpenSearchOverlay} onCloseSearch={handleCloseSearchOverlay} /> 
      
      <Routes>
        <Route 
          path="/" 
          element={
            <main className="container mx-auto p-4 bg-gray-100 min-h-screen">
              {loading ? ( // Adicionando loading de produtos aqui dentro da rota
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
            </main>
          } 
        />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* NOVO: Rota Protegida para o Perfil */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={handleCloseCart} 
        cartItems={cartItems} 
        onRemoveItem={handleRemoveFromCart} 
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout} 
      />
      <SearchOverlay isOpen={isSearchOverlayOpen} onClick={handleCloseSearchOverlay} />
    </Router>
  );
}

export default App;