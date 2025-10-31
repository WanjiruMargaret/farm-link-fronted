const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherAPI {
  async getCurrentWeather(location) {
    try {
      if (!WEATHER_API_KEY) {
        throw new Error('Weather API key not configured');
      }

      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Weather API request failed');
      }

      const data = await response.json();
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        location: `${data.name}, ${data.sys.country}`
      };
    } catch (error) {
      console.error('Weather API error:', error);
      // Return mock data as fallback
      return {
        temperature: 24,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        location: location
      };
    }
  }

  async getForecast(location, days = 5) {
    try {
      if (!WEATHER_API_KEY) {
        throw new Error('Weather API key not configured');
      }

      const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Forecast API request failed');
      }

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

      return dailyForecasts;
    } catch (error) {
      console.error('Forecast API error:', error);
      // Return mock forecast as fallback
      return [
        { day: 'Today', high: 26, low: 18, condition: 'Sunny' },
        { day: 'Tomorrow', high: 28, low: 20, condition: 'Partly Cloudy' },
        { day: 'Wed', high: 25, low: 17, condition: 'Rainy' }
      ];
    }
  }
}

export default new WeatherAPI();