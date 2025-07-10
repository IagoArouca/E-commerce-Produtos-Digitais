import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProductDetailPage({ onAddToCart }) {
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

        if (productId) {
            fetchProduct();
        }
    }, [productId]);
    const LoadingState = () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
            <div className="flex items-center space-x-2 text-gray-600">
                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg font-medium">Carregando detalhes do produto...</p>
            </div>
        </div>
    );

    const ErrorState = ({ message }) => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
            <p className="text-lg text-red-700 font-semibold mb-4">Ocorreu um erro: {message}</p>
            <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
            >
                Voltar para a lista de produtos
            </Link>
        </div>
    );

    const NotFoundState = () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
            <p className="text-lg text-gray-700 font-medium mb-4">Produto não encontrado.</p>
            <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
            >
                Voltar para a lista de produtos
            </Link>
        </div>
    );
    // -----------------------------------------------------------------

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (!product) return <NotFoundState />;

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50"> 
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="md:w-1/2 flex justify-center items-center p-4"> 
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-w-full h-auto rounded-lg object-contain max-h-[450px] md:max-h-[500px]" 
                    />
                </div>
                <div className="md:w-1/2 flex flex-col justify-between pt-4 pb-2"> 
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 leading-tight"> 
                            {product.name}
                        </h1>
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-5 md:mb-6">
                            {product.description}
                        </p>
                        <p className="text-4xl md:text-5xl font-bold text-blue-700 mb-5 md:mb-6"> 
                            R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                        
                        <div className="mb-6 text-gray-600 text-sm md:text-base"> 
                            <p className="mb-1"><span className="font-semibold text-gray-700">Categoria:</span> {product.category || 'Não especificada'}</p>
                            <p><span className="font-semibold text-gray-700">Disponibilidade:</span> {product.stock > 0 ? 'Em estoque' : 'Esgotado'}</p>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-8"> 
                        <button
                            onClick={() => onAddToCart(product)}
                            className={`w-full py-3 md:py-4 px-6 rounded-lg text-lg md:text-xl font-bold transition-all duration-300 transform active:scale-98
                                ${isLoggedIn && product.stock > 0
                                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg' 
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                }
                                focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 ` 
                            }
                            disabled={!isLoggedIn || product.stock <= 0}
                        >
                            {product.stock <= 0 ? 'Esgotado' : (isLoggedIn ? 'Adicionar ao Carrinho' : 'Faça login para comprar')}
                        </button>
                        {!isLoggedIn && (
                            <p className="text-center text-xs md:text-sm text-gray-600 mt-2">
                                <Link 
                                    to="/login" 
                                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline"
                                >
                                    Faça login
                                </Link> para adicionar este item ao carrinho.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-10 md:mt-12 bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3"> 
                    Avaliações dos Clientes
                </h3>
                <p className="text-gray-600 text-sm md:text-base">Nenhuma avaliação disponível ainda. Seja o primeiro a avaliar este produto!</p>
                
                
                <div className="mt-6 space-y-4">
                    <textarea
                        placeholder="Escreva sua avaliação aqui..."
                        rows="4"
                        className="
                            w-full p-3 border border-gray-300 rounded-md text-gray-800 text-sm md:text-base
                            focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-200 resize-y
                        "
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Seu nome (opcional)"
                        className="
                            w-full p-3 border border-gray-300 rounded-md text-gray-800 text-sm md:text-base
                            focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-200
                        "
                    />
                    <button
                        className="
                            bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-md shadow-sm
                            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
                        "
                    >
                        Enviar Avaliação
                    </button>
                </div>
                
            </div>
            <div className="text-center mt-8 pb-4">
                <Link 
                    to="/" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 text-base md:text-lg font-medium group focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
                >
                    <svg className="h-5 w-5 mr-2 transform -translate-x-1 group-hover:-translate-x-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Voltar para a loja
                </Link>
            </div>
        </div>
    );
}

export default ProductDetailPage;