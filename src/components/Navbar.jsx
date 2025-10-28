import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative">
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative left-0 top-0 md:top-auto h-full md:h-auto w-64 md:w-auto 
        bg-green-700 md:bg-transparent md:flex md:items-center z-50 md:z-auto
        transform transition-transform duration-300 ease-in-out md:transition-none
        flex flex-col md:flex-row items-start md:items-center p-6 md:p-0 space-y-4 md:space-y-0 md:space-x-6`}
      >
        <Link
          to="/marketplace"
          className="text-white hover:text-green-200 transition font-medium w-full md:w-auto"
          onClick={handleLinkClick}
        >
          Marketplace
        </Link>

        <Link
          to="/community"
          className="text-white hover:text-green-200 transition font-medium w-full md:w-auto"
          onClick={handleLinkClick}
        >
          Community
        </Link>

        <Link
          to="/records"
          className="text-white hover:text-green-200 transition font-medium w-full md:w-auto"
          onClick={handleLinkClick}
        >
          Records
        </Link>

        <Link
          to="/ai-diagnosis"
          className="text-white hover:text-green-200 transition font-medium w-full md:w-auto"
          onClick={handleLinkClick}
        >
          AI Diagnosis
        </Link>

        <Link
          to="/profile"
          className="text-white hover:text-green-200 transition font-medium w-full md:w-auto"
          onClick={handleLinkClick}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
