import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageCircle, ThumbsUp, Clock, User, X } from 'lucide-react';
import Navbar from '../components/Navbar';

// --- FIXED: API Service Mock Defined Internally ---
// This mock service simulates network calls for a self-contained environment.
const apiService = {
  // Simulates fetching posts from a backend
  getPosts: () => {
    return new Promise(resolve => {
      // Minimal backend-like structure for the component to map
      const mockBackendPosts = [
        { id: 101, title: 'API Post: Quick Fix for Blossom End Rot', content: 'What are the fastest ways to introduce calcium to my soil without complex fertilizers?', user_id: 1, created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 102, title: 'API Post: Best Time to Harvest Maize', content: 'I need tips on how to know when my maize is fully mature for a premium harvest.', user_id: 2, created_at: new Date(Date.now() - 3600000).toISOString() },
      ];
      setTimeout(() => resolve(mockBackendPosts), 500); // Simulate network delay
    });
  },

  // Simulates creating a new post
  createPost: (postData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newPost = {
          id: Math.floor(Math.random() * 1000) + 200,
          title: postData.title,
          content: postData.content,
          user_id: postData.user_id,
          created_at: new Date().toISOString()
        };
        resolve(newPost);
      }, 300);
    });
  },
  
  // Stubs for future implementation
  addReply: (postId, replyData) => Promise.resolve({ success: true, ...replyData, id: Math.random() }),
  likePost: (postId) => Promise.resolve({ success: true }),
};


const CommunityHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mockPosts] = useState([
    {
      id: 1,
      title: 'Best practices for tomato pest control',
      content: 'I\'ve been dealing with whiteflies on my tomatoes. What organic methods have worked for you? I\'ve tried neem oil but the problem persists.',
      author: 'John Kamau',
      category: 'pest-control',
      replies: [
        { id: 1, author: 'Mary Wanjiku', content: 'Try using yellow sticky traps. They work great for whiteflies!', timeAgo: '1 hour ago' },
        { id: 2, author: 'Peter Mwangi', content: 'Companion planting with marigolds helps repel whiteflies naturally.', timeAgo: '30 minutes ago' }
      ],
      likes: 8,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      title: 'Crop rotation schedule for small farms',
      content: 'Looking for advice on effective crop rotation for a 5-acre farm. Currently growing maize, beans, and vegetables. What should I plant next season?',
      author: 'Sarah Wanjiku',
      category: 'farming-tips',
      replies: [
        { id: 1, author: 'James Maina', content: 'Try legumes after maize to fix nitrogen in the soil.', timeAgo: '2 hours ago' },
        { id: 2, author: 'Grace Njeri', content: 'I rotate maize-beans-vegetables-fallow. Works well for soil health.', timeAgo: '1 hour ago' }
      ],
      likes: 15,
      timeAgo: '5 hours ago'
    },
    {
      id: 3,
      title: 'Water conservation during dry season',
      content: 'With the current drought, what are the best irrigation methods to conserve water while maintaining crop yield? Looking for cost-effective solutions.',
      author: 'Peter Mwangi',
      category: 'irrigation',
      replies: [
        { id: 1, author: 'Samuel Kiprop', content: 'Drip irrigation saves up to 50% water compared to sprinklers.', timeAgo: '4 hours ago' },
        { id: 2, author: 'Alice Wambui', content: 'Mulching helps retain soil moisture significantly.', timeAgo: '3 hours ago' }
      ],
      likes: 12,
      timeAgo: '1 day ago'
    },
    {
      id: 4,
      title: 'Dairy cow feeding tips for better milk production',
      content: 'My cows are producing less milk lately. Any suggestions for improving their diet? Currently feeding them napier grass and dairy meal.',
      author: 'Grace Njeri',
      category: 'livestock',
      replies: [
        { id: 1, author: 'David Maasai', content: 'Add mineral supplements and ensure clean water supply.', timeAgo: '1 day ago' }
      ],
      likes: 6,
      timeAgo: '2 days ago'
    },
    {
      id: 5,
      title: 'Organic fertilizer preparation at home',
      content: 'How do you make compost manure at home? What materials work best and how long does it take?',
      author: 'Rose Njoki',
      category: 'farming-tips',
      replies: [
        { id: 1, author: 'Paul Ochieng', content: 'Kitchen waste + dry leaves + cow dung. Takes 3-4 months to decompose.', timeAgo: '2 hours ago' },
        { id: 2, author: 'Margaret Akinyi', content: 'Turn the pile every 2 weeks for faster decomposition.', timeAgo: '1 hour ago' }
      ],
      likes: 18,
      timeAgo: '3 hours ago'
    },
    {
      id: 6,
      title: 'Chicken diseases and prevention',
      content: 'My chickens have been getting sick frequently. What are common diseases and how can I prevent them?',
      author: 'Faith Wanjiku',
      category: 'livestock',
      replies: [
        { id: 1, author: 'John Mwangi', content: 'Newcastle disease is common. Vaccinate regularly and keep coops clean.', timeAgo: '5 hours ago' },
        { id: 2, author: 'Lucy Wanjiru', content: 'Provide proper ventilation and avoid overcrowding.', timeAgo: '3 hours ago' }
      ],
      likes: 14,
      timeAgo: '6 hours ago'
    },
    {
      id: 7,
      title: 'Market prices for vegetables this season',
      content: 'What are the current market prices for tomatoes, onions, and cabbages in Nairobi? Planning my planting schedule.',
      author: 'Michael Otieno',
      category: 'market-info',
      replies: [
        { id: 1, author: 'Sarah Chebet', content: 'Tomatoes: KES 60/kg, Onions: KES 50/kg, Cabbages: KES 30/kg at Wakulima Market.', timeAgo: '2 hours ago' }
      ],
      likes: 22,
      timeAgo: '4 hours ago'
    },
    {
      id: 8,
      title: 'Greenhouse farming for beginners',
      content: 'Thinking of starting greenhouse farming. What crops are most profitable and what\'s the initial investment?',
      author: 'David Nyong\'o',
      category: 'farming-tips',
      replies: [
        { id: 1, author: 'Agnes Mutua', content: 'Tomatoes and capsicum are very profitable. Initial cost around KES 200,000 for 8x30m.', timeAgo: '1 day ago' },
        { id: 2, author: 'Joseph Kariuki', content: 'Start small with herbs like coriander and parsley. Lower investment, quick returns.', timeAgo: '18 hours ago' }
      ],
      likes: 25,
      timeAgo: '1 day ago'
    }
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'farming-tips' });

  // 1. Initial Load: Use a single useEffect for initial mounting
  useEffect(() => {
    loadPosts();
  }, []); // Empty dependency array means it runs once on mount

  // 2. Category Change: Use a separate useEffect to reload when category changes
  useEffect(() => {
    if (!isLoading) {
      // If we are not loading, re-filter or potentially reload if we had server-side category filtering
      // Since your current backend doesn't support category filtering, we'll rely on client-side filtering below.
      // If you implement server-side filtering, uncomment: loadPosts();
    }
  }, [activeCategory]);


  const loadPosts = async () => {
    try {
      setIsLoading(true);
      
      // 🟢 FIX 1: Expect the API response to be a direct array of posts (response.data is the array)
      const apiResponse = await apiService.getPosts();
      
      // 🟢 FIX 2: Map the raw API data to match the expected frontend structure (adding mock values)
      const mappedPosts = apiResponse.map(post => ({
        ...post,
        // The API provides user_id, but the frontend requires an 'author' string.
        // We'll use a generic name based on user_id until you add a User model relation.
        author: `Farmer User ${post.user_id || 'Unknown'}`,
        // Temporarily default to 'farming-tips' as the API doesn't return a category field yet
        category: 'farming-tips', 
        // Add required fields the UI needs but the API doesn't yet provide
        replies: [], 
        likes: 0, 
        // Use the created_at field for timeAgo (basic implementation)
        timeAgo: post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Just now'
      }));

      setPosts(mappedPosts);
      
    } catch (error) {
      console.error('Failed to load posts from API. Falling back to mock data:', error);
      // Fallback to mock data ONLY if the API call truly failed (e.g., connection error)
      setPosts(mockPosts);
    } finally {
      setIsLoading(false);
    }
  };


  const categories = [
    { id: 'all', name: 'All Topics', count: posts.length },
    { id: 'farming-tips', name: 'Farming Tips', count: posts.filter(p => p.category === 'farming-tips').length },
    { id: 'pest-control', name: 'Pest Control', count: posts.filter(p => p.category === 'pest-control').length },
    { id: 'irrigation', name: 'Irrigation', count: posts.filter(p => p.category === 'irrigation').length },
    { id: 'livestock', name: 'Livestock', count: posts.filter(p => p.category === 'livestock').length },
    { id: 'market-info', name: 'Market Info', count: posts.filter(p => p.category === 'market-info').length }
  ];

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a default user_id available (e.g., from auth context)
      const userId = 1; // ⚠️ Replace with actual authenticated user ID later!

      const payload = {
          title: newPost.title,
          content: newPost.content,
          user_id: userId,
          // category is ignored by the backend POST route for now
      };

      const response = await apiService.createPost(payload);
      
      // Map the response post to the full frontend structure
      const newPostEntry = {
          ...response,
          author: `Farmer User ${response.user_id}`,
          category: newPost.category,
          replies: [],
          likes: 0,
          timeAgo: new Date(response.created_at).toLocaleDateString()
      };

      setPosts([newPostEntry, ...posts]);
      setNewPost({ title: '', content: '', category: 'farming-tips' });
      setShowNewPostModal(false);
    } catch (error) {
      console.error('Failed to create post:', error);
      // Fallback to local state
      const post = {
        id: posts.length + 1,
        ...newPost,
        author: 'You',
        replies: [],
        likes: 0,
        timeAgo: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', category: 'farming-tips' });
      setShowNewPostModal(false);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowReplies(true);
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    
    // ⚠️ NOTE: You currently don't have a backend route for adding replies (e.g., /api/posts/<id>/replies)
    // The following code only updates the local state for now. You'll need to implement
    // the backend route (e.g., 'POST /api/posts/<int:id>/replies') later.
    
    try {
      // Simulate API call for reply
      // const response = await apiService.addReply(selectedPost.id, { content: newReply });
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
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  const handleLike = async (postId) => {
    // ⚠️ NOTE: You currently don't have a backend route for liking posts (e.g., /api/posts/<id>/like)
    // The following code only updates the local state for now. You'll need to implement
    // the backend route (e.g., 'POST /api/posts/<int:id>/like') later.
    
    try {
      // await apiService.likePost(postId);
      const updatedPosts = posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      );
      setPosts(updatedPosts);
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
      }
    } catch (error) {
      console.error('Failed to like post:', error);
      // Fallback to local state is the main action until API is implemented
      const updatedPosts = posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      );
      setPosts(updatedPosts);
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    // 🟢 NOTE: Filtering is now done correctly on the 'posts' state, which is populated either by API or mock data.
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⏳</div>
                <p className="text-gray-500">Loading discussions...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map(post => (
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
                      {categories.find(c => c.id === post.category)?.name}
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

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No discussions found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
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
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Post Discussion
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostModal(false)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Post Details Modal */}
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