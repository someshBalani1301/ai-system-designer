/**
 * Error Handler Middleware
 * Centralised error handling for all routes
 */

const config = require("../config/config");

/**
 * Global error handling middleware
 * Must be the last middleware registered
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDev = config.isDevelopment;

  // Log error
  console.error(`[ERROR] ${statusCode} | ${err.message}`);
  if (isDev && err.stack) {
    console.error(err.stack);
  }

  // Send response
  res.status(statusCode).json({
    error: isDev ? err.message : "Internal server error",
    code: err.code || "INTERNAL_ERROR",
    ...(isDev && { stack: err.stack }),
  });
};

/**
 * 404 Not Found middleware
 * Handles requests to undefined routes
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    code: "NOT_FOUND",
    path: req.path,
    method: req.method,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
