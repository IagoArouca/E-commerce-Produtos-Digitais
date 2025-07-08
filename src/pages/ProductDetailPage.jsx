import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi } from '../services/api'; // Importar a API de produtos
import { useAuth } from '../context/AuthContext'; // Para verificar se o usuário está logado e talvez adicionar ao carrinho

function ProductDetailPage(onAddToCart) {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await productApi.getProductById(productId);
                setProduct(data);
            } catch (err) {
                console.error("Erro ao buscar detalhes do produto:", err);
                setError(err.message || "Não foi possível carregar os detalhes do produto.");
            } finally {
                setLoading(false);
            }
        };

        if(productId) {
            fetchProduct();
        }
    }, [productId]);

    if(loading) {
        return (
            <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-xl text-gray-700">Carregando detalhes do produto...</p>
            </div>
        );
    }

    if(error) {
        return (
            <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-xl text-red-600">Erro: {error}</p>
                <Link to="/" className="ml-4 text-blue-600 hover:underline">Voltar para a lista de produtos</Link>
            </div>
        );
    }

    if (!product) {
        return (
             <div className="container mx-auto p-8 text-center min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-xl text-gray-700">Produto não encontrado.</p>
                <Link to="/" className="ml-4 text-blue-600 hover:underline">Voltar para a lista de produtos</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        {/* Imagem do Produto */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-w-full h-auto rounded-lg shadow-md object-contain max-h-[500px]" 
          />
        </div>

        {/* Detalhes do Produto */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>
            <p className="text-5xl font-bold text-blue-600 mb-6">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
            
            {/* Informações adicionais (ex: categoria, estoque) */}
            <div className="mb-6 text-gray-600">
              <p><span className="font-semibold">Categoria:</span> {product.category || 'Não especificada'}</p>
              <p><span className="font-semibold">Disponibilidade:</span> {product.stock > 0 ? 'Em estoque' : 'Esgotado'}</p>
            </div>
          </div>

          {/* Botão Adicionar ao Carrinho */}
          <div className="mt-8">
            <button
              onClick={() => onAddToCart(product)} // Chama a função onAddToCart passada via prop
              className={`w-full py-4 px-6 rounded-lg text-xl font-bold transition-colors duration-300 
                ${isLoggedIn && product.stock > 0 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
              disabled={!isLoggedIn || product.stock <= 0}
            >
              {product.stock <= 0 ? 'Esgotado' : (isLoggedIn ? 'Adicionar ao Carrinho' : 'Faça login para comprar')}
            </button>
            {!isLoggedIn && (
              <p className="text-center text-sm text-gray-600 mt-2">
                <Link to="/login" className="text-blue-600 hover:underline">Faça login</Link> para adicionar este item ao carrinho.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Seção de Avaliações/Reviews (futuro) */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Avaliações dos Clientes</h3>
        <p className="text-gray-600">Nenhuma avaliação disponível ainda. Seja o primeiro a avaliar este produto!</p>
        {/* Aqui seria o lugar para renderizar reviews ou um formulário para deixar reviews */}
      </div>

      {/* Link para voltar à lista de produtos */}
      <div className="text-center mt-8">
        <Link to="/" className="text-blue-600 hover:underline text-lg flex items-center justify-center">
          &larr; Voltar para a lista de produtos
        </Link>
      </div>
    </div>
    );
}

export default ProductDetailPage;