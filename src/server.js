const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 EXPENSE TRACKER API               ║
╠════════════════════════════════════════╣
║ Server running on: http://localhost:${PORT}   ║
║ Environment: ${NODE_ENV.padEnd(27)}║
║ Health Check: /health                  ║
║ API Prefix: /api/v1                    ║
╚════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  server.close(() => process.exit(1));
});

module.exports = server;
