/**
 * User.js
 * --------
 * This file defines the User data model.
 *
 * Responsibilities:
 * - Define the structure of user documents
 * - Enforce validation rules
 * - Represent the "users" collection in MongoDB
 *
 * This model is used for:
 * - User registration
 * - User authentication
 * - JWT-based authorization
 */

// Import mongoose library
// Mongoose is used to define schemas and interact with MongoDB
const mongoose = require("mongoose");

/**
 * Define the schema for the User collection
 * A schema defines the structure and validation
 * rules for documents stored in MongoDB.
 */
const userSchema = new mongoose.Schema(
  {
    // Username of the user
    // Used as a display name
    username: {
      type: String,      // Data type
      required: true,    // Must be provided
      unique: true,      // Must be unique across users
      trim: true         // Removes extra spaces
    },

    // Email address of the user
    // Used as the primary login identifier
    email: {
      type: String,      // Data type
      required: true,    // Must be provided
      unique: true,      // No duplicate emails allowed
      lowercase: true,   // Converts email to lowercase automatically
      trim: true
    },

    // Password field
    // Stores the hashed password only (never plain text)
    password: {
      type: String,      // Data type
      required: true     // Must be provided
    },

    // Role field
    // Used for authorization (future extension)
    role: {
      type: String,
      enum: ["user", "admin"], // Allowed roles
      default: "user"
    }
  },
  {
    // Automatically adds:
    // createdAt → when the user was created
    // updatedAt → when the user was last updated
    timestamps: true
  }
);

/**
 * Create a Mongoose model using the schema
 *
 * mongoose.model():
 * - "User" is the model name (singular)
 * - MongoDB automatically creates a "users" collection
 */
module.exports = mongoose.model("User", userSchema);
