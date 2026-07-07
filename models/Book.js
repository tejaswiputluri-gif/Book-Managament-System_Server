/**
 * Book.js
 * --------
 * This file defines the Book data model.
 *
 * Responsibilities:
 * - Define the structure of book documents
 * - Enforce validation rules
 * - Represent the "books" collection in MongoDB
 *
 * This model is used by controllers to perform
 * CRUD operations on book data.
 */

// Import mongoose to define schemas and interact with MongoDB
const mongoose = require("mongoose");

/**
 * Define a schema for the Book collection
 * A schema describes the structure of documents
 * stored inside a MongoDB collection.
 */
const bookSchema = new mongoose.Schema(
  {
    // Title of the book
    // Required field and must be a string
    title: {
      type: String,
      required: true,
      trim: true // Removes leading/trailing spaces
    },

    // Author name
    // Required field and must be a string
    author: {
      type: String,
      required: true,
      trim: true
    },

    // Publication year of the book
    // Optional field and must be a number
    year: {
      type: Number
    }
  },
  {
    // Automatically adds:
    // createdAt → when the document was created
    // updatedAt → when the document was last updated
    timestamps: true
  }
);

/**
 * Create a Mongoose model using the schema
 *
 * mongoose.model():
 * - First argument: Model name (singular)
 * - Second argument: Schema definition
 *
 * MongoDB automatically creates a collection named "books"
 */
const Book = mongoose.model("Book", bookSchema);

// Export the Book model so it can be used in:
// - Controllers
// - Seed scripts
// - Other parts of the application
module.exports = Book;
