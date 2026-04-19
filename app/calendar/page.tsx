'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Calendar as CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import CycleCalendar from '@/components/CycleCalendar'
import DayLogModal from '@/components/DayLogModal'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showLogModal, setShowLogModal] = useState(false)
  const [currentDate] = useState(new Date())

  // Mock cycle data
  const cycleData = {
    currentDay: 5,
    cycleLength: 28,
    periodLength: 5,
    nextPeriod: 23,
    phase: 'follicular' as const
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setShowLogModal(true)
  }

  const handleLogComplete = (logData: any) => {
    console.log('Log completed:', logData)
    setShowLogModal(false)
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
            <CalendarIcon className="w-6 h-6 text-crimson-500" />
            <h1 className="text-2xl font-bold text-white">Cycle Calendar</h1>
          </div>
          
          <button 
            onClick={() => setShowLogModal(true)}
            className="p-2 bg-crimson-600 hover:bg-crimson-700 rounded-full transition-colors"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Cycle Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark mb-6"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-crimson-500 mb-1">
                {cycleData.currentDay}
              </div>
              <div className="text-sm text-charcoal-400">Current Day</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-softPink-500 mb-1">
                {cycleData.cycleLength}
              </div>
              <div className="text-sm text-charcoal-400">Cycle Length</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500 mb-1">
                {cycleData.nextPeriod}
              </div>
              <div className="text-sm text-charcoal-400">Days to Period</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Calendar */}
      <div className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-dark"
        >
          <CycleCalendar
            currentDate={currentDate}
            cycleData={cycleData}
            onDateSelect={handleDateSelect}
          />
        </motion.div>

        {/* Recent Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Recent Logs</h2>
          
          <div className="space-y-3">
            {[
              { date: '2024-01-15', flow: 'Medium', mood: 'Happy', symptoms: ['Cramps'] },
              { date: '2024-01-14', flow: 'Light', mood: 'Calm', symptoms: [] },
              { date: '2024-01-13', flow: 'Heavy', mood: 'Tired', symptoms: ['Cramps', 'Fatigue'] },
            ].map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-dark p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {new Date(log.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {new Date(log.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-sm text-charcoal-400">
                      Flow: {log.flow} • Mood: {log.mood}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {log.symptoms.length > 0 && (
                    <div className="text-xs text-charcoal-400 mb-1">
                      {log.symptoms.length} symptom{log.symptoms.length > 1 ? 's' : ''}
                    </div>
                  )}
                  <button className="text-crimson-400 hover:text-crimson-300 text-sm">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Day Log Modal */}
      {showLogModal && (
        <DayLogModal
          date={selectedDate}
          onClose={() => setShowLogModal(false)}
          onComplete={handleLogComplete}
        />
      )}
    </div>
  )
}
