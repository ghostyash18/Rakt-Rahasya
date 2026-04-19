'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Activity, StickyNote, Heart } from 'lucide-react'

interface QuickLogProps {
  onLogComplete?: (data: any) => void
}

export default function QuickLog({ onLogComplete }: QuickLogProps) {
  const [flowIntensity, setFlowIntensity] = useState<'light' | 'medium' | 'heavy' | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const symptomOptions = [
    'Cramps', 'Mood swings', 'Skin issues', 'Sleep issues', 
    'Bloating', 'Headache', 'Fatigue', 'Breast tenderness'
  ]

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const logData = {
      flowIntensity,
      symptoms,
      notes,
      date: new Date()
    }
    
    onLogComplete?.(logData)
    setIsSubmitting(false)
    
    // Reset form
    setFlowIntensity(null)
    setSymptoms([])
    setNotes('')
  }

  return (
    <div className="card-dark">
      <div className="flex items-center space-x-2 mb-6">
        <Heart className="w-6 h-6 text-crimson-500" />
        <h2 className="text-xl font-semibold text-white">Quick Log</h2>
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
              { value: 'light', label: 'Light', color: 'bg-softPink-300' },
              { value: 'medium', label: 'Medium', color: 'bg-softPink-500' },
              { value: 'heavy', label: 'Heavy', color: 'bg-crimson-500' }
            ].map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setFlowIntensity(option.value as any)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all
                  ${flowIntensity === option.value
                    ? 'border-crimson-500 bg-crimson-500/10'
                    : 'border-charcoal-600 bg-charcoal-700 hover:border-charcoal-500'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-3 h-3 rounded-full ${option.color}`} />
                <span className="text-white text-sm">{option.label}</span>
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
          <div className="grid grid-cols-2 gap-2">
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

        {/* Notes */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <StickyNote className="w-5 h-5 text-yellow-400" />
            <label className="text-white font-medium">Notes (Optional)</label>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling? Any additional notes..."
            className="w-full p-3 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:border-crimson-500 transition-colors resize-none"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!flowIntensity || isSubmitting}
          className={`
            w-full py-3 px-6 rounded-xl font-medium transition-all
            ${flowIntensity && !isSubmitting
              ? 'btn-primary'
              : 'bg-charcoal-700 text-charcoal-500 cursor-not-allowed'
            }
          `}
          whileHover={flowIntensity && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={flowIntensity && !isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? 'Logging...' : 'Log Today\'s Data'}
        </motion.button>
      </div>
    </div>
  )
}
