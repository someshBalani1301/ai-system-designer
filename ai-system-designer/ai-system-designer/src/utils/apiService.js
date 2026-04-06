/**
 * API service for backend communication
 * Connects to external backend server
 */

import axios from "axios";

// Get backend URL from environment variables
// IMPORTANT: Set VITE_API_URL in .env files before building
const API_BASE_URL = import.meta.env.VITE_API_URL;
const TIMEOUT = import.meta.env.VITE_API_TIMEOUT
  ? parseInt(import.meta.env.VITE_API_TIMEOUT)
  : 30000;

// Validate backend URL is configured
if (!API_BASE_URL) {
  console.error(
    "❌ VITE_API_URL is not configured. Set it in .env.local or .env.production",
  );
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
});

export const generateDesign = async (prompt) => {
  if (!prompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }

  try {
    const response = await apiClient.post("/api/generate", { prompt });
    return response.data;
  } catch (error) {
    // Handle different error types
    if (!API_BASE_URL) {
      throw new Error(
        "Backend URL not configured. Set VITE_API_URL environment variable.",
      );
    }
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        `Cannot connect to backend at ${API_BASE_URL}. Is the server running?`,
      );
    }
    if (error.message?.includes("timeout")) {
      throw new Error(
        "Backend request timed out. Server may be slow or unreachable.",
      );
    }
    if (error.response?.status) {
      throw new Error(
        `Backend error: ${error.response.status} ${error.response.statusText}`,
      );
    }
    throw new Error(
      error.message || "Failed to generate design. Please check the backend.",
    );
  }
};
