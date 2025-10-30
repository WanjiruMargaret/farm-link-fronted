import React, { useState, useEffect } from 'react';
import { Search, MapPin, ShoppingCart, Filter, SlidersHorizontal, Heart, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import apiService from '../services/api';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('crops');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useLocalStorage('farmlink-wishlist', []);
  const [toast, setToast] = useState(null);
  const { addToCart, getTotalItems, recentlyAdded } = useCart();

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



  const locations = [...new Set(marketData[activeTab].map(p => p.location))];

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [activeTab]);

  const loadProducts = async () => {
    try {
      const response = await apiService.getAllProducts(activeTab);
      setAllProducts(response.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      setAllProducts(marketData[activeTab] || []);
    } finally {
      setLoading(false);
    }
  };

  const currentProducts = allProducts.length > 0 ? allProducts : marketData[activeTab];
  const filteredProducts = currentProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesLocation = !selectedLocation || product.location === selectedLocation;
      return matchesSearch && matchesPrice && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        setToast({ message: 'Removed from wishlist', type: 'success' });
        return prev.filter(item => item.id !== product.id);
      } else {
        setToast({ message: 'Added to wishlist', type: 'success' });
        return [...prev, product];
      }
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ message: `${product.name} added to cart!`, type: 'success' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FarmLink Marketplace</h1>
          <div className="flex items-center space-x-4">
            <Navbar />
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 hover:text-green-200 transition" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, sellers, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setPriceRange([0, 100000]);
                      setSelectedLocation('');
                      setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
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
              <div className="text-2xl font-bold text-purple-600">{getTotalItems()}</div>
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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const isInWishlist = wishlist.find(item => item.id === product.id);
            const isRecentlyAdded = recentlyAdded?.id === product.id;
            
            return (
              <div key={product.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${isRecentlyAdded ? 'ring-2 ring-green-500' : ''}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                  </button>
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Low Stock
                    </div>
                  )}
                  {product.price < 1000 && (
                    <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Great Deal
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{product.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Seller: {product.seller}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                    <span className="text-sm text-gray-500 ml-2">• {Math.floor(Math.random() * 50) + 10} reviews</span>
                  </div>

                  {/* Stock and Delivery */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${
                        product.stock === 0 ? 'text-red-500' : 
                        product.stock < 10 ? 'text-orange-500' : 'text-green-500'
                      }`}>
                        {product.stock === 0 ? 'Out of Stock' : 
                         product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Truck className="w-3 h-3 mr-1" />
                        <span>2-day delivery</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-green-600">KES {product.price.toLocaleString()}</span>
                        <span className="text-gray-500 ml-1">{product.unit}</span>
                        {product.price > 50000 && (
                          <div className="text-xs text-green-600">Free shipping</div>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{product.stock === 0 ? 'Unavailable' : 'Add to Cart'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 100000]);
                setSelectedLocation('');
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Marketplace;