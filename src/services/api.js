const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



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
      throw new Error(data.message || `Erro na requisição: ${response.status}`);
    }

    return data; 
  } catch (error) {
    console.error(`Erro na requisição para ${endpoint}:`, error);
    throw error;
  }
};

const productApi = {
  getProducts: async (token = null) => {
    return request('/products', { token });
  },
  getProductById: async (id, token = null) => {
    return request(`/products/${id}`, { token });
  },
  createProduct: async (productData, token) => {
    if (!token) throw new Error('Token de autenticação necessário para criar produto.');
    return request('/products', { method: 'POST', body: productData, token });
  },
  updateProduct: async (id, productData, token) => {
    if (!token) throw new Error('Token de autenticação necessário para atualizar produto.');
    return request(`/products/${id}`, { method: 'PUT', body: productData, token });
  },
  deleteProduct: async (id, token) => {
    if (!token) throw new Error('Token de autenticação necessário para deletar produto.');
    return request(`/products/${id}`, { method: 'DELETE', token });
  },
};

const authApi = {
  register: async (userData) => {
    return request('/auth/register', { method: 'POST', body: userData });
  },
  login: async (credentials) => {
    return request('/auth/login', { method: 'POST', body: credentials });
  },
  updateUserProfile: async (userId, profileData, token) => {
    if (!token) throw new Error('Token de autenticação necessário para atualizar o perfil.');
    return request(`/users/${userId}`, { method: 'PUT', body: profileData, token });
  },
  changeUserPassword: async (userId, passwordData, token) => {
    if (!token) throw new Error('Token de autenticação necessário para alterar a senha.');
    return request(`/users/${userId}/change-password`, { method: 'PUT', body: passwordData, token });
  },
};

export { productApi, authApi }; 