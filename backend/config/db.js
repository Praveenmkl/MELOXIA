const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MONGODB_URI (not MONGO_URI)
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('MongoDB URI is not defined in environment variables');
      return;
    }
    
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error: ", error);
    // Don't exit in serverless - just log the error
  }
};

module.exports = connectDB;
