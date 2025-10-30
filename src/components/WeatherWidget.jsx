import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import apiService from '../services/api';

const WeatherWidget = ({ location = 'Nairobi, Kenya' }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeatherData();
  }, [location]);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      const [currentWeather, forecastData] = await Promise.all([
        apiService.getWeatherData(location),
        apiService.getWeatherForecast(location, 5)
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
        location: location
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
        {error && (
          <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
            Offline
          </span>
        )}
      </div>

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
  if (weather.temperature > 30) {
    return "High temperatures - ensure adequate irrigation and shade for livestock.";
  } else if (weather.temperature < 15) {
    return "Cool weather - protect young plants and provide shelter for animals.";
  } else if (weather.condition?.toLowerCase().includes('rain')) {
    return "Rainy conditions - good for planting but check for waterlogging.";
  } else if (weather.humidity > 80) {
    return "High humidity - monitor crops for fungal diseases.";
  } else {
    return "Good weather conditions for most farming activities.";
  }
};

export default WeatherWidget;