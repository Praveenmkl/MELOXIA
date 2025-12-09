// Serverless function for Vercel
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow all Vercel and custom domains
    if (!origin || origin.includes('vercel.app') || origin.includes('meloxia.me')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));

app.use(express.json());
app.use(cookieParser());

// MongoDB connection with caching
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      cachedDb = mongoose.connection;
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
  
  return cachedDb;
}

// Initialize DB connection
connectToDatabase().catch(console.error);

// Import routes
try {
  const authRoutes = require('../routes/auth');
  app.use('/auth', authRoutes);
} catch (error) {
  console.error('Error loading routes:', error.message);
}

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Meloxia Studio API Server is running',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message
  });
});

module.exports = app;
