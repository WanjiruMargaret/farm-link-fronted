import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import weatherApi from '../services/weatherApi';

const WeatherCard = ({ location = 'Nairobi, Kenya' }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeatherData();
  }, [location]);

  const loadWeatherData = async () => {
    setLoading(true);
    try {
      const [currentWeather, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(location),
        weatherApi.getForecast(location, 3)
      ]);
      setWeather(currentWeather);
      setForecast(forecastData);
    } catch (error) {
      console.error('Failed to load weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition, size = 'w-8 h-8') => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'cloudy':
        return <Cloud className={`${size} text-gray-500`} />;
      default:
        return <Cloud className={`${size} text-gray-500`} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weather</h3>
      
      {weather && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
            <p className="text-gray-600">{weather.condition}</p>
            <p className="text-sm text-gray-500">{weather.location}</p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Droplets className="w-4 h-4 text-blue-500 mr-2" />
          <span className="text-sm text-gray-600">{weather?.humidity}% Humidity</span>
        </div>
        <div className="flex items-center">
          <Wind className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{weather?.windSpeed} km/h</span>
        </div>
      </div>
      
      {forecast.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">3-Day Forecast</h4>
          <div className="space-y-2">
            {forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(day.condition)}
                  <span className="text-sm font-medium text-gray-700">{day.day}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium">{day.high}°</span>
                  <span className="text-gray-400">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;