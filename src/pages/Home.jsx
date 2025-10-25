import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-12 w-full sm:w-auto">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">F</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  FarmLink 360
                </span>
              </Link>
              <nav className="flex flex-wrap justify-center sm:justify-start space-x-8">
                <Link to="/marketplace" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                  Marketplace
                </Link>
                <Link to="/community" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                  Community
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                  Profile
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link to="/marketplace" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Get Started
              </Link>
              <button className="text-gray-600 hover:text-gray-900">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Revolutionize Your
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Farming Business
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
              Connect directly with buyers, access expert knowledge, and grow your agricultural business with our comprehensive digital platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace" className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg">
                Explore Marketplace
              </Link>
              <Link to="/community" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors">
                Join Community
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and services designed specifically for modern farmers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/marketplace" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-700 transition-colors">
                  <span className="text-3xl text-white">🏪</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Digital Marketplace
                </h3>
                <p className="text-gray-600 mb-4">
                  Sell directly to consumers and businesses. No middlemen, better prices, instant payments.
                </p>
                <div className="flex items-center text-green-600 font-medium">
                  Start Selling →
                </div>
              </div>
            </Link>
            
            <Link to="/community" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                  <span className="text-3xl text-white">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Expert Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with agricultural experts, share knowledge, and get answers to your farming questions.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Join Discussion →
                </div>
              </div>
            </Link>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-700 transition-colors">
                  <span className="text-3xl text-white">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Smart Analytics
                </h3>
                <p className="text-gray-600 mb-4">
                  Track your farm's performance, monitor expenses, and optimize your operations with data insights.
                </p>
                <div className="flex items-center text-purple-600 font-medium">
                  View Analytics →
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-700 transition-colors">
                  <span className="text-3xl text-white">🌡️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Weather & Alerts
                </h3>
                <p className="text-gray-600 mb-4">
                  Get real-time weather updates, crop alerts, and farming recommendations based on conditions.
                </p>
                <div className="flex items-center text-orange-600 font-medium">
                  Check Weather →
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-700 transition-colors">
                  <span className="text-3xl text-white">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Disease Detection
                </h3>
                <p className="text-gray-600 mb-4">
                  AI-powered disease identification for crops and livestock. Early detection saves your harvest.
                </p>
                <div className="flex items-center text-teal-600 font-medium">
                  Try Detection →
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                  <span className="text-3xl text-white">💱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Financial Tools
                </h3>
                <p className="text-gray-600 mb-4">
                  Access loans, insurance, and financial planning tools designed specifically for farmers.
                </p>
                <div className="flex items-center text-red-600 font-medium">
                  Explore Finance →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Farmers Across Kenya
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of successful farmers already using FarmLink 360
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">5,000+</div>
              <div className="text-gray-300">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">KSh 50M+</div>
              <div className="text-gray-300">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">15,000+</div>
              <div className="text-gray-300">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">47</div>
              <div className="text-gray-300">Counties Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join FarmLink 360 today and start connecting with buyers, experts, and opportunities.
          </p>
          <Link to="/marketplace" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">F</span>
                </div>
                <span className="text-xl font-bold">FarmLink 360</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with digital tools for modern agriculture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
                <li><button className="hover:text-white">Analytics</button></li>
                <li><button className="hover:text-white">Weather</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white">Help Center</button></li>
                <li><button className="hover:text-white">Contact Us</button></li>
                <li><button className="hover:text-white">Training</button></li>
                <li><button className="hover:text-white">Resources</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white">About Us</button></li>
                <li><button className="hover:text-white">Careers</button></li>
                <li><button className="hover:text-white">Privacy</button></li>
                <li><button className="hover:text-white">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FarmLink 360. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;