import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('crops');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  // Image mapping for products
  const getProductImage = (productName, category) => {
    const imageMap = {
      crops: {
        'Potatoes': '/images/potatoes.jpeg',
        'Onions': '/images/onions.jpeg',
        'Cabbage': '/images/cabbages.jpeg',
        'Tomatoes': '/images/tomatoes.jpeg',
        'Maize': '/images/maize.jpeg',
        'Beans': '/images/beans.jpeg',
        'Carrots': '/images/carrots.jpeg',
        'Spinach': '/images/spinach.jpeg',
        'Kale (Sukuma)': '/images/kales.jpeg',
        'Sweet Potatoes': '/images/sweetpotatoes.jpeg',
        'Bananas': '/images/bannanas.jpeg',
        'Avocados': '/images/avacados.jpeg'
      },
      livestock: {
        'Dairy Cow (Friesian)': '/images/dairy cow.jpeg',
        'Beef Cattle (Boran)': '/images/beef cow.jpeg',
        'Dairy Goat': '/images/goatjpeg',
        'Sheep (Dorper)': '/images/sheep.jpeg',
        'Chicken (Layers)': '/images/chicken layer.jpeg',
        'Broiler Chicken': '/images/chicken broiler.jpeg',
        'Pig (Large White)': '/images/pig.jpeg',
        'Rabbit': '/images/rabbit.jpeg',
        'Duck': '/images/duck.jpeg',
        'Turkey': '/images/turkey.jpeg'
      }
    };
    return imageMap[category][productName] || '/images/tomatoes.jpeg';
  };

  const marketData = {
    crops: [
      { id: 1, name: 'Potatoes', location: 'Nyandaria', price: 35, unit: 'per kg', seller: 'John Kamau', stock: 500, rating: 4.5 },
      { id: 2, name: 'Onions', location: 'Nairobi', price: 50, unit: 'per kg', seller: 'Mary Wanjiku', stock: 300, rating: 4.8 },
      { id: 3, name: 'Cabbage', location: 'Kiambu', price: 30, unit: 'per kg', seller: 'Peter Mwangi', stock: 200, rating: 4.2 },
      { id: 4, name: 'Tomatoes', location: 'Meru', price: 60, unit: 'per kg', seller: 'Grace Njeri', stock: 150, rating: 4.9 },
      { id: 9, name: 'Maize', location: 'Eldoret', price: 40, unit: 'per kg', seller: 'Samuel Kiptoo', stock: 1000, rating: 4.6 },
      { id: 10, name: 'Beans', location: 'Embu', price: 120, unit: 'per kg', seller: 'Alice Wambui', stock: 80, rating: 4.7 },
      { id: 11, name: 'Carrots', location: 'Nyandarua', price: 45, unit: 'per kg', seller: 'James Maina', stock: 250, rating: 4.3 },
      { id: 12, name: 'Spinach', location: 'Kiambu', price: 25, unit: 'per bunch', seller: 'Rose Njoki', stock: 100, rating: 4.4 },
      { id: 13, name: 'Kale (Sukuma)', location: 'Nairobi', price: 20, unit: 'per bunch', seller: 'Paul Ochieng', stock: 150, rating: 4.5 },
      { id: 14, name: 'Sweet Potatoes', location: 'Busia', price: 55, unit: 'per kg', seller: 'Margaret Akinyi', stock: 400, rating: 4.6 },
      { id: 15, name: 'Bananas', location: 'Kisii', price: 80, unit: 'per bunch', seller: 'David Nyong\'o', stock: 60, rating: 4.8 },
      { id: 16, name: 'Avocados', location: 'Murang\'a', price: 15, unit: 'per piece', seller: 'Lucy Wanjiru', stock: 200, rating: 4.9 }
    ].map(product => ({ ...product, image: getProductImage(product.name, 'crops') })),
    livestock: [
      { id: 5, name: 'Dairy Cow (Friesian)', location: 'Nakuru', price: 85000, unit: 'per animal', seller: 'Samuel Kiprop', stock: 5, rating: 4.7 },
      { id: 6, name: 'Beef Cattle (Boran)', location: 'Kajiado', price: 65000, unit: 'per animal', seller: 'David Maasai', stock: 8, rating: 4.5 },
      { id: 7, name: 'Dairy Goat', location: 'Machakos', price: 7500, unit: 'per animal', seller: 'Agnes Mutua', stock: 12, rating: 4.6 },
      { id: 8, name: 'Sheep (Dorper)', location: 'Laikipia', price: 8500, unit: 'per animal', seller: 'Joseph Kariuki', stock: 15, rating: 4.4 },
      { id: 17, name: 'Chicken (Layers)', location: 'Kiambu', price: 800, unit: 'per bird', seller: 'Faith Wanjiku', stock: 50, rating: 4.8 },
      { id: 18, name: 'Broiler Chicken', location: 'Thika', price: 600, unit: 'per bird', seller: 'Peter Kamau', stock: 100, rating: 4.7 },
      { id: 19, name: 'Pig (Large White)', location: 'Nyeri', price: 15000, unit: 'per animal', seller: 'John Mwangi', stock: 6, rating: 4.5 },
      { id: 20, name: 'Rabbit', location: 'Meru', price: 1200, unit: 'per animal', seller: 'Grace Muthoni', stock: 25, rating: 4.6 },
      { id: 21, name: 'Duck', location: 'Kisumu', price: 1500, unit: 'per bird', seller: 'Michael Otieno', stock: 20, rating: 4.3 },
      { id: 22, name: 'Turkey', location: 'Nandi', price: 2500, unit: 'per bird', seller: 'Sarah Chebet', stock: 10, rating: 4.7 }
    ].map(product => ({ ...product, image: getProductImage(product.name, 'livestock') }))
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = marketData[activeTab].filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FarmLink Marketplace</h1>
          <div className="flex items-center space-x-4">
            <Navbar />
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Stats and Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-green-600">{marketData.crops.length}</div>
              <div className="text-sm text-gray-600">Crop Products</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-600">{marketData.livestock.length}</div>
              <div className="text-sm text-gray-600">Livestock</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-purple-600">{cart.length}</div>
              <div className="text-sm text-gray-600">Cart Items</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-orange-600">{filteredProducts.length}</div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('crops')}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
                activeTab === 'crops'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Crops & Produce ({marketData.crops.length})
            </button>
            <button
              onClick={() => setActiveTab('livestock')}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
                activeTab === 'livestock'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Livestock ({marketData.livestock.length})
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{product.location}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Seller: {product.seller}</p>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Stock: {product.stock} {product.unit.includes('kg') ? 'kg' : product.unit.includes('bunch') ? 'bunches' : 'available'}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">KES {product.price.toLocaleString()}</span>
                      <span className="text-gray-500 ml-1">{product.unit}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;