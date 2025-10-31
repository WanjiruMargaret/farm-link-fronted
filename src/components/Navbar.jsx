import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";
import { fetchNotifications } from "../services/notificationService"; // ✅ adjust path if needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Fetch notifications on mount
    async function getNotifications() {
      try {
        const notifications = await fetchNotifications();
        const unread = notifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
    getNotifications();
  }, []);

  return (
    <nav className="relative">
      {/* Mobile menu toggle */}
      <button
        className="text-white focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Links container */}
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
          to="/weather"
          className="text-white hover:text-green-200 transition font-medium w-full md:w-auto"
          onClick={handleLinkClick}
        >
          Weather
        </Link>

        <Link
          to="/profile"
          className="text-white hover:text-green-200 transition font-medium w-full md:w-auto"
          onClick={handleLinkClick}
        >
          Profile
        </Link>

        {/* 🔔 Notifications */}
        <div className="relative w-full md:w-auto">
          <Link
            to="/notifications"
            className="text-white hover:text-green-200 transition font-medium flex items-center"
            onClick={handleLinkClick}
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
