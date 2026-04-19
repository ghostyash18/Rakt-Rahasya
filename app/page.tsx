'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/dashboard')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-crimson-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-crimson-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-softPink-300">Loading Rakt Rahasya...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-crimson-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crimson-600/20 to-softPink-600/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full mx-auto flex items-center justify-center mb-4 pulse-glow">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
                Rakt Rahasya
              </h1>
              <p className="text-xl text-softPink-200 font-medium">
                Track Your Cycle. Own Your Power.
              </p>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-charcoal-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              A supportive space for menstrual health tracking and awareness. 
              Empowering girls and young women with knowledge, community, and care.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/onboarding" className="btn-primary text-lg px-8 py-4">
                Get Started
              </Link>
              <Link href="/login" className="btn-secondary text-lg px-8 py-4">
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-charcoal-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-charcoal-300 max-w-2xl mx-auto">
              Comprehensive tools and resources for your menstrual health journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Cycle Tracking",
                description: "Track your periods, symptoms, and mood with our intuitive interface"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Privacy First",
                description: "Your data is secure and private. Anonymous mode available for community features"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Supportive Community",
                description: "Connect with others in our safe, moderated Truth Circle community"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Education Hub",
                description: "Learn about menstrual health, hygiene, and break the stigma"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-dark text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-crimson-500 to-softPink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-charcoal-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-charcoal-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-crimson-500 mr-2" />
            <span className="text-xl font-semibold text-white">Rakt Rahasya</span>
          </div>
          <p className="text-charcoal-400 mb-4">
            Empowering women through menstrual health awareness
          </p>
          <div className="flex justify-center space-x-6 text-sm text-charcoal-500">
            <Link href="/privacy" className="hover:text-crimson-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-crimson-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-crimson-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
