/**
 * bookController.js
 * ------------------
 * This file contains all business logic related to Book operations.
 *
 * Responsibilities:
 * - Fetch books with pagination and search
 * - Create a new book
 * - Update an existing book
 * - Delete a book
 *
 * This controller interacts with:
 * - Book model (MongoDB)
 * - Request data (params, query, body)
 * - Sends structured JSON responses
 *
 * NOTE:
 * Routes define URLs.
 * Controllers define logic.
 */

// Import the Book model to interact with the books collection in MongoDB
const Book = require("../models/Book");

/**
 * --------------------------------------------------
 * GET BOOKS (Pagination + Search)
 * --------------------------------------------------
 * API:
 * GET /books
 * GET /books?page=1&limit=5
 * GET /books?search=gatsby
 * GET /books?page=1&limit=5&search=gatsby
 *
 * Purpose:
 * - Fetch books from database
 * - Support pagination and search
 */
exports.getAllBooks = async (req, res) => {
  try {
    // Read query parameters from URL
    // Math.max ensures page/limit never go below 1
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 5, 1);

    // Optional search text (trim removes extra spaces)
    const search = req.query.search?.trim() || "";

    // Calculate how many documents to skip (pagination logic)
    const skip = (page - 1) * limit;

    // Build MongoDB filter condition
    // If search exists → search in title OR author (case-insensitive)
    // Else → empty filter (fetch all)
    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    // Fetch books and total count in parallel for performance
    const [books, totalBooks] = await Promise.all([
      Book.find(filter)
        .sort({ createdAt: -1 }) // Newest books first
        .skip(skip)              // Skip records for pagination
        .limit(limit),           // Limit number of records
      Book.countDocuments(filter)
    ]);

    // Send paginated response
    res.status(200).json({
      success: true,
      data: books,
      page,
      limit,
      totalPages: Math.ceil(totalBooks / limit),
      totalItems: totalBooks
    });
  } catch (err) {
    // Log error for debugging
    console.error("GET BOOKS ERROR:", err);

    // Send generic error response
    res.status(500).json({
      success: false,
      message: "Failed to fetch books"
    });
  }
};

/**
 * --------------------------------------------------
 * CREATE BOOK
 * --------------------------------------------------
 * API:
 * POST /books (JWT protected)
 *
 * Purpose:
 * - Create a new book record
 */
exports.createBook = async (req, res) => {
  try {
    // Extract data from request body
    const { title, author, year } = req.body;

    // Validate required fields
    if (!title || !author || !year) {
      return res.status(400).json({
        message: "Title, author, and year are required"
      });
    }

    // Create new Book document
    const book = new Book({
      title,
      author,
      year
    });

    // Save book to database
    const savedBook = await book.save();

    // Send success response
    res.status(201).json({
      success: true,
      data: savedBook
    });
  } catch (err) {
    // Validation or save error
    res.status(400).json({
      success: false,
      message: "Invalid book data"
    });
  }
};

/**
 * --------------------------------------------------
 * UPDATE BOOK
 * --------------------------------------------------
 * API:
 * PUT /books/:id (JWT protected)
 *
 * Purpose:
 * - Update an existing book using its ID
 */
exports.updateBook = async (req, res) => {
  try {
    // Extract updated fields from request body
    const { title, author, year } = req.body;

    // Find book by ID and update
    // runValidators ensures schema validation is applied
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,                  // Book ID from URL
      { title, author, year },         // Updated data
      { new: true, runValidators: true }
    );

    // If book does not exist
    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    // Send updated book
    res.status(200).json({
      success: true,
      data: updatedBook
    });
  } catch (err) {
    // Invalid ID or update error
    res.status(400).json({
      message: "Invalid ID or update data"
    });
  }
};

/**
 * --------------------------------------------------
 * DELETE BOOK
 * --------------------------------------------------
 * API:
 * DELETE /books/:id (JWT protected)
 *
 * Purpose:
 * - Remove a book from the database
 */
exports.deleteBook = async (req, res) => {
  try {
    // Find book by ID and delete
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    // If book does not exist
    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    // Send success confirmation
    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (err) {
    // Invalid ID format
    res.status(400).json({
      message: "Invalid ID"
    });
  }
};
