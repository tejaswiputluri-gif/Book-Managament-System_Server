/**
 * server.js
 * ----------
 * This file is the ENTRY POINT of the backend application.
 *
 * Responsibilities:
 * - Create the Express server
 * - Load environment variables
 * - Configure global middleware
 * - Register all API routes
 * - Connect to MongoDB
 * - Start the HTTP server
 *
 * Without this file, the backend cannot run.
 */

// Import the Express framework to create a backend web server
const express = require("express");

// Import Mongoose to connect and interact with MongoDB
const mongoose = require("mongoose");

// Import dotenv to load environment variables from the .env file
const dotenv = require("dotenv");

// Import CORS to allow frontend applications (React) to access backend APIs
const cors = require("cors");

// Load all environment variables defined in the .env file into process.env
dotenv.config();

// Create an Express application instance
// This app object handles all HTTP requests and responses
const app = express();

// --------------------------------------------------
// GLOBAL MIDDLEWARE
// --------------------------------------------------

// Enable CORS so frontend applications can communicate with backend
// In production, restrict "origin" to specific domains
app.use(
  cors({
    origin: true, // Allow all origins (safe if no cookies used)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


// Enable JSON body parsing
// Required to read data sent in POST / PUT requests
app.use(express.json());

// --------------------------------------------------
// ROUTE REGISTRATION
// --------------------------------------------------

// Import authentication-related routes
// Handles user registration and login
const authRoutes = require("./routes/authRoutes");

// Import book-related routes
// Handles CRUD operations on books
const bookRoutes = require("./routes/bookRoutes");

// Register authentication routes
// Base path: /api/auth
// Examples:
// POST /api/auth/register
// POST /api/auth/login
// GET  /api/auth/me
app.use("/api/auth", authRoutes);

// Register book routes
// Base path: /api/books
// Examples:
// GET    /api/books
// POST   /api/books
// PUT    /api/books/:id
// DELETE /api/books/:id
app.use("/api/books", bookRoutes);

// --------------------------------------------------
// DATABASE CONNECTION
// --------------------------------------------------

// Connect to MongoDB using the connection string from .env
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// --------------------------------------------------
// SERVER STARTUP
// --------------------------------------------------

// Read port number from environment variables
// Fallback to 8800 if PORT is not defined
const PORT = process.env.PORT || 8800;

// Start the Express server
// The backend is now ready to accept HTTP requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
