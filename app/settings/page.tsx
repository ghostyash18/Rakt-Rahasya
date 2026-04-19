'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Settings, Bell, Shield, Globe, Download, Moon, Sun, Heart } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    periodReminder: true,
    ovulationReminder: true,
    waterReminder: true,
    selfCareReminder: true,
    productRefillReminder: false,
    reminderTime: '09:00'
  })

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    anonymousMode: true,
    locationSharing: false
  })

  const [language, setLanguage] = useState('en')

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyToggle = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleDataExport = () => {
    // In a real app, this would generate and download a CSV file
    console.log('Exporting data...')
  }

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation modal
    console.log('Deleting account...')
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
            <Settings className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
          
          <div className="w-20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6 pb-20">
        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-charcoal-700 rounded-lg">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? <Moon className="w-6 h-6 text-blue-400" /> : <Sun className="w-6 h-6 text-yellow-400" />}
                <div>
                  <div className="text-white font-medium">Theme</div>
                  <div className="text-sm text-charcoal-400">
                    {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                  </div>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="w-12 h-6 bg-crimson-600 rounded-full relative transition-colors"
              >
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'periodReminder', label: 'Period Reminders', description: 'Get notified before your period starts' },
              { key: 'ovulationReminder', label: 'Ovulation Alerts', description: 'Know when you\'re most fertile' },
              { key: 'waterReminder', label: 'Water Reminders', description: 'Stay hydrated throughout the day' },
              { key: 'selfCareReminder', label: 'Self-Care Prompts', description: 'Gentle reminders to take care of yourself' },
              { key: 'productRefillReminder', label: 'Product Refill Alerts', description: 'Reminders to restock period products' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-charcoal-700 rounded-lg">
                <div>
                  <div className="text-white font-medium">{setting.label}</div>
                  <div className="text-sm text-charcoal-400">{setting.description}</div>
                </div>
                <button
                  onClick={() => handleNotificationToggle(setting.key)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    notifications[setting.key as keyof typeof notifications] 
                      ? 'bg-crimson-600' 
                      : 'bg-charcoal-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    notifications[setting.key as keyof typeof notifications] 
                      ? 'right-0.5' 
                      : 'left-0.5'
                  }`}></div>
                </button>
              </div>
            ))}

            <div className="p-4 bg-charcoal-700 rounded-lg">
              <div className="text-white font-medium mb-2">Reminder Time</div>
              <input
                type="time"
                value={notifications.reminderTime}
                onChange={(e) => setNotifications(prev => ({ ...prev, reminderTime: e.target.value }))}
                className="w-full p-3 bg-charcoal-800 border border-charcoal-600 rounded-lg text-white focus:outline-none focus:border-crimson-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Privacy & Security</h3>
          <div className="space-y-4">
            {[
              { key: 'anonymousMode', label: 'Anonymous Mode', description: 'Post anonymously in community features' },
              { key: 'dataSharing', label: 'Data Sharing', description: 'Allow anonymized data for research and improvements' },
              { key: 'locationSharing', label: 'Location Sharing', description: 'Share location for local resource recommendations' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-charcoal-700 rounded-lg">
                <div>
                  <div className="text-white font-medium">{setting.label}</div>
                  <div className="text-sm text-charcoal-400">{setting.description}</div>
                </div>
                <button
                  onClick={() => handlePrivacyToggle(setting.key)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    privacy[setting.key as keyof typeof privacy] 
                      ? 'bg-crimson-600' 
                      : 'bg-charcoal-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    privacy[setting.key as keyof typeof privacy] 
                      ? 'right-0.5' 
                      : 'left-0.5'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
          <div className="space-y-3">
            {[
              { code: 'en', label: 'English', flag: '🇺🇸' },
              { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  language === lang.code
                    ? 'bg-crimson-600/20 border-2 border-crimson-500'
                    : 'bg-charcoal-700 hover:bg-charcoal-600 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-white font-medium">{lang.label}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
          <div className="space-y-3">
            <button
              onClick={handleDataExport}
              className="w-full p-4 bg-charcoal-700 hover:bg-charcoal-600 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-white font-medium">Export Data</div>
                  <div className="text-sm text-charcoal-400">Download your cycle data as CSV</div>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-charcoal-400 rotate-180" />
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg flex items-center justify-between transition-colors border border-red-500/30"
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-red-400" />
                <div>
                  <div className="text-white font-medium">Delete Account</div>
                  <div className="text-sm text-charcoal-400">Permanently delete your account and data</div>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-charcoal-400 rotate-180" />
            </button>
          </div>
        </motion.div>

        {/* App Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-dark text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Rakt Rahasya</h3>
          <p className="text-charcoal-400 text-sm mb-4">Version 1.0.0</p>
          <p className="text-charcoal-300 text-sm">
            Built with love for women's health and empowerment. 
            Your privacy and wellbeing are our top priorities.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
