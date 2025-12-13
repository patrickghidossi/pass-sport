# PassSport: React Native Conversion Plan

## Overview
This document outlines the step-by-step process for converting the PassSport web application to React Native, enabling deployment to iOS and Android.

## Decision Points

### Choose Your Approach
**Option A: Expo (Recommended for this project)**
- Easier setup and development
- Built-in tools and libraries
- Simpler build process
- Good for apps without complex native requirements

**Option B: React Native CLI**
- More control over native code
- Required for certain native modules
- More complex setup

**Recommendation**: Use Expo - this app doesn't require custom native modules.

---

## Phase 1: Project Setup

### Step 1.1: Initialize React Native Project
```bash
# Navigate to parent directory
cd C:\Users\patri\Documents\pass-sport

# Create new Expo project
npx create-expo-app pass-sport-mobile

# Or for React Native CLI:
npx react-native init PassSportMobile
```

### Step 1.2: Install Dependencies
```bash
cd pass-sport-mobile

# Core dependencies (already included in Expo)
npm install react-native

# Existing dependencies from web app
npm install axios date-fns

# React Native specific dependencies
npm install @react-native-async-storage/async-storage
npm install react-native-safe-area-context

# Optional but recommended
npm install react-navigation @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-gesture-handler
```

### Step 1.3: Project Structure Setup
```
pass-sport-mobile/
├── App.js                          # Entry point
├── src/
│   ├── screens/
│   │   └── EventsScreen.js        # Main screen (converted from App.jsx)
│   ├── components/
│   │   ├── EventCard.js           # Individual event component
│   │   ├── AttendedEventCard.js   # Attended event component
│   │   └── DateSelector.js        # Date navigation component
│   ├── services/
│   │   └── sportsApi.js           # Copy from web app (no changes)
│   ├── styles/
│   │   └── theme.js               # Shared styles/colors
│   └── utils/
│       └── storage.js             # AsyncStorage wrapper
└── package.json
```

---

## Phase 2: Core Infrastructure

### Step 2.1: Create Storage Utility (src/utils/storage.js)
**Purpose**: Abstract AsyncStorage with same API as localStorage

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },

  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }
};
```

**Changes from web**: localStorage is synchronous, AsyncStorage is async

### Step 2.2: Copy Sports API Service
**File**: src/services/sportsApi.js

**Action**: Copy the entire file from web app with NO changes
- axios works identically in React Native
- date-fns works identically in React Native
- All API logic remains the same

### Step 2.3: Create Theme File (src/styles/theme.js)
**Purpose**: Centralize colors, spacing, fonts

```javascript
export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
};
```

---

## Phase 3: Component Conversion

### Step 3.1: Convert DateSelector Component
**File**: src/components/DateSelector.js

**Web version** (from App.jsx:84-94):
```jsx
<section className="date-selector">
  <button onClick={() => handleDateChange('prev')}>← Previous</button>
  <div className="current-date">
    <h2>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
  </div>
  <button onClick={() => handleDateChange('next')}>Next →</button>
</section>
```

**React Native version**:
```jsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { theme } from '../styles/theme';

export const DateSelector = ({ selectedDate, onDateChange }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => onDateChange('prev')}
    >
      <Text style={styles.buttonText}>← Previous</Text>
    </TouchableOpacity>

    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>
        {format(selectedDate, 'EEEE, MMMM d, yyyy')}
      </Text>
    </View>

    <TouchableOpacity
      style={styles.button}
      onPress={() => onDateChange('next')}
    >
      <Text style={styles.buttonText}>Next →</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
  },
  button: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  dateText: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
  },
});
```

**Key changes**:
- `<section>` → `<View>`
- `<button>` → `<TouchableOpacity>`
- `<h2>` → `<Text>`
- `onClick` → `onPress`
- `className` → `style`

### Step 3.2: Convert EventCard Component
**File**: src/components/EventCard.js

**Conversion map**:
- Event card container: `<div className="event-card">` → `<View style={styles.card}>`
- Badge: `<span className="sport-badge">` → `<View style={styles.badge}><Text>`
- Title: `<h4>` → `<Text style={styles.title}>`
- Details: Multiple `<p>` → Multiple `<Text>`
- Button: `<button>` → `<TouchableOpacity>`

**Implementation**:
```jsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export const EventCard = ({ event, isAttended, onMarkAttended, onRemove }) => (
  <View style={[styles.card, isAttended && styles.cardAttended]}>
    <View style={styles.header}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{event.sport}</Text>
      </View>
      <Text style={styles.league}>{event.league}</Text>
    </View>

    <Text style={styles.title}>{event.title}</Text>

    <View style={styles.details}>
      <Text style={styles.detailText}>
        <Text style={styles.detailLabel}>Time: </Text>
        {event.time}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailLabel}>Venue: </Text>
        {event.venue}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailLabel}>Teams: </Text>
        {event.homeTeam} vs {event.awayTeam}
      </Text>
    </View>

    <TouchableOpacity
      style={[styles.button, isAttended && styles.buttonSecondary]}
      onPress={isAttended ? () => onRemove(event.id) : () => onMarkAttended(event)}
    >
      <Text style={styles.buttonText}>
        {isAttended ? 'Remove from Log' : 'Mark as Attended'}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  cardAttended: {
    borderWidth: 2,
    borderColor: theme.colors.success,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    color: '#fff',
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
  league: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  details: {
    marginBottom: theme.spacing.md,
  },
  detailText: {
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.xs,
  },
  detailLabel: {
    fontWeight: '600',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.textSecondary,
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
});
```

### Step 3.3: Convert Main Screen
**File**: src/screens/EventsScreen.js

**Major changes**:
1. **State initialization with AsyncStorage**:
```javascript
// Web version (synchronous)
useEffect(() => {
  const saved = localStorage.getItem('attendedEvents')
  if (saved) {
    setAttendedEvents(JSON.parse(saved))
  }
}, [])

// React Native version (asynchronous)
useEffect(() => {
  const loadAttendedEvents = async () => {
    const saved = await storage.getItem('attendedEvents')
    if (saved) {
      setAttendedEvents(saved) // Already parsed in storage utility
    }
  }
  loadAttendedEvents()
}, [])
```

2. **Save to storage**:
```javascript
// Web version
useEffect(() => {
  localStorage.setItem('attendedEvents', JSON.stringify(attendedEvents))
}, [attendedEvents])

// React Native version
useEffect(() => {
  storage.setItem('attendedEvents', attendedEvents)
}, [attendedEvents])
```

3. **Replace HTML with React Native components**:
- `<div className="app">` → `<SafeAreaView style={styles.container}>`
- `<header>` → `<View style={styles.header}>`
- `<main>` → `<ScrollView style={styles.main}>`
- Event grid → `<FlatList>` (better performance for lists)

4. **Use FlatList for events**:
```jsx
<FlatList
  data={events}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <EventCard
      event={item}
      isAttended={isEventAttended(item.id)}
      onMarkAttended={markAsAttended}
      onRemove={removeFromAttended}
    />
  )}
  contentContainerStyle={styles.eventsList}
  ListEmptyComponent={
    !loading && <Text style={styles.noEvents}>No events found for this date.</Text>
  }
/>
```

---

## Phase 4: Styling Strategy

### CSS to StyleSheet Conversion Guide

**CSS Grid → React Native Flexbox**:
```css
/* Web CSS */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
```

```javascript
// React Native - use FlatList with numColumns
<FlatList
  data={events}
  numColumns={2}
  columnWrapperStyle={styles.row}
/>

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  }
});
```

**Common CSS to StyleSheet mappings**:
- `margin: 10px` → `margin: 10`
- `padding: 20px 10px` → `paddingVertical: 20, paddingHorizontal: 10`
- `background-color: #fff` → `backgroundColor: '#fff'`
- `border-radius: 8px` → `borderRadius: 8`
- `font-weight: bold` → `fontWeight: 'bold'` (string!)
- `box-shadow` → `shadowColor, shadowOffset, shadowOpacity, shadowRadius` (iOS) + `elevation` (Android)

---

## Phase 5: Testing Strategy

### Step 5.1: Set Up Testing Environment
```bash
# For Expo
expo start

# For React Native CLI
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

### Step 5.2: Test Checklist

**Functionality**:
- [ ] Date navigation (previous/next)
- [ ] Events load for selected date
- [ ] Mark event as attended
- [ ] Remove event from attended list
- [ ] Events persist after app restart (AsyncStorage)
- [ ] Loading states display correctly
- [ ] Error states display correctly

**UI/UX**:
- [ ] Layout looks good on small phones (iPhone SE)
- [ ] Layout looks good on large phones (iPhone 15 Pro Max)
- [ ] Layout looks good on tablets
- [ ] Scrolling is smooth
- [ ] Touch targets are adequate size (minimum 44x44)
- [ ] Text is readable
- [ ] Safe area respected (notch, home indicator)

**Platform-Specific**:
- [ ] iOS: Haptic feedback on button press (optional)
- [ ] Android: Back button handling
- [ ] Both: Status bar styling
- [ ] Both: Keyboard handling (if forms added)

---

## Phase 6: Optional Enhancements

### 6.1: Add Navigation
If you want multiple screens (e.g., Settings, About):
```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
```

### 6.2: Add Native Date Picker
```bash
npm install @react-native-community/datetimepicker
```

### 6.3: Add Pull-to-Refresh
Built into FlatList:
```jsx
<FlatList
  data={events}
  refreshing={loading}
  onRefresh={() => fetchEvents(selectedDate)}
/>
```

### 6.4: Add Animations
```bash
npm install react-native-reanimated
```

### 6.5: Add Share Functionality
Share attended events summary:
```javascript
import { Share } from 'react-native';

const shareEventLog = async () => {
  const message = `I've attended ${attendedEvents.length} sporting events!`;
  await Share.share({ message });
};
```

---

## Phase 7: Deployment

### iOS Deployment
1. Set up Apple Developer account ($99/year)
2. Configure app in App Store Connect
3. Build with Expo: `expo build:ios` or Xcode
4. Submit for review

### Android Deployment
1. Create Google Play Console account ($25 one-time)
2. Generate signing key
3. Build release APK/AAB: `expo build:android`
4. Upload to Play Console

---

## Estimated Timeline

**Phase 1 (Setup)**: 1-2 hours
**Phase 2 (Infrastructure)**: 2-3 hours
**Phase 3 (Components)**: 4-6 hours
**Phase 4 (Styling)**: 3-4 hours
**Phase 5 (Testing)**: 2-3 hours
**Phase 6 (Enhancements)**: Optional, 1-2 hours each

**Total**: 12-20 hours for basic conversion

---

## Critical Gotchas & Solutions

### 1. AsyncStorage is Async
**Problem**: Easy to forget await/async
**Solution**: Always use async/await, create wrapper utility

### 2. No CSS Classes
**Problem**: Can't conditionally apply classes like web
**Solution**: Use array syntax: `style={[styles.base, condition && styles.variant]}`

### 3. Text Must Be in `<Text>`
**Problem**: Can't have loose text in `<View>`
**Solution**: All text must be wrapped in `<Text>` component

### 4. Images Need Explicit Dimensions
**Problem**: Images won't show without width/height
**Solution**: Always set dimensions: `style={{ width: 100, height: 100 }}`

### 5. No Web Fonts
**Problem**: Font family names differ from web
**Solution**: Use expo-font or react-native-vector-icons

### 6. Debug Menu Access
- iOS Simulator: Cmd+D
- Android Emulator: Cmd+M (Mac) or Ctrl+M (Windows)
- Physical device: Shake the device

---

## Final File Checklist

**New Files to Create**:
- [ ] src/utils/storage.js
- [ ] src/styles/theme.js
- [ ] src/components/DateSelector.js
- [ ] src/components/EventCard.js
- [ ] src/components/AttendedEventCard.js
- [ ] src/screens/EventsScreen.js
- [ ] App.js (main entry)

**Files to Copy Unchanged**:
- [ ] src/services/sportsApi.js

**Files Not Needed**:
- ❌ index.html
- ❌ vite.config.js
- ❌ eslint.config.js (use React Native's defaults)
- ❌ *.css files

---

## Next Steps

1. Review this plan and ask any questions
2. Decide: Expo or React Native CLI?
3. Create the new React Native project
4. Start with Phase 1 (Setup)
5. Implement incrementally, testing after each phase
