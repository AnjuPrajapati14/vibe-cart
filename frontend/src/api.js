import axios from 'axios';

const BASE = (import.meta.env.VITE_API_URL) || 'http://localhost:5000';

const api = {
  async getProducts() {
    const r = await axios.get(BASE + '/api/products');
    return r.data;
  },
  async addToCart(productId, qty = 1) {
    const r = await axios.post(BASE + '/api/cart', { productId, qty });
    return r.data;
  },
  async getCart() {
    const r = await axios.get(BASE + '/api/cart');
    return r.data;
  },
  async removeCartItem(id) {
    const r = await axios.delete(BASE + '/api/cart/' + id);
    return r.data;
  },
  async updateCartItem(id, qty) {
    const r = await axios.post(BASE + '/api/cart/' + id, { qty });
    return r.data;
  },
  async checkout({ name, email }) {
    const r = await axios.post(BASE + '/api/checkout', { name, email });
    return r.data;
  }
};

export default api;
