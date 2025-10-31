import React, { useState } from 'react';
import { MapPin, Search, Cloud } from 'lucide-react';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';

const Weather = () => {
  const [selectedLocation, setSelectedLocation] = useState('Nairobi, Kenya');
  const [searchLocation, setSearchLocation] = useState('');

  const popularLocations = [
    'Nairobi, Kenya',
    'Eldoret, Kenya', 
    'Meru, Kenya',
    'Nakuru, Kenya',
    'Kisumu, Kenya'
  ];

  const handleLocationSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      setSelectedLocation(searchLocation.trim());
      setSearchLocation('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Farm Weather</h1>
            <p className="text-green-100">Weather insights for farming</p>
          </div>
          <Navbar />
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Location Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Select Location
          </h2>
          
          <form onSubmit={handleLocationSearch} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Enter city or location..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Popular:</span>
            {popularLocations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedLocation === location
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Weather Display */}
        <WeatherCard location={selectedLocation} />

        {/* Farming Tips */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Farming Tips</h3>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-700">
              <strong>Today's Advice:</strong> Monitor your crops for weather changes. 
              Good conditions for most farming activities in {selectedLocation}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;