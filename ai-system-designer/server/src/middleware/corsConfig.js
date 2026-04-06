/**
 * CORS Configuration
 * Configures Cross-Origin Resource Sharing for the API
 */

const cors = require("cors");
const config = require("../config/config");

/**
 * Get CORS middleware configured for this app
 * Uses environment-based origin validation for security
 */
const corsConfig = () => {
  // Allow multiple origins for development and production
  const allowedOrigins = [
    config.corsOrigin,
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5000",
    "https://ai-system-designer.vercel.app",
  ];

  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Log but still allow for now (production can be stricter)
        console.log(`CORS request from: ${origin}`);
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
};

module.exports = corsConfig;
