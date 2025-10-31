import React, { useState } from "react";
import { TrendingUp, Users, ShoppingBag, DollarSign, Target, Globe, Award, BarChart3 } from "lucide-react";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('month');

  const platformStats = {
    totalProducts: 26,
    categories: 6,
    features: 5,
    counties: 47 // potential reach
  };

  const demoTransactions = [
    { id: 1, farmer: 'Demo Farmer 1', product: 'Sample Maize', amount: 'KES 20,000', location: 'Eldoret', status: 'Demo Data' },
    { id: 2, farmer: 'Demo Farmer 2', product: 'Sample Tomatoes', amount: 'KES 12,000', location: 'Meru', status: 'Demo Data' },
    { id: 3, farmer: 'Demo Farmer 3', product: 'Sample Cow', amount: 'KES 85,000', location: 'Nakuru', status: 'Demo Data' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">FarmLink Impact Dashboard</h1>
            <p className="text-green-100">Empowering Farmers Across Kenya</p>
          </div>
          <Navbar />
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Performance Indicators */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Platform Impact</h2>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Products Available</h3>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalProducts}</p>
                  <p className="text-sm text-green-600">Crops & Livestock</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Platform Features</h3>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.features}</p>
                  <p className="text-sm text-blue-600">Core modules</p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Categories</h3>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.categories}</p>
                  <p className="text-sm text-purple-600">Product types</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Potential Reach</h3>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.counties}</p>
                  <p className="text-sm text-orange-600">Counties in Kenya</p>
                </div>
                <Globe className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Overview & Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <WeatherCard location="Nairobi, Kenya" />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Business Model</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="font-medium">Marketplace Commission</span>
                <span className="font-bold text-green-600">5% per transaction</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="font-medium">Premium Features</span>
                <span className="font-bold text-blue-600">Monthly subscription</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="font-medium">AI Diagnosis</span>
                <span className="font-bold text-purple-600">Per scan pricing</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                <span className="font-medium">Data Insights</span>
                <span className="font-bold text-orange-600">B2B partnerships</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Capabilities</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Direct Marketplace</span>
                <span className="font-bold text-green-600">✓ Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">AI Disease Detection</span>
                <span className="font-bold text-blue-600">✓ Ready</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Community Hub</span>
                <span className="font-bold text-purple-600">✓ Live</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Farm Records</span>
                <span className="font-bold text-orange-600">✓ Available</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mobile Responsive</span>
                <span className="font-bold text-green-600">✓ Optimized</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Products Link for Farmers */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Sell Your Products</h3>
              <p className="text-blue-100">List your crops and livestock on our marketplace</p>
            </div>
            <Link 
              to="/my-products" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Manage Products
            </Link>
          </div>
        </div>

        {/* Demo Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sample Marketplace Transactions</h3>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
            <p className="text-yellow-800 text-sm">📋 This is demo data showing how the platform will work</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Farmer</th>
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Location</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoTransactions.map(transaction => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{transaction.farmer}</td>
                    <td className="py-3">{transaction.product}</td>
                    <td className="py-3 font-bold text-green-600">{transaction.amount}</td>
                    <td className="py-3">{transaction.location}</td>
                    <td className="py-3 text-gray-500">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vision & Goals */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6">Our Vision for Kenyan Agriculture</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-3" />
              <h4 className="text-lg font-bold mb-2">Market Opportunity</h4>
              <p className="text-3xl font-bold">KES 2.1T</p>
              <p className="text-sm opacity-90">Kenya's agricultural economy</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-3" />
              <h4 className="text-lg font-bold mb-2">Target Farmers</h4>
              <p className="text-3xl font-bold">5M+</p>
              <p className="text-sm opacity-90">Smallholder farmers in Kenya</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-3" />
              <h4 className="text-lg font-bold mb-2">Goal</h4>
              <p className="text-3xl font-bold">Direct</p>
              <p className="text-sm opacity-90">Farmer-to-market connections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
