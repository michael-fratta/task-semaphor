// CONNECT TO THE DATABASE
const mongoose = require("mongoose");

let _db;

const connectToServer = async () => {
  try {
    if (!_db) {
      await mongoose.connect(process.env.MONGODB_URI);
      _db = mongoose.connection;
      console.log("Successfully connected to MongoDB.");
    }
    return _db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("MongoDB connection not established");
  }
  return _db;
};

module.exports = {
  connectToServer,
  getDb,
};
