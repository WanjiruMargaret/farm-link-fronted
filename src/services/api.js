// api.js - Consolidated API Service using the native Fetch API.

// Retrieves the base URL from the environment variable or defaults to localhost.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  /**
   * General-purpose request wrapper using the Fetch API.
   * Automatically includes Authorization token from localStorage ('authToken').
   * @param {string} endpoint - The path appended to the base URL (e.g., '/weather').
   * @param {Object} options - Standard fetch options (method, body, headers, etc.).
   * @returns {Promise<Object>} - The JSON response data.
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // 1. Initialize configuration with default headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // 2. Attach authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 3. Special handling for FormData (e.g., file uploads).
    // The browser must set the 'Content-Type' header boundary for FormData,
    // so we delete the default 'application/json' header.
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    const response = await fetch(url, config);
    
    // 4. Handle HTTP errors
    if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
            // Try to parse a structured error message from the backend
            const errorJson = JSON.parse(errorBody);
            errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch (e) {
            // If response body is not JSON, the status text remains the message
        }
        throw new Error(errorMessage);
    }
    
    // 5. Handle empty responses (like 204 No Content for DELETE)
    if (response.status === 204) {
        return {};
    }
    
    // 6. Return parsed JSON data
    return await response.json();
  }

  // --- APPLICATION SPECIFIC API METHODS ---

  // WEATHER SERVICES
  async getWeatherData(location) {
    return this.request(`/weather?location=${encodeURIComponent(location)}`);
  }

  async getWeatherForecast(location, days = 7) {
    const params = new URLSearchParams({ location, days });
    return this.request(`/weather/forecast?${params.toString()}`);
  }

  // AI DIAGNOSIS SERVICES (Expects FormData for image submission)
  async submitDiagnosis(formData) {
    return this.request('/diagnosis', {
      method: 'POST',
      body: formData,
    });
  }

  async getDiagnosisHistory(userId) {
    return this.request(`/diagnosis/history/${userId}`);
  }

  // COMMUNITY SERVICES
  async getPosts(category = 'all', page = 1, limit = 10) {
    const params = new URLSearchParams({ category, page, limit });
    // 🟢 FIX: Changed '/community/posts' to '/posts' to match Flask backend url_prefix
    return this.request(`/posts?${params.toString()}`);
  }

  async createPost(postData) {
    // 🟢 FIX: Changed '/community/posts' to '/posts' to match Flask backend url_prefix
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async likePost(postId) {
    // 🟢 FIX: Changed '/community/posts' to '/posts'
    return this.request(`/posts/${postId}/like`, {
      method: 'POST', 
    });
  }

  async addReply(postId, replyData) {
    // 🟢 FIX: Changed '/community/posts' to '/posts'
    return this.request(`/posts/${postId}/replies`, {
      method: 'POST',
      body: JSON.stringify(replyData),
    });
  }

  // MARKET DATA SERVICES
  async getMarketPrices() {
    return this.request('/market/prices');
  }

  // FARMER PRODUCT CRUD (addProduct expects FormData)
  async addProduct(formData) {
    return this.request('/farmer/products', {
      method: 'POST',
      body: formData,
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

  // MARKETPLACE BROWSING
  async getAllProducts(category = 'all', location = '') {
    const params = new URLSearchParams({ category, location });
    return this.request(`/marketplace/products?${params.toString()}`);
  }
}

export default new ApiService();