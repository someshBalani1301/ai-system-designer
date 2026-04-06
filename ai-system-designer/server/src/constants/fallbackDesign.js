/**
 * Fallback Design System
 * A robust default design returned when AI service fails
 * This ensures the application always returns valid data
 */

const fallbackDesign = {
  components: [
    {
      id: "client",
      label: "Client",
      description:
        "Web or mobile application interface that users interact with directly. Handles UI rendering, user input validation, and session management.",
    },
    {
      id: "gateway",
      label: "API Gateway",
      description:
        "Central entry point for all client requests. Handles routing, rate limiting, authentication verification, request/response transformation, and SSL termination.",
    },
    {
      id: "server",
      label: "Application Server",
      description:
        "Core business logic processing. Executes API requests, applies business rules, orchestrates database operations, and manages data flow between client and database.",
    },
    {
      id: "db",
      label: "Database",
      description:
        "Primary data store for persistent information. Manages data integrity, indexing, querying, and ensures ACID compliance. Can be SQL or NoSQL based on use case.",
    },
  ],
  connections: [
    { source: "client", target: "gateway" },
    { source: "gateway", target: "server" },
    { source: "server", target: "db" },
  ],
};

/**
 * Get fallback design
 * @returns {Object} Fallback design object with components and connections
 */
const getFallbackDesign = () => JSON.parse(JSON.stringify(fallbackDesign));

module.exports = {
  fallbackDesign,
  getFallbackDesign,
};
