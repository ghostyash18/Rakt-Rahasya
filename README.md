# Rakt Rahasya - Menstrual Health Tracking App

A comprehensive mobile app designed to empower girls and young women with menstrual hygiene tracking and awareness. Built with a warm, supportive, and slightly dark theme featuring deep reds, charcoal greys, and soft pink accent colors.

## 🌸 Features

### Core Functionality
- **Onboarding Experience**: Friendly illustrations and optional login/guest mode
- **Home Dashboard**: Current cycle day, next period countdown, mood tracking, and quick logging
- **Cycle Calendar**: Dark-mode styled calendar with tappable dates for viewing/editing logs
- **Daily Logging**: Comprehensive tracking of flow intensity, symptoms, notes, and self-care activities
- **AI-Powered Insights**: Personalized cycle predictions, fertility windows, and health tips
- **Education Center**: Articles and interactive modules on menstrual hygiene and health
- **Community Forum**: "Truth Circle" - anonymous community support with moderation
- **Reminder System**: Push notifications for periods, ovulation, water intake, and self-care
- **Resources Page**: Local clinics, helplines, and educational content with location detection
- **Profile Management**: Avatar selection, health info, and theme customization

### Design & UX
- **Dark Theme**: Deep reds, charcoal greys, and soft pink accents
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Optimized for both iOS and Android
- **Accessibility**: High contrast, readable typography, and screen reader support
- **CrimsonTruth Logo**: Consistent branding throughout the app

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Node-cron** - Scheduled tasks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rakt-rahasya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rakt-rahasya
   JWT_SECRET=your-jwt-secret-here
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start them separately
   npm run dev        # Frontend (port 3000)
   npm run server     # Backend (port 5000)
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 App Structure

```
rakt-rahasya/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard
│   ├── calendar/          # Cycle calendar view
│   ├── log/              # Daily logging
│   ├── insights/         # AI insights and analytics
│   ├── education/        # Education center
│   ├── community/        # Truth Circle forum
│   ├── resources/        # Local resources
│   ├── profile/          # User profile
│   └── onboarding/       # Onboarding flow
├── components/           # Reusable React components
├── server/              # Backend API server
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions
```

## 🔧 Key Components

### Frontend Components
- **CycleCalendar**: Interactive calendar with cycle tracking
- **MoodTracker**: Mood logging with emoji selection
- **QuickLog**: Streamlined daily logging interface
- **DayLogModal**: Detailed logging modal
- **Logo**: Consistent branding component

### Backend API Endpoints
- **Authentication**: `/api/auth/register`, `/api/auth/login`
- **User Management**: `/api/user/profile`
- **Cycle Logs**: `/api/cycle-logs`
- **Community**: `/api/community/posts`
- **Resources**: `/api/resources`
- **Education**: `/api/education/modules`
- **Insights**: `/api/insights`

## 🎨 Design System

### Color Palette
- **Primary Red**: `#dc2626` (Crimson)
- **Soft Pink**: `#ec4899` (Accent)
- **Charcoal**: `#1a1d20` (Background)
- **Dark Grey**: `#374151` (Secondary)

### Typography
- **Primary Font**: Inter (body text)
- **Display Font**: Poppins (headings)

### Components
- **Buttons**: Primary, secondary, and ghost variants
- **Cards**: Dark theme with subtle borders
- **Forms**: Consistent styling with focus states
- **Icons**: Lucide React icon library

## 🔒 Privacy & Security

- **Anonymous Mode**: Users can participate in community features anonymously
- **Data Encryption**: Sensitive data encrypted at rest
- **JWT Authentication**: Secure token-based authentication
- **Privacy Controls**: Granular privacy settings for data sharing
- **Local Storage**: Minimal data stored locally

## 📊 Features in Detail

### Cycle Tracking
- Flow intensity logging (light/medium/heavy)
- Symptom tracking with severity levels
- Mood logging with intensity scale
- Self-care activity tracking
- Notes and observations

### AI Insights
- Cycle pattern analysis
- Symptom trend identification
- Mood correlation analysis
- Personalized health recommendations
- Fertility window predictions

### Community Features
- Anonymous posting in Truth Circle
- Categorized discussions (questions, tips, support)
- Like and comment system
- Moderation and safety guidelines
- Verified user badges

### Educational Content
- Interactive modules on menstrual health
- Video tutorials and articles
- Quiz-based learning
- Progress tracking
- Difficulty levels (beginner/intermediate/advanced)

## 🌍 Localization

- **English**: Primary language
- **Hindi**: Secondary language support
- **Location-based Resources**: Automatic detection for India
- **Cultural Sensitivity**: Content adapted for Indian context

## 📱 Mobile Optimization

- **Responsive Design**: Works on all screen sizes
- **Touch-friendly**: Optimized for mobile interactions
- **Offline Support**: Core features work without internet
- **PWA Ready**: Can be installed as a mobile app
- **Performance**: Optimized loading and smooth animations

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel or your preferred platform
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Designed with love for women's health and empowerment
- Built with accessibility and inclusivity in mind
- Inspired by the need for better menstrual health education in India

## 📞 Support

For support, email support@raktrahasya.com or join our community forum.

---

**Rakt Rahasya** - Track Your Cycle. Own Your Power. 🌸
