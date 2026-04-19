'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Heart, Shield, Users, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to Rakt Rahasya",
    subtitle: "Your journey to menstrual health awareness starts here",
    content: (
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full mx-auto mb-8 flex items-center justify-center float-animation">
          <Heart className="w-16 h-16 text-white" />
        </div>
        <p className="text-lg text-charcoal-300 leading-relaxed">
          We're here to support you on your menstrual health journey with 
          tracking, education, and a caring community.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Track Your Cycle",
    subtitle: "Monitor your periods, symptoms, and mood",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "🩸", label: "Flow Tracking" },
            { icon: "😊", label: "Mood Logging" },
            { icon: "📅", label: "Cycle Calendar" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark text-center p-4"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm text-charcoal-300">{item.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-charcoal-300 text-center">
          Keep track of your menstrual cycle with our intuitive and private tracking system.
        </p>
      </div>
    )
  },
  {
    id: 3,
    title: "Learn & Grow",
    subtitle: "Access educational content and health insights",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <BookOpen className="w-6 h-6" />, label: "Education Hub" },
            { icon: <Shield className="w-6 h-6" />, label: "Health Tips" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark p-4 flex items-center space-x-3"
            >
              <div className="text-crimson-500">{item.icon}</div>
              <span className="text-white font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-charcoal-300 text-center">
          Get personalized insights and learn about menstrual health from trusted sources.
        </p>
      </div>
    )
  },
  {
    id: 4,
    title: "Join Our Community",
    subtitle: "Connect with others in a safe, supportive space",
    content: (
      <div className="space-y-6">
        <div className="card-dark p-6 text-center">
          <Users className="w-12 h-12 text-crimson-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Truth Circle</h3>
          <p className="text-charcoal-300">
            Share experiences, ask questions, and support each other in our 
            anonymous community forum.
          </p>
        </div>
        <p className="text-charcoal-300 text-center">
          You're not alone. Join thousands of women supporting each other.
        </p>
      </div>
    )
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-crimson-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card-dark max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">
            You're All Set!
          </h1>
          
          <p className="text-charcoal-300 mb-8">
            Ready to start your menstrual health journey? Choose how you'd like to begin.
          </p>
          
          <div className="space-y-4">
            <Link href="/register" className="btn-primary w-full block">
              Create Account
            </Link>
            <Link href="/dashboard" className="btn-secondary w-full block">
              Continue as Guest
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-crimson-900">
      {/* Header */}
      <div className="p-6">
        <Logo size="sm" />
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-charcoal-400">
            Step {currentStep + 1} of {onboardingSteps.length}
          </span>
          <span className="text-sm text-charcoal-400">
            {Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-charcoal-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-crimson-500 to-softPink-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-lg text-softPink-300 mb-8">
              {currentStepData.subtitle}
            </p>
            
            <div className="mb-12">
              {currentStepData.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              currentStep === 0
                ? 'text-charcoal-500 cursor-not-allowed'
                : 'text-charcoal-300 hover:text-white'
            }`}
          >
            Back
          </button>
          
          <button
            onClick={nextStep}
            className="btn-primary flex items-center space-x-2"
          >
            <span>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
