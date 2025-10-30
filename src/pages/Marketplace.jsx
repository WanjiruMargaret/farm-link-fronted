import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, ShoppingCart, SlidersHorizontal, Heart, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { fetchCrops, fetchLivestock } from '../services/marketService';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('crops');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [fetchedCropsData, setFetchedCropsData] = useState([]);
  const [fetchedLivestockData, setFetchedLivestockData] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [loadingLivestock, setLoadingLivestock] = useState(false);
  const [error, setError] = useState(null);

  const [wishlist, setWishlist] = useLocalStorage('farmlink-wishlist', []);
  const [toast, setToast] = useState(null);

  const { addToCart, getTotalItems, recentlyAdded } = useCart();

  // --- IMAGE MAPPING ---
  const getProductImage = (name, category) => {
    const images = {
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
        'Avocados': '/images/avacados.jpeg',
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
        'Turkey': '/images/turkey.jpeg',
      },
    };
    return images[category]?.[name] || '/images/default.jpeg';
  };

  // --- MARKET DATA ---
  const marketData = {
    crops: fetchedCropsData.map(p => ({ ...p, image: getProductImage(p.name, 'crops') })),
    livestock: fetchedLivestockData.map(p => ({ ...p, image: getProductImage(p.name, 'livestock') })),
  };

  // --- FETCHING FUNCTIONS ---
  const loadCrops = async () => {
    setLoadingCrops(true);
    try {
      const data = await fetchCrops();
      setFetchedCropsData(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch crops.");
    } finally {
      setLoadingCrops(false);
    }
  };

  const loadLivestock = async () => {
    if (fetchedLivestockData.length > 0) return;
    setLoadingLivestock(true);
    try {
      const data = await fetchLivestock();
      setFetchedLivestockData(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch livestock.");
    } finally {
      setLoadingLivestock(false);
    }
  };

  // --- INITIAL LOAD ---
  useEffect(() => {
    loadCrops();
  }, []);

  useEffect(() => {
    if (activeTab === 'livestock') loadLivestock();
  }, [activeTab]);

  // --- FILTER & SORT ---
  const currentProducts = marketData[activeTab] || [];
  const filteredAndSortedProducts = useMemo(() => {
    return currentProducts
      .filter(p => {
        const matchesSearch =
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.seller?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesLocation = !selectedLocation || p.location === selectedLocation;
        return matchesSearch && matchesPrice && matchesLocation;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low': return a.price - b.price;
          case 'price-high': return b.price - a.price;
          case 'rating': return (b.rating || 0) - (a.rating || 0);
          case 'name': return a.name?.localeCompare(b.name || '') || 0;
          default: return 0;
        }
      });
  }, [currentProducts, searchTerm, priceRange, selectedLocation, sortBy]);

  const locations = useMemo(() => [...new Set(currentProducts.map(p => p.location).filter(Boolean))], [currentProducts]);

  // --- ACTION HANDLERS ---
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

  const isTabLoading = (activeTab === 'crops' ? loadingCrops : loadingLivestock) && currentProducts.length === 0;

  if (error && currentProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

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

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, sellers, or locations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
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
                    onChange={e => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
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

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('crops')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
              activeTab === 'crops' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Crops ({marketData.crops.length})
          </button>
          <button
            onClick={() => setActiveTab('livestock')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition ${
              activeTab === 'livestock' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Livestock ({marketData.livestock.length})
          </button>
        </div>

        {/* Products */}
        {isTabLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-gray-500">Loading {activeTab}...</p>
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map(product => {
              const isInWishlist = wishlist.find(item => item.id === product.id);
              const isRecentlyAdded = recentlyAdded?.id === product.id;
              return (
                <div key={product.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${isRecentlyAdded ? 'ring-2 ring-green-500' : ''}`}>
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                    {product.stock < 10 && product.stock > 0 && (
                      <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Low Stock
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" /> {product.location}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Seller: {product.seller || 'FarmLink Verified'}</p>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({product.rating || '4.5'})</span>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`text-sm ${product.stock === 0 ? 'text-red-500' : product.stock < 10 ? 'text-orange-500' : 'text-green-500'}`}>
                        {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Truck className="w-3 h-3 mr-1" /> 2-day delivery
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-green-600">KES {product.price?.toLocaleString() || 'N/A'}</span>
                        <span className="text-gray-500 ml-1">/{product.unit || 'unit'}</span>
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
              );
            })}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Marketplace;
