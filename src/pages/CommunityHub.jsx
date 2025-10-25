import { useState } from 'react';
import { Link } from 'react-router-dom';

const CommunityHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('recent');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-12 w-full sm:w-auto">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">F</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  FarmLink 360
                </span>
              </Link>
              <nav className="flex flex-wrap justify-center sm:justify-start space-x-8">
                <Link to="/marketplace" className="text-gray-600 hover:text-gray-900 font-medium">
                  Marketplace
                </Link>
                <Link to="/community" className="text-green-600 font-semibold border-b-2 border-green-600 pb-2">
                  Community
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 font-medium">
                  Profile
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700">
                Ask Question
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Farming Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with fellow farmers, share knowledge, and get expert advice on crops, livestock, and farming techniques.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search discussions, topics, or ask a question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
              <button className="absolute right-2 top-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm">
            <button 
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'recent' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recent Discussions
            </button>
            <button 
              onClick={() => setActiveTab('popular')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'popular' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Popular Topics
            </button>
            <button 
              onClick={() => setActiveTab('experts')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'experts' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Expert Answers
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {[
                { 
                  id: 1, 
                  title: 'Best organic pest control methods for tomatoes', 
                  author: 'John Doe', 
                  avatar: 'JD',
                  expertise: 'Organic Farming Expert',
                  replies: 24, 
                  views: 156,
                  time: '2 hours ago', 
                  content: 'I\'ve been struggling with aphids on my tomato plants this season. Looking for effective organic solutions that won\'t harm beneficial insects.',
                  tags: ['pest-control', 'tomatoes', 'organic'],
                  solved: false
                },
                { 
                  id: 2, 
                  title: 'Crop rotation schedule for small-scale farming', 
                  author: 'Sarah Lee', 
                  avatar: 'SL',
                  expertise: 'Sustainable Agriculture',
                  replies: 18, 
                  views: 203,
                  time: '5 hours ago', 
                  content: 'Need advice on creating an effective 4-year crop rotation plan for my 5-acre farm. Currently growing maize, beans, and vegetables.',
                  tags: ['crop-rotation', 'planning', 'sustainability'],
                  solved: true
                },
                { 
                  id: 3, 
                  title: 'Drought-resistant irrigation techniques', 
                  author: 'Michael Brown', 
                  avatar: 'MB',
                  expertise: 'Water Management',
                  replies: 31, 
                  views: 445,
                  time: '1 day ago', 
                  content: 'With increasing drought conditions, what are the most water-efficient irrigation methods for vegetable farming?',
                  tags: ['irrigation', 'drought', 'water-conservation'],
                  solved: false
                },
                { 
                  id: 4, 
                  title: 'Organic fertilizer vs chemical fertilizer comparison', 
                  author: 'Emma Wilson', 
                  avatar: 'EW',
                  expertise: 'Soil Health Specialist',
                  replies: 42, 
                  views: 678,
                  time: '2 days ago', 
                  content: 'Looking for detailed comparison between organic and chemical fertilizers for maize production. Cost vs benefit analysis needed.',
                  tags: ['fertilizers', 'organic', 'maize', 'cost-analysis'],
                  solved: true
                },
                { 
                  id: 5, 
                  title: 'Mobile apps for weather forecasting in farming', 
                  author: 'David Kim', 
                  avatar: 'DK',
                  expertise: 'AgTech Enthusiast',
                  replies: 15, 
                  views: 234,
                  time: '3 days ago', 
                  content: 'What are the most reliable weather apps specifically designed for farmers? Need accurate rainfall and temperature predictions.',
                  tags: ['weather', 'technology', 'apps'],
                  solved: false
                }
              ].filter(topic => 
                topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                topic.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
              ).map((topic) => (
                <div key={topic.id} onClick={() => setSelectedTopic(topic)} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">{topic.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                              {topic.title}
                            </h3>
                            {topic.solved && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                ✓ Solved
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {topic.content}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {topic.tags.map((tag) => (
                              <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <span className="font-medium text-gray-700">{topic.author}</span>
                            <span>•</span>
                            <span>{topic.expertise}</span>
                            <span>•</span>
                            <span>{topic.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{topic.replies} replies</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{topic.views} views</span>
                        </span>
                      </div>
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                        Join Discussion →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Load More Discussions
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Popular Tags */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {['pest-control', 'irrigation', 'organic-farming', 'crop-rotation', 'fertilizers', 'weather', 'livestock', 'soil-health'].map((tag) => (
                    <button key={tag} className="bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 px-3 py-1 rounded-full text-sm transition-colors">
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Top Contributors */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Jane Smith', expertise: 'Plant Pathologist', answers: 156, rating: 4.9 },
                    { name: 'Michael Johnson', expertise: 'Livestock Expert', answers: 134, rating: 4.8 },
                    { name: 'Sarah Wilson', expertise: 'Organic Farming', answers: 98, rating: 4.7 }
                  ].map((expert, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">{expert.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{expert.name}</p>
                        <p className="text-gray-500 text-xs">{expert.expertise}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{expert.answers} answers</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="text-xs text-gray-500 ml-1">{expert.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTopic.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{selectedTopic.replies} replies</span>
                  <span>•</span>
                  <span>{selectedTopic.views} views</span>
                  <span>•</span>
                  <span>{selectedTopic.time}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTopic(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl ml-4"
              >
                ×
              </button>
            </div>

            {/* Topic Content */}
            <div className="p-6">
              {/* Original Post */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{selectedTopic.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-gray-900">{selectedTopic.author}</p>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {selectedTopic.expertise}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{selectedTopic.time}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{selectedTopic.content}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedTopic.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Answers & Discussion ({selectedTopic.replies})</h3>
                
                {/* Sample Comments */}
                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">AJ</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">Dr. Alice Johnson</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            ✓ Expert Answer
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Plant Pathologist • 1 hour ago</p>
                        <p className="text-gray-700 leading-relaxed">For organic aphid control on tomatoes, I recommend a multi-approach strategy: 1) Neem oil spray (apply in evening), 2) Introduce beneficial insects like ladybugs, 3) Companion planting with marigolds and basil. This combination has shown 85% effectiveness in my research.</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm">
                          <button className="text-green-600 hover:text-green-700 flex items-center space-x-1">
                            <span>♥</span>
                            <span>24 helpful</span>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">RC</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">Robert Chen</span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            Experienced Farmer
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Organic Farming • 30 minutes ago</p>
                        <p className="text-gray-700 leading-relaxed">I second Dr. Johnson's advice! I've been using this approach for 3 years. Also, try planting nasturtiums as trap crops - aphids prefer them over tomatoes. Just remember to remove the nasturtiums once they're infested.</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm">
                          <button className="text-gray-500 hover:text-green-600 flex items-center space-x-1">
                            <span>♥</span>
                            <span>12 helpful</span>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">MW</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">Mary Williams</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Home Gardener • 15 minutes ago</p>
                        <p className="text-gray-700 leading-relaxed">Thank you both! I tried the neem oil method last week and it's already showing results. Quick question - how often should I apply the neem oil spray?</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm">
                          <button className="text-gray-500 hover:text-green-600 flex items-center space-x-1">
                            <span>♥</span>
                            <span>3 helpful</span>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Comment Form */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Share Your Knowledge</h4>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">You</span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience, tips, or ask follow-up questions..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows="4"
                      />
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button className="hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          </button>
                        </div>
                        <button 
                          onClick={() => {
                            if (newComment.trim()) {
                              alert('Your answer has been posted successfully!');
                              setNewComment('');
                            }
                          }}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                          Post Answer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;