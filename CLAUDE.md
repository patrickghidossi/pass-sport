# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PassSport is a React application for tracking and logging sporting events you attend. Built with Vite, React 19, and modern JavaScript.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Architecture

### Tech Stack
- **Build Tool**: Vite 7 with React plugin
- **Framework**: React 19 with StrictMode
- **Date Handling**: date-fns
- **HTTP Client**: axios
- **Styling**: Plain CSS (index.css, App.css)
- **Linting**: ESLint 9 with React Hooks and React Refresh plugins

### Project Structure

```
src/
├── main.jsx              # Application entry point
├── App.jsx               # Main application component
├── services/
│   └── sportsApi.js      # Sports events API integration layer
├── index.css             # Global styles
└── App.css               # Component styles
```

### Core Architecture Patterns

**Single Page Application**: The app is a single-component React application with all state management handled in App.jsx using React hooks.

**State Management**: Uses React hooks (useState, useEffect) with localStorage persistence:
- `events`: Current day's sporting events
- `attendedEvents`: User's logged events (persisted to localStorage)
- `selectedDate`: Current date being viewed

**Data Flow**:
1. User selects a date via navigation buttons
2. `fetchEvents()` calls `sportsApi.fetchEventsByDate()` with the selected date
3. Events displayed in grid with "Mark as Attended" buttons
4. Attended events saved to localStorage and displayed in separate log section
5. App currently uses mock data; real API integration prepared but not active

### Sports API Service (src/services/sportsApi.js)

**Purpose**: Abstraction layer for fetching sporting events from multiple providers.

**API Providers Supported**:
- ESPN API (requires API key)
- The Odds API (requires API key)
- API-Football (requires API key)
- Mock data (default, no key required)

**Key Functions**:
- `fetchEventsByDate(date, apiProvider, apiKey)`: Main entry point for fetching events
- `getAvailableProviders()`: Returns list of configured API providers
- `validateApiKey(apiKey, provider)`: Basic API key validation

**Event Data Schema**:
```javascript
{
  id: number,
  title: string,              // "Team A vs Team B"
  sport: string,              // "Football", "Basketball", etc.
  league: string,             // "Premier League", "NBA", etc.
  time: string,               // "20:00" (HH:mm format)
  venue: string,              // Stadium/arena name
  homeTeam: string,
  awayTeam: string,
  status: string              // "scheduled", "completed", etc.
}
```

**Switching from Mock to Real API**:
To use a real sports API, update the `fetchEventsByDate` call in App.jsx:32 from:
```javascript
const eventsData = await fetchEventsByDate(date, 'mock')
```
to:
```javascript
const eventsData = await fetchEventsByDate(date, 'espn', YOUR_API_KEY)
```

### ESLint Configuration

The project uses ESLint 9 with flat config format (eslint.config.js):
- Custom rule: `no-unused-vars` ignores variables matching `^[A-Z_]` (constants/React components)
- Enforces React Hooks rules and React Refresh best practices
- Ignores `dist/` directory

## Important Notes

- The project directory is nested: `pass-sport/pass-sport/` - when running commands, ensure you're in the correct directory
- localStorage is used for persistence; no backend/database currently
- Mock data includes events for specific dates: 2025-06-27, 2025-06-28, 2025-06-29
- API integration code is present but dormant; mock mode is active by default
