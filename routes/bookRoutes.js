/**
 * bookRoutes.js
 * --------------
 * This file defines all book-related API routes.
 *
 * Responsibilities:
 * - Map HTTP methods and URLs to controller functions
 * - Protect sensitive routes using JWT authentication
 * - Keep routing logic separate from business logic
 *
 * This file does NOT interact with the database directly.
 */

// Import Express to create route handlers
const express = require("express");

// Create a new router instance
// This router will manage all /books-related routes
const router = express.Router();

// Import authentication middleware
// Used to protect routes that require a valid JWT token
const authMiddleware = require("../middleware/authMiddleware");

// Import controller functions
// These functions contain the business logic for book operations
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// --------------------------------------------------
// BOOK ROUTES
// --------------------------------------------------

/**
 * PUBLIC ROUTE
 * --------------------------------------------------
 * Get all books with pagination and optional search
 *
 * Method: GET
 * Endpoint: /books
 * Query Params (optional):
 * - page   → page number
 * - limit  → number of records per page
 * - search → search by title or author
 *
 * Example:
 * GET /books?page=1&limit=5&search=martin
 */
router.get("/", getAllBooks);

/**
 * PROTECTED ROUTE
 * --------------------------------------------------
 * Create a new book
 *
 * Method: POST
 * Endpoint: /books
 * Header:
 * Authorization: Bearer <JWT_TOKEN>
 *
 * Body:
 * {
 *   "title": "Clean Code",
 *   "author": "Robert C. Martin",
 *   "year": 2008
 * }
 */
router.post("/", authMiddleware, createBook);

/**
 * PROTECTED ROUTE
 * --------------------------------------------------
 * Update an existing book by ID
 *
 * Method: PUT
 * Endpoint: /books/:id
 * Header:
 * Authorization: Bearer <JWT_TOKEN>
 *
 * Body (any fields to update):
 * {
 *   "year": 2010
 * }
 */
router.put("/:id", authMiddleware, updateBook);

/**
 * PROTECTED ROUTE
 * --------------------------------------------------
 * Delete a book by ID
 *
 * Method: DELETE
 * Endpoint: /books/:id
 * Header:
 * Authorization: Bearer <JWT_TOKEN>
 */
router.delete("/:id", authMiddleware, deleteBook);

// Export the router
// Allows this router to be mounted in server.js
module.exports = router;
