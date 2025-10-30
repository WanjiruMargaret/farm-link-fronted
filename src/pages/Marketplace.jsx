import React, { useState, useEffect } from 'react'; // 👈 1. Import useEffect
import { Search, MapPin, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import { fetchCrops } from '../services/marketService'; // 👈 2. Import the service function

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('crops');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  
  // NEW STATE: To hold data fetched from the API
  const [fetchedCropsData, setFetchedCropsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded data for livestock and image map will remain for now
  // You will replace livestock with a separate API call later.
  
  const getProductImage = (productName, category) => {
    // ... (Your existing getProductImage function remains here)
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
    return imageMap[category]?.[productName] || '/images/default.jpeg'; // Use a default image if not found
  };
  
  // Hardcoded Livestock Data (will remain until we fetch it dynamically too)
  const hardcodedLivestock = [
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
  ].map(product => ({ ...product, image: getProductImage(product.name, 'livestock') }));


  // 🔑 KEY IMPLEMENTATION: useEffect for data fetching
  useEffect(() => {
    async function loadCrops() {
        setLoading(true);
        try {
            // Call the service function to get data from the backend
            const data = await fetchCrops();
            // Store the fetched data in state
            setFetchedCropsData(data.map(product => ({ 
                ...product, 
                // Add the image mapping to the fetched data
                image: getProductImage(product.name, 'crops') 
            })));
            setError(null);
        } catch (err) {
            console.error("Failed to fetch crops:", err);
            setError("Failed to load crops from the server. Check your backend connection.");
        } finally {
            setLoading(false);
        }
    }

    loadCrops();
  }, []); // Empty dependency array means this runs only once on mount

  // Combine fetched crops and hardcoded livestock into one object for display logic
  const marketData = {
    crops: fetchedCropsData, // Use the fetched data here
    livestock: hardcodedLivestock
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Check if marketData[activeTab] is an array before calling filter
  const productsToFilter = Array.isArray(marketData[activeTab]) ? marketData[activeTab] : [];

  const filteredProducts = productsToFilter.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // -------------------------------------------------------------
  // RENDERING LOGIC (The return block)
  // -------------------------------------------------------------

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-xl text-green-600">Loading marketplace listings...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-xl text-red-600">Error: {error}</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... (Your existing Header and Navbar remain here) ... */}
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
        {/* ... (Your existing Search Bar remains here) ... */}
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

        {/* Stats and Tabs - NOTE: We use the *actual* length of fetchedCropsData */}
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
            {/* ... (Remaining Stats remain here) ... */}
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

        {/* Products Grid - This part maps over the filteredProducts as before */}
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

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;