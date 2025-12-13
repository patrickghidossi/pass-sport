# PassSport Mobile - Installation & Setup Guide

## Quick Start

Follow these steps to get the React Native app running on your device or emulator.

## Step 1: Install Dependencies

```bash
cd pass-sport-mobile
npm install
```

This will install:
- React Native and Expo framework
- axios for API calls
- date-fns for date formatting
- AsyncStorage for local data persistence
- Safe Area Context for handling device notches/insets

## Step 2: Start the Development Server

```bash
npm start
```

This will:
- Start the Metro bundler
- Display a QR code in your terminal
- Open Expo DevTools in your browser

## Step 3: Run on Your Device

### Option A: Physical Device (Easiest)

**iOS:**
1. Install "Expo Go" from the App Store
2. Open the Camera app
3. Scan the QR code from your terminal
4. App will open in Expo Go

**Android:**
1. Install "Expo Go" from the Google Play Store
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Scan the QR code from your terminal

### Option B: iOS Simulator (Mac Only)

**Prerequisites:**
- Xcode installed from Mac App Store
- Xcode Command Line Tools installed

**Steps:**
```bash
# Install and open iOS simulator
npm run ios
```

The app will automatically open in the iOS Simulator.

### Option C: Android Emulator

**Prerequisites:**
- Android Studio installed
- Android Virtual Device (AVD) created
- Android SDK tools in PATH

**Steps:**
1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. Run:
```bash
npm run android
```

The app will automatically install and open in the emulator.

## Step 4: Verify Installation

Once the app is running, you should see:
- PassSport header with subtitle
- Date selector with Previous/Next buttons
- Today's date displayed
- "No events found" message (unless today is 2025-06-27, 28, or 29)

### Test the App

1. **Navigate to mock data dates:**
   - Tap "Next" to navigate to June 27-29, 2025
   - You should see sample sporting events

2. **Mark an event as attended:**
   - Tap "Mark as Attended" on any event
   - The card should highlight with green border
   - Button changes to "Remove from Log"

3. **Check the event log:**
   - Scroll down to "Your Event Log" section
   - Your attended event should appear there

4. **Test persistence:**
   - Close and reopen the app
   - Your attended events should still be there

## Troubleshooting

### "Unable to resolve module..."
```bash
# Clear cache and restart
npm start -- --clear
```

### "Network response timed out"
- Make sure your device and computer are on the same WiFi network
- Check if firewall is blocking the connection

### iOS Simulator not opening
```bash
# Ensure Xcode Command Line Tools are installed
xcode-select --install
```

### Android Emulator not connecting
```bash
# Check ADB is running
adb devices

# If no devices, restart ADB
adb kill-server
adb start-server
```

### App crashes on startup
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm start -- --clear
```

### Changes not appearing
- Press `r` in the terminal to reload
- Or shake your device and tap "Reload"

## Development Tips

### Hot Reloading
- Changes to code automatically reload the app
- Fast Refresh preserves component state
- Press `r` to manually reload

### Debug Menu
- **iOS Simulator**: Cmd + D
- **Android Emulator**: Cmd + M (Mac) or Ctrl + M (Windows)
- **Physical Device**: Shake the device

### Viewing Logs
```bash
# All logs
npm start

# iOS logs only
npx react-native log-ios

# Android logs only
npx react-native log-android
```

### Performance Monitor
1. Open debug menu (shake device or Cmd+D)
2. Tap "Show Performance Monitor"
3. View FPS, RAM, and JS metrics

## Next Steps

Once the app is running successfully:

1. **Explore the code:**
   - Start with `App.js` - main entry point
   - Check `src/screens/EventsScreen.js` - main logic
   - Review `src/components/` - UI components

2. **Customize the theme:**
   - Edit `src/styles/theme.js`
   - Change colors, spacing, fonts

3. **Add real sports API:**
   - Get an API key from ESPN, The Odds API, or API-Football
   - Update `EventsScreen.js` line 32
   - Replace 'mock' with your chosen provider

4. **Test on multiple devices:**
   - Different screen sizes
   - iOS and Android
   - Landscape orientation

## Deployment

When ready to deploy to app stores:

### iOS App Store
```bash
# Build for iOS
expo build:ios
```

Requirements:
- Apple Developer Account ($99/year)
- App Store Connect setup
- App icons and splash screens

### Google Play Store
```bash
# Build for Android
expo build:android
```

Requirements:
- Google Play Developer Account ($25 one-time)
- Signing key generated
- App icons and feature graphic

See [Expo Build Documentation](https://docs.expo.dev/build/introduction/) for detailed deployment instructions.

## Support

For issues or questions:
- Check the [Expo Documentation](https://docs.expo.dev/)
- Review the [React Native Documentation](https://reactnative.dev/)
- See the conversion plan: `../REACT_NATIVE_CONVERSION_PLAN.md`

## System Requirements

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **iOS**: macOS with Xcode (for iOS simulator)
- **Android**: Android Studio with SDK (for Android emulator)
- **Memory**: At least 8GB RAM recommended
- **Storage**: ~5GB free space for dependencies and build tools
