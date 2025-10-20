import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-semibold text-gray-800">FarmLink 360</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/marketplace" 
                className={`${isActive('/marketplace') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Marketplace
              </Link>
              <Link 
                to="/community" 
                className={`${isActive('/community') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Community
              </Link>
              <Link 
                to="/profile" 
                className={`${isActive('/profile') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              Logout
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-2xl text-gray-600">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link to="/marketplace" className="block py-2 text-gray-600 hover:text-gray-800">Marketplace</Link>
            <Link to="/community" className="block py-2 text-gray-600 hover:text-gray-800">Community</Link>
            <Link to="/profile" className="block py-2 text-gray-600 hover:text-gray-800">Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;