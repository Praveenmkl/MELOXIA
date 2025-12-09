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

// Handle OPTIONS preflight requests - use regex instead of * for Express 5
app.options(/.*/, (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

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

// Initialize DB connection (don't block on it)
connectToDatabase().catch(err => console.error('DB init error:', err));

// Basic route
app.get('/', (req, res) => {
  try {
    res.json({ 
      message: 'Meloxia Studio API Server is running',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Root route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  try {
    res.json({ 
      status: 'ok',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ error: 'Health check failed' });
  }
});

// Import routes with error handling
try {
  const authRoutes = require('../routes/auth');
  app.use('/auth', authRoutes);
  console.log('Auth routes loaded successfully');
} catch (error) {
  console.error('Error loading auth routes:', error.message, error.stack);
  // Create fallback auth routes with detailed error
  app.post('/auth/login', (req, res) => {
    res.status(503).json({ 
      success: false,
      message: 'Auth service temporarily unavailable', 
      error: error.message,
      hint: 'Check if JWT_SECRET and MONGODB_URI environment variables are set'
    });
  });
  app.post('/auth/register', (req, res) => {
    res.status(503).json({ 
      success: false,
      message: 'Auth service temporarily unavailable', 
      error: error.message,
      hint: 'Check if JWT_SECRET and MONGODB_URI environment variables are set'
    });
  });
}

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler - MUST be last
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message, err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Export the Express app
module.exports = app;
