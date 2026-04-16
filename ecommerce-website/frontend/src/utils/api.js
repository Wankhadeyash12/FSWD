import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  logout: () => API.post('/auth/logout')
};

export const productAPI = {
  getProducts: (params) => API.get('/products', { params }),
  getProduct: (id) => API.get(`/products/${id}`),
  createProduct: (data) => API.post('/products', data),
  updateProduct: (id, data) => API.put(`/products/${id}`, data),
  addReview: (id, data) => API.post(`/products/${id}/reviews`, data)
};

export const cartAPI = {
  getCart: () => API.get('/cart'),
  addToCart: (data) => API.post('/cart/add', data),
  removeFromCart: (productId) => API.delete(`/cart/remove/${productId}`),
  updateQuantity: (productId, data) => API.put(`/cart/update/${productId}`, data),
  clearCart: () => API.delete('/cart/clear')
};

export const orderAPI = {
  createOrder: (data) => API.post('/orders', data),
  getOrders: () => API.get('/orders'),
  getOrder: (id) => API.get(`/orders/${id}`),
  updateOrderStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  cancelOrder: (id) => API.put(`/orders/${id}/cancel`)
};

export const paymentAPI = {
  createPaymentIntent: (data) => API.post('/payment/create-intent', data),
  confirmPayment: (data) => API.post('/payment/confirm', data),
  getPublicKey: () => API.get('/payment/public-key')
};

export default API;
