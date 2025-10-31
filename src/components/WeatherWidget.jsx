import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, MapPin, RefreshCw } from 'lucide-react';
import apiService from '../services/api';

const WeatherWidget = ({ location = 'Nairobi, Kenya', showLocationInput = false }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [locationInput, setLocationInput] = useState('');

  useEffect(() => {
    setCurrentLocation(location);
  }, [location]);

  useEffect(() => {
    loadWeatherData();
  }, [currentLocation]);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      const [currentWeather, forecastData] = await Promise.all([
        apiService.getWeatherData(currentLocation),
        apiService.getWeatherForecast(currentLocation, 5)
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData.forecast || []);
      setError(null);
    } catch (err) {
      console.error('Weather API failed:', err);
      // Fallback to mock data
      setWeather({
        temperature: 24,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        location: currentLocation
      });
      setForecast([
        { day: 'Today', high: 26, low: 18, condition: 'Sunny' },
        { day: 'Tomorrow', high: 28, low: 20, condition: 'Partly Cloudy' },
        { day: 'Wed', high: 25, low: 17, condition: 'Rainy' },
        { day: 'Thu', high: 23, low: 16, condition: 'Cloudy' },
        { day: 'Fri', high: 27, low: 19, condition: 'Sunny' }
      ]);
      setError('Using offline weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    e.preventDefault();
    if (locationInput.trim()) {
      setCurrentLocation(locationInput.trim());
      setLocationInput('');
    }
  };

  const refreshWeather = () => {
    loadWeatherData();
  };

  const getWeatherIcon = (condition) => {
    const iconClass = "w-6 h-6";
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className={`${iconClass} text-blue-500`} />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className={`${iconClass} text-gray-500`} />;
      default:
        return <Cloud className={`${iconClass} text-blue-400`} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Weather</h3>
        <div className="flex items-center space-x-2">
          {error && (
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
              Offline
            </span>
          )}
          <button
            onClick={refreshWeather}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Refresh weather data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {showLocationInput && (
        <form onSubmit={handleLocationChange} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter location..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center"
            >
              <MapPin className="w-3 h-3" />
            </button>
          </div>
        </form>
      )}

      {weather && (
        <>
          {/* Current Weather */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-2xl font-bold text-gray-800">{weather.temperature}°C</p>
                <p className="text-gray-600">{weather.condition}</p>
                <p className="text-sm text-gray-500">{weather.location}</p>
              </div>
              {getWeatherIcon(weather.condition)}
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  {weather.humidity}% Humidity
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {weather.windSpeed} km/h
                </span>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">5-Day Forecast</h4>
            <div className="space-y-2">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    {getWeatherIcon(day.condition)}
                    <span className="text-sm font-medium text-gray-700">
                      {day.day}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-gray-400">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Farming Advice */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Farming Tip:</strong> {getFarmingAdvice(weather)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const getFarmingAdvice = (weather) => {
  const temp = weather.temperature;
  const condition = weather.condition?.toLowerCase() || '';
  const humidity = weather.humidity;
  
  if (temp > 35) {
    return "⚠️ Extreme heat - provide shade for livestock, increase irrigation frequency.";
  } else if (temp > 30) {
    return "🌡️ High temperatures - ensure adequate irrigation and shade for livestock.";
  } else if (temp < 10) {
    return "🥶 Very cold - protect young plants from frost, provide warm shelter for animals.";
  } else if (temp < 15) {
    return "❄️ Cool weather - protect young plants and provide shelter for animals.";
  } else if (condition.includes('rain') || condition.includes('storm')) {
    return "🌧️ Rainy conditions - good for planting but check drainage to prevent waterlogging.";
  } else if (humidity > 85) {
    return "💧 Very high humidity - monitor crops closely for fungal diseases and pests.";
  } else if (humidity > 70) {
    return "🌫️ High humidity - monitor crops for fungal diseases, ensure good air circulation.";
  } else if (temp >= 20 && temp <= 28 && humidity >= 40 && humidity <= 70) {
    return "✅ Excellent weather conditions for most farming activities and crop growth.";
  } else {
    return "🌱 Good weather conditions for farming activities.";
  }
};

export default WeatherWidget;