import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, BarChart3, Users, FileText, TrendingUp, Cloud, ShoppingBag, Stethoscope, User, DollarSign } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { to: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { to: "/ai-diagnosis", icon: Stethoscope, label: "Diseases" },
    { to: "/community", icon: Users, label: "Community" },
    { to: "/records", icon: FileText, label: "Records" },
    { to: "/market-prices", icon: TrendingUp, label: "Market" },

    { to: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
    { to: "/finance", icon: DollarSign, label: "Finance" },
    { to: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        className="text-white focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-800">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Brand */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">FarmLink 360</h3>
              <p className="text-sm text-gray-500">Smart Farm Companion</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
