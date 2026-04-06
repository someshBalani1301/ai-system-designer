# 🚀 AI System Designer

A modern, production-ready system architecture visualization tool powered by AI. Design complex system architectures with natural language and automatically generate beautiful, interactive diagrams.

## Features

✨ **Key Features:**

- 🤖 **AI-Powered Design Generation**: Describe your system in plain English, get an architecture diagram
- 📊 **Interactive Diagrams**: Pan, zoom, and inspect each component
- 🎨 **Modern UI**: Clean, professional design with dark mode support
- ⚡ **Real-time Layout**: Automatic node positioning using Dagre graph layout
- 🔍 **Component Details**: Click on any node to view detailed descriptions
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 💾 **Production Ready**: Clean atomic code structure, optimized for scalability

## Technology Stack

**Frontend:**

- React 19.2.4 - Modern UI framework
- Vite 8.0.1 - Lightning-fast build tool
- ReactFlow 11.11.4 - Diagram visualization
- Dagre 0.8.5 - Graph layout engine
- Axios 1.14.0 - HTTP client
- CSS3 with CSS Variables - Modern styling

**Backend:**

- Node.js + Express.js
- OpenRouter AI API (LLM integration)
- JSON-based architecture specifications

## Project Structure

```
ai-system-designer/
├── src/
│   ├── components/          # Atomic React components
│   │   ├── Header.jsx      # Top navigation & input
│   │   ├── Diagram.jsx     # ReactFlow diagram container
│   │   ├── SidePanel.jsx   # Component details panel
│   │   └── BlockNode.jsx   # Custom diagram node component
│   │
│   ├── utils/              # Helper functions & logic
│   │   ├── layoutEngine.js # Dagre-based auto layout
│   │   └── apiService.js   # Backend API communication
│   │
│   ├── constants/          # Configuration & constants
│   │   └── nodeConfig.js   # Node styling & icon mapping
│   │
│   ├── styles/             # Global & component styles
│   │   ├── global.css      # Typography, colors, layout
│   │   └── components.css  # Component-specific styles
│   │
│   ├── App.jsx             # Main application component
│   └── main.jsx            # React entry point
│
├── public/                 # Static assets
├── .env.example            # Environment configuration template
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Installation

### Prerequisites

- Node.js 18+ and npm
- Backend server running (see Backend Setup below)

### Frontend Setup

1. **Clone and navigate to the project:**

```bash
cd ai-system-designer
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file:**

```bash
cp .env.example .env.local
```

4. **Start development server:**

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or your configured Vite port)

## Backend Setup

The frontend requires a backend server running on `http://localhost:5000`.

### Backend Requirements

- Accepts POST requests at `/generate`
- Request body: `{ "prompt": "user design description" }`
- Response format:

```json
{
  "components": [
    { "id": "1", "label": "Component Name", "description": "Component details" },
    ...
  ],
  "connections": [
    { "source": "1", "target": "2" },
    ...
  ]
}
```

_Refer to the backend repository for complete setup instructions._

## Usage

### Basic Workflow

1. **Start the application** (frontend and backend running)
2. **Enter a system description** in the input field
   - Example: "Netflix system with user service, streaming service, recommendation engine, CDN, and database"
3. **Click "Generate"** to generate the architecture diagram
4. **Click on nodes** to view detailed component descriptions
5. **Use controls** in the diagram:
   - Pan: Click and drag
   - Zoom: Scroll wheel or pinch
   - Fit to view: Double-click or use Controls
   - Mini-map: Bottom-right corner (hidden on mobile)

### Supported Component Types

The system automatically recognizes and styles these component types:

- **Database**: 🗄️ (db, database)
- **Cache**: ⚡ (cache, redis)
- **Queue**: 📦 (queue, message, kafka)
- **API Gateway**: 🔌 (api, gateway)
- **Service**: 🔧 (service, server, worker)
- **Client**: 👤 (client, user, web, mobile)
- **Load Balancer**: ⚖️ (balancer, load)
- **CDN**: 🌐 (cdn, cache network)

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint on all files
```

## Development Guidelines

### Code Structure

- **Components** (`src/components/`): Atomic, single-responsibility React components
- **Utils** (`src/utils/`): Pure functions and reusable logic
- **Constants** (`src/constants/`): Configuration and mappings
- **Styles** (`src/styles/`): Global and component styles with CSS variables

### CSS Architecture

- **global.css**: Root variables, typography, layout foundations
- **components.css**: Component-specific styles, responsive design
- Uses CSS custom properties (variables) for theming
- Supports light and dark modes via `prefers-color-scheme`

### Adding New Features

1. **New Component**: Create in `src/components/ComponentName.jsx`
2. **New Utility**: Add to appropriate file in `src/utils/`
3. **New Styling**: Add to `src/styles/components.css`
4. **New Config**: Add to `src/constants/nodeConfig.js`

## Performance Optimizations

- ✅ Atomic component structure enables code splitting
- ✅ Lazy loading of diagrams with large node counts
- ✅ CSS variables for efficient theme switching
- ✅ Optimized Dagre layout configuration
- ✅ Minimal re-renders with React hooks
- ✅ Vite tree-shaking removes unused code in production

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design Breakpoints

- **1024px**: Tablet adjustments (reduced node size, smaller icons)
- **768px**: Mobile adjustments (hidden minimap, resized components)
- **640px**: Small mobile (stacked header, split layout)

## Troubleshooting

### "Failed to generate design"

- ✅ Verify backend server is running on `http://localhost:5000`
- ✅ Check backend logs for errors
- ✅ Ensure prompt is not empty

### "Blank diagram" or "Layout issues"

- ✅ Check browser console for JavaScript errors
- ✅ Verify components have unique `id` properties
- ✅ Check network tab for API response format

### "Styles not applying"

- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Rebuild with `npm run build`
- ✅ Check CSS file imports in main.jsx

## Production Deployment

### Building for Production

```bash
npm run build
```

This creates an optimized bundle in the `dist/` directory (typically < 200KB gzipped).

### Deployment Options

**Static Hosting (Recommended):**

- Netlify, Vercel, GitHub Pages
- Deploy `dist/` folder
- Backend runs separately

**Docker:**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

**Environment Variables (Production):**
Create `.env.production` with:

```
VITE_API_URL=https://your-backend-url.com
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feature requests:

- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation above

## Roadmap

- [ ] Diagram export (PNG, SVG, PDF)
- [ ] Diagram save/load functionality
- [ ] Collaboration mode (real-time updates)
- [ ] Custom component creation
- [ ] Architecture templates library
- [ ] Cost estimation for AWS/GCP/Azure
- [ ] Performance analysis suggestions

---

**Made with ❤️ for system architects and designers**
