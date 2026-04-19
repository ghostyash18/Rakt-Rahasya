'use client'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
      </motion.div>
      {showText && (
        <span className={`${textSizes[size]} font-bold text-gradient`}>
          Rakt Rahasya
        </span>
      )}
    </div>
  )
}
