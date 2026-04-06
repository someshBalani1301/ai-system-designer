/**
 * Input Validation Utilities
 * Validates user prompts and other inputs
 */

const config = require("../config/config");

/**
 * Validate prompt input
 * @param {*} prompt - The input prompt
 * @returns {Object} { valid: boolean, prompt: string (if valid), error: string (if invalid) }
 */
const validatePrompt = (prompt) => {
  // Check if prompt exists and is a string
  if (!prompt || typeof prompt !== "string") {
    return {
      valid: false,
      error: "Prompt must be a non-empty string",
    };
  }

  // Trim whitespace
  const trimmed = prompt.trim();

  // Check minimum length
  if (trimmed.length < config.promptMinLength) {
    return {
      valid: false,
      error: `Prompt must be at least ${config.promptMinLength} characters long`,
    };
  }

  // Check maximum length
  if (trimmed.length > config.promptMaxLength) {
    return {
      valid: false,
      error: `Prompt must not exceed ${config.promptMaxLength} characters`,
    };
  }

  return {
    valid: true,
    prompt: trimmed,
  };
};

/**
 * Validate schema structure
 * @param {Object} data - The design data to validate
 * @returns {boolean} true if valid schema, false otherwise
 */
const validateSchema = (data) => {
  // Check if required properties exist
  if (!data || typeof data !== "object") {
    return false;
  }

  if (!data.components || !data.connections) {
    return false;
  }

  // Check if they are arrays
  if (!Array.isArray(data.components) || !Array.isArray(data.connections)) {
    return false;
  }

  // Basic component structure validation
  if (
    data.components.length > 0 &&
    !data.components.every(
      (c) => c.id && c.label && typeof c.description === "string",
    )
  ) {
    return false;
  }

  return true;
};

module.exports = {
  validatePrompt,
  validateSchema,
};
