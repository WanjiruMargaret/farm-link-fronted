import { Link } from 'react-router-dom';

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-green-700">🌾</span>
            <span className="text-xl font-bold text-gray-800">
              FarmLink 360
            </span>
          </div>
          <nav className="flex space-x-6">
            <Link to="/marketplace" className="text-gray-800 font-medium">
              Marketplace
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-gray-800">
              Community
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-800">
              Profile
            </Link>
          </nav>
        </div>
        <button className="px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with buyers and sell your farm products
        </p>
        
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-600">
            The marketplace feature is under development
          </p>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;