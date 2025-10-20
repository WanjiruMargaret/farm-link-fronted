import { useState } from 'react';
import { Link } from 'react-router-dom';

const CommunityHub = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-600">🌾</span>
            <span className="text-2xl font-bold text-gray-800">
              FarmLink 360
            </span>
          </div>
          <nav className="flex space-x-8">
            <Link to="/marketplace" className="text-gray-600 hover:text-gray-800 font-medium">
              Marketplace
            </Link>
            <Link to="/community" className="text-gray-800 font-semibold border-b-2 border-green-600 pb-1">
              Community
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-800 font-medium">
              Profile
            </Link>
          </nav>
        </div>
        <button className="px-6 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 font-medium">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Community Hub
          </h1>
          
          <p className="text-2xl text-gray-600 mb-10">
            Share your experience<br />
            with other farmers
          </p>

          {/* Search Bar */}
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Search for topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
            <button className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Recent Topics */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Recent Topics
          </h2>
          
          <div className="space-y-6">
            {[
              { title: 'Pest control for tomatoes', author: 'John Doe', replies: 12 },
              { title: 'Crop rotation techniques', author: 'Sarah Lee', replies: 7 },
              { title: 'Irrigation tips for droughts', author: 'Michael Brown', replies: 5 }
            ].map((topic, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600">
                      by {topic.author}
                    </p>
                  </div>
                  <div className="text-right text-gray-500">
                    <span className="font-medium">{topic.replies} replies</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CommunityHub;