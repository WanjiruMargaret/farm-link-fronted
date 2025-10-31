const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

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

  // Weather - Try backend first, fallback to OpenWeatherMap
  async getWeatherData(location) {
    try {
      return await this.request(`/weather?location=${encodeURIComponent(location)}`);
    } catch (error) {
      // Fallback to direct OpenWeatherMap API
      if (WEATHER_API_KEY) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          return {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            location: `${data.name}, ${data.sys.country}`
          };
        }
      }
      throw error;
    }
  }

  async getWeatherForecast(location, days = 5) {
    try {
      return await this.request(`/weather/forecast?location=${encodeURIComponent(location)}&days=${days}`);
    } catch (error) {
      // Fallback to direct OpenWeatherMap API
      if (WEATHER_API_KEY) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          const dailyForecasts = [];
          const processedDates = new Set();
          
          data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateStr = date.toDateString();
            
            if (!processedDates.has(dateStr) && dailyForecasts.length < days) {
              processedDates.add(dateStr);
              dailyForecasts.push({
                day: dailyForecasts.length === 0 ? 'Today' : 
                     dailyForecasts.length === 1 ? 'Tomorrow' : 
                     date.toLocaleDateString('en', { weekday: 'short' }),
                high: Math.round(item.main.temp_max),
                low: Math.round(item.main.temp_min),
                condition: item.weather[0].main
              });
            }
          });
          
          return { forecast: dailyForecasts };
        }
      }
      throw error;
    }
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
