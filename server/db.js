// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // or your MongoDB connection string
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('onlinequiz');  // replace with your DB name
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

module.exports = { connectDB, getDB };
