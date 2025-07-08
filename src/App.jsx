// frontend/src/App.jsx
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Ainda necessário para ProtectedRoute/AdminRoute

import Header from "./components/Header";
import SearchOverlay from "./components/SearchOverlay";

import RegisterPage from './pages/RegisterPage'; // Confirme o nome do seu arquivo, pode ser 'Register.jsx' ou 'RegisterPage.jsx'
import LoginPage from './pages/LoginPage';     // Confirme o nome do seu arquivo, pode ser 'Login.jsx' ou 'LoginPage.jsx'

import ProtectedRoute from './components/ProtectedRoute'; 
import AdminRoute from './components/AdminRoute'; 

import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductListPage from './pages/AdminProductListPage'; 
import CheckoutPage from './pages/CheckoutPage'; 

import MainLayout from './components/MainLayout'; // NOVO: Importar o MainLayout

// =========================================================
// Componentes temporários (mantêm-se os mesmos)
// =========================================================
const CategoriesPage = () => {
  // Categorias de exemplo (podem vir de uma API real no futuro)
  const categories = [
    { name: "Eletrônicos", description: "Smartphones, notebooks, fones de ouvido e mais.", icon: "📱" },
    { name: "Livros Digitais", description: "E-books de ficção, não-ficção, tecnologia e autoajuda.", icon: "📚" },
    { name: "Softwares", description: "Sistemas operacionais, aplicativos de produtividade e segurança.", icon: "💻" },
    { name: "Cursos Online", description: "Aprenda novas habilidades com cursos de diversas áreas.", icon: "🎓" },
    { name: "Música e Áudio", description: "Faixas, álbuns e efeitos sonoros para seus projetos.", icon: "🎶" },
    { name: "Roupas", description: "Moda masculina, feminina e infantil para todas as ocasiões.", icon: "👕" },
    { name: "Designs e Templates", description: "Modelos para sites, apresentações e artes gráficas.", icon: "🎨" },
    
  ];

  return (
    <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Nossas Categorias de Produtos</h2>
      <p className="text-lg text-gray-600 mb-10">Explore nossa vasta seleção de produtos digitais organizados por categoria.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link 
            key={index} 
            to={`/categorias/${category.name.toLowerCase().replace(/\s+/g, '-')}`} // Link fictício para a categoria
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center text-left border border-gray-200"
          >
            <span className="text-5xl mb-4">{category.icon}</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-gray-700 text-center">{category.description}</p>
            <span className="mt-4 text-blue-600 hover:text-blue-800 font-medium">Ver produtos &rarr;</span>
          </Link>
        ))}
      </div>

      <p className="text-md text-gray-500 mt-12">
        * Clique em uma categoria para simular a visualização de produtos específicos. (Esta funcionalidade será implementada futuramente.)
      </p>
    </div>
  );
};

const CartPage = () => (
  <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Página do Carrinho</h2>
    <p className="text-lg text-gray-600">Esta é a página dedicada ao carrinho. O carrinho lateral já mostra seus itens!</p>
  </div>
);

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Página do Perfil</h2>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md inline-block">
          <p className="text-xl text-gray-700">Bem-vindo, <span className="font-semibold text-blue-600">{user.name || user.email}</span>!</p>
          <p className="text-lg text-gray-600 mt-2">Email: {user.email}</p>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Você precisa estar logado para ver esta página.</p>
      )}
    </div>
  );
};


// =========================================================
// Componente App Principal
// =========================================================
function App() {
  // isCartOpen é gerenciado aqui para ser passado para o Header e MainLayout
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Funções de controle do carrinho/pesquisa que atualizam o estado isCartOpen/isSearchOverlayOpen
  const handleOpenCart = () => {
    setIsCartOpen(true);
    setIsSearchOverlayOpen(false); // Garante que a pesquisa feche ao abrir o carrinho
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleOpenSearchOverlay = () => {
    setIsSearchOverlayOpen(true);
    setIsCartOpen(false); // Garante que o carrinho feche ao abrir a pesquisa
  };

  const handleCloseSearchOverlay = () => {
    setIsSearchOverlayOpen(false);
  };

  return (
    <Router>
      <Header onOpenCart={handleOpenCart} onOpenSearch={handleOpenSearchOverlay} onCloseSearch={handleCloseSearchOverlay} /> 
      
      <Routes>
        {/* A rota principal agora renderiza o MainLayout, passando o controle do carrinho */}
        <Route 
          path="/" 
          element={<MainLayout isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />} 
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
      </Routes>

      {/* SearchOverlay permanece aqui, pois não está diretamente ligado ao fluxo do MainLayout */}
      <SearchOverlay isOpen={isSearchOverlayOpen} onClick={handleCloseSearchOverlay} />
    </Router>
  );
}

const CategoryProductsPage = () => {
  const { categoryName } = useParams(); // Para pegar o nome da categoria da URL
  
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

export default App;