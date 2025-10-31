import React from 'react';
import Navbar from '../components/Navbar';

const CommunityHub = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Community Hub</h1>
          <Navbar />
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Community Features Coming Soon</h2>
          <p className="text-gray-600">Connect with other farmers, share experiences, and learn together.</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;