<<<<<<< HEAD
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
=======
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, config);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  }

  // Weather - Backend handles external API calls
  async getWeatherData(location) {
    return this.request(`/weather?location=${encodeURIComponent(location)}`);
  }

  async getWeatherForecast(location, days = 7) {
    return this.request(`/weather/forecast?location=${encodeURIComponent(location)}&days=${days}`);
  }

  // AI Diagnosis - Backend handles AI processing
  async submitDiagnosis(formData) {
    return this.request('/diagnosis', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getDiagnosisHistory(userId) {
    return this.request(`/diagnosis/history/${userId}`);
  }

  // Community - Backend handles database operations
  async getPosts(category = 'all', page = 1, limit = 10) {
    const params = new URLSearchParams({ category, page, limit });
    return this.request(`/community/posts?${params}`);
  }

  async createPost(postData) {
    return this.request('/community/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async likePost(postId) {
    return this.request(`/community/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  async addReply(postId, replyData) {
    return this.request(`/community/posts/${postId}/replies`, {
      method: 'POST',
      body: JSON.stringify(replyData),
    });
  }

  // Market Prices - Backend handles price data
  async getMarketPrices() {
    return this.request('/market/prices');
  }

  // Farmer Products - CRUD operations
  async addProduct(formData) {
    return this.request('/farmer/products', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getMyProducts() {
    return this.request('/farmer/products');
  }

  async updateProduct(productId, productData) {
    return this.request(`/farmer/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId) {
    return this.request(`/farmer/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // Marketplace - Browse all products
  async getAllProducts(category = 'all', location = '') {
    const params = new URLSearchParams({ category, location });
    return this.request(`/marketplace/products?${params}`);
  }
}

export default new ApiService();
>>>>>>> 1d2cab2a3ed6cea1893f1f12ded2787c2a1c6849
