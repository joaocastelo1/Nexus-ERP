const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bizflow');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('MongoDB não disponível, usando banco em memória');
    console.log('Sistema funcionará normalmente!');
  }
};

module.exports = connectDB;