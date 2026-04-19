'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Play, FileText, Award, Search, Filter } from 'lucide-react'
import Link from 'next/link'

export default function EducationPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', label: 'All', icon: '📚' },
    { id: 'hygiene', label: 'Hygiene', icon: '🧼' },
    { id: 'products', label: 'Products', icon: '🩸' },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'stigma', label: 'Breaking Stigma', icon: '💪' },
    { id: 'health', label: 'Health', icon: '🏥' }
  ]

  const educationModules = [
    {
      id: 1,
      title: 'Menstrual Hygiene Basics',
      description: 'Learn the fundamentals of menstrual hygiene and best practices for your health and comfort.',
      category: 'hygiene',
      difficulty: 'beginner',
      estimatedTime: 5,
      isInteractive: true,
      image: '🧼',
      progress: 0,
      type: 'article'
    },
    {
      id: 2,
      title: 'Sustainable Period Products',
      description: 'Explore eco-friendly alternatives to traditional menstrual products and their benefits.',
      category: 'products',
      difficulty: 'beginner',
      estimatedTime: 8,
      isInteractive: true,
      image: '🌱',
      progress: 0,
      type: 'interactive'
    },
    {
      id: 3,
      title: 'Nutrition During Your Cycle',
      description: 'Discover how nutrition affects your menstrual cycle and what foods can help with symptoms.',
      category: 'nutrition',
      difficulty: 'intermediate',
      estimatedTime: 10,
      isInteractive: false,
      image: '🥗',
      progress: 0,
      type: 'article'
    },
    {
      id: 4,
      title: 'Breaking the Stigma',
      description: 'Understanding and challenging menstrual stigma in society and how to advocate for change.',
      category: 'stigma',
      difficulty: 'beginner',
      estimatedTime: 6,
      isInteractive: true,
      image: '💪',
      progress: 0,
      type: 'video'
    },
    {
      id: 5,
      title: 'Cycle Tracking & Health',
      description: 'Learn how tracking your cycle can provide insights into your overall health and wellbeing.',
      category: 'health',
      difficulty: 'intermediate',
      estimatedTime: 12,
      isInteractive: true,
      image: '📊',
      progress: 0,
      type: 'interactive'
    },
    {
      id: 6,
      title: 'Managing PMS Symptoms',
      description: 'Natural and effective ways to manage premenstrual syndrome symptoms.',
      category: 'health',
      difficulty: 'beginner',
      estimatedTime: 7,
      isInteractive: false,
      image: '🌸',
      progress: 0,
      type: 'article'
    }
  ]

  const filteredModules = educationModules.filter(module => {
    const matchesCategory = activeCategory === 'all' || module.category === activeCategory
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20'
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20'
      case 'advanced': return 'text-red-400 bg-red-400/20'
      default: return 'text-charcoal-400 bg-charcoal-400/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />
      case 'interactive': return <Award className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
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
            <BookOpen className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Education Hub</h1>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search articles and modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white placeholder-charcoal-400 focus:outline-none focus:border-crimson-500 transition-colors"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-2 overflow-x-auto pb-2 mb-6"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all
                ${activeCategory === category.id
                  ? 'bg-crimson-600 text-white'
                  : 'bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 hover:text-white'
                }
              `}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6 pb-20">
        {/* Featured Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-dark p-6 bg-gradient-to-r from-crimson-600/20 to-softPink-600/20 border border-crimson-500/30"
        >
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🌟</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">Featured: Menstrual Health 101</h2>
              <p className="text-charcoal-300 mb-4">
                A comprehensive guide to understanding your menstrual cycle, from basics to advanced health insights.
              </p>
              <div className="flex items-center space-x-4 text-sm text-charcoal-400 mb-4">
                <span>⏱️ 15 min read</span>
                <span>📊 Beginner</span>
                <span>🎯 Interactive</span>
              </div>
              <button className="btn-primary">
                Start Learning
              </button>
            </div>
          </div>
        </motion.div>

        {/* Education Modules */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">All Modules</h3>
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark p-4 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{module.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(module.type)}
                      {module.isInteractive && (
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-charcoal-300 text-sm mb-3">{module.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-charcoal-400 mb-3">
                    <span>⏱️ {module.estimatedTime} min</span>
                    <span className={`px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <span className="capitalize">{module.type}</span>
                  </div>

                  {module.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-charcoal-400 mb-1">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full bg-charcoal-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-crimson-500 to-softPink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button className="text-crimson-400 hover:text-crimson-300 font-medium text-sm">
                      {module.progress > 0 ? 'Continue' : 'Start'}
                    </button>
                    <div className="flex items-center space-x-2 text-charcoal-400">
                      <span>📖</span>
                      <span>💬</span>
                      <span>❤️</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Health Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                tip: 'Stay Hydrated',
                description: 'Drink plenty of water to reduce bloating and maintain energy levels.',
                icon: '💧'
              },
              {
                tip: 'Gentle Exercise',
                description: 'Light yoga or walking can help alleviate cramps and improve mood.',
                icon: '🧘‍♀️'
              },
              {
                tip: 'Balanced Nutrition',
                description: 'Include iron-rich foods and avoid excessive caffeine during your period.',
                icon: '🥗'
              },
              {
                tip: 'Rest & Recovery',
                description: 'Listen to your body and get adequate sleep during your cycle.',
                icon: '😴'
              }
            ].map((tip, index) => (
              <div key={index} className="p-4 bg-charcoal-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{tip.icon}</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{tip.tip}</h4>
                    <p className="text-charcoal-300 text-sm">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
