import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/image_caption_db';

// Add robust connection options
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  heartbeatFrequencyMS: 2000, // Check connection status every 2 seconds
  retryWrites: true,
  retryReads: true,
  w: 'majority',
  maxPoolSize: 10,
  minPoolSize: 2,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Handle connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
});

// Add ping to check connection
const pingDatabase = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to ping MongoDB:', error);
  }
};

// Initial ping
pingDatabase();

// Export mongoose instance
export default mongoose;