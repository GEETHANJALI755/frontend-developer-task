const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ ERROR: MONGO_URI not found in .env');
      return;
    }

    console.log('Connecting to MongoDB...');
    console.log('Using URI:', process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
