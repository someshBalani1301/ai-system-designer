/**
 * AI System Designer - Backend Server
 * Main Entry Point
 */

const express = require("express");
const config = require("./src/config/config");
const corsConfig = require("./src/middleware/corsConfig");
const requestLogger = require("./src/middleware/requestLogger");
const {
  errorHandler,
  notFoundHandler,
} = require("./src/middleware/errorHandler");
const apiRoutes = require("./src/routes/api");

// Initialize Express app
const app = express();

// ===== Middleware Setup =====

// CORS configuration (environment-based)
app.use(corsConfig());

// Body parsing with size limits
app.use(express.json({ limit: config.maxRequestSize }));
app.use(express.urlencoded({ limit: config.maxRequestSize, extended: true }));

// Request logging (tracks all requests with timing)
app.use(requestLogger);

// ===== Routes =====

// API routes with /api prefix
app.use("/api", apiRoutes);

/**
 * Root endpoint - Server information
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend running 🚀",
    version: "2.0.0",
    endpoints: ["/api/generate", "/api/health"],
    environment: config.nodeEnv,
  });
});

// ===== Error Handling =====

// 404 handler (must be before error handler)
app.use(notFoundHandler);

// Global error handling middleware (must be last)
app.use(errorHandler);

// ===== Server Startup =====

const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 AI System Designer Backend 🚀    ║
╠════════════════════════════════════════╣
║  Environment: ${config.nodeEnv.padEnd(27)}║
║  Port: ${String(PORT).padEnd(33)}║
║  CORS Origin: ${config.corsOrigin.padEnd(23)}║
║  Version: 2.0.0 (Modular Structure)    ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[SERVER] SIGTERM received, shutting down gracefully...");
  server.close(() => {
    console.log("[SERVER] Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("[SERVER] SIGINT received, shutting down gracefully...");
  server.close(() => {
    console.log("[SERVER] Server closed");
    process.exit(0);
  });
});

module.exports = app;
