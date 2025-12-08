const mongoose = require('mongoose');

// Cache connection for Vercel serverless
let cachedConnection = null;

const connectDB = async () => {
  // Return cached connection if exists
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    // Use MONGODB_URI (not MONGO_URI)
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('MongoDB URI is not defined in environment variables');
      return null;
    }
    
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });
    
    console.log("MongoDB Connected");
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("DB Error: ", error.message);
    return null;
  }
};

module.exports = connectDB;
