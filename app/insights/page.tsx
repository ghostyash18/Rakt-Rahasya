'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Calendar, Heart, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for charts
  const cycleData = [
    { day: 1, flow: 3, mood: 2, symptoms: 1 },
    { day: 2, flow: 3, mood: 3, symptoms: 2 },
    { day: 3, flow: 2, mood: 4, symptoms: 1 },
    { day: 4, flow: 2, mood: 4, symptoms: 0 },
    { day: 5, flow: 1, mood: 5, symptoms: 0 },
    { day: 6, flow: 0, mood: 4, symptoms: 0 },
    { day: 7, flow: 0, mood: 3, symptoms: 0 },
  ]

  const moodData = [
    { mood: 'Happy', count: 12, color: '#fbbf24' },
    { mood: 'Calm', count: 8, color: '#10b981' },
    { mood: 'Energetic', count: 6, color: '#f59e0b' },
    { mood: 'Tired', count: 4, color: '#8b5cf6' },
    { mood: 'Anxious', count: 2, color: '#ef4444' },
  ]

  const insights = [
    {
      type: 'pattern',
      title: 'Cycle Regularity',
      description: 'Your cycles have been consistent at 28 days for the past 3 months',
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
      severity: 'positive'
    },
    {
      type: 'symptom',
      title: 'Cramp Pattern',
      description: 'You experience mild cramps on days 1-2 of your period',
      icon: <AlertCircle className="w-6 h-6 text-yellow-400" />,
      severity: 'neutral'
    },
    {
      type: 'mood',
      title: 'Mood Trends',
      description: 'Your mood tends to be more positive during the follicular phase',
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      severity: 'positive'
    },
    {
      type: 'health',
      title: 'Sleep Quality',
      description: 'Consider improving sleep hygiene during your luteal phase',
      icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
      severity: 'suggestion'
    }
  ]

  const predictions = [
    {
      title: 'Next Period',
      date: 'January 28, 2024',
      confidence: 85,
      days: 3
    },
    {
      title: 'Ovulation Window',
      date: 'January 14-16, 2024',
      confidence: 78,
      days: -11
    },
    {
      title: 'Fertile Window',
      date: 'January 12-18, 2024',
      confidence: 82,
      days: -13
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'patterns', label: 'Patterns', icon: <Calendar className="w-5 h-5" /> },
    { id: 'predictions', label: 'Predictions', icon: <Heart className="w-5 h-5" /> }
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
            <TrendingUp className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Insights</h1>
          </div>
          
          <div className="w-20"></div>
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
        {activeTab === 'overview' && (
          <>
            {/* Key Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-white">Key Insights</h2>
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-dark p-4 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{insight.title}</h3>
                    <p className="text-charcoal-300 text-sm">{insight.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Cycle Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Recent Cycle Data</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cycleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1d20', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="flow" stroke="#ec4899" strokeWidth={2} />
                    <Line type="monotone" dataKey="mood" stroke="#fbbf24" strokeWidth={2} />
                    <Line type="monotone" dataKey="symptoms" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'patterns' && (
          <>
            {/* Mood Patterns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Mood Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="mood" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1d20', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="count" fill="#dc2626" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Symptom Patterns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Common Symptoms</h3>
              <div className="space-y-3">
                {[
                  { symptom: 'Cramps', frequency: '85%', severity: 'Mild' },
                  { symptom: 'Mood Swings', frequency: '70%', severity: 'Moderate' },
                  { symptom: 'Fatigue', frequency: '60%', severity: 'Mild' },
                  { symptom: 'Bloating', frequency: '45%', severity: 'Mild' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{item.symptom}</div>
                      <div className="text-sm text-charcoal-400">Severity: {item.severity}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-crimson-400 font-semibold">{item.frequency}</div>
                      <div className="text-xs text-charcoal-400">of cycles</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'predictions' && (
          <>
            {/* Predictions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-white">Cycle Predictions</h2>
              {predictions.map((prediction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-dark p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{prediction.title}</h3>
                    <div className="text-sm text-charcoal-400">
                      {prediction.days > 0 ? `in ${prediction.days} days` : `${Math.abs(prediction.days)} days ago`}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-charcoal-300">{prediction.date}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-charcoal-700 rounded-full h-2">
                        <div 
                          className="bg-crimson-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-charcoal-400">{prediction.confidence}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Health Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-dark"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Personalized Health Tips</h3>
              <div className="space-y-3">
                {[
                  'Stay hydrated during your period to reduce bloating',
                  'Consider light exercise to help with cramps',
                  'Maintain a consistent sleep schedule throughout your cycle',
                  'Track your mood patterns to better understand your cycle'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-charcoal-700 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-charcoal-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
