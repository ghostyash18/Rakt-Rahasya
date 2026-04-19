const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rakt-rahasya', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  avatar: { type: String, default: '1' },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  cycleLength: { type: Number, default: 28 },
  periodLength: { type: Number, default: 5 },
  lastPeriodDate: { type: Date, required: true },
  isGuest: { type: Boolean, default: false },
  preferences: {
    theme: { type: String, default: 'dark' },
    language: { type: String, default: 'en' },
    notifications: {
      periodReminder: { type: Boolean, default: true },
      ovulationReminder: { type: Boolean, default: true },
      waterReminder: { type: Boolean, default: true },
      selfCareReminder: { type: Boolean, default: true },
      productRefillReminder: { type: Boolean, default: true },
      reminderTime: { type: String, default: '09:00' }
    },
    privacy: {
      dataSharing: { type: Boolean, default: false },
      anonymousMode: { type: Boolean, default: true },
      locationSharing: { type: Boolean, default: false }
    }
  }
}, { timestamps: true });

// Cycle Log Schema
const cycleLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  flowIntensity: { type: String, enum: ['light', 'medium', 'heavy'], required: true },
  symptoms: [{
    type: { type: String, required: true },
    severity: { type: String, enum: ['mild', 'moderate', 'severe'], required: true },
    description: String
  }],
  notes: String,
  selfCareActivities: [{
    type: { type: String, required: true },
    duration: Number,
    description: String
  }],
  mood: {
    type: { type: String, required: true },
    intensity: { type: Number, min: 1, max: 5, required: true }
  }
}, { timestamps: true });

// Community Post Schema
const communityPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['question', 'tip', 'support', 'discussion'], required: true },
  isAnonymous: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isAnonymous: { type: Boolean, default: true },
    likes: { type: Number, default: 0 }
  }],
  tags: [String]
}, { timestamps: true });

// Resource Schema
const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['clinic', 'helpline', 'video', 'article'], required: true },
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

// Education Module Schema
const educationModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['hygiene', 'products', 'nutrition', 'stigma', 'health'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  estimatedTime: { type: Number, required: true },
  isInteractive: { type: Boolean, default: false },
  quiz: [{
    question: { type: String, required: true },
    options: [String],
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true }
  }],
  resources: [String]
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const CycleLog = mongoose.model('CycleLog', cycleLogSchema);
const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);
const Resource = mongoose.model('Resource', resourceSchema);
const EducationModule = mongoose.model('EducationModule', educationModuleSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, age, weight, lastPeriodDate } = req.body;
    
    // Check if user already exists
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // Hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create user
    const user = new User({
      email: email || null,
      name,
      age,
      weight,
      lastPeriodDate: new Date(lastPeriodDate),
      isGuest: !email
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isGuest: user.isGuest
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For now, we'll skip password verification for demo purposes
    // In production, you'd verify the password here

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isGuest: user.isGuest
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      age: user.age,
      weight: user.weight,
      cycleLength: user.cycleLength,
      periodLength: user.periodLength,
      lastPeriodDate: user.lastPeriodDate,
      isGuest: user.isGuest,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        age: user.age,
        weight: user.weight,
        cycleLength: user.cycleLength,
        periodLength: user.periodLength,
        lastPeriodDate: user.lastPeriodDate,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cycle Log Routes
app.post('/api/cycle-logs', authenticateToken, async (req, res) => {
  try {
    const logData = {
      ...req.body,
      userId: req.user.userId,
      date: new Date(req.body.date)
    };

    const cycleLog = new CycleLog(logData);
    await cycleLog.save();

    res.status(201).json({
      message: 'Cycle log created successfully',
      log: cycleLog
    });
  } catch (error) {
    console.error('Cycle log creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cycle-logs', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.user.userId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const logs = await CycleLog.find(query).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    console.error('Cycle logs fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Community Routes
app.get('/api/community/posts', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};

    const posts = await CommunityPost.find(query)
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(posts);
  } catch (error) {
    console.error('Community posts fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/community/posts', authenticateToken, async (req, res) => {
  try {
    const postData = {
      ...req.body,
      userId: req.user.userId
    };

    const post = new CommunityPost(postData);
    await post.save();

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Community post creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Resources Routes
app.get('/api/resources', async (req, res) => {
  try {
    const { type, category, location } = req.query;
    const query = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (location) {
      // Add location-based filtering logic here
    }

    const resources = await Resource.find(query);
    res.json(resources);
  } catch (error) {
    console.error('Resources fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Education Routes
app.get('/api/education/modules', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const modules = await EducationModule.find(query);
    res.json(modules);
  } catch (error) {
    console.error('Education modules fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Insights Routes
app.get('/api/insights', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get recent cycle logs
    const recentLogs = await CycleLog.find({ userId: req.user.userId })
      .sort({ date: -1 })
      .limit(30);

    // Calculate cycle predictions (simplified)
    const lastPeriod = new Date(user.lastPeriodDate);
    const cycleLength = user.cycleLength;
    const nextPeriod = new Date(lastPeriod.getTime() + (cycleLength * 24 * 60 * 60 * 1000));
    const ovulationDate = new Date(lastPeriod.getTime() + ((cycleLength / 2) * 24 * 60 * 60 * 1000));

    const insights = {
      nextPeriod: nextPeriod,
      ovulationDate: ovulationDate,
      fertileWindow: {
        start: new Date(ovulationDate.getTime() - (3 * 24 * 60 * 60 * 1000)),
        end: new Date(ovulationDate.getTime() + (3 * 24 * 60 * 60 * 1000))
      },
      cyclePhase: 'follicular', // This would be calculated based on current date
      confidence: 85,
      recentLogs: recentLogs
    };

    res.json(insights);
  } catch (error) {
    console.error('Insights fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Rakt Rahasya API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
