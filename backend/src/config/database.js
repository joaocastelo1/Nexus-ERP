const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return true;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('  ℹ️  MONGODB_URI não definida — usando banco em memória');
    return false;
  }
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`  🍃 MongoDB Conectado: ${conn.connection.host}`);
    isConnected = true;
    return true;
  } catch (error) {
    console.log('  ⚠️  MongoDB indisponível — usando banco em memória');
    return false;
  }
};

module.exports = connectDB;
