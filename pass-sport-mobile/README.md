# PassSport Mobile

A React Native mobile application for tracking and logging sporting events you attend.

## Features

- 📅 Browse sporting events by date
- ✅ Mark events as attended
- 📝 View your event attendance log
- 💾 Persistent storage with AsyncStorage
- 🎨 Clean, native mobile UI

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript
- **Storage**: AsyncStorage
- **Date Handling**: date-fns
- **HTTP Client**: axios

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Or run on specific platform
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

### Running on Physical Device

1. Install the Expo Go app on your device
2. Run `npm start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

## Project Structure

```
pass-sport-mobile/
├── App.js                          # Main entry point
├── src/
│   ├── screens/
│   │   └── EventsScreen.js        # Main screen
│   ├── components/
│   │   ├── DateSelector.js        # Date navigation component
│   │   ├── EventCard.js           # Individual event display
│   │   └── AttendedEventCard.js   # Attended event display
│   ├── services/
│   │   └── sportsApi.js           # Sports API integration
│   ├── utils/
│   │   └── storage.js             # AsyncStorage wrapper
│   └── styles/
│       └── theme.js               # Design tokens (colors, spacing, etc.)
├── app.json                        # Expo configuration
└── package.json
```

## Conversion from Web App

This mobile app was converted from the PassSport web application. Key changes:

### What Changed
- **HTML → React Native Components**: `<div>` → `<View>`, `<button>` → `<TouchableOpacity>`
- **CSS → StyleSheet**: All styling converted to React Native StyleSheet API
- **localStorage → AsyncStorage**: Storage now uses async operations
- **Build System**: Vite → Metro bundler (Expo)

### What Stayed the Same
- All business logic and React hooks
- The entire `sportsApi.js` service (no changes)
- State management pattern
- Data flow and architecture

## API Integration

The app now supports **real sports data** from **The Sports DB** - completely FREE with no API key required!

### Switching Data Sources

1. Tap the **⚙️ Settings** icon in the app header
2. Choose your data source:
   - **Mock Data** - Sample events (June 27-29, 2025)
   - **The Sports DB** - Real live sports events ✅ **Recommended**

### Available APIs

**Currently Integrated:**
- ✅ Mock Data (for testing)
- ✅ **The Sports DB** (free, no API key) - **Default**

**Additional APIs Available:**
See `API_INTEGRATION_GUIDE.md` for integrating:
- API-Sports (Football, Basketball, Baseball)
- The Odds API
- ESPN (unofficial)
- SportsData.io

### Real Data Coverage

The Sports DB provides:
- ⚽ Soccer: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League
- 🏀 Basketball: NBA
- 🏈 American Football: NFL
- ⚾ Baseball: MLB
- 🏒 Hockey: NHL
- And 30+ other sports

## Storage

Event data is persisted locally using AsyncStorage:
- Key: `attendedEvents`
- Data: Array of attended event objects
- Persists across app restarts

## Development Notes

### Mock Data Dates
The mock data includes events for:
- 2025-06-27
- 2025-06-28
- 2025-06-29

Navigate to these dates to see sample events.

### Styling
All design tokens are centralized in `src/styles/theme.js`:
- Colors
- Spacing
- Typography
- Border radius
- Shadows

### Adding New Features

To add a new screen:
1. Create the screen in `src/screens/`
2. Import and use in `App.js`
3. (Optional) Add React Navigation for multi-screen navigation

## Testing

```bash
# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

See [Expo documentation](https://docs.expo.dev/build/introduction/) for detailed build instructions.

## License

This project is private and not licensed for distribution.

## Related

- [PassSport Web App](../pass-sport/) - Original web version
- [Conversion Plan](../REACT_NATIVE_CONVERSION_PLAN.md) - Detailed conversion documentation
