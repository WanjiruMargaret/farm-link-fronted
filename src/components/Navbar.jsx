import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            🌾 FarmLink 360
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <Link to="/community" className="hover:text-accent transition-colors">Community</Link>
            <Link to="/profile" className="hover:text-accent transition-colors">Profile</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 hover:text-accent transition-colors">Home</Link>
            <Link to="/community" className="block py-2 hover:text-accent transition-colors">Community</Link>
            <Link to="/profile" className="block py-2 hover:text-accent transition-colors">Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;