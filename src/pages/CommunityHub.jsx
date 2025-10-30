import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageCircle, ThumbsUp, Clock, User, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { fetchPosts, createPost } from '../services/communityService'; // ✅ updated import

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
    // your mock data remains exactly as before 👇🏽
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
    // ... rest unchanged
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'farming-tips' });

  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPosts(); // ✅ use backend fetch
      // ensure data is an array
      const backendPosts = Array.isArray(data) ? data : [];
      setPosts(backendPosts.length > 0 ? backendPosts : mockPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setPosts(mockPosts); // fallback to local mock data
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
      const newPostData = {
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        user_id: 1, // ✅ temporary mock user id (replace when auth added)
      };
      const response = await createPost(newPostData); // ✅ backend call
      setPosts([response, ...posts]);
      setNewPost({ title: '', content: '', category: 'farming-tips' });
      setShowNewPostModal(false);
    } catch (error) {
      console.error('Failed to create post:', error);
      // fallback to local mock
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
    // For now, keep this local until backend replies route ready
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

  const handleLike = async (postId) => {
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
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ✅ Below this line everything remains identical (UI unchanged)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Community Hub</h1>
          <Navbar />
        </div>
      </header>

      {/* all JSX below unchanged — exact same structure */}
      {/* ... */}
    </div>
  );
};

export default CommunityHub;
