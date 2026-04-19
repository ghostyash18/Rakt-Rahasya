'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Settings, Download, Shield, Globe, Heart, Calendar, Activity } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedAvatar, setSelectedAvatar] = useState(1)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'health', label: 'Health Info', icon: <Heart className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ]

  const avatars = [
    { id: 1, emoji: '👩', name: 'Aria' },
    { id: 2, emoji: '👩‍🦱', name: 'Maya' },
    { id: 3, emoji: '👩‍🦰', name: 'Zara' },
    { id: 4, emoji: '👩‍🦳', name: 'Luna' },
    { id: 5, emoji: '👩‍🦲', name: 'Nova' },
    { id: 6, emoji: '👩‍🦯', name: 'Iris' },
    { id: 7, emoji: '👩‍🦼', name: 'Sage' },
    { id: 8, emoji: '👩‍🦽', name: 'Ruby' },
    { id: 9, emoji: '👩‍⚕️', name: 'Vera' }
  ]

  const healthInfo = {
    age: 22,
    weight: 58,
    cycleLength: 28,
    periodLength: 5,
    lastPeriod: '2024-01-01',
    averageCycle: 28,
    totalCycles: 12
  }

  const stats = [
    { label: 'Cycles Tracked', value: healthInfo.totalCycles, icon: <Calendar className="w-5 h-5" /> },
    { label: 'Days Logged', value: 156, icon: <Activity className="w-5 h-5" /> },
    { label: 'Insights Generated', value: 8, icon: <Heart className="w-5 h-5" /> }
  ]

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
            <User className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Profile</h1>
          </div>
          
          <Link href="/settings" className="p-2 text-charcoal-400 hover:text-white transition-colors">
            <Settings className="w-6 h-6" />
          </Link>
        </div>

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
      <div className="px-6 space-y-6 pb-20">
        {activeTab === 'profile' && (
          <>
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-dark text-center p-6"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                {avatars.find(a => a.id === selectedAvatar)?.emoji}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
              <p className="text-charcoal-300 mb-6">Manage your profile and preferences</p>
              
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-crimson-500 mb-1">{stat.value}</div>
                    <div className="text-sm text-charcoal-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Avatar Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Choose Your Avatar</h3>
              <div className="grid grid-cols-3 gap-3">
                {avatars.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`
                      p-4 rounded-xl text-center transition-all
                      ${selectedAvatar === avatar.id
                        ? 'bg-crimson-500/20 border-2 border-crimson-500'
                        : 'bg-charcoal-700 hover:bg-charcoal-600 border-2 border-transparent'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">{avatar.emoji}</div>
                    <div className="text-sm text-charcoal-300">{avatar.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <button className="card-dark p-4 flex items-center justify-between hover:scale-[1.02] transition-transform">
                <div className="flex items-center space-x-3">
                  <Download className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Export Data</div>
                    <div className="text-sm text-charcoal-400">Download your cycle data as CSV</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-charcoal-400 rotate-180" />
              </button>

              <button className="card-dark p-4 flex items-center justify-between hover:scale-[1.02] transition-transform">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Privacy Settings</div>
                    <div className="text-sm text-charcoal-400">Manage your data privacy</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-charcoal-400 rotate-180" />
              </button>

              <button className="card-dark p-4 flex items-center justify-between hover:scale-[1.02] transition-transform">
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Language</div>
                    <div className="text-sm text-charcoal-400">English • हिंदी</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-charcoal-400 rotate-180" />
              </button>
            </motion.div>
          </>
        )}

        {activeTab === 'health' && (
          <>
            {/* Health Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Health Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-charcoal-400 mb-1 block">Age</label>
                    <input
                      type="number"
                      value={healthInfo.age}
                      className="w-full p-3 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white focus:outline-none focus:border-crimson-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-charcoal-400 mb-1 block">Weight (kg)</label>
                    <input
                      type="number"
                      value={healthInfo.weight}
                      className="w-full p-3 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white focus:outline-none focus:border-crimson-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-charcoal-400 mb-1 block">Cycle Length (days)</label>
                    <input
                      type="number"
                      value={healthInfo.cycleLength}
                      className="w-full p-3 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white focus:outline-none focus:border-crimson-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-charcoal-400 mb-1 block">Period Length (days)</label>
                    <input
                      type="number"
                      value={healthInfo.periodLength}
                      className="w-full p-3 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white focus:outline-none focus:border-crimson-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-charcoal-400 mb-1 block">Last Period Date</label>
                  <input
                    type="date"
                    value={healthInfo.lastPeriod}
                    className="w-full p-3 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white focus:outline-none focus:border-crimson-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Cycle Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Cycle Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-charcoal-700 rounded-lg">
                  <div className="text-2xl font-bold text-crimson-500 mb-1">{healthInfo.averageCycle}</div>
                  <div className="text-sm text-charcoal-400">Average Cycle</div>
                </div>
                <div className="text-center p-4 bg-charcoal-700 rounded-lg">
                  <div className="text-2xl font-bold text-softPink-500 mb-1">{healthInfo.totalCycles}</div>
                  <div className="text-sm text-charcoal-400">Total Cycles</div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                {[
                  { label: 'Period Reminders', description: 'Get notified before your period starts' },
                  { label: 'Ovulation Alerts', description: 'Know when you\'re most fertile' },
                  { label: 'Water Reminders', description: 'Stay hydrated throughout the day' },
                  { label: 'Self-Care Prompts', description: 'Gentle reminders to take care of yourself' }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{setting.label}</div>
                      <div className="text-sm text-charcoal-400">{setting.description}</div>
                    </div>
                    <button className="w-12 h-6 bg-crimson-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Privacy & Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-charcoal-700 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Anonymous Mode</div>
                    <div className="text-sm text-charcoal-400">Post anonymously in community</div>
                  </div>
                  <button className="w-12 h-6 bg-charcoal-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-charcoal-700 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Data Sharing</div>
                    <div className="text-sm text-charcoal-400">Allow anonymized data for research</div>
                  </div>
                  <button className="w-12 h-6 bg-charcoal-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
