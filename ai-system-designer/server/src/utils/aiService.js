/**
 * AI Service
 * Handles communication with OpenRouter API
 */

const axios = require("axios");
const config = require("../config/config");

/**
 * Call OpenRouter AI API to generate system design
 * @param {string} prompt - The user prompt
 * @returns {Promise<string>} AI response text
 * @throws {Error} If API call fails
 */
const callAI = async (prompt) => {
  // Check if API key is available
  if (!config.openrouterKey) {
    throw new Error("OpenRouter API key not configured");
  }

  // Build the AI prompt
  const aiPrompt = buildSystemPrompt(prompt);

  try {
    const response = await axios({
      method: "POST",
      url: config.openrouterApiUrl,
      headers: {
        Authorization: `Bearer ${config.openrouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/yourusername/ai-system-designer",
        "X-Title": "AI System Designer",
      },
      data: {
        model: config.openrouterModel,
        messages: [
          {
            role: "user",
            content: aiPrompt,
          },
        ],
        temperature: config.apiTemperature,
        max_tokens: config.apiMaxTokens,
      },
      timeout: config.requestTimeout,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    // Handle specific error types
    if (error.response?.status === 401) {
      throw new Error("Invalid OpenRouter API key");
    }
    if (error.code === "ECONNABORTED") {
      throw new Error("API request timeout");
    }
    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    throw new Error(`AI service error: ${error.message}`);
  }
};

/**
 * Build the system prompt for AI
 * @param {string} userPrompt - The user's design prompt
 * @returns {string} Complete system prompt
 */
const buildSystemPrompt = (userPrompt) => {
  return `
You are a senior system design architect at a FAANG company.

Design a real-world, production-grade scalable system for: ${userPrompt}

Provide detailed descriptions for each component - explain what it does, why it's there, and how it fits in the system.

STRICT OUTPUT RULES:
- Return ONLY valid JSON
- No explanation text outside JSON
- No markdown formatting
- Descriptions should be 2-3 detailed sentences

FORMAT:
{
  "components": [
    {
      "id": "unique_id",
      "label": "Component Name",
      "description": "Detailed explanation of what this component does, why it's needed, and how it contributes to the system. Include its key responsibilities and role."
    }
  ],
  "connections": [
    {
      "source": "component_id",
      "target": "component_id"
    }
  ]
}

IMPORTANT:
- Make descriptions comprehensive (not just one word)
- Include realistic components (load balancer, cache, queue if needed)
- Describe the purpose and functionality of each component
- Make it production-grade and scalable
- Think about real-world scenarios and best practices
`;
};

module.exports = {
  callAI,
  buildSystemPrompt,
};
