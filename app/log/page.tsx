'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Calendar, Heart } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function LogPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [flowIntensity, setFlowIntensity] = useState<'light' | 'medium' | 'heavy' | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [mood, setMood] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [selfCare, setSelfCare] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const symptomOptions = [
    'Cramps', 'Mood swings', 'Skin issues', 'Sleep issues', 
    'Bloating', 'Headache', 'Fatigue', 'Breast tenderness', 'Nausea', 'Back pain'
  ]

  const moodOptions = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'text-yellow-400' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'text-blue-400' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'text-red-400' },
    { id: 'irritable', label: 'Irritable', emoji: '😤', color: 'text-orange-400' },
    { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'text-green-400' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: 'text-purple-400' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'text-teal-400' },
    { id: 'stressed', label: 'Stressed', emoji: '😫', color: 'text-pink-400' }
  ]

  const selfCareOptions = [
    'Meditation', 'Exercise', 'Yoga', 'Warm bath', 'Rest', 
    'Healthy eating', 'Journaling', 'Reading', 'Music', 'Nature walk'
  ]

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSelfCareToggle = (activity: string) => {
    setSelfCare(prev => 
      prev.includes(activity) 
        ? prev.filter(s => s !== activity)
        : [...prev, activity]
    )
  }

  const handleSubmit = async () => {
    if (!flowIntensity) {
      toast.error('Please select your flow intensity')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const logData = {
        date: selectedDate,
        flowIntensity,
        symptoms,
        mood,
        notes,
        selfCare,
        timestamp: new Date()
      }
      
      // In a real app, this would save to the backend
      console.log('Log data:', logData)
      
      toast.success('Log entry saved successfully!')
      
      // Reset form
      setFlowIntensity(null)
      setSymptoms([])
      setMood('')
      setNotes('')
      setSelfCare([])
      
    } catch (error) {
      toast.error('Failed to save log entry')
    } finally {
      setIsSubmitting(false)
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
            <h1 className="text-2xl font-bold text-white">Daily Log</h1>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Date Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark mb-6"
        >
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-crimson-500" />
            <div>
              <h3 className="text-white font-medium">Logging for</h3>
              <p className="text-charcoal-400">
                {format(selectedDate, 'EEEE, MMMM do, yyyy')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Content */}
      <div className="px-6 space-y-6 pb-20">
        {/* Flow Intensity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-dark"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Flow Intensity</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                value: 'light', 
                label: 'Light', 
                color: 'bg-softPink-300', 
                description: 'Light spotting or very light flow',
                icon: '🩸'
              },
              { 
                value: 'medium', 
                label: 'Medium', 
                color: 'bg-softPink-500', 
                description: 'Normal menstrual flow',
                icon: '🩸'
              },
              { 
                value: 'heavy', 
                label: 'Heavy', 
                color: 'bg-crimson-500', 
                description: 'Heavy flow requiring frequent changes',
                icon: '🩸'
              }
            ].map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setFlowIntensity(option.value as any)}
                className={`
                  p-4 rounded-xl border-2 transition-all text-center
                  ${flowIntensity === option.value
                    ? 'border-crimson-500 bg-crimson-500/10'
                    : 'border-charcoal-600 bg-charcoal-700 hover:border-charcoal-500'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className={`w-4 h-4 rounded-full ${option.color} mx-auto mb-2`} />
                <div className="text-white font-medium mb-1">{option.label}</div>
                <div className="text-xs text-charcoal-400">{option.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Mood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-dark"
        >
          <h2 className="text-xl font-semibold text-white mb-4">How are you feeling?</h2>
          <div className="grid grid-cols-4 gap-3">
            {moodOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setMood(option.id)}
                className={`
                  p-4 rounded-xl text-center transition-all
                  ${mood === option.id
                    ? 'bg-crimson-500/20 text-crimson-400 border-2 border-crimson-500'
                    : 'bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 hover:text-white border-2 border-transparent'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Symptoms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-dark"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Symptoms</h2>
          <div className="grid grid-cols-3 gap-3">
            {symptomOptions.map((symptom) => (
              <motion.button
                key={symptom}
                onClick={() => handleSymptomToggle(symptom)}
                className={`
                  p-3 rounded-lg text-sm transition-all
                  ${symptoms.includes(symptom)
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {symptom}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Self-Care Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-dark"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Self-Care Activities</h2>
          <div className="grid grid-cols-3 gap-3">
            {selfCareOptions.map((activity) => (
              <motion.button
                key={activity}
                onClick={() => handleSelfCareToggle(activity)}
                className={`
                  p-3 rounded-lg text-sm transition-all
                  ${selfCare.includes(activity)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activity}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-dark"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Additional Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling today? Any additional thoughts or observations..."
            className="w-full p-4 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:border-crimson-500 transition-colors resize-none"
            rows={4}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pb-6"
        >
          <motion.button
            onClick={handleSubmit}
            disabled={!flowIntensity || isSubmitting}
            className={`
              w-full py-4 px-6 rounded-xl font-medium transition-all flex items-center justify-center space-x-2
              ${flowIntensity && !isSubmitting
                ? 'btn-primary'
                : 'bg-charcoal-700 text-charcoal-500 cursor-not-allowed'
              }
            `}
            whileHover={flowIntensity && !isSubmitting ? { scale: 1.02 } : {}}
            whileTap={flowIntensity && !isSubmitting ? { scale: 0.98 } : {}}
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? 'Saving...' : 'Save Log Entry'}</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
