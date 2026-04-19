'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Heart, 
  Plus, 
  TrendingUp, 
  Bell, 
  Settings,
  Droplets,
  Smile,
  Activity,
  Moon
} from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import CycleCalendar from '@/components/CycleCalendar'
import MoodTracker from '@/components/MoodTracker'
import QuickLog from '@/components/QuickLog'

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [cycleDay, setCycleDay] = useState(5)
  const [nextPeriod, setNextPeriod] = useState(23)
  const [currentMood, setCurrentMood] = useState('happy')
  const [todayLogged, setTodayLogged] = useState(false)

  // Mock data - in real app, this would come from API
  const cycleData = {
    currentDay: cycleDay,
    cycleLength: 28,
    periodLength: 5,
    nextPeriod: nextPeriod,
    phase: 'follicular' as const
  }

  const moodData = [
    { date: '2024-01-15', mood: 'happy', intensity: 4 },
    { date: '2024-01-14', mood: 'calm', intensity: 3 },
    { date: '2024-01-13', mood: 'energetic', intensity: 5 },
    { date: '2024-01-12', mood: 'tired', intensity: 2 },
  ]

  const quickStats = [
    {
      icon: <Droplets className="w-5 h-5" />,
      label: 'Flow Today',
      value: 'Medium',
      color: 'text-softPink-400'
    },
    {
      icon: <Smile className="w-5 h-5" />,
      label: 'Mood',
      value: 'Happy',
      color: 'text-yellow-400'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: 'Symptoms',
      value: '2',
      color: 'text-blue-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-crimson-900">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Logo size="sm" />
          <div className="flex items-center space-x-3">
            <button className="p-2 text-charcoal-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <Link href="/settings" className="p-2 text-charcoal-400 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}! 🌸
          </h1>
          <p className="text-charcoal-300">
            You're on day {cycleDay} of your cycle
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-6 pb-20">
        {/* Cycle Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-dark"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Cycle Status</h2>
            <div className="flex items-center space-x-2 text-softPink-400">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Follicular Phase</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-crimson-500 mb-1">
                {cycleDay}
              </div>
              <div className="text-sm text-charcoal-400">Current Day</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-softPink-500 mb-1">
                {nextPeriod}
              </div>
              <div className="text-sm text-charcoal-400">Days to Period</div>
            </div>
          </div>

          <div className="w-full bg-charcoal-700 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-crimson-500 to-softPink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(cycleDay / 28) * 100}%` }}
            />
          </div>

          <Link href="/log" className="btn-primary w-full flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Log Today's Data</span>
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          {quickStats.map((stat, index) => (
            <div key={index} className="card-dark text-center p-4">
              <div className={`${stat.color} mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-charcoal-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MoodTracker currentMood={currentMood} onMoodChange={setCurrentMood} />
        </motion.div>

        {/* Cycle Calendar Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-dark"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Cycle Calendar</h2>
            <Link href="/calendar" className="text-crimson-400 hover:text-crimson-300 transition-colors">
              View All
            </Link>
          </div>
          <CycleCalendar 
            currentDate={currentDate}
            cycleData={cycleData}
            compact={true}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <Link href="/insights" className="card-dark p-4 text-center hover:scale-105 transition-transform">
            <TrendingUp className="w-8 h-8 text-crimson-500 mx-auto mb-2" />
            <div className="text-white font-medium">Insights</div>
            <div className="text-xs text-charcoal-400">View your patterns</div>
          </Link>
          
          <Link href="/education" className="card-dark p-4 text-center hover:scale-105 transition-transform">
            <Moon className="w-8 h-8 text-softPink-500 mx-auto mb-2" />
            <div className="text-white font-medium">Learn</div>
            <div className="text-xs text-charcoal-400">Health education</div>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-charcoal-900 border-t border-charcoal-700 p-4">
        <div className="flex items-center justify-around">
          {[
            { icon: <Heart className="w-6 h-6" />, label: 'Home', href: '/dashboard', active: true },
            { icon: <Calendar className="w-6 h-6" />, label: 'Calendar', href: '/calendar' },
            { icon: <Plus className="w-6 h-6" />, label: 'Log', href: '/log' },
            { icon: <TrendingUp className="w-6 h-6" />, label: 'Insights', href: '/insights' },
            { icon: <Settings className="w-6 h-6" />, label: 'Profile', href: '/profile' }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                item.active 
                  ? 'text-crimson-500 bg-crimson-500/10' 
                  : 'text-charcoal-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
