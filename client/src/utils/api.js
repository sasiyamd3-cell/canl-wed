import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const updateStock = (id, stock) => API.patch(`/products/${id}/stock`, { stock });
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const bulkSave = (products) => API.post('/products/bulk', products);

export default API;
