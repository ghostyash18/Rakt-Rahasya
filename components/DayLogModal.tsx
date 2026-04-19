'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Droplets, Activity, StickyNote, Heart, Save } from 'lucide-react'
import { format } from 'date-fns'

interface DayLogModalProps {
  date: Date
  onClose: () => void
  onComplete: (data: any) => void
}

export default function DayLogModal({ date, onClose, onComplete }: DayLogModalProps) {
  const [flowIntensity, setFlowIntensity] = useState<'light' | 'medium' | 'heavy' | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [mood, setMood] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [selfCare, setSelfCare] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const symptomOptions = [
    'Cramps', 'Mood swings', 'Skin issues', 'Sleep issues', 
    'Bloating', 'Headache', 'Fatigue', 'Breast tenderness', 'Nausea'
  ]

  const moodOptions = [
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'anxious', label: 'Anxious', emoji: '😰' },
    { id: 'irritable', label: 'Irritable', emoji: '😤' },
    { id: 'energetic', label: 'Energetic', emoji: '⚡' },
    { id: 'tired', label: 'Tired', emoji: '😴' },
    { id: 'calm', label: 'Calm', emoji: '😌' },
    { id: 'stressed', label: 'Stressed', emoji: '😫' }
  ]

  const selfCareOptions = [
    'Meditation', 'Exercise', 'Yoga', 'Warm bath', 'Rest', 
    'Healthy eating', 'Journaling', 'Reading', 'Music'
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
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const logData = {
      date,
      flowIntensity,
      symptoms,
      mood,
      notes,
      selfCare,
      timestamp: new Date()
    }
    
    onComplete(logData)
    setIsSubmitting(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-charcoal-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Log Entry</h2>
              <p className="text-charcoal-400">
                {format(date, 'EEEE, MMMM do, yyyy')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-charcoal-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Flow Intensity */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Droplets className="w-5 h-5 text-softPink-400" />
                <label className="text-white font-medium">Flow Intensity</label>
              </div>
              <div className="flex space-x-4">
                {[
                  { value: 'light', label: 'Light', color: 'bg-softPink-300', description: 'Light spotting' },
                  { value: 'medium', label: 'Medium', color: 'bg-softPink-500', description: 'Normal flow' },
                  { value: 'heavy', label: 'Heavy', color: 'bg-crimson-500', description: 'Heavy flow' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setFlowIntensity(option.value as any)}
                    className={`
                      flex-1 p-4 rounded-xl border-2 transition-all text-center
                      ${flowIntensity === option.value
                        ? 'border-crimson-500 bg-crimson-500/10'
                        : 'border-charcoal-600 bg-charcoal-700 hover:border-charcoal-500'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-4 h-4 rounded-full ${option.color} mx-auto mb-2`} />
                    <div className="text-white font-medium mb-1">{option.label}</div>
                    <div className="text-xs text-charcoal-400">{option.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mood */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5 text-crimson-400" />
                <label className="text-white font-medium">Mood</label>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {moodOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setMood(option.id)}
                    className={`
                      p-3 rounded-lg text-center transition-all
                      ${mood === option.id
                        ? 'bg-crimson-500/20 text-crimson-400 border border-crimson-500/30'
                        : 'bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 hover:text-white'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-xs">{option.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <label className="text-white font-medium">Symptoms</label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {symptomOptions.map((symptom) => (
                  <motion.button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`
                      p-2 rounded-lg text-sm transition-all
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
            </div>

            {/* Self-Care Activities */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5 text-green-400" />
                <label className="text-white font-medium">Self-Care Activities</label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {selfCareOptions.map((activity) => (
                  <motion.button
                    key={activity}
                    onClick={() => handleSelfCareToggle(activity)}
                    className={`
                      p-2 rounded-lg text-sm transition-all
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
            </div>

            {/* Notes */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <StickyNote className="w-5 h-5 text-yellow-400" />
                <label className="text-white font-medium">Notes (Optional)</label>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How are you feeling? Any additional notes about your day..."
                className="w-full p-3 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:border-crimson-500 transition-colors resize-none"
                rows={4}
              />
            </div>

            {/* Submit Button */}
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
