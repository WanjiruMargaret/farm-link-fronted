import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            🌾 FarmLink 360
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <Link to="/community" className="hover:text-accent transition-colors">Community</Link>
            <Link to="/profile" className="hover:text-accent transition-colors">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;