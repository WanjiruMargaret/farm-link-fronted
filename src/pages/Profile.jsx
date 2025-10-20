import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-600">🌾</span>
            <span className="text-2xl font-bold text-gray-800">
              FarmLink 360
            </span>
          </div>
          <nav className="flex space-x-8">
            <Link to="/marketplace" className="text-gray-600 hover:text-gray-800 font-medium">
              Marketplace
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-gray-800 font-medium">
              Community
            </Link>
            <Link to="/profile" className="text-gray-800 font-semibold border-b-2 border-green-600 pb-1">
              Profile
            </Link>
          </nav>
        </div>
        <button className="px-6 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 font-medium">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-12">
          Profile
        </h1>

        {/* Profile Info */}
        <div className="flex items-center mb-12 space-x-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=128&h=128&fit=crop&crop=face" 
              alt="Michael Brown"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Michael Brown
            </h2>
            <p className="text-xl text-gray-600">
              michael.brown@example.com
            </p>
          </div>
        </div>

        {/* Farm Details */}
        <section>
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Farm Details
          </h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            {/* Farm Details Rows */}
            <div className="flex justify-between items-center py-6 border-b border-gray-200">
              <span className="text-xl font-semibold text-gray-900">
                Farm Name
              </span>
              <span className="text-xl text-gray-600">
                Green Pastures
              </span>
            </div>
            
            <div className="flex justify-between items-center py-6 mb-8">
              <span className="text-xl font-semibold text-gray-900">
                Location
              </span>
              <span className="text-xl text-gray-600">
                Nairobi, Kenya
              </span>
            </div>
            
            {/* Edit Profile Button */}
            <div className="flex justify-end">
              <button className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors text-lg">
                Edit Profile
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;