'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Phone, Globe, Star, Search, Filter, Heart } from 'lucide-react'
import Link from 'next/link'

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', label: 'All', icon: '🏥' },
    { id: 'clinic', label: 'Clinics', icon: '🏥' },
    { id: 'helpline', label: 'Helplines', icon: '📞' },
    { id: 'video', label: 'Videos', icon: '🎥' },
    { id: 'article', label: 'Articles', icon: '📄' }
  ]

  const resources = [
    {
      id: 1,
      name: 'Women\'s Health Clinic - Mumbai',
      type: 'clinic',
      description: 'Comprehensive women\'s health services including gynecology, family planning, and menstrual health counseling.',
      location: {
        address: '123 Medical Street, Bandra West, Mumbai - 400050',
        coordinates: { lat: 19.0544, lng: 72.8406 }
      },
      contact: {
        phone: '+91-22-2640-1234',
        email: 'info@womenshealthmumbai.com',
        website: 'www.womenshealthmumbai.com'
      },
      category: 'gynecology',
      isVerified: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'National Women\'s Helpline',
      type: 'helpline',
      description: '24/7 confidential helpline for women facing health issues, domestic violence, or need emotional support.',
      contact: {
        phone: '181',
        email: 'help@nationalwomenshelpline.in'
      },
      category: 'support',
      isVerified: true,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Understanding Your Cycle - Educational Video',
      type: 'video',
      description: 'A comprehensive video guide explaining menstrual cycles, phases, and what\'s normal vs. when to seek help.',
      contact: {
        website: 'www.healthytalks.com/cycle-guide'
      },
      category: 'education',
      isVerified: true,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Menstrual Hygiene Best Practices',
      type: 'article',
      description: 'Detailed article covering proper hygiene practices, product selection, and health maintenance during menstruation.',
      contact: {
        website: 'www.womenshealthindia.org/hygiene-guide'
      },
      category: 'hygiene',
      isVerified: true,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Delhi Women\'s Health Center',
      type: 'clinic',
      description: 'Specialized clinic offering adolescent health services, menstrual disorder treatment, and counseling.',
      location: {
        address: '456 Health Avenue, Connaught Place, New Delhi - 110001',
        coordinates: { lat: 28.6139, lng: 77.2090 }
      },
      contact: {
        phone: '+91-11-2345-6789',
        email: 'contact@delhiwomenshealth.com'
      },
      category: 'adolescent health',
      isVerified: true,
      rating: 4.5
    },
    {
      id: 6,
      name: 'Mental Health Support for Women',
      type: 'helpline',
      description: 'Specialized counseling services for women dealing with PMS, PMDD, and mental health challenges related to menstrual cycles.',
      contact: {
        phone: '+91-80-4719-2000',
        email: 'support@womensmentalhealth.in'
      },
      category: 'mental health',
      isVerified: true,
      rating: 4.8
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'clinic': return '🏥'
      case 'helpline': return '📞'
      case 'video': return '🎥'
      case 'article': return '📄'
      default: return '📋'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'clinic': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'helpline': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'video': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'article': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
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
            <Heart className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Resources</h1>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark p-4 mb-6 bg-gradient-to-r from-crimson-600/20 to-softPink-600/20 border border-crimson-500/30"
        >
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-crimson-500" />
            <div>
              <h3 className="text-white font-semibold mb-1">Location-based Resources</h3>
              <p className="text-charcoal-300 text-sm">
                Showing resources for India. We automatically detect your location to provide relevant local services.
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
            placeholder="Search clinics, helplines, and resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white placeholder-charcoal-400 focus:outline-none focus:border-crimson-500 transition-colors"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
      <div className="px-6 space-y-4 pb-20">
        {/* Emergency Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-dark p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30"
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl">🚨</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">Emergency Resources</h2>
              <p className="text-charcoal-300 mb-4">
                If you're experiencing severe pain, heavy bleeding, or any concerning symptoms, please contact these emergency services immediately.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-charcoal-700 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-5 h-5 text-red-400" />
                    <span className="text-white font-semibold">Emergency Helpline</span>
                  </div>
                  <p className="text-charcoal-300 text-sm mb-2">24/7 medical emergency support</p>
                  <a href="tel:108" className="text-red-400 font-medium">Call 108</a>
                </div>
                <div className="p-4 bg-charcoal-700 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-white font-semibold">Women's Helpline</span>
                  </div>
                  <p className="text-charcoal-300 text-sm mb-2">Immediate support and guidance</p>
                  <a href="tel:181" className="text-red-400 font-medium">Call 181</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resources List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Available Resources</h3>
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark p-4 hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getTypeIcon(resource.type)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-semibold text-white">{resource.name}</h4>
                      {resource.isVerified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-charcoal-400">{resource.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-charcoal-300 text-sm mb-4">{resource.description}</p>

              {resource.location && (
                <div className="flex items-center space-x-2 mb-3 text-sm text-charcoal-400">
                  <MapPin className="w-4 h-4" />
                  <span>{resource.location.address}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {resource.contact.phone && (
                    <a 
                      href={`tel:${resource.contact.phone}`}
                      className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Call</span>
                    </a>
                  )}
                  {resource.contact.website && (
                    <a 
                      href={resource.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Website</span>
                    </a>
                  )}
                  {resource.location && (
                    <button className="flex items-center space-x-1 text-crimson-400 hover:text-crimson-300 transition-colors">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Map</span>
                    </button>
                  )}
                </div>
                
                <span className="px-2 py-1 bg-charcoal-700 text-charcoal-300 text-xs rounded-full">
                  {resource.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Resource */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-6"
        >
          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Know a Resource?</h3>
            <p className="text-charcoal-300 text-sm mb-4">
              Help other women by sharing verified clinics, helplines, or educational resources in your area.
            </p>
            <button className="btn-primary">
              Suggest a Resource
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
