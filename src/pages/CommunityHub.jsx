import { useState } from 'react';

const CommunityHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topics] = useState([
    { id: 1, title: 'Pest control for tomatoes', author: 'John Doe', replies: 12 },
    { id: 2, title: 'Crop rotation techniques', author: 'Sarah Lee', replies: 7 },
    { id: 3, title: 'Irrigation tips for droughts', author: 'Michael Brown', replies: 5 },
  ]);

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-semibold text-gray-800">FarmLink 360</span>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-800">Marketplace</a>
              <a href="#" className="text-gray-800 font-medium">Community</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Profile</a>
            </nav>
          </div>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Logout
          </button>
        </div>
      </div>

      {/* Community Content */}
      <div className="px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Community Hub</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Share your experience<br />with other farmers
        </p>

        {/* Search Bar */}
        <div className="flex gap-4 mb-12">
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary font-medium text-lg">
            Search
          </button>
        </div>

        {/* Recent Topics */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Topics</h2>
          
          <div className="space-y-4">
            {topics.map(topic => (
              <div key={topic.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.title}</h3>
                    <p className="text-gray-600">by {topic.author}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-medium text-gray-700">{topic.replies} replies</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;