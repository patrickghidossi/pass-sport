# PassSport Testing Checklist

Use this checklist to verify the real API integration works correctly.

## Pre-Flight Check ✅

- [x] All files created (9 JS files in src/)
- [x] No syntax errors
- [x] Dependencies installed (1139 packages)
- [x] Expo CLI ready (v0.18.31)

**Status: READY TO TEST! 🚀**

---

## Testing Steps

### Step 1: Start the Development Server

**Open a NEW terminal window** (keep this one open for reference):

```bash
cd pass-sport-mobile
npm start
```

**What you should see:**
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web
```

**Expected time:** 10-30 seconds

---

### Step 2: Open the App

**Choose ONE option:**

#### Option A: Phone (Recommended)
1. Install "Expo Go" from App Store or Google Play
2. Scan the QR code from terminal
3. App should open in Expo Go

#### Option B: iOS Simulator (Mac only)
```bash
# In a NEW terminal window:
cd pass-sport-mobile
npm run ios
```

#### Option C: Web Browser (Quick test)
```bash
# In a NEW terminal window:
cd pass-sport-mobile
npm run web
```

**Expected result:** App loads and shows PassSport header

**Checkpoint 1:** ✅ App loads without crashes

---

### Step 3: Verify Initial State

**What you should see:**

```
🏟️ PassSport
Record and log the sporting events you attend

[← Previous]  [Today's Date]  [Next →]

Events on [Date]
Loading events... OR No events found

Your Event Log (0)
You haven't logged any events yet...
```

**Important:** Look for the **⚙️ icon** in the top-right corner of the header!

**Checkpoint 2:** ✅ Settings icon (⚙️) is visible

---

### Step 4: Open API Selector

**Action:** Tap the **⚙️** icon

**Expected result:** API selector panel drops down showing:

```
Data Source

🎭 Mock Data                        [FREE]
Sample events (June 27-29, 2025)

🏆 The Sports DB                    [FREE]  ✓
Free live sports data

💡 The Sports DB provides free real-time sports data
   with no API key required!
```

**Checkpoint 3:** ✅ API selector opens with 2 options

---

### Step 5: Select The Sports DB

**Current state:** "The Sports DB" should already be selected (green checkmark)

**If it's not selected:**
1. Tap "The Sports DB"
2. Panel should close
3. Events should start loading

**Expected behavior:**
- Loading indicator appears
- Console shows: "Fetching events for [date] from The Sports DB..."
- After 1-5 seconds, events appear OR "No events found"

**Checkpoint 4:** ✅ API selection works, loading occurs

---

### Step 6: Test with Today's Date

**Action:** Make sure you're viewing today's date

**Expected results (varies by date/season):**

**If events exist:**
```
Events on Dec 13, 2024

Premier League
Manchester City vs Liverpool          ✓ Real team names
Time: 15:00                           ✓ Actual time
Venue: Etihad Stadium                 ✓ Real venue
Teams: Manchester City vs Liverpool
[Mark as Attended]
```

**If no events:**
```
No events found for this date.
```
This is normal for:
- Off-season dates
- Weekdays (for some sports)
- Dates with no scheduled matches

**Checkpoint 5:** ✅ Events load (or "No events" shows)

---

### Step 7: Navigate to Event-Rich Dates

**Best dates to find events:**

**Soccer (Aug-May):**
- Saturdays: 12pm-3pm GMT
- Sundays: 1pm-4pm GMT

**NBA (Oct-Apr):**
- Tuesday, Thursday, Saturday: 7pm-10pm ET

**NFL (Sep-Feb):**
- Sundays: 1pm-8pm ET
- Monday: 8pm ET

**Action:**
1. Tap "Next" to navigate to upcoming weekend
2. Or navigate to a known game day

**Expected:** Should see real events with real team names

**Checkpoint 6:** ✅ Can find dates with real events

---

### Step 8: Test Event Details

**Find any event and verify:**

- [ ] Sport type shown (Football, Basketball, etc.)
- [ ] League name shown (Premier League, NBA, etc.)
- [ ] Time in HH:mm format (e.g., "15:00", "19:30")
- [ ] Venue/stadium name (not "TBD")
- [ ] Home team name
- [ ] Away team name
- [ ] "Mark as Attended" button visible

**Example of good data:**
```
Sport: ✅ Soccer
League: ✅ English Premier League
Time: ✅ 15:00
Venue: ✅ Old Trafford
Teams: ✅ Manchester United vs Liverpool
```

**Checkpoint 7:** ✅ Event data is complete and accurate

---

### Step 9: Test Marking Event as Attended

**Action:**
1. Find any event
2. Tap "Mark as Attended"

**Expected:**
- Card gets green border
- Button changes to "Remove from Log"
- Event appears in "Your Event Log" section below

**Checkpoint 8:** ✅ Can mark real events as attended

---

### Step 10: Verify Event Log

**Scroll down to "Your Event Log"**

**Expected:**
```
Your Event Log (1)

🏆 [Sport]                    Logged: Dec 13, 2024
[Event Title]
[League] • [Venue] • [Time]
[Remove]
```

**Checkpoint 9:** ✅ Event appears in log with correct data

---

### Step 11: Test Persistence

**Action:**
1. Close the app completely
2. Reopen the app

**Expected:**
- The Sports DB should still be selected
- Attended events should still be in "Your Event Log"

**Checkpoint 10:** ✅ Data persists across restarts

---

### Step 12: Test Switching APIs

**Action:**
1. Tap ⚙️ icon
2. Select "Mock Data"

**Expected:**
- Selector closes
- Events refresh
- Navigate to June 27, 2025
- Should see mock events (Man United vs Liverpool, Lakers vs Warriors)

**Action:**
1. Tap ⚙️ icon again
2. Select "The Sports DB"

**Expected:**
- Events refresh
- Back to real data

**Checkpoint 11:** ✅ Can switch between APIs

---

### Step 13: Test Error Handling

**Action:**
1. Turn off WiFi/internet on device
2. Navigate to a different date

**Expected:**
```
[Red error box]
Failed to fetch events. Please try again.
```

**Action:**
1. Turn WiFi back on
2. Tap "Previous" or "Next" to trigger refresh

**Expected:**
- Events load successfully

**Checkpoint 12:** ✅ Error handling works

---

## Final Verification

### ✅ All Systems Check

- [ ] App loads without errors
- [ ] Settings icon visible
- [ ] API selector works
- [ ] Can select The Sports DB
- [ ] Events load (or "No events" shows correctly)
- [ ] Event data is accurate
- [ ] Can mark events as attended
- [ ] Events appear in log
- [ ] Data persists after restart
- [ ] Can switch between APIs
- [ ] Error handling works offline
- [ ] No crashes or freezes

**If all checked: 🎉 INTEGRATION SUCCESSFUL!**

---

## Common Issues & Quick Fixes

### Issue: "No events found" for every date

**Possible causes:**
1. Off-season for selected leagues
2. API is down
3. Network issue

**Debug:**
1. Check console for error messages
2. Try Mock Data to verify app works
3. Visit https://www.thesportsdb.com to verify site is up
4. Check internet connection

**Fix:**
- Try weekend dates during sports seasons
- Or switch to Mock Data temporarily

---

### Issue: Settings icon not visible

**Fix:**
1. Check you're running latest code
2. Verify EventsScreen.js was updated
3. Reload app (shake device → Reload)

---

### Issue: App crashes on API switch

**Fix:**
1. Check console for error messages
2. Clear cache: `npm start -- --clear`
3. Restart app

---

### Issue: Events load slowly (>10 seconds)

**Normal:** First load can be slow (6 API calls)

**If too slow:**
1. Reduce leagues in `sportsDatabaseApi.js`
2. Check internet speed
3. Consider caching implementation

---

## Performance Benchmarks

**Expected performance:**

| Action | Target | Acceptable | Slow |
|--------|--------|------------|------|
| App startup | <3s | <5s | >5s |
| API switch | <2s | <4s | >4s |
| Events load (real) | <3s | <6s | >6s |
| Events load (mock) | <1s | <2s | >2s |
| Mark attended | Instant | <1s | >1s |
| Date navigation | Instant | <1s | >1s |

---

## Success Criteria

**Minimum viable:**
- [x] App loads
- [x] Can switch to The Sports DB
- [x] Events load (even if "No events")
- [x] No crashes

**Full success:**
- [x] All of above
- [x] Real events display with accurate data
- [x] Can mark events as attended
- [x] Events persist
- [x] Good performance (<5s loads)

---

## Next Steps After Testing

### If All Tests Pass ✅

**You're ready to:**
1. Share with friends via TestFlight/internal testing
2. Customize leagues for your preferences
3. Add more features
4. Deploy to production

### If Some Tests Fail ⚠️

**Check:**
1. Console errors (shake device → Debug)
2. Network tab (see API requests)
3. This checklist for fixes
4. TESTING_REAL_API.md for detailed troubleshooting

---

## Testing Notes

**Date:** ___________
**Device/Simulator:** ___________
**Test Duration:** ___________

**Issues Found:**
-
-
-

**Overall Status:** ☐ Pass  ☐ Fail  ☐ Partial

**Notes:**
