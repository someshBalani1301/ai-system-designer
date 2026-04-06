/**
 * Design Controller
 * Handles business logic for system design generation
 */

const { callAI } = require("../utils/aiService");
const { extractJSON } = require("../utils/jsonExtractor");
const { validatePrompt, validateSchema } = require("../utils/validator");
const { getFallbackDesign } = require("../constants/fallbackDesign");

/**
 * Generate system design based on user prompt
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const generateDesign = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Validate prompt input
    const validation = validatePrompt(prompt);
    if (!validation.valid) {
      return res.status(400).json({
        error: validation.error,
        code: "INVALID_PROMPT",
      });
    }

    console.log(
      `[API] Generating design for: "${validation.prompt.substring(0, 50)}..."`,
    );

    // Call AI service
    const aiText = await callAI(validation.prompt);
    console.log(`[API] AI response received (${aiText.length} chars)`);

    // Extract and validate JSON
    const parsed = extractJSON(aiText);

    if (!validateSchema(parsed)) {
      console.warn("[API] Invalid schema from AI, using fallback");
      return res.status(200).json(getFallbackDesign());
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);

    // Handle API key errors specifically
    if (error.message.includes("API key")) {
      return res.status(503).json({
        error: "AI service not properly configured",
        code: "SERVICE_UNAVAILABLE",
        fallback: getFallbackDesign(),
      });
    }

    // Always return fallback for user experience
    res.status(200).json(getFallbackDesign());
  }
};

module.exports = {
  generateDesign,
};
