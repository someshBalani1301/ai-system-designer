/**
 * Request Logger Middleware
 * Logs all HTTP requests with timing and status information
 */

const config = require("../config/config");

/**
 * Middleware: Log all requests
 * Logs HTTP method, path, status code, and response time
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? "ERROR" : "INFO";

    const logMessage = `[${new Date().toISOString()}] ${level} | ${req.method} ${
      req.path
    } | ${res.statusCode} | ${duration}ms`;

    if (config.isDevelopment || level === "ERROR") {
      console.log(logMessage);
    }
  });

  next();
};

module.exports = requestLogger;
