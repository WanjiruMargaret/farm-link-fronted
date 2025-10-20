import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const CommunityHub = () => {
  const [loading, setLoading] = useState(false);
  const [posts] = useState([
    { id: 1, user: 'John Farmer', content: 'My tomatoes have yellow spots. Any advice?', image: '🍅', time: '2 hours ago' },
    { id: 2, user: 'Mary Agri', content: 'Best fertilizer for maize in rainy season?', image: '🌽', time: '4 hours ago' },
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Community Hub</h1>
        <p className="text-gray-600">Connect with fellow farmers and share knowledge</p>
      </div>

      {/* Post Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Ask the Community</h2>
        <textarea 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4" 
          rows="3" 
          placeholder="Share your farming question or experience..."
        ></textarea>
        <div className="flex justify-between items-center">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            📷 Add Photo
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary">
            Post Question
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {post.user[0]}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{post.user}</h3>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="text-4xl mb-4">{post.image}</div>
              <div className="flex space-x-4 text-sm text-gray-500">
                <button className="hover:text-primary">👍 Like</button>
                <button className="hover:text-primary">💬 Comment</button>
                <button className="hover:text-primary">📤 Share</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityHub;