'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Heart, MessageCircle, Plus, Search, Filter, Shield } from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'all', label: 'All Posts', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'questions', label: 'Questions', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'tips', label: 'Tips', icon: <Heart className="w-5 h-5" /> },
    { id: 'support', label: 'Support', icon: <Users className="w-5 h-5" /> }
  ]

  const communityPosts = [
    {
      id: 1,
      title: 'First time using a menstrual cup - any tips?',
      content: 'I\'m 19 and just got my first menstrual cup. I\'m a bit nervous about using it. Any advice from experienced users?',
      category: 'questions',
      author: 'Anonymous User',
      isAnonymous: true,
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago',
      tags: ['menstrual cup', 'first time', 'tips'],
      isVerified: false
    },
    {
      id: 2,
      title: 'Natural remedies for period cramps',
      content: 'I\'ve been using heat therapy and gentle yoga for my cramps and it\'s been really helpful. Here are some other natural remedies that work for me...',
      category: 'tips',
      author: 'Wellness Warrior',
      isAnonymous: false,
      likes: 45,
      comments: 12,
      timeAgo: '5 hours ago',
      tags: ['cramps', 'natural remedies', 'wellness'],
      isVerified: true
    },
    {
      id: 3,
      title: 'Feeling overwhelmed with irregular cycles',
      content: 'My periods have been irregular for the past 6 months and I\'m feeling really anxious about it. Has anyone else experienced this?',
      category: 'support',
      author: 'Anonymous User',
      isAnonymous: true,
      likes: 18,
      comments: 15,
      timeAgo: '1 day ago',
      tags: ['irregular cycles', 'anxiety', 'support'],
      isVerified: false
    },
    {
      id: 4,
      title: 'Sustainable period products comparison',
      content: 'I\'ve tried various eco-friendly period products over the past year. Here\'s my honest review of menstrual cups, period underwear, and organic pads...',
      category: 'tips',
      author: 'Eco Advocate',
      isAnonymous: false,
      likes: 67,
      comments: 23,
      timeAgo: '2 days ago',
      tags: ['sustainable', 'products', 'review'],
      isVerified: true
    },
    {
      id: 5,
      title: 'How to talk to your doctor about period pain',
      content: 'I\'ve been experiencing severe period pain but I\'m nervous about bringing it up with my doctor. Any advice on how to have this conversation?',
      category: 'questions',
      author: 'Anonymous User',
      isAnonymous: true,
      likes: 31,
      comments: 19,
      timeAgo: '3 days ago',
      tags: ['doctor', 'pain', 'health'],
      isVerified: false
    }
  ]

  const filteredPosts = communityPosts.filter(post => {
    const matchesTab = activeTab === 'all' || post.category === activeTab
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'questions': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'tips': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'support': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-charcoal-500/20 text-charcoal-400 border-charcoal-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-crimson-900">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard" className="flex items-center space-x-2 text-charcoal-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Truth Circle</h1>
          </div>
          
          <button className="p-2 bg-crimson-600 hover:bg-crimson-700 rounded-full transition-colors">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark p-4 mb-6 bg-gradient-to-r from-crimson-600/20 to-softPink-600/20 border border-crimson-500/30"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-crimson-500 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">Safe Space Guidelines</h3>
              <p className="text-charcoal-300 text-sm">
                This is a supportive community. Be kind, respectful, and remember that everyone's experience is valid. 
                Anonymous posting is available for sensitive topics.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search posts, questions, and tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white placeholder-charcoal-400 focus:outline-none focus:border-crimson-500 transition-colors"
          />
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-charcoal-800 p-1 rounded-xl mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all
                ${activeTab === tab.id
                  ? 'bg-crimson-600 text-white'
                  : 'text-charcoal-400 hover:text-white hover:bg-charcoal-700'
                }
              `}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4 pb-20">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-dark p-6 bg-gradient-to-r from-softPink-600/20 to-crimson-600/20 border border-softPink-500/30"
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl">🌟</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  Featured
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                  Tips
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Building a Supportive Community</h2>
              <p className="text-charcoal-300 text-sm mb-4">
                Share your experiences, ask questions, and support each other in this safe space. 
                Remember, every question is valid and every experience matters.
              </p>
              <div className="flex items-center space-x-4 text-sm text-charcoal-400">
                <span>❤️ 89 likes</span>
                <span>💬 23 comments</span>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community Posts */}
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-dark p-4 hover:scale-[1.01] transition-transform cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {post.isAnonymous ? '?' : post.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {post.isAnonymous ? 'Anonymous User' : post.author}
                    </span>
                    {post.isVerified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <span className="text-charcoal-400 text-sm">{post.timeAgo}</span>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>

            <h3 className="text-white font-semibold mb-2">{post.title}</h3>
            <p className="text-charcoal-300 text-sm mb-3 line-clamp-2">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-charcoal-400">
                <button className="flex items-center space-x-1 hover:text-crimson-400 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-crimson-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                {post.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-charcoal-700 text-charcoal-300 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-charcoal-400 text-xs">+{post.tags.length - 2}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-6"
        >
          <button className="btn-secondary">
            Load More Posts
          </button>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-20 right-6 w-14 h-14 bg-crimson-600 hover:bg-crimson-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  )
}
