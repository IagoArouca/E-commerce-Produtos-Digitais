import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'; 
import { useAuth, AuthProvider } from './context/AuthContext';
import { useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from "./components/Header";
import CategoriesPage from './pages/CategoriesPage';
import PromoBanner from "./components/PromoBanner";
import CartSidebar from "./components/CartSidebar";
import ProductList from './components/ProductList';
import { productApi } from './services/api';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductListPage from './pages/AdminProductListPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PromotionsPage from './pages/PromotionsPage'; 
import ProfilePage from './pages/ProfilePage';


const CartPage = () => (
  <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Página do Carrinho</h2>
    <p className="text-lg text-gray-600">Esta é a página dedicada ao carrinho. O carrinho lateral já mostra os itens.</p>
  </div>
);

const CategoryProductsPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Produtos em <span className="capitalize text-blue-600">{categoryName.replace(/-/g, ' ')}</span>
      </h2>
      <p className="text-lg text-gray-600">Aqui você verá os produtos da categoria "{categoryName.replace(/-/g, ' ')}".</p>
      <p className="text-md text-gray-500 mt-4">Esta página ainda está em desenvolvimento. Volte à <Link to="/categorias" className="text-blue-500 hover:underline">Página de Categorias</Link>.</p>
    </div>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

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

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getProducts();
        setAllProducts(data);
        setDisplayedProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(err.message || "Não foi possível carregar os produtos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const nodeRef = useRef(null);

  const noHeaderPaths = ['/login', '/register'];
  const showHeader = !noHeaderPaths.includes(location.pathname);

  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === productToAdd._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === productToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item._id !== productId);
      }
      return prevItems.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
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

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleSearchSubmit = (searchTerm) => {
    if (!searchTerm.trim()) {
      setDisplayedProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedProducts(filtered);
  };

  const handleClearSearch = () => {
    setDisplayedProducts(allProducts);
  };


  return (
    <>
      {showHeader && (
        <Header
          onOpenCart={handleOpenCart}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={handleClearSearch}
          cartItemCount={totalCartItems}
        />
      )}

      {location.pathname === '/' && showHeader && <PromoBanner />}

      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="page-transition"
          timeout={200}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="page-transition-wrapper">
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <main className="container mx-auto p-4 bg-gray-100 min-h-screen">
                    {loading ? (
                      <div className="flex justify-center items-center h-[calc(100vh-200px)] text-gray-800 text-2xl">
                        Carregando produtos...
                      </div>
                    ) : error ? (
                      <div className="flex justify-center items-center h-[calc(100vh-200px)] bg-red-100 text-red-800 text-xl p-4 rounded-md">
                        Erro: {error}
                      </div>
                    ) : (
                      <>
                        <h2 className="text-3xl font-bold text-center my-8 text-gray-800">Produtos</h2>
                        {displayedProducts.length === 0 && (
                          <p className="text-center text-xl text-gray-700 mt-10">Nenhum produto encontrado com o termo da pesquisa.</p>
                        )}
                        <ProductList products={displayedProducts} onAddToCart={handleAddToCart} />
                      </>
                    )}
                  </main>
                }
              />
              <Route path="/categorias" element={<CategoriesPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProductListPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/categorias/:categoryName" element={<CategoryProductsPage />} />

              <Route
                path="/produtos/:productId"
                element={<ProductDetailPage onAddToCart={handleAddToCart} />}
              />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>


      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </>
  );
}

function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}

export default AppWrapper;