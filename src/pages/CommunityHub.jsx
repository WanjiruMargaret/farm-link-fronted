// src/pages/CommunityHub.jsx (UPDATED)

import React, { useState, useEffect, useCallback } from 'react'; // Added useEffect and useCallback
import { Search, Plus, MessageCircle, ThumbsUp, Clock, User, X, Loader2 } from 'lucide-react'; // Added Loader2 for loading states
import Navbar from '../components/Navbar';
// 🔑 IMPORT THE SERVICE FUNCTIONS
import { fetchPosts, createPost } from "../services/communityService"; 

const CommunityHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState('');
  
  // 🔑 STATE FOR API-FETCHED DATA AND LOADING
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For initial data fetch
  const [isPosting, setIsPosting] = useState(false); // For post creation loading

  // --- DUMMY DATA CLEANUP: Only keep UI-related mock data ---
  // The 'posts' state will now be populated by the API.

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'farming-tips', name: 'Farming Tips' },
    { id: 'pest-control', name: 'Pest Control' },
    { id: 'irrigation', name: 'Irrigation' },
    { id: 'livestock', name: 'Livestock' },
    { id: 'market-info', name: 'Market Info' }
  ];
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'farming-tips' });

  // 🔑 FUNCTION TO FETCH POSTS
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPosts();
      // NOTE: The API data (data) lacks 'replies', 'likes', 'timeAgo' 
      // which were in your mock data. We'll use a placeholder for now 
      // until you implement those features in the backend.
      const postsForUI = data.map(post => ({
        ...post,
        // *** IMPORTANT PLACEHOLDERS: These fields need backend support later ***
        replies: [], 
        likes: 0, 
        timeAgo: `${Math.floor(Math.random() * 24) + 1} hours ago`, // Mock time
        author: post.user_id ? `User ${post.user_id}` : 'Anonymous', // Use user_id for now
        // Assuming you need to look up category based on the post.
        category: categories.find(c => c.id === 'farming-tips') ? 'farming-tips' : 'all' // Default to a category
      }));
      setPosts(postsForUI.reverse()); // Reverse to show latest first
    } catch (error) {
      console.error("Failed to load community posts:", error);
      // Optional: set an error state to show an error message
    } finally {
      setIsLoading(false);
    }
  }, [categories]);

  // 🔑 INITIAL DATA FETCH: useEffect hook
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);


  // 🔑 UPDATED handleNewPost: Uses API call
  const handleNewPost = async (e) => {
    e.preventDefault();
    setIsPosting(true);

    // NOTE: Replace '1' with the actual logged-in user's ID from your auth context!
    const postData = {
      title: newPost.title,
      content: newPost.content,
      user_id: 1, // <<< REPLACE WITH ACTUAL USER ID
    };

    try {
      // 🔑 API CALL: POST new post data
      const newPostResponse = await createPost(postData);

      // Success: Create UI-friendly object and add to state
      const postForUI = {
        ...newPostResponse,
        category: newPost.category, // Use the category selected in the form (frontend-only for now)
        author: 'You', 
        timeAgo: 'Just now',
        replies: [],
        likes: 0,
      };

      setPosts([postForUI, ...posts]); // Add the new post to the top of the list
      setNewPost({ title: '', content: '', category: 'farming-tips' });
      setShowNewPostModal(false);

    } catch (error) {
      alert("Failed to submit post: " + error.message);
    } finally {
      setIsPosting(false);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowReplies(true);
  };

  // NOTE: Reply and Like handlers are kept simple, still using local state 
  // until you implement their backend routes (PATCH/POST to /posts/<id>/reply and /posts/<id>/like).

  const handleAddReply = (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const reply = {
      id: selectedPost.replies.length + 1,
      author: 'You',
      content: newReply,
      timeAgo: 'Just now'
    };

    const updatedPosts = posts.map(post =>
      post.id === selectedPost.id
        ? { ...post, replies: [...post.replies, reply] }
        : post
    );

    setPosts(updatedPosts);
    setSelectedPost({ ...selectedPost, replies: [...selectedPost.replies, reply] });
    setNewReply('');
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    );
    setPosts(updatedPosts);
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return posts.length;
    // NOTE: This count is now based on posts fetched from API, not your original mock list
    return posts.filter(p => p.category === categoryId).length; 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Community Hub</h1>
          <Navbar />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Connect with Fellow Farmers</h2>
          <p className="text-gray-600 text-lg mb-6">
            Share knowledge, ask questions, and learn from the farming community across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              <span>New Discussion</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      activeCategory === category.id
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {getCategoryCount(category.id)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12 flex items-center justify-center space-x-2 text-green-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <p className="text-lg">Loading discussions...</p>
                </div>
              )}
              
              {/* No Posts Found State */}
              {!isLoading && filteredPosts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <p className="text-gray-500 text-lg">
                    {posts.length === 0 
                      ? "There are no discussions yet. Start the first one!"
                      : "No discussions found matching your search criteria."
                    }
                  </p>
                </div>
              )}

              {/* Display Posts */}
              {!isLoading && filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePostClick(post)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{post.author}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(c => c.id === post.category)?.name || 'General'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-green-600 transition">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}</p>
                  
                  <div className="flex items-center space-x-6 text-gray-500">
                    <button 
                      className="flex items-center space-x-2 hover:text-green-600 transition"
                      onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes} likes</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies.length} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Start a New Discussion</h3>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleNewPost} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="What's your question or topic?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Provide more details about your question or share your knowledge..."
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:bg-green-400"
                    disabled={isPosting}
                  >
                    {isPosting ? (
                        <span className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Posting...
                        </span>
                    ) : (
                        'Post Discussion'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostModal(false)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-medium"
                    disabled={isPosting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Post Details Modal (Kept the same for local reply/like handlers) */}
      {showReplies && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h3>
                    <p className="text-gray-600">by {selectedPost.author} • {selectedPost.timeAgo}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReplies(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">{selectedPost.content}</p>
                <div className="flex items-center space-x-6 mt-4 text-gray-500">
                  <button 
                    className="flex items-center space-x-2 hover:text-green-600 transition"
                    onClick={() => handleLike(selectedPost.id)}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{selectedPost.likes} likes</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedPost.replies.length} replies</span>
                  </div>
                </div>
              </div>
              
              <hr className="mb-6" />
              
              {/* Replies */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800">Replies</h4>
                {selectedPost.replies.map(reply => (
                  <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{reply.author}</p>
                        <p className="text-sm text-gray-500">{reply.timeAgo}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-11">{reply.content}</p>
                  </div>
                ))}
                
                {selectedPost.replies.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No replies yet. Be the first to reply!</p>
                )}
              </div>
              
              {/* Add Reply */}
              <form onSubmit={handleAddReply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add your reply</label>
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Share your thoughts or advice..."
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Post Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReplies(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition font-medium"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;