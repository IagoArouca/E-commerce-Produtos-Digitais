import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartSidebar from "./components/CartSidebar";
import SearchOverlay from "./components/SearchOverlay"

const CategoriesPage = () => (
  <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Página de Categorias</h2>
    <p className="text-lg text-gray-600">Aqui você verá as categorias de produtos. Em breve, mais conteúdo!</p>
  </div>
);

const CartPage = () => (
  <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Página do Carrinho</h2>
    <p className="text-lg text-gray-600">Esta é a página dedicada ao carrinho. O carrinho lateral já mostra seus itens!</p>
  </div>
);


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [products, setProducts] = useState([]); // Novo estado para armazenar os produtos da API
  const [loading, setLoading] = useState(true); // Estado para indicar que os dados estão sendo carregados
  const [error, setError] = useState(null); // Estado para lidar com erros na requisição
  const [cartItems, setCartItems] = useState([]);
 
  // Novo estado para o overlay de busca
  // Função para buscar os produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response =  await fetch('http://localhost:3000/api/products'); // URL da sua API de produtos
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); // Atualiza o estado 'products' com os dados da API
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchProducts(); // Chama a função quando o componente é montado
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez (no componentDidMount)

  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        // Se o item já existe, incrementa a quantidade
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Se o item não existe, adiciona com quantidade 1
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
    setIsCartOpen(true); // Abre o carrinho automaticamente ao adicionar um item
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        // Se a quantidade for 0 ou menos, remove o item
        return prevItems.filter(item => item.id !== productId);
      }
      // Caso contrário, atualiza a quantidade
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };



  const handleOpenCart = () => {
    setIsCartOpen(true);
    setIsSearchOverlayOpen(false); // Garante que o overlay de busca fecha se o carrinho abrir
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

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra!");
      return;
    }
    alert("Funcionalidade de Checkout em desenvolvimento! Carrinho será esvaziado.");
    setCartItems([]); // Esvazia o carrinho após "checkout" simulado
    setIsCartOpen(false); // Fecha o carrinho
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 text-2xl">
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-800 text-xl p-4">
        Erro: {error}
      </div>
    );
  }

  return (
    <>
      <Router> {/* O Router envolve toda a aplicação que usará rotas */}
      <Header onOpenCart={handleOpenCart} onOpenSearch={handleOpenSearchOverlay} onCloseSearch={handleCloseSearchOverlay} /> 
      
      {/* Aqui definimos nossas rotas */}
      <Routes>
        <Route 
          path="/" 
          element={
            <main className="container mx-auto p-4 bg-gray-100 min-h-screen">
              <h2 className="text-3xl font-bold text-center my-8 text-gray-800">Nossos Produtos Digitais</h2>
              <ProductList products={products} onAddToCart={handleAddToCart} />
            </main>
          } 
        />
        <Route path="/categorias" element={<CategoriesPage />} /> {/* Rota para Categorias */}
        <Route path="/carrinho" element={<CartPage />} />       {/* Rota para Carrinho */}
        {/* Futuramente: <Route path="/produtos/:id" element={<ProductDetailPage />} /> */}
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
    </>
  );
}

export default App;