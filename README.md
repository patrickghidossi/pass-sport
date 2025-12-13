# 🏟️ Pass Sport

A modern web application for recording and logging sporting events you attend. Browse events by date, mark them as attended, and maintain a personal log of your sporting experiences.

## ✨ Features

- **Date-based Event Browsing**: Navigate through different dates to find sporting events
- **Event Logging**: Mark events as attended and maintain a personal log
- **Persistent Storage**: Your attended events are saved locally and persist between sessions
- **Responsive Design**: Beautiful, modern UI that works on desktop and mobile
- **Multiple Sports**: Support for various sports including Football, Basketball, Baseball, and more
- **API Integration Ready**: Built to easily integrate with real sports APIs

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pass-sport
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
pass-sport/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── services/
│   │   └── sportsApi.js     # Sports API service layer
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔌 API Integration

The application is designed to work with various sports APIs. Currently, it includes support for:

### Supported APIs

1. **ESPN API** - Comprehensive sports data
2. **The Odds API** - Sports betting and odds data
3. **API-Football** - Football-specific data
4. **Mock Data** - For demonstration purposes (default)

### How to Integrate Real APIs

1. **Get API Keys**:
   - [ESPN API](https://developer.espn.com/) - Requires registration
   - [The Odds API](https://the-odds-api.com/) - Free tier available
   - [API-Football](https://www.api-football.com/) - Free tier available

2. **Update the API Service**:
   Edit `src/services/sportsApi.js` and modify the `fetchEvents` function in `App.jsx`:

```javascript
// In App.jsx, change this line:
const eventsData = await fetchEventsByDate(date, 'mock')

// To use a real API:
const eventsData = await fetchEventsByDate(date, 'espn', 'your-api-key-here')
```

3. **Environment Variables** (Recommended):
   Create a `.env` file in the root directory:
   ```
   VITE_ESPN_API_KEY=your-espn-api-key
   VITE_ODDS_API_KEY=your-odds-api-key
   VITE_FOOTBALL_API_KEY=your-football-api-key
   ```

   Then update the service to use them:
   ```javascript
   const apiKey = import.meta.env.VITE_ESPN_API_KEY
   ```

## 🎨 Customization

### Adding New Sports APIs

1. Add the API configuration to `API_CONFIGS` in `sportsApi.js`
2. Create a fetch function for the new API
3. Create a data transformation function
4. Add the case to the switch statement in `fetchEventsByDate`

### Styling

The application uses CSS Grid and Flexbox for layout. Main styles are in `src/App.css`. The design is responsive and uses a modern gradient color scheme.

### Adding New Features

- **Event Categories**: Filter events by sport type
- **Search Functionality**: Search for specific teams or venues
- **Export/Import**: Export your event log to CSV/JSON
- **Statistics**: View attendance statistics and trends
- **Social Features**: Share your attended events

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code quality. Follow the existing code style and patterns when adding new features.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [date-fns](https://date-fns.org/) for date manipulation
- [Axios](https://axios-http.com/) for HTTP requests
- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/pass-sport/issues) page
2. Create a new issue with detailed information
3. Include browser version, error messages, and steps to reproduce

---

**Happy Sporting! 🏆**
