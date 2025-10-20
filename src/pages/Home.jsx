import { Link } from 'react-router-dom';

const Home = () => {
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
            <Link to="/marketplace" className="text-gray-600 hover:text-gray-800">
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to FarmLink 360
          </h1>
          <p className="text-xl text-gray-600">
            Your smart digital farm companion for managing crops, livestock, and connecting to markets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🌾</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Disease Diagnosis
            </h3>
            <p className="text-gray-600">
              Upload images to identify plant and livestock diseases
            </p>
          </div>
          
          <Link to="/community" className="block">
            <div className="bg-white p-6 rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow h-full">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Community Hub
              </h3>
              <p className="text-gray-600">
                Connect with farmers and get expert advice
              </p>
            </div>
          </Link>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Farm Records
            </h3>
            <p className="text-gray-600">
              Track income, expenses, and profit/loss
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;