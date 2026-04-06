/**
 * Environment Configuration
 * Centralized configuration management for all environment variables
 */

require("dotenv").config();

const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: (process.env.NODE_ENV || "development") === "development",
  isProduction: (process.env.NODE_ENV || "development") === "production",

  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  corsCredentials: true,
  corsMethods: ["GET", "POST", "OPTIONS"],
  corsAllowedHeaders: ["Content-Type"],

  // API Keys
  openrouterKey: process.env.OPENROUTER_API_KEY,
  openaiKey: process.env.OPENAI_API_KEY,

  // Request Configuration
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || "30000", 10),
  maxRequestSize: process.env.MAX_REQUEST_SIZE || "1mb",

  // Validation Configuration
  promptMinLength: 5,
  promptMaxLength: 5000,

  // API Configuration
  openrouterApiUrl: "https://openrouter.ai/api/v1/chat/completions",
  openrouterModel: "openrouter/auto",
  apiTemperature: 0.7,
  apiMaxTokens: 2000,

  // Rate Limiting (optional future use)
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),

  // Logging
  logLevel: process.env.LOG_LEVEL || "info",
};

// Validate required environment variables
const validateConfig = () => {
  if (!config.openrouterKey) {
    console.warn(
      "⚠️  Warning: OPENROUTER_API_KEY is not set. Using fallback responses only.",
    );
  }
};

// Call validation on import
validateConfig();

module.exports = config;
