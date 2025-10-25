import { useState } from 'react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Premium Maize',
      description: '90kg bag - Grade A Quality',
      price: 'KSh 3,500',
      originalPrice: 'KSh 4,000',
      seller: 'John Doe',
      location: 'Nakuru',
      rating: 4.8,
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop',
      category: 'crops',
      inStock: true,
      verified: true,
      sellerName: 'John Doe',
      phone: '+254 712 345 678',
      deliveryOptions: 'Free delivery within 10km • Pickup available',
      paymentMethods: 'M-Pesa • Cash on Delivery • Bank Transfer'
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      description: 'Per kg - Organic',
      price: 'KSh 120',
      originalPrice: 'KSh 150',
      seller: 'Jane Smith',
      location: 'Kiambu',
      rating: 4.6,
      reviews: 18,
      image: '/images/download (3).jpeg',
      category: 'crops',
      inStock: true,
      verified: true,
      sellerName: 'Jane Smith',
      phone: '+254 723 456 789',
      deliveryOptions: 'Same day delivery • Pickup available',
      paymentMethods: 'M-Pesa • Cash on Delivery'
    },
    {
      id: 3,
      name: 'Holstein Dairy Cow',
      description: '3 years old - High milk yield',
      price: 'KSh 85,000',
      originalPrice: 'KSh 95,000',
      seller: 'Mike Johnson',
      location: 'Meru',
      rating: 4.9,
      reviews: 12,
      image: '/images/download (1).jpeg',
      category: 'livestock',
      inStock: true,
      verified: true,
      sellerName: 'Mike Johnson',
      phone: '+254 734 567 890',
      deliveryOptions: 'Transportation can be arranged',
      paymentMethods: 'Bank Transfer • Cash • Installments available'
    },
    {
      id: 4,
      name: 'Boer Goat',
      description: 'Adult male - Breeding quality',
      price: 'KSh 15,000',
      originalPrice: 'KSh 18,000',
      seller: 'Sarah Wilson',
      location: 'Machakos',
      rating: 4.7,
      reviews: 8,
      image: '/images/download.jpeg',
      category: 'livestock',
      inStock: true,
      verified: true,
      sellerName: 'Sarah Wilson',
      phone: '+254 745 678 901',
      deliveryOptions: 'Pickup only • Can assist with transport',
      paymentMethods: 'M-Pesa • Cash • Bank Transfer'
    },
    {
      id: 5,
      name: 'Organic Fertilizer',
      description: '50kg bag - Compost manure',
      price: 'KSh 800',
      originalPrice: 'KSh 1,000',
      seller: 'Peter Kamau',
      location: 'Thika',
      rating: 4.5,
      reviews: 31,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      category: 'supplies',
      inStock: true,
      verified: true,
      sellerName: 'Peter Kamau',
      phone: '+254 756 789 012',
      deliveryOptions: 'Free delivery above KSh 5,000',
      paymentMethods: 'M-Pesa • Cash on Delivery'
    },
    {
      id: 6,
      name: 'Irrigation Pipes',
      description: '100m roll - HDPE pipes',
      price: 'KSh 12,500',
      originalPrice: 'KSh 15,000',
      seller: 'Grace Muthoni',
      location: 'Nyeri',
      rating: 4.8,
      reviews: 15,
      image: '/images/download (2).jpeg',
      category: 'supplies',
      inStock: true,
      verified: true,
      sellerName: 'Grace Muthoni',
      phone: '+254 767 890 123',
      deliveryOptions: 'Delivery available • Installation service',
      paymentMethods: 'Bank Transfer • M-Pesa • Cash'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSeller = (product) => {
    setSelectedProduct(product);
    setMessage(`Hello John, I'd like to buy 3 bags of ${product.name}. Are they available?`);
  };

  const handleSendMessage = () => {
    alert('Message sent successfully!');
    setSelectedProduct(null);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-12 w-full sm:w-auto">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">F</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  FarmLink 360
                </span>
              </Link>
              <nav className="flex flex-wrap justify-center sm:justify-start space-x-8">
                <Link to="/marketplace" className="text-green-600 font-semibold border-b-2 border-green-600 pb-2">
                  Marketplace
                </Link>
                <Link to="/community" className="text-gray-600 hover:text-gray-900 font-medium">
                  Community
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 font-medium">
                  Profile
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700">
                Sell Product
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Farm Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect directly with farmers and suppliers. Buy fresh produce, livestock, and farming equipment.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search for products, sellers, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Categories</option>
                <option value="crops">Crops & Produce</option>
                <option value="livestock">Livestock</option>
                <option value="supplies">Farm Supplies</option>
              </select>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.verified && (
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ✓ Verified
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm">★</span>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>📍 {product.location}</span>
                  <span className="mx-2">•</span>
                  <span>{product.reviews} reviews</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleContactSeller(product)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Contact Seller Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 flex flex-col lg:flex-row gap-8">
              {/* Product Details */}
              <div className="flex-1">
                <div className="mb-6">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>📍 {selectedProduct.location}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    {selectedProduct.verified && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Verified Seller
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <span className="text-3xl font-bold text-gray-900">{selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-3">{selectedProduct.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      🚚 Delivery Options
                    </h3>
                    <p className="text-gray-700 text-sm">{selectedProduct.deliveryOptions}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      💳 Payment Methods
                    </h3>
                    <p className="text-gray-700 text-sm">{selectedProduct.paymentMethods}</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-96">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Seller</h3>
                  
                  {/* Seller Info */}
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">{selectedProduct.sellerName[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedProduct.sellerName}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{selectedProduct.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="text-gray-900">{selectedProduct.phone}</span>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Call
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        rows="4"
                        placeholder={`Hi ${selectedProduct.sellerName}, I'm interested in your ${selectedProduct.name}. Is it still available?`}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={handleSendMessage}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Send Message
                      </button>
                      
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        WhatsApp
                      </button>
                      
                      <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Save for Later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;