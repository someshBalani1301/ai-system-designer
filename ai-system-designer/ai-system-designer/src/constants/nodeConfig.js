/**
 * Node configuration and styling
 */

export const NODE_TYPES = {
  DATABASE: "database",
  CACHE: "cache",
  QUEUE: "queue",
  API: "api",
  SERVICE: "service",
  DEFAULT: "default",
};

export const NODE_ICON_MAP = {
  db: "🗄️",
  database: "🗄️",
  cache: "⚡",
  queue: "📦",
  gateway: "🔌",
  api: "🔌",
  service: "🔧",
  server: "🔧",
  user: "👤",
  client: "👤",
  load: "⚖️",
  balancer: "⚖️",
  cdn: "🌐",
};

export const getNodeIcon = (label) => {
  const text = label.toLowerCase();
  for (const [key, icon] of Object.entries(NODE_ICON_MAP)) {
    if (text.includes(key)) return icon;
  }
  return "⚙️";
};

export const getNodeStyle = (label) => {
  const text = label.toLowerCase();

  const styleMap = [
    {
      keywords: ["db", "database"],
      style: {
        background: "var(--node-db)",
        border: "2px solid var(--node-db-border)",
        color: "var(--node-db-border)",
      },
    },
    {
      keywords: ["cache"],
      style: {
        background: "var(--node-cache)",
        border: "2px solid var(--node-cache-border)",
        color: "var(--node-cache-border)",
      },
    },
    {
      keywords: ["queue"],
      style: {
        background: "var(--node-queue)",
        border: "2px solid var(--node-queue-border)",
        color: "var(--node-queue-border)",
      },
    },
    {
      keywords: ["gateway", "api"],
      style: {
        background: "var(--node-api)",
        border: "2px solid var(--node-api-border)",
        color: "var(--node-api-border)",
      },
    },
  ];

  for (const { keywords, style } of styleMap) {
    if (keywords.some((kw) => text.includes(kw))) return style;
  }

  return {
    background: "var(--node-default)",
    border: "2px solid var(--node-default-border)",
    color: "var(--node-default-border)",
  };
};

export const NODE_DIMENSIONS = {
  width: 320,
  height: 90,
};

export const LAYOUT_CONFIG = {
  rankdir: "LR",
  nodesep: 120,
  ranksep: 280,
};
