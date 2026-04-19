'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'

interface CycleCalendarProps {
  currentDate: Date
  cycleData: {
    currentDay: number
    cycleLength: number
    periodLength: number
    nextPeriod: number
    phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal'
  }
  compact?: boolean
  onDateSelect?: (date: Date) => void
}

export default function CycleCalendar({ 
  currentDate, 
  cycleData, 
  compact = false, 
  onDateSelect 
}: CycleCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [currentMonth, setCurrentMonth] = useState(currentDate)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Calculate cycle days for the month
  const getCycleDay = (date: Date) => {
    // This is a simplified calculation - in a real app, you'd use actual cycle data
    const daysSinceLastPeriod = Math.floor((date.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)) % cycleData.cycleLength
    return daysSinceLastPeriod + 1
  }

  const getDayType = (date: Date) => {
    const cycleDay = getCycleDay(date)
    
    if (cycleDay <= cycleData.periodLength) {
      return 'period'
    } else if (cycleDay === Math.floor(cycleData.cycleLength / 2)) {
      return 'ovulation'
    } else if (cycleDay > Math.floor(cycleData.cycleLength / 2) - 3 && cycleDay < Math.floor(cycleData.cycleLength / 2) + 3) {
      return 'fertile'
    }
    return 'normal'
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onDateSelect?.(date)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1))
  }

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-7 gap-1 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-xs text-charcoal-400 font-medium py-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {monthDays.slice(0, 14).map((date, index) => {
            const dayType = getDayType(date)
            const isSelected = isSameDay(date, selectedDate)
            const isToday = isSameDay(date, new Date())
            
            return (
              <motion.button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`
                  cycle-day text-xs
                  ${dayType === 'period' ? 'period' : ''}
                  ${dayType === 'ovulation' ? 'ovulation' : ''}
                  ${dayType === 'fertile' ? 'fertile' : ''}
                  ${isSelected ? 'active' : ''}
                  ${isToday ? 'ring-2 ring-crimson-500' : ''}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {format(date, 'd')}
              </motion.button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 text-charcoal-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-semibold text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 text-charcoal-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-sm text-charcoal-400 font-medium py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((date, index) => {
            const dayType = getDayType(date)
            const isSelected = isSameDay(date, selectedDate)
            const isToday = isSameDay(date, new Date())
            const isCurrentMonth = isSameMonth(date, currentMonth)
            
            return (
              <motion.button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={!isCurrentMonth}
                className={`
                  cycle-day
                  ${dayType === 'period' ? 'period' : ''}
                  ${dayType === 'ovulation' ? 'ovulation' : ''}
                  ${dayType === 'fertile' ? 'fertile' : ''}
                  ${isSelected ? 'active' : ''}
                  ${isToday ? 'ring-2 ring-crimson-500' : ''}
                  ${!isCurrentMonth ? 'opacity-30' : ''}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {format(date, 'd')}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-softPink-500 rounded-full"></div>
          <span className="text-charcoal-400">Period</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-charcoal-400">Ovulation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-charcoal-400">Fertile</span>
        </div>
      </div>
    </div>
  )
}
