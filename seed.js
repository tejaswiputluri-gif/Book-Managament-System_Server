/**
 * seed.js
 * --------
 * This file is used to insert initial/sample data
 * into the MongoDB database.
 *
 * Responsibilities:
 * - Connect to MongoDB using environment variables
 * - Insert predefined book records
 * - Close the database connection after completion
 *
 * IMPORTANT:
 * - Run this file ONLY ONCE
 * - Running it multiple times will insert duplicate data
 */

// Import mongoose to establish a connection with MongoDB
const mongoose = require("mongoose");

// Import dotenv to load environment variables from the .env file
const dotenv = require("dotenv");

// Import the Book model to interact with the "books" collection
const Book = require("./models/Book");

// Load environment variables into process.env
dotenv.config();

// --------------------------------------------------
// DATABASE CONNECTION
// --------------------------------------------------

// Connect to MongoDB using the connection string from .env
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    // Log successful database connection
    console.log("Connected to MongoDB");

    // --------------------------------------------------
    // SAMPLE DATA
    // --------------------------------------------------

    // Array of book documents to be inserted
    // Each object represents one record in the database
    const books = [
      { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
      { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
      { title: "1984", author: "George Orwell", year: 1949 },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
      { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 }
    ];

    // --------------------------------------------------
    // INSERT DATA
    // --------------------------------------------------

    // Insert multiple documents at once using insertMany
    // This is faster and more efficient than inserting one by one
    await Book.insertMany(books);

    // Log success message
    console.log("Books inserted successfully");

    // --------------------------------------------------
    // CLOSE CONNECTION
    // --------------------------------------------------

    // Close the database connection after seeding
    // Prevents the script from running indefinitely
    mongoose.connection.close();
  })
  .catch((err) => {
    // Log any errors that occur during connection or insertion
    console.error("Seeding error:", err);

    // Ensure database connection is closed even if an error occurs
    mongoose.connection.close();
  });
