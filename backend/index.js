// Vercel serverless function entry point
const app = require('./server');

// Export the Express app directly - Vercel will handle the serverless wrapper
module.exports = app;

// Alternative export for Vercel (compatibility)
module.exports.default = app;
