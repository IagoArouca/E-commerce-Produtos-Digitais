import React, { useState, useEffect } from 'react';
import { productApi } from '../services/api'; 

function ProductForm({ product, onClose, token }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 
  const [currentImageUrl, setCurrentImageUrl] = useState(''); 

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description || '');
      setCurrentImageUrl(product.imageUrl || ''); 
      setSelectedImage(null); 
    } else {
      setName('');
      setPrice('');
      setDescription('');
      setCurrentImageUrl(''); 
      setSelectedImage(null); 
    }
  }, [product]);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
    if (product) { 
        setCurrentImageUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!product && !selectedImage) {
        setError('Por favor, selecione uma imagem para o novo produto.');
        setLoading(false);
        return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', parseFloat(price)); 
    formData.append('description', description);
    if (selectedImage) {
      formData.append('image', selectedImage); 
    }

    try {
      if (product) {
        await productApi.updateProduct(product._id, formData, token); 
        alert('Produto atualizado com sucesso!');
      } else {
        await productApi.createProduct(formData, token); 
        alert('Produto adicionado com sucesso!');
      }
      onClose(); 
    } catch (err) {
      console.error(`Erro ao ${product ? 'atualizar' : 'adicionar'} produto:`, err);
      setError(err.response?.data?.message || err.message || `Erro ao ${product ? 'atualizar' : 'adicionar'} produto. Tente novamente.`);
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
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
            <textarea
              id="description"
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Imagem do Produto:</label>
            <input
              type="file"
              id="image"
              name="image" 
              accept="image/*" 
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {product && currentImageUrl && !selectedImage && (
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                Imagem atual: <img src={currentImageUrl} alt="Imagem atual do produto" className="h-20 w-20 object-cover rounded-md ml-2 border border-gray-200 shadow-sm" />
              </div>
            )}
            {selectedImage && (
              <div className="mt-2 text-sm text-gray-500">
                Nova imagem selecionada: <span className="font-semibold text-gray-700">{selectedImage.name}</span>
              </div>
            )}
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