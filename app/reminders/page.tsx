'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Clock, Plus, Edit, Trash2, Calendar, Heart, Droplets, Coffee } from 'lucide-react'
import Link from 'next/link'

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      type: 'period',
      title: 'Period Reminder',
      message: 'Your period is expected to start in 2 days. Make sure you have your supplies ready!',
      time: '09:00',
      frequency: 'monthly',
      isActive: true,
      nextTrigger: '2024-01-28'
    },
    {
      id: 2,
      type: 'ovulation',
      title: 'Ovulation Window',
      message: 'You\'re entering your fertile window. Track your symptoms for better predictions.',
      time: '10:00',
      frequency: 'monthly',
      isActive: true,
      nextTrigger: '2024-01-14'
    },
    {
      id: 3,
      type: 'water',
      title: 'Stay Hydrated',
      message: 'Remember to drink water throughout the day, especially during your period.',
      time: '12:00',
      frequency: 'daily',
      isActive: true,
      nextTrigger: '2024-01-16'
    },
    {
      id: 4,
      type: 'self_care',
      title: 'Self-Care Time',
      message: 'Take a moment for yourself. Consider meditation, gentle exercise, or relaxation.',
      time: '18:00',
      frequency: 'daily',
      isActive: false,
      nextTrigger: '2024-01-16'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)

  const reminderTypes = [
    { id: 'period', label: 'Period Reminder', icon: <Heart className="w-5 h-5" />, color: 'text-softPink-400' },
    { id: 'ovulation', label: 'Ovulation Alert', icon: <Calendar className="w-5 h-5" />, color: 'text-yellow-400' },
    { id: 'water', label: 'Water Reminder', icon: <Droplets className="w-5 h-5" />, color: 'text-blue-400' },
    { id: 'self_care', label: 'Self-Care Prompt', icon: <Coffee className="w-5 h-5" />, color: 'text-green-400' },
    { id: 'product_refill', label: 'Product Refill', icon: <Bell className="w-5 h-5" />, color: 'text-purple-400' }
  ]

  const toggleReminder = (id: number) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    ))
  }

  const deleteReminder = (id: number) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id))
  }

  const getReminderIcon = (type: string) => {
    const reminderType = reminderTypes.find(rt => rt.id === type)
    return reminderType?.icon || <Bell className="w-5 h-5" />
  }

  const getReminderColor = (type: string) => {
    const reminderType = reminderTypes.find(rt => rt.id === type)
    return reminderType?.color || 'text-charcoal-400'
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
            <Bell className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Reminders</h1>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-crimson-600 hover:bg-crimson-700 rounded-full transition-colors"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="card-dark text-center p-4">
            <div className="text-2xl font-bold text-crimson-500 mb-1">
              {reminders.filter(r => r.isActive).length}
            </div>
            <div className="text-sm text-charcoal-400">Active</div>
          </div>
          <div className="card-dark text-center p-4">
            <div className="text-2xl font-bold text-softPink-500 mb-1">
              {reminders.filter(r => r.frequency === 'daily').length}
            </div>
            <div className="text-sm text-charcoal-400">Daily</div>
          </div>
          <div className="card-dark text-center p-4">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {reminders.filter(r => r.frequency === 'monthly').length}
            </div>
            <div className="text-sm text-charcoal-400">Monthly</div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4 pb-20">
        {/* Reminders List */}
        {reminders.map((reminder, index) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-dark p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`${getReminderColor(reminder.type)}`}>
                  {getReminderIcon(reminder.type)}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{reminder.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-charcoal-400">
                    <Clock className="w-4 h-4" />
                    <span>{reminder.time}</span>
                    <span>•</span>
                    <span className="capitalize">{reminder.frequency}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    reminder.isActive ? 'bg-crimson-600' : 'bg-charcoal-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    reminder.isActive ? 'right-0.5' : 'left-0.5'
                  }`}></div>
                </button>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="p-2 text-charcoal-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-charcoal-300 text-sm mb-3">{reminder.message}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-charcoal-400">
                Next: {new Date(reminder.nextTrigger).toLocaleDateString()}
              </div>
              <button className="text-crimson-400 hover:text-crimson-300 text-sm flex items-center space-x-1">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </motion.div>
        ))}

        {/* Quick Add Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Add</h3>
          <div className="grid grid-cols-2 gap-3">
            {reminderTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setShowAddModal(true)}
                className="p-4 bg-charcoal-700 hover:bg-charcoal-600 rounded-lg text-center transition-colors"
              >
                <div className={`${type.color} mb-2 flex justify-center`}>
                  {type.icon}
                </div>
                <div className="text-white text-sm font-medium">{type.label}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-dark"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-charcoal-700 rounded-lg">
              <div>
                <div className="text-white font-medium">Push Notifications</div>
                <div className="text-sm text-charcoal-400">Receive notifications on your device</div>
              </div>
              <button className="w-12 h-6 bg-crimson-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-charcoal-700 rounded-lg">
              <div>
                <div className="text-white font-medium">Email Notifications</div>
                <div className="text-sm text-charcoal-400">Receive reminders via email</div>
              </div>
              <button className="w-12 h-6 bg-charcoal-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-charcoal-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-white mb-4">Add New Reminder</h2>
            <p className="text-charcoal-300 text-sm mb-6">
              This feature will be available in the next update. For now, you can manage your existing reminders.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 btn-secondary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
