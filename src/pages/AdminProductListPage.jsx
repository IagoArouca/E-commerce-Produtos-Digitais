// frontend/src/pages/AdminProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Para obter o token
import { Link } from 'react-router-dom';

function AdminProductListPage() {
  const { token } = useAuth(); // Obtém o token do contexto de autenticação
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar a edição/criação de um produto
  const [editingProduct, setEditingProduct] = useState(null); // null para novo produto, objeto para editar
  const [isFormOpen, setIsFormOpen] = useState(false); // Controla a visibilidade do formulário

  useEffect(() => {
    fetchProducts();
  }, [token]); // Refaz a busca se o token mudar (login/logout)

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Requisita os produtos com o token de autenticação
      const response = await fetch('http://localhost:3000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Erro ao buscar produtos para admin:", err);
      setError("Não foi possível carregar os produtos para administração.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Envia o token para autorização
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Se a exclusão for bem-sucedida, atualiza a lista de produtos
      setProducts(products.filter(product => product._id !== productId));
      alert('Produto deletado com sucesso!');
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      setError("Não foi possível deletar o produto.");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null); // Define como null para indicar novo produto
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null); // Limpa o produto em edição
    fetchProducts(); // Recarrega a lista de produtos após fechar o formulário (para ver as atualizações)
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 text-2xl">
        Carregando produtos para administração...
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
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center my-8 text-gray-800">Gerenciamento de Produtos</h2>
      <div className="flex justify-between items-center mb-6">
        <Link 
          to="/admin" 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Voltar ao Painel Admin
        </Link>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Adicionar Novo Produto
        </button>
      </div>

      {isFormOpen && (
        <ProductForm 
          product={editingProduct} 
          onClose={handleFormClose} 
          token={token} 
        />
      )}

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-xl mt-10">Nenhum produto encontrado. Adicione um!</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProductListPage;