/**
 * authRoutes.js
 * --------------
 * This file defines all authentication-related API routes.
 *
 * Responsibilities:
 * - Expose endpoints for user registration and login
 * - Route requests to authentication controller functions
 * - Protect specific routes using authentication middleware
 *
 * This file does NOT contain business logic.
 * It only maps URLs to controller functions.
 */

// Import the Express framework
// Express is used to create routes and handle HTTP requests
const express = require("express");

// Create a new router instance
// This router will handle all authentication-related routes
const router = express.Router();

// Import authentication controller functions
// These functions handle registration and login logic
const {
  register,
  login
} = require("../controllers/authController");

// Import authentication middleware
// Used to protect routes that require a valid JWT
const authMiddleware = require("../middleware/authMiddleware");

// --------------------------------------------------
// AUTHENTICATION ROUTES
// --------------------------------------------------

/**
 * PUBLIC ROUTE
 * --------------------------------------------------
 * Register a new user
 *
 * Method: POST
 * Endpoint: /api/auth/register
 * Request Body:
 * {
 *   "username": "john",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
router.post("/register", register);

/**
 * PUBLIC ROUTE
 * --------------------------------------------------
 * Login an existing user
 *
 * Method: POST
 * Endpoint: /api/auth/login
 * Request Body:
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
router.post("/login", login);

/**
 * PROTECTED ROUTE
 * --------------------------------------------------
 * Get currently authenticated user details
 *
 * Method: GET
 * Endpoint: /api/auth/me
 * Header:
 * Authorization: Bearer <JWT_TOKEN>
 *
 * This route verifies the JWT and returns user data
 */
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user
  });
});

// Export the router
// Allows this router to be mounted in server.js
module.exports = router;
