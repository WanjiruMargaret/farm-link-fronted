import { Link } from 'react-router-dom';

const Profile = () => {
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
                <Link to="/marketplace" className="text-gray-600 hover:text-gray-900 font-medium">
                  Marketplace
                </Link>
                <Link to="/community" className="text-gray-600 hover:text-gray-900 font-medium">
                  Community
                </Link>
                <Link to="/profile" className="text-green-600 font-semibold border-b-2 border-green-600 pb-2">
                  Profile
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700">
                Edit Profile
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
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 border-4 border-white/30">
                <img 
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=128&h=128&fit=crop&crop=face" 
                  alt="Michael Brown"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                <span className="text-white text-lg">✓</span>
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Michael Brown
                  </h1>
                  <p className="text-green-100 text-lg mb-2">
                    michael.brown@farmlink360.com
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      🌾 Organic Farmer
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      5 Years Experience
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      ★ 4.8 Rating
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-green-100 text-sm">Products Sold</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-green-100 text-sm">Active Listings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-green-100 text-sm">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Farm Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  🏡 Farm Information
                </h2>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Farm Name</label>
                    <p className="text-lg font-semibold text-gray-900">Green Pastures Farm</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="text-lg font-semibold text-gray-900">📍 Kiambu County, Kenya</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Farm Size</label>
                    <p className="text-lg font-semibold text-gray-900">25 acres</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Primary Crops</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Tomatoes</span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Maize</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Beans</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Farming Method</label>
                    <p className="text-lg font-semibold text-green-600">✓ Organic Certified</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Established</label>
                    <p className="text-lg font-semibold text-gray-900">January 2019</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                📈 Recent Activity
              </h2>
              
              <div className="space-y-4">
                {[
                  { action: 'Listed 50kg Premium Maize', time: '2 hours ago', type: 'listing', icon: '🌽' },
                  { action: 'Answered question about pest control', time: '1 day ago', type: 'community', icon: '💬' },
                  { action: 'Sold 20kg Organic Tomatoes', time: '2 days ago', type: 'sale', icon: '🍅' },
                  { action: 'Updated farm certification', time: '1 week ago', type: 'profile', icon: '📄' },
                  { action: 'Joined Organic Farmers Group', time: '2 weeks ago', type: 'community', icon: '👥' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'sale' ? 'bg-green-100 text-green-800' :
                      activity.type === 'listing' ? 'bg-blue-100 text-blue-800' :
                      activity.type === 'community' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  📞 Contact Info
                </h2>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Edit
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">📞</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">+254 712 345 678</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">📱</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="font-semibold text-gray-900">+254 712 345 678</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">✉️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">michael@farmlink360.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                ✓ Verification Status
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Identity Verified</span>
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Business License</span>
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Organic Certification</span>
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Phone Verified</span>
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                📉 Performance
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Customer Rating</span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '96%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Response Rate</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">On-time Delivery</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            ★ Customer Reviews
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                rating: 5,
                comment: 'Excellent quality tomatoes! Fresh and delivered on time. Will definitely order again.',
                date: '2 weeks ago',
                product: 'Organic Tomatoes'
              },
              {
                name: 'David Mwangi',
                rating: 5,
                comment: 'Best maize in the region. Michael is very professional and reliable.',
                date: '1 month ago',
                product: 'Premium Maize'
              },
              {
                name: 'Grace Wanjiku',
                rating: 4,
                comment: 'Good quality beans. Packaging could be improved but overall satisfied.',
                date: '3 weeks ago',
                product: 'Organic Beans'
              },
              {
                name: 'Peter Kamau',
                rating: 5,
                comment: 'Very knowledgeable farmer. Gave great advice on organic farming methods.',
                date: '1 week ago',
                product: 'Consultation'
              }
            ].map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500">Product: {review.product}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;