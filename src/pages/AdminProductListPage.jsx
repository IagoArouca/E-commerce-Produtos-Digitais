import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { productApi } from '../services/api'; 
import ProductForm from '../components/ProductForm'; 
import Modal from '../components/Modal'; 

const IconEdit = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.262-8.262zm0 0V21" />
  </svg>
);

const IconDelete = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165L5.34 19.673a2.25 2.25 0 002.244 2.077h.062a2.25 2.25 0 002.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M12 2.25L21 9M3 9l9 6M3 9l9 6" />
  </svg>
);

function AdminProductListPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.getProducts(token);
      setProducts(data);
    } catch (err) {
      console.error("Ops! Erro ao carregar os produtos para administração:", err);
      setError("Ah não! Não conseguimos carregar a lista de produtos. Tente recarregar a página.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Tem certeza absoluta que deseja deletar este produto? Esta ação não pode ser desfeita!')) {
      return;
    }
    try {
      await productApi.deleteProduct(productId, token);
      setProducts(products.filter(product => product._id !== productId));
      alert('Produto deletado com sucesso! Menos um para gerenciar 😉');
    } catch (err) {
      console.error("Ops! Erro ao deletar produto:", err);
      setError("Puxa! Não foi possível deletar o produto. Verifique sua conexão ou tente novamente.");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null); 
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts(); 
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-700 font-body p-8">
        <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-xl font-semibold text-gray-800 font-display">Carregando seus produtos...</p>
        <p className="text-gray-600 mt-2">Um instante, estamos organizando tudo para você.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 text-red-800 font-body p-8 rounded-lg shadow-lg m-4">
        <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h3 className="text-2xl font-display text-red-700 mb-3">Opa! Algo deu errado.</h3>
        <p className="text-lg text-red-600 text-center max-w-md">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen font-body">
      <h2 className="text-4xl md:text-5xl font-display text-gray-900 mb-8 text-center leading-tight">
        Seus <span className="text-blue-600">Produtos</span>
      </h2>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto text-center">
        Gerencie seus produtos, adicione novos ou edite os existentes com facilidade. Mantenha seu catálogo sempre atualizado.
      </p>
      <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <Link
          to="/admin"
          className="
            inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm
            text-base font-semibold text-gray-700 bg-white
            hover:bg-gray-100 transition-colors duration-200
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar ao Painel
        </Link>
        <button
          onClick={handleAddClick}
          className="
            inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-md
            text-base font-semibold text-white bg-blue-600
            hover:bg-blue-700 transition-colors duration-200
            transform hover:scale-105 active:scale-95
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar Novo Produto
        </button>
      </div>
      {isFormOpen && (
        <Modal title={editingProduct ? "Editar Produto" : "Criar Novo Produto"} onClose={handleFormClose}>
          <ProductForm
            product={editingProduct}
            onClose={handleFormClose}
            token={token}
          />
        </Modal>
      )}
      {products.length === 0 && !isFormOpen ? (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center mt-12 max-w-3xl mx-auto">
          <p className="text-2xl font-display text-gray-800 mb-4">Parece um deserto por aqui...</p>
          <p className="text-lg text-gray-600">Que tal começar a preencher sua loja? Clique em "Adicionar Novo Produto" para dar vida ao seu catálogo!</p>
          <button
            onClick={handleAddClick}
            className="mt-6 inline-flex items-center px-8 py-3 border border-transparent rounded-lg shadow-md
              text-lg font-semibold text-white bg-pink-500
              hover:bg-pink-600 transition-colors duration-200
              transform hover:scale-105 active:scale-95"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar Produto Agora!
          </button>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-xl rounded-xl border border-gray-100 max-w-5xl mx-auto mt-8">
          <div className="overflow-x-auto"> 
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Imagem</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id ? product._id.substring(0, 8) + '...' : 'N/A'}</td>
                    <td className="px-6 py-4">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="h-14 w-14 object-cover rounded-md shadow-sm" />
                      ) : (
                        <div className="h-14 w-14 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">Sem Imagem</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">R$ {product.price ? product.price.toFixed(2).replace('.', ',') : '0,00'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="
                          text-blue-600 hover:text-blue-800 transition-colors duration-150 mr-4
                          inline-flex items-center group
                        "
                        title="Editar Produto"
                      >
                        <IconEdit className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="
                          text-red-600 hover:text-red-800 transition-colors duration-150
                          inline-flex items-center group
                        "
                        title="Excluir Produto"
                      >
                        <IconDelete className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" />
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    
    </div>
  );
}

export default AdminProductListPage;