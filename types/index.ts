export interface User {
  _id: string
  email?: string
  name: string
  avatar: string
  age: number
  weight: number
  cycleLength: number
  periodLength: number
  lastPeriodDate: Date
  isGuest: boolean
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  theme: 'dark' | 'light'
  language: 'en' | 'hi'
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export interface NotificationSettings {
  periodReminder: boolean
  ovulationReminder: boolean
  waterReminder: boolean
  selfCareReminder: boolean
  productRefillReminder: boolean
  reminderTime: string
}

export interface PrivacySettings {
  dataSharing: boolean
  anonymousMode: boolean
  locationSharing: boolean
}

export interface CycleLog {
  _id: string
  userId: string
  date: Date
  flowIntensity: 'light' | 'medium' | 'heavy'
  symptoms: Symptom[]
  notes: string
  selfCareActivities: SelfCareActivity[]
  mood: Mood
  createdAt: Date
  updatedAt: Date
}

export interface Symptom {
  type: 'cramps' | 'mood_swings' | 'skin_issues' | 'sleep_issues' | 'bloating' | 'headache' | 'fatigue' | 'other'
  severity: 'mild' | 'moderate' | 'severe'
  description?: string
}

export interface SelfCareActivity {
  type: 'meditation' | 'exercise' | 'yoga' | 'warm_bath' | 'rest' | 'healthy_eating' | 'journaling' | 'other'
  duration?: number
  description?: string
}

export interface Mood {
  type: 'happy' | 'sad' | 'anxious' | 'irritable' | 'energetic' | 'tired' | 'calm' | 'stressed'
  intensity: number // 1-5 scale
}

export interface CyclePrediction {
  nextPeriod: Date
  ovulationDate: Date
  fertileWindow: {
    start: Date
    end: Date
  }
  cyclePhase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal'
  confidence: number
}

export interface HealthInsight {
  type: 'cycle_pattern' | 'symptom_trend' | 'mood_pattern' | 'health_tip'
  title: string
  description: string
  severity?: 'low' | 'medium' | 'high'
  actionable: boolean
  actionText?: string
}

export interface CommunityPost {
  _id: string
  userId: string
  title: string
  content: string
  category: 'question' | 'tip' | 'support' | 'discussion'
  isAnonymous: boolean
  likes: number
  comments: Comment[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  _id: string
  userId: string
  content: string
  isAnonymous: boolean
  likes: number
  createdAt: Date
}

export interface Resource {
  _id: string
  name: string
  type: 'clinic' | 'helpline' | 'video' | 'article'
  location?: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  contact?: {
    phone: string
    email: string
    website: string
  }
  description: string
  category: string
  isVerified: boolean
  rating?: number
}

export interface EducationModule {
  _id: string
  title: string
  content: string
  category: 'hygiene' | 'products' | 'nutrition' | 'stigma' | 'health'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  isInteractive: boolean
  quiz?: QuizQuestion[]
  resources: string[]
  createdAt: Date
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Reminder {
  _id: string
  userId: string
  type: 'period' | 'ovulation' | 'water' | 'self_care' | 'product_refill'
  title: string
  message: string
  scheduledTime: Date
  isActive: boolean
  frequency: 'daily' | 'weekly' | 'monthly' | 'once'
  createdAt: Date
}

export interface AppState {
  user: User | null
  currentCycle: CyclePrediction | null
  recentLogs: CycleLog[]
  insights: HealthInsight[]
  isLoading: boolean
  error: string | null
}

export interface NavigationItem {
  name: string
  href: string
  icon: string
  badge?: number
}

export interface ChartData {
  date: string
  flow: number
  mood: number
  symptoms: number
}

export interface LocationData {
  country: string
  state: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
}
