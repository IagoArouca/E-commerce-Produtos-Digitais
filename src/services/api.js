// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:3000/api'; // Sua URL base da API

// Função auxiliar para fazer requisições
const request = async (endpoint, { method = 'GET', body = null, token = null } = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Se a resposta não for OK, lança um erro com a mensagem do backend
      throw new Error(data.message || `Erro na requisição: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Erro na requisição para ${endpoint}:`, error);
    // Relança o erro para que o componente que chamou possa tratá-lo
    throw error; 
  }
};

// --- Funções Específicas para Produtos ---
const productApi = {
  // Obter todos os produtos (pode ser pública ou precisar de token dependendo da rota no backend)
  getProducts: async (token = null) => {
    return request('/products', { token });
  },

  // Obter um produto por ID
  getProductById: async (id, token = null) => {
    return request(`/products/${id}`, { token });
  },

  // Criar um novo produto (requer admin token)
  createProduct: async (productData, token) => {
    if (!token) throw new Error('Token de autenticação necessário para criar produto.');
    return request('/products', { method: 'POST', body: productData, token });
  },

  // Atualizar um produto existente (requer admin token)
  updateProduct: async (id, productData, token) => {
    if (!token) throw new Error('Token de autenticação necessário para atualizar produto.');
    return request(`/products/${id}`, { method: 'PUT', body: productData, token });
  },

  // Deletar um produto (requer admin token)
  deleteProduct: async (id, token) => {
    if (!token) throw new Error('Token de autenticação necessário para deletar produto.');
    return request(`/products/${id}`, { method: 'DELETE', token });
  },
};

// --- Funções Específicas para Autenticação (opcionalmente pode ser movido aqui) ---
const authApi = {
    register: async (userData) => {
        return request('/auth/register', { method: 'POST', body: userData });
    },
    login: async (credentials) => {
        return request('/auth/login', { method: 'POST', body: credentials });
    },
    // ... outras chamadas de auth se houver
};

export { productApi, authApi }; // Exporta os "serviços"