/**
 * authMiddleware.js
 * ------------------
 * This file contains JWT-based authentication middleware.
 *
 * Responsibilities:
 * - Read the Authorization header from incoming requests
 * - Validate the JWT token
 * - Attach decoded user information to the request
 * - Block access to protected routes if authentication fails
 *
 * This middleware is applied to routes that require authentication
 * such as CREATE, UPDATE, and DELETE operations.
 */

// Import jsonwebtoken package
// This library is used to verify JWT tokens
const jwt = require("jsonwebtoken");

// --------------------------------------------------
// AUTHENTICATION MIDDLEWARE
// --------------------------------------------------
// This middleware protects routes using JWT authentication
//
// Expected request header format:
// Authorization: Bearer <JWT_TOKEN>
//
// Flow:
// 1. Read Authorization header
// 2. Validate header format
// 3. Verify JWT token
// 4. Attach user data to request
// 5. Allow request to proceed
// --------------------------------------------------
module.exports = (req, res, next) => {

  // Read the Authorization header from the incoming request
  const authHeader = req.headers.authorization;

  // Debug log (useful during development)
  // Can be removed or disabled in production
  console.log("AUTH HEADER:", authHeader);

  // 1️⃣ If Authorization header is missing
  // The client is not authenticated
  if (!authHeader) {
    return res.status(401).json({
      message: "NO_AUTH_HEADER"
    });
  }

  // 2️⃣ Split the header value into two parts
  // Example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  const [scheme, token] = authHeader.split(" ");

  // 3️⃣ Validate header format
  // Must be exactly: "Bearer <token>"
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "MALFORMED_AUTH_HEADER"
    });
  }

  try {
    // 4️⃣ Verify the JWT token using the secret key
    // If token is valid, jwt.verify returns decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debug log to inspect decoded token payload
    console.log("DECODED TOKEN:", decoded);

    // 5️⃣ Attach decoded user information to request object
    // This allows controllers to access req.user
    req.user = decoded;

    // Allow request to proceed to the next middleware or controller
    next();
  } catch (err) {
    // 6️⃣ Token verification failed
    // Possible reasons:
    // - Token expired
    // - Token tampered
    // - Invalid signature
    return res.status(401).json({
      message: "TOKEN_INVALID_OR_EXPIRED"
    });
  }
};
