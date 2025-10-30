<<<<<<< HEAD
// src/pages/CommunityHub.jsx (CLEANED)

import React, { useState, useEffect, useCallback, useMemo } from 'react'; 
import { Search, Plus, MessageCircle, ThumbsUp, Clock, User, X, Loader2 } from 'lucide-react'; 
import Navbar from '../components/Navbar';
// 🔑 IMPORT THE SERVICE FUNCTIONS - These must now contain the actual logic
import { fetchPosts, createPost } from "../services/communityService"; 

// =================================================================
// NOTE: ALL MOCK DATA AND MOCK FUNCTION DEFINITIONS MUST BE MOVED 
// TO '../services/communityService' TO AVOID DUPLICATE DECLARATION ERROR
// =================================================================


// =================================================================
// 3. COMMUNITY HUB COMPONENT (Based on User's structure)
// =================================================================

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

    // useMemo for constant categories list
    const categories = useMemo(() => [
        { id: 'all', name: 'All Topics' },
        { id: 'farming-tips', name: 'Farming Tips' },
        { id: 'pest-control', name: 'Pest Control' },
        { id: 'irrigation', name: 'Irrigation' },
        { id: 'livestock', name: 'Livestock' },
        { id: 'market-info', name: 'Market Info' }
    ], []); // Empty dependency array ensures it's created once
    
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'farming-tips' });

    // Helper function to format time
    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
=======
import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageCircle, ThumbsUp, Clock, User, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import apiService from '../services/api';

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
>>>>>>> 1d2cab2a3ed6cea1893f1f12ded2787c2a1c6849
    }

<<<<<<< HEAD
    // 🔑 FUNCTION TO FETCH POSTS
    const loadPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            // This is the imported function from communityService
            const data = await fetchPosts(); 
            
            // NOTE: Using map to add mock UI fields (replies, likes, timeAgo, author)
            const postsForUI = data.map(post => ({
                ...post,
                // These fields are not supported by the mock API, so we initialize them for UI
                replies: post.replies || [], 
                likes: post.likes || Math.floor(Math.random() * 20), 
                timeAgo: timeSince(post.created_at),
                author: post.user_id ? `User ${post.user_id}` : 'Anonymous',
                // Look up category based on the actual post data or default
                category: categories.find(c => c.id === post.category) ? post.category : (post.category || 'farming-tips') 
            }));
            
            // Sort by creation date (latest first) based on original mock data structure
            setPosts(postsForUI.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (error) {
            console.error("Failed to load community posts:", error);
        } finally {
            setIsLoading(false);
        }
    }, [categories]); // 🐛 FIX: Added 'categories' to useCallback dependencies.

    // 🔑 INITIAL DATA FETCH: useEffect hook
    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    // 🔑 UPDATED handleNewPost: Uses API call
    const handleNewPost = async (e) => {
        e.preventDefault();
        setIsPosting(true);

        const postData = {
            title: newPost.title,
            content: newPost.content,
            user_id: 999, // <<< REPLACE WITH ACTUAL USER ID
            category: newPost.category, 
        };

        try {
            // 🔑 API CALL: POST new post data (This is the imported function)
            const newPostResponse = await createPost(postData);

            // Success: Create UI-friendly object and add to state
            const postForUI = {
                ...newPostResponse,
                category: newPost.category,
                author: 'You (User 999)', 
                timeAgo: 'Just now',
                replies: [],
                likes: 0,
            };

            setPosts([postForUI, ...posts]); // Add the new post to the top of the list
            setNewPost({ title: '', content: '', category: 'farming-tips' });
            setShowNewPostModal(false);

        } catch (error) {
            console.error("Failed to submit post:", error.message);
        } finally {
            setIsPosting(false);
        }
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowReplies(true);
    };

    // NOTE: Reply and Like handlers are kept simple, still using local state 
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
        // Ensure selectedPost state is also updated for the modal display
        setSelectedPost(prev => prev ? { ...prev, replies: [...prev.replies, reply] } : null);
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
            setSelectedPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
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
=======
  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getPosts(activeCategory);
      setPosts(response.posts || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
      // Fallback to mock data
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
      const response = await apiService.createPost(newPost);
      setPosts([response.post, ...posts]);
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
    
    try {
      const response = await apiService.addReply(selectedPost.id, { content: newReply });
      const updatedPosts = posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, replies: [...post.replies, response.reply] }
          : post
      );
      setPosts(updatedPosts);
      setSelectedPost({ ...selectedPost, replies: [...selectedPost.replies, response.reply] });
      setNewReply('');
    } catch (error) {
      console.error('Failed to add reply:', error);
      // Fallback to local state
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
    }
  };

  const handleLike = async (postId) => {
    try {
      await apiService.likePost(postId);
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
      // Fallback to local state
      const updatedPosts = posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      );
      setPosts(updatedPosts);
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
      }
>>>>>>> 1d2cab2a3ed6cea1893f1f12ded2787c2a1c6849
    }

    return (
        // ... REST OF THE JSX CODE (from line 198 to the end) ...
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-green-600 text-white p-4 shadow-lg">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">Community Hub</h1>
                    <Navbar />
                </div>
            </header>

<<<<<<< HEAD
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 mb-8 border border-gray-100">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Connect with Fellow Farmers</h2>
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
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition duration-150"
                            />
=======
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
>>>>>>> 1d2cab2a3ed6cea1893f1f12ded2787c2a1c6849
                        </div>
                        <button
                            onClick={() => setShowNewPostModal(true)}
                            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition transform hover:scale-[1.02]"
                        >
                            <Plus className="w-5 h-5" />
                            <span>New Discussion</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Discussion Topics</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-150 text-base ${
                                            activeCategory === category.id
                                                ? 'bg-green-50 text-green-700 font-semibold ring-2 ring-green-500'
                                                : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <span>{category.name}</span>
                                        <span className={`text-sm px-2 py-0.5 rounded-full ${activeCategory === category.id ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                            {getCategoryCount(category.id)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

<<<<<<< HEAD
                    {/* Posts */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {/* Loading State */}
                            {isLoading && (
                                <div className="text-center py-12 flex items-center justify-center space-x-3 bg-white rounded-xl shadow-lg">
                                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                                    <p className="text-xl text-green-600 font-medium">Fetching the latest discussions...</p>
                                </div>
                            )}
                            
                            {/* No Posts Found State */}
                            {!isLoading && filteredPosts.length === 0 && (
                                <div className="text-center py-16 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-200">
                                    <MessageCircle className="w-12 h-12 mx-auto text-green-400 mb-4" />
                                    <p className="text-gray-500 text-xl font-medium">
                                        {posts.length === 0 
                                            ? "There are no discussions yet. Start the first one!"
                                            : "No discussions found matching your filter or search."
                                        }
                                    </p>
                                </div>
                            )}
=======
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
>>>>>>> 1d2cab2a3ed6cea1893f1f12ded2787c2a1c6849

                            {/* Display Posts */}
                            {!isLoading && filteredPosts.map(post => (
                                <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100" onClick={() => handlePostClick(post)}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{post.author}</p>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{post.timeAgo}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold self-start shadow-sm">
                                            {categories.find(c => c.id === post.category)?.name || 'General'}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                                    
                                    <div className="flex items-center space-x-6 text-gray-500 text-sm">
                                        <button 
                                            className="flex items-center space-x-2 p-1 rounded-full hover:text-green-600 transition"
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
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h3 className="text-2xl font-bold text-gray-800">Start a New Discussion</h3>
                                <button
                                    onClick={() => setShowNewPostModal(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleNewPost} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                    <select
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                                    >
                                        {categories.filter(c => c.id !== 'all').map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="What's your question or topic?"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Provide more details about your question or share your knowledge..."
                                        required
                                    />
                                </div>
                                
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-bold disabled:bg-green-400 disabled:cursor-not-allowed shadow-md"
                                        disabled={isPosting || !newPost.title.trim() || !newPost.content.trim()}
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
                                        className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition font-bold disabled:bg-gray-400"
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

            {/* Post Details Modal */}
            {showReplies && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6 border-b pb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 leading-snug">{selectedPost.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1">by <span className="font-medium">{selectedPost.author}</span> • {selectedPost.timeAgo}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowReplies(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition self-start"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="mb-6">
                                <p className="text-gray-700 text-lg leading-relaxed">{selectedPost.content}</p>
                                <div className="flex items-center space-x-6 mt-4 text-gray-500 text-sm pt-2 border-t">
                                    <button 
                                        className="flex items-center space-x-2 hover:text-green-600 transition p-1 rounded-full"
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
                            
                            <hr className="mb-6 border-gray-200" />
                            
                            {/* Replies */}
                            <div className="space-y-4 mb-6">
                                <h4 className="text-xl font-bold text-gray-800">Replies ({selectedPost.replies.length})</h4>
                                {selectedPost.replies.map((reply, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <div className="flex items-start space-x-3 mb-2">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{reply.author}</p>
                                                <p className="text-xs text-gray-500">{reply.timeAgo}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 ml-11 mt-1">{reply.content}</p>
                                    </div>
                                ))}
                                
                                {selectedPost.replies.length === 0 && (
                                    <p className="text-gray-500 text-center py-4 italic">No replies yet. Be the first to reply!</p>
                                )}
                            </div>
                            
                            {/* Add Reply */}
                            <form onSubmit={handleAddReply} className="space-y-4 pt-4 border-t">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Add your reply</label>
                                    <textarea
                                        value={newReply}
                                        onChange={(e) => setNewReply(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Share your thoughts or advice..."
                                        required
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition font-medium shadow-md disabled:bg-green-400 disabled:cursor-not-allowed"
                                        disabled={!newReply.trim()}
                                    >
                                        Post Reply
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowReplies(false)}
                                        className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition font-medium"
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

// =================================================================
// 4. MAIN APP COMPONENT
// =================================================================
const App = () => {
    return (
        <CommunityHub />
    );
};

export default App;