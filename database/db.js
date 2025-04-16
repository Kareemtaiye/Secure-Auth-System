const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const mongoose = require("mongoose");

const { DATABASE, DATABASE_PASSWORD } = process.env;

const DB = DATABASE.replace("<db_password>", DATABASE_PASSWORD);

const connectDB = async function () {
  try {
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("DB Connection Failed", err);
  }
};

module.exports = connectDB;
