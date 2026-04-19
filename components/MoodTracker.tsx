'use client'

import { motion } from 'framer-motion'
import { Smile, Frown, Meh, Heart, Zap, Coffee, Moon, Sun } from 'lucide-react'

interface MoodTrackerProps {
  currentMood: string
  onMoodChange: (mood: string) => void
}

const moodOptions = [
  { id: 'happy', icon: <Smile className="w-6 h-6" />, label: 'Happy', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' },
  { id: 'sad', icon: <Frown className="w-6 h-6" />, label: 'Sad', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
  { id: 'calm', icon: <Meh className="w-6 h-6" />, label: 'Calm', color: 'text-green-400', bgColor: 'bg-green-400/20' },
  { id: 'energetic', icon: <Zap className="w-6 h-6" />, label: 'Energetic', color: 'text-orange-400', bgColor: 'bg-orange-400/20' },
  { id: 'tired', icon: <Coffee className="w-6 h-6" />, label: 'Tired', color: 'text-purple-400', bgColor: 'bg-purple-400/20' },
  { id: 'anxious', icon: <Moon className="w-6 h-6" />, label: 'Anxious', color: 'text-red-400', bgColor: 'bg-red-400/20' },
  { id: 'peaceful', icon: <Sun className="w-6 h-6" />, label: 'Peaceful', color: 'text-pink-400', bgColor: 'bg-pink-400/20' },
  { id: 'loved', icon: <Heart className="w-6 h-6" />, label: 'Loved', color: 'text-softPink-400', bgColor: 'bg-softPink-400/20' }
]

export default function MoodTracker({ currentMood, onMoodChange }: MoodTrackerProps) {
  return (
    <div className="card-dark">
      <h2 className="text-xl font-semibold text-white mb-4">How are you feeling today?</h2>
      
      <div className="grid grid-cols-4 gap-3">
        {moodOptions.map((mood, index) => (
          <motion.button
            key={mood.id}
            onClick={() => onMoodChange(mood.id)}
            className={`
              flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-200
              ${currentMood === mood.id 
                ? `${mood.bgColor} ${mood.color} border-2 border-current` 
                : 'bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 hover:text-white'
              }
            `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mood.icon}
            <span className="text-xs font-medium">{mood.label}</span>
          </motion.button>
        ))}
      </div>
      
      {currentMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-charcoal-700 rounded-lg"
        >
          <p className="text-sm text-charcoal-300">
            You're feeling <span className="text-white font-medium">
              {moodOptions.find(m => m.id === currentMood)?.label}
            </span> today. 
            {currentMood === 'happy' && " That's wonderful! 🌟"}
            {currentMood === 'sad' && " Remember, it's okay to feel this way. 💙"}
            {currentMood === 'calm' && " A peaceful state of mind. 🧘‍♀️"}
            {currentMood === 'energetic' && " Channel that energy! ⚡"}
            {currentMood === 'tired' && " Take some time to rest. 😴"}
            {currentMood === 'anxious' && " Take deep breaths. You're safe. 🌸"}
            {currentMood === 'peaceful' && " Embrace this tranquility. ☀️"}
            {currentMood === 'loved' && " You are loved and valued. 💕"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
