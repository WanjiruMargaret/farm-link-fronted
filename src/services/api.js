const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

class ApiService {
  constructor() {
    this.backendAvailable = true;
    this.lastBackendCheck = 0;
    this.backendCheckInterval = 30000; // Check every 30 seconds
  }
  async request(endpoint, options = {}) {
    // Check if backend is available before making request
    const now = Date.now();
    if (!this.backendAvailable && (now - this.lastBackendCheck) < this.backendCheckInterval) {
      throw new Error('Backend not available');
    }

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

    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      
      // Backend is available
      this.backendAvailable = true;
      this.lastBackendCheck = now;
      
      return await response.json();
    } catch (error) {
      // Check if it's a connection error
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        this.backendAvailable = false;
        this.lastBackendCheck = now;
      }
      throw error;
    }
  }

  // Weather with OpenWeatherMap fallback
  async getWeatherData(location) {
    try {
      return await this.request(`/weather?location=${encodeURIComponent(location)}`);
    } catch (error) {
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
            windSpeed: Math.round(data.wind.speed * 3.6),
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

  // Other API methods
  async submitDiagnosis(formData) {
    return this.request('/diagnosis', {
      method: 'POST',
      body: formData,
    });
  }

  async getDiagnosisHistory(userId) {
    return this.request(`/diagnosis/history/${userId}`);
  }

  async getPosts(category = 'all', page = 1, limit = 10) {
    const params = new URLSearchParams({ category, page, limit });
    return this.request(`/posts?${params}`);
  }

  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async getMarketPrices() {
    return this.request('/market/prices');
  }

  async getAllProducts(category = 'all', location = '') {
    const params = new URLSearchParams({ category, location });
    return this.request(`/marketplace/products?${params}`);
  }
}

export default new ApiService();