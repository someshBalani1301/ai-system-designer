/**
 * API Routes
 * Defines all API endpoints for the application
 */

const express = require("express");
const { generateDesign } = require("../controllers/designController");

const router = express.Router();

/**
 * POST /api/generate
 * Generates system design based on user prompt
 * Body: { prompt: string }
 */
router.post("/generate", generateDesign);

/**
 * GET /api/health
 * Health check endpoint for monitoring
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
