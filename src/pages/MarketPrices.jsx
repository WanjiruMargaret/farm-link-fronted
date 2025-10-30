import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';

const MarketPrices = () => {
  const [selectedCategory, setSelectedCategory] = useState('crops');
  
  const priceData = {
    crops: [
      { name: 'Maize', currentPrice: 45, lastWeek: 42, market: 'Nairobi', trend: 'up', demand: 'high' },
      { name: 'Beans', currentPrice: 120, lastWeek: 125, market: 'Nakuru', trend: 'down', demand: 'medium' },
      { name: 'Tomatoes', currentPrice: 60, lastWeek: 55, market: 'Meru', trend: 'up', demand: 'high' },
      { name: 'Onions', currentPrice: 50, lastWeek: 48, market: 'Nairobi', trend: 'up', demand: 'medium' },
      { name: 'Potatoes', currentPrice: 35, lastWeek: 38, market: 'Nyandarua', trend: 'down', demand: 'low' },
      { name: 'Cabbage', currentPrice: 30, lastWeek: 32, market: 'Kiambu', trend: 'down', demand: 'medium' }
    ],
    livestock: [
      { name: 'Dairy Cow', currentPrice: 85000, lastWeek: 82000, market: 'Nakuru', trend: 'up', demand: 'high' },
      { name: 'Goat', currentPrice: 7500, lastWeek: 7200, market: 'Machakos', trend: 'up', demand: 'high' },
      { name: 'Chicken', currentPrice: 800, lastWeek: 750, market: 'Kiambu', trend: 'up', demand: 'medium' },
      { name: 'Sheep', currentPrice: 8500, lastWeek: 8800, market: 'Laikipia', trend: 'down', demand: 'low' }
    ]
  };

  const marketInsights = [
    { title: 'Maize Prices Rising', description: 'Due to increased export demand', impact: 'positive' },
    { title: 'Tomato Season Peak', description: 'Best time to sell - high demand', impact: 'positive' },
    { title: 'Potato Oversupply', description: 'Consider storage or processing', impact: 'negative' },
    { title: 'Dairy Demand Strong', description: 'Urban consumption increasing', impact: 'positive' }
  ];

  const bestMarkets = [
    { product: 'Maize', market: 'Nairobi', price: 'KES 45/kg', reason: 'Highest demand' },
    { product: 'Tomatoes', market: 'Meru', price: 'KES 60/kg', reason: 'Premium quality' },
    { product: 'Dairy Cow', market: 'Nakuru', price: 'KES 85,000', reason: 'Dairy hub' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market Prices & Insights</h1>
          <Navbar />
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Category Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-6">
          <button
            onClick={() => setSelectedCategory('crops')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
              selectedCategory === 'crops' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Crops
          </button>
          <button
            onClick={() => setSelectedCategory('livestock')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
              selectedCategory === 'livestock' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Livestock
          </button>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Current Market Prices</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Product</th>
                    <th className="text-left py-3">Current Price</th>
                    <th className="text-left py-3">Last Week</th>
                    <th className="text-left py-3">Trend</th>
                    <th className="text-left py-3">Market</th>
                    <th className="text-left py-3">Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData[selectedCategory].map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 font-medium">{item.name}</td>
                      <td className="py-4 font-bold text-green-600">
                        KES {item.currentPrice.toLocaleString()}
                        {selectedCategory === 'crops' ? '/kg' : ''}
                      </td>
                      <td className="py-4 text-gray-600">
                        KES {item.lastWeek.toLocaleString()}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                          )}
                          <span className={item.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                            {Math.abs(((item.currentPrice - item.lastWeek) / item.lastWeek * 100)).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          {item.market}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.demand === 'high' ? 'bg-green-100 text-green-800' :
                          item.demand === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.demand}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Market Insights</h3>
            <div className="space-y-4">
              {marketInsights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      insight.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Markets */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Best Markets to Sell</h3>
            <div className="space-y-4">
              {bestMarkets.map((market, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{market.product}</h4>
                      <p className="text-sm text-gray-600">{market.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{market.price}</p>
                      <p className="text-sm text-gray-600">{market.market}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;