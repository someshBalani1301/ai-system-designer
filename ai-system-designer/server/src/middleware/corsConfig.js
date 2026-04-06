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
  return cors({
    origin: config.corsOrigin,
    credentials: config.corsCredentials,
    methods: config.corsMethods,
    allowedHeaders: config.corsAllowedHeaders,
  });
};

module.exports = corsConfig;
