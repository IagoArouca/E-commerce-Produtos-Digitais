// frontend/src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

function ProductForm({ product, onClose, token }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Preenche o formulário se um produto for passado (modo edição)
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
      setDescription(product.description || '');
    } else {
      // Limpa o formulário para um novo produto
      setName('');
      setPrice('');
      setImageUrl('');
      setDescription('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const productData = { name, price: parseFloat(price), imageUrl, description };
    const method = product ? 'PUT' : 'POST';
    const url = product ? `http://localhost:3000/api/products/${product._id}` : 'http://localhost:3000/api/products';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Inclui o token
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na operação.');
      }

      alert(`Produto ${product ? 'atualizado' : 'adicionado'} com sucesso!`);
      onClose(); // Fecha o formulário e recarrega a lista
    } catch (err) {
      console.error(`Erro ao ${product ? 'atualizar' : 'adicionar'} produto:`, err);
      setError(err.message || `Erro ao ${product ? 'atualizar' : 'adicionar'} produto. Tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {product ? 'Editar Produto' : 'Adicionar Novo Produto'}
        </h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Preço:</label>
            <input
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">URL da Imagem:</label>
            <input
              type="text"
              id="imageUrl"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
            <textarea
              id="description"
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? 'Salvando...' : (product ? 'Atualizar Produto' : 'Adicionar Produto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;