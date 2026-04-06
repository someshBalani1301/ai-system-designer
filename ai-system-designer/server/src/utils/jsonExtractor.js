/**
 * JSON Extraction Utilities
 * Safely extracts and parses JSON from AI responses
 */

/**
 * Extract and parse JSON from AI response text
 * @param {string} text - The AI response text
 * @returns {Object} Parsed JSON object
 * @throws {Error} If JSON cannot be extracted or parsed
 */
const extractJSON = (text) => {
  try {
    // Find JSON object in text (handles cases with text before/after JSON)
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("No JSON found in AI response");
    }

    const jsonStr = match[0];
    const parsed = JSON.parse(jsonStr);

    return parsed;
  } catch (err) {
    throw new Error(`Failed to parse AI response: ${err.message}`);
  }
};

/**
 * Extract JSON safely with fallback
 * @param {string} text - The AI response text
 * @param {Object} fallback - Fallback object if extraction fails
 * @returns {Object} Parsed JSON or fallback object
 */
const extractJSONSafe = (text, fallback) => {
  try {
    return extractJSON(text);
  } catch (err) {
    console.warn(`[JSON Extraction] Falling back: ${err.message}`);
    return fallback;
  }
};

module.exports = {
  extractJSON,
  extractJSONSafe,
};
