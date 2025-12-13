# PassSport Mobile - Quick Start Guide

## ✅ Prerequisites Complete
- ✅ Dependencies installed (1139 packages)
- ✅ Expo CLI ready (v0.18.31)
- ✅ All source files in place

## 🚀 Start the App Now

### Step 1: Start Expo Development Server

Open a **new terminal window** and run:

```bash
cd pass-sport-mobile
npm start
```

You should see:
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

### Step 2: Choose How to Run

You have 3 options:

#### Option A: On Your Phone (Recommended for First Time)

**iPhone:**
1. Install "Expo Go" from App Store
2. Open Camera app
3. Point at the QR code in terminal
4. Tap the notification to open in Expo Go

**Android:**
1. Install "Expo Go" from Google Play
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Scan the QR code from terminal

#### Option B: iOS Simulator (Mac Only)

In the terminal where Expo is running:
- Press `i` key

Or in a new terminal:
```bash
cd pass-sport-mobile
npm run ios
```

#### Option C: Android Emulator

**First, start an Android Virtual Device:**
1. Open Android Studio
2. AVD Manager → Start a device

**Then:**
- Press `a` in Expo terminal

Or in a new terminal:
```bash
cd pass-sport-mobile
npm run android
```

#### Option D: Web Browser

- Press `w` in Expo terminal

Or:
```bash
cd pass-sport-mobile
npm run web
```

**Note:** Some React Native features won't work on web, but it's good for quick testing.

---

## 🧪 Testing the App

Once the app loads, you should see:

### Initial Screen
```
🏟️ PassSport
Record and log the sporting events you attend

[← Previous]  [Friday, December 13, 2024]  [Next →]

Events on Dec 13, 2024
No events found for this date.

Your Event Log (0)
You haven't logged any events yet...
```

### Navigate to Mock Data

1. **Tap "Next" repeatedly** until you reach **June 27, 2025**
2. You should see 2 events:
   - Manchester United vs Liverpool
   - Lakers vs Warriors

3. **Tap "Mark as Attended"** on an event
   - Card gets green border
   - Button changes to "Remove from Log"

4. **Scroll down to "Your Event Log"**
   - You should see your attended event

5. **Close and reopen the app**
   - Your attended events should still be there (AsyncStorage persistence)

---

## 🔍 Troubleshooting

### "Unable to connect to Metro"
```bash
# Clear cache and restart
cd pass-sport-mobile
npm start -- --clear
```

### "Network timeout"
- Ensure phone and computer on same WiFi
- Check firewall isn't blocking port 8081
- Try running: `npm start -- --tunnel`

### App shows blank screen
- Open debug menu (shake device or Cmd+D)
- Check for errors in terminal
- Press 'r' to reload

### Changes not showing
- Press 'r' in terminal to reload
- Or shake device → "Reload"

### Port already in use
```bash
# Kill process on port 8081
# Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8081 | xargs kill
```

---

## 🎯 What to Test

- [ ] Date navigation works
- [ ] Events show for June 27-29, 2025
- [ ] Can mark event as attended
- [ ] Attended event appears in log
- [ ] Can remove event from log
- [ ] Events persist after app restart
- [ ] Scrolling is smooth
- [ ] All text is readable
- [ ] Buttons are easy to tap

---

## 📱 Dev Menu

Access developer tools by:
- **iOS Simulator**: Cmd + D
- **Android Emulator**: Cmd + M (Mac) or Ctrl + M (Windows)
- **Physical Device**: Shake the device

Options:
- Reload
- Debug Remote JS
- Show Performance Monitor
- Toggle Inspector

---

## 🐛 Common Issues & Solutions

### 1. "Invariant Violation: Element type is invalid"
**Cause:** Import error in components
**Fix:** Check that all components are exported correctly

### 2. "Can't find variable: __DEV__"
**Cause:** Metro bundler issue
**Fix:**
```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### 3. AsyncStorage warning
**Cause:** Using deprecated API (expected with current version)
**Fix:** Already using @react-native-async-storage/async-storage, ignore warning

### 4. "Expo Go is out of date"
**Cause:** Expo SDK mismatch
**Fix:** Update Expo Go app from App/Play Store

---

## 📊 Performance Monitoring

### Enable Performance Monitor
1. Shake device or Cmd+D
2. Tap "Show Performance Monitor"
3. View:
   - JS FPS (should be ~60)
   - UI FPS (should be ~60)
   - RAM usage

### Check Bundle Size
```bash
cd pass-sport-mobile
npx expo export
# Check .expo-shared/assets.json
```

---

## 🔧 Advanced

### Clear All Cache
```bash
cd pass-sport-mobile
rm -rf node_modules
npm install
npx expo start --clear
```

### Debug Network Requests
```bash
# Install React Native Debugger
# Or use Chrome DevTools
npm start
# Press 'd' in terminal or shake device
# Enable "Debug Remote JS"
```

### Check AsyncStorage Contents
Add to EventsScreen.js:
```javascript
import { storage } from '../utils/storage';

// Debug function
const debugStorage = async () => {
  const data = await storage.getItem('attendedEvents');
  console.log('Stored events:', data);
};
```

---

## ✅ Success Checklist

- [ ] Expo server started without errors
- [ ] App loaded on device/simulator
- [ ] Can navigate dates
- [ ] Can see mock events on June 27-29, 2025
- [ ] Can mark events as attended
- [ ] Attended events show in log
- [ ] Data persists after restart
- [ ] No console errors
- [ ] Performance is smooth

---

## 🎉 Next Steps After Success

1. **Customize the theme:**
   - Edit `src/styles/theme.js`
   - Change colors to match your brand

2. **Add real sports API:**
   - Get API key from ESPN, The Odds API, or API-Football
   - Update `src/screens/EventsScreen.js` line 32

3. **Add more features:**
   - Search/filter events
   - Calendar view
   - Share functionality
   - Push notifications

4. **Prepare for deployment:**
   - Create app icons
   - Add splash screens
   - Test on multiple devices
   - Build for production

---

## 📞 Need Help?

If you encounter issues:
1. Check terminal for error messages
2. Look in this file's troubleshooting section
3. Check Expo documentation: https://docs.expo.dev/
4. Review the conversion plan: `../REACT_NATIVE_CONVERSION_PLAN.md`
