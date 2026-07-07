/**
 * authController.js
 * ------------------
 * This file handles authentication-related business logic.
 * It contains functions for:
 * 1. Registering a new user
 * 2. Logging in an existing user
 *
 * Responsibilities:
 * - Validate input data
 * - Interact with the User model
 * - Hash passwords using bcrypt
 * - Generate JWT tokens for authentication
 *
 * This file DOES NOT define routes or server configuration.
 */

// Import User model to interact with the users collection in MongoDB
const User = require("../models/User");

// bcrypt is used to hash and compare passwords securely
const bcrypt = require("bcryptjs");

// jsonwebtoken is used to generate and verify JWT tokens
const jwt = require("jsonwebtoken");

// ----------------------------------------------------
// REGISTER USER
// ----------------------------------------------------
// This function handles user registration
// Triggered when POST /api/auth/register is called
exports.register = async (req, res) => {

  // Extract required fields from request body
  const { username, email, password } = req.body;

  // Validate input: all fields must be provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  // Check if a user with the same email already exists
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the plain text password before storing in database
  // 10 is the salt rounds (recommended default)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new User document
  const user = new User({
    username,
    email,
    password: hashedPassword, // store hashed password only
    role: "user"               // default role assigned
  });

  // Save user data to MongoDB
  await user.save();

  // Send success response
  res.status(201).json({ message: "User registered successfully" });
};

// ----------------------------------------------------
// LOGIN USER
// ----------------------------------------------------
// This function handles user login
// Triggered when POST /api/auth/login is called
exports.login = async (req, res) => {

  // Extract login credentials from request body
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // If user does not exist, return error
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare entered password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);

  // If password does not match, return error
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  // Payload contains user ID and role
  const token = jwt.sign(
    { 
      id: user._id, 
      role: user.role 
    },
    process.env.JWT_SECRET,     // secret key from .env
    { expiresIn: "1h" }         // token validity
  );

  // Send token and user info in response
  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
};
