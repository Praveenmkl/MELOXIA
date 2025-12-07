require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!');
    
    // List databases
    const admin = mongoose.connection.db.admin();
    const { databases } = await admin.listDatabases();
    console.log('\nAvailable databases:');
    databases.forEach(db => console.log(`- ${db.name}`));
    
    // Test User model
    const User = require('./model/user');
    console.log('\n✅ User model loaded successfully');
    
    // Check if users collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nCollections in current database:');
    collections.forEach(col => console.log(`- ${col.name}`));
    
    await mongoose.connection.close();
    console.log('\n✅ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database test failed:', error.message);
    process.exit(1);
  }
};

testConnection();
