# Sports API Integration Guide

## Overview

PassSport currently uses mock data. This guide will help you integrate real sports APIs to fetch live event data.

## Available Sports APIs

### 1. The Sports DB (Recommended for Starting) ⭐

**Pros:**
- Completely FREE (no API key required for basic features)
- No rate limits on free tier
- Good coverage of major sports
- Simple REST API

**Cons:**
- Limited to major leagues
- Event data may not be real-time
- No live scores on free tier

**Coverage:**
- Soccer: Premier League, La Liga, Serie A, Bundesliga, etc.
- Basketball: NBA
- American Football: NFL
- Baseball: MLB
- And 30+ other sports

**Pricing:** Free (Patreon option for premium features)

**API Endpoints:**
```
Events by date: https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=YYYY-MM-DD&l=4328
Search events: https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=Arsenal
Leagues: https://www.thesportsdb.com/api/v1/json/3/all_leagues.php
```

**Website:** https://www.thesportsdb.com/api.php

---

### 2. API-Sports (Sports Data Suite)

**Pros:**
- Comprehensive sports coverage
- Real-time data
- Well-documented
- Multiple sports (Football, Basketball, Baseball, etc.)

**Cons:**
- Requires API key
- Free tier has strict limits (100 requests/day)
- More complex setup

**Coverage:**
- Football (Soccer): 900+ leagues
- Basketball: NBA, Euroleague, etc.
- Baseball: MLB
- Hockey: NHL
- American Football: NFL

**Pricing:**
- Free: 100 requests/day
- Basic: $10/month - 10,000 requests/day
- Pro: $30/month - 30,000 requests/day

**API Endpoints:**
```
Football fixtures: https://v3.football.api-sports.io/fixtures?date=YYYY-MM-DD
Basketball games: https://v1.basketball.api-sports.io/games?date=YYYY-MM-DD
Baseball games: https://v1.baseball.api-sports.io/games?date=YYYY-MM-DD
```

**Website:** https://api-sports.io/

---

### 3. The Odds API

**Pros:**
- Free tier available
- Good for betting odds and event data
- Multiple sports
- Real-time updates

**Cons:**
- Requires API key
- Free tier limited (500 requests/month)
- Focused on betting/odds data

**Coverage:**
- Soccer, Basketball, Baseball, Hockey, Tennis, MMA, etc.

**Pricing:**
- Free: 500 requests/month
- Starter: $10/month - 10,000 requests/month
- Team: $50/month - 100,000 requests/month

**API Endpoints:**
```
Sports list: https://api.the-odds-api.com/v4/sports
Scores: https://api.the-odds-api.com/v4/sports/{sport}/scores
Odds: https://api.the-odds-api.com/v4/sports/{sport}/odds
```

**Website:** https://the-odds-api.com/

---

### 4. ESPN API (Unofficial)

**Pros:**
- Free (no API key)
- Comprehensive data
- Real-time scores
- Multiple sports

**Cons:**
- Unofficial/undocumented
- No guaranteed uptime
- May change without notice
- Rate limiting unknown

**Coverage:**
- All major ESPN sports

**API Endpoints:**
```
NFL: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard
NBA: https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard
MLB: https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard
Soccer: https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard
```

**Website:** N/A (unofficial)

---

### 5. SportsData.io

**Pros:**
- Official data partnerships
- Very reliable
- Real-time updates
- Multiple sports

**Cons:**
- Expensive
- No free tier (trial only)
- Overkill for personal projects

**Pricing:**
- Trial: 1,000 requests (one-time)
- Plans start at $20/month

**Website:** https://sportsdata.io/

---

## Recommendation by Use Case

### For Learning/Personal Projects
**The Sports DB** - Free, no API key, simple to use

### For Serious App Development
**API-Sports** - Good balance of features, price, and reliability

### For Quick Prototyping
**ESPN API (Unofficial)** - Free, no key, but unreliable long-term

### For Betting/Odds Focus
**The Odds API** - Best odds data, fair pricing

---

## Quick Comparison Table

| API | Free Tier | API Key | Real-time | Coverage | Best For |
|-----|-----------|---------|-----------|----------|----------|
| The Sports DB | ✅ Unlimited | ❌ No | ⚠️ Limited | Good | Learning |
| API-Sports | 100/day | ✅ Yes | ✅ Yes | Excellent | Production |
| The Odds API | 500/month | ✅ Yes | ✅ Yes | Good | Betting apps |
| ESPN (Unofficial) | ✅ Unlimited | ❌ No | ✅ Yes | Excellent | Prototyping |
| SportsData.io | Trial only | ✅ Yes | ✅ Yes | Excellent | Enterprise |

---

## Integration Steps

### Option 1: The Sports DB (No API Key)

**Step 1: Get Started**
No registration needed! The API is free to use.

**Step 2: Update Code**
See "Implementation Examples" below.

**Step 3: Test**
Use real dates and see live events!

---

### Option 2: API-Sports

**Step 1: Get API Key**
1. Go to https://dashboard.api-football.com/register
2. Create free account
3. Verify email
4. Go to "My Account" → "API Key"
5. Copy your API key

**Step 2: Choose Your Sport**
- Football (Soccer): https://dashboard.api-football.com/
- Basketball: https://dashboard.api-basketball.com/
- Baseball: https://dashboard.api-baseball.com/

**Step 3: Update Code**
See "Implementation Examples" below.

---

### Option 3: The Odds API

**Step 1: Get API Key**
1. Go to https://the-odds-api.com/
2. Click "Get Free API Key"
3. Enter email
4. Check email for API key

**Step 2: Update Code**
See "Implementation Examples" below.

---

## Implementation Examples

### Using The Sports DB (Recommended for Quick Start)

Create `src/services/sportsDatabaseApi.js`:

```javascript
import axios from 'axios';
import { format } from 'date-fns';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

/**
 * Fetch events from The Sports DB
 * Free API - no key required!
 */
export const fetchEventsBySportsDB = async (date) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');

    // The Sports DB uses league IDs
    // 4328 = English Premier League
    // 4329 = Spanish La Liga
    // 4387 = NBA
    // You can fetch multiple leagues and combine

    const leagueIds = [
      '4328', // Premier League
      '4387', // NBA
      '4424', // MLB
      '4391', // NFL
    ];

    const allEvents = [];

    for (const leagueId of leagueIds) {
      const response = await axios.get(`${BASE_URL}/eventsday.php`, {
        params: {
          d: formattedDate,
          l: leagueId
        }
      });

      if (response.data.events) {
        allEvents.push(...response.data.events);
      }
    }

    // Transform to our format
    return allEvents.map(event => ({
      id: event.idEvent,
      title: event.strEvent,
      sport: event.strSport,
      league: event.strLeague,
      time: event.strTime || 'TBD',
      venue: event.strVenue || 'TBD',
      homeTeam: event.strHomeTeam,
      awayTeam: event.strAwayTeam,
      status: event.strStatus || 'scheduled',
    }));
  } catch (error) {
    console.error('Error fetching from Sports DB:', error);
    throw error;
  }
};
```

**Update EventsScreen.js:**
```javascript
// Import the new API
import { fetchEventsBySportsDB } from '../services/sportsDatabaseApi';

// In fetchEvents function (line ~50):
const eventsData = await fetchEventsBySportsDB(date);
```

---

### Using API-Sports (Football/Soccer)

Create `src/services/apiSportsIntegration.js`:

```javascript
import axios from 'axios';
import { format } from 'date-fns';

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your key
const BASE_URL = 'https://v3.football.api-sports.io';

/**
 * Fetch football/soccer events from API-Sports
 */
export const fetchFootballEvents = async (date) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');

    const response = await axios.get(`${BASE_URL}/fixtures`, {
      params: {
        date: formattedDate,
        league: 39, // Premier League (you can add more)
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });

    const fixtures = response.data.response;

    return fixtures.map(fixture => ({
      id: fixture.fixture.id,
      title: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
      sport: 'Football',
      league: fixture.league.name,
      time: format(new Date(fixture.fixture.date), 'HH:mm'),
      venue: fixture.fixture.venue?.name || 'TBD',
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      status: fixture.fixture.status.short,
    }));
  } catch (error) {
    console.error('Error fetching from API-Sports:', error);
    throw error;
  }
};
```

---

### Using ESPN (Unofficial)

Create `src/services/espnApi.js`:

```javascript
import axios from 'axios';
import { format } from 'date-fns';

/**
 * Fetch events from ESPN (unofficial API)
 */
export const fetchESPNEvents = async (date, sport = 'football', league = 'nfl') => {
  try {
    const formattedDate = format(date, 'yyyyMMdd');

    // ESPN API format: /sports/{sport}/{league}/scoreboard
    const url = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`;

    const response = await axios.get(url, {
      params: {
        dates: formattedDate
      }
    });

    const events = response.data.events || [];

    return events.map(event => {
      const competition = event.competitions[0];
      const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
      const awayTeam = competition.competitors.find(c => c.homeAway === 'away');

      return {
        id: event.id,
        title: event.name,
        sport: event.sport || sport,
        league: event.league?.name || league.toUpperCase(),
        time: format(new Date(event.date), 'HH:mm'),
        venue: competition.venue?.fullName || 'TBD',
        homeTeam: homeTeam?.team?.displayName || 'TBD',
        awayTeam: awayTeam?.team?.displayName || 'TBD',
        status: event.status?.type?.description || 'scheduled',
      };
    });
  } catch (error) {
    console.error('Error fetching from ESPN:', error);
    throw error;
  }
};

// Fetch multiple sports
export const fetchAllESPNEvents = async (date) => {
  const sports = [
    { sport: 'football', league: 'nfl' },
    { sport: 'basketball', league: 'nba' },
    { sport: 'baseball', league: 'mlb' },
    { sport: 'soccer', league: 'eng.1' }, // Premier League
  ];

  const allEvents = [];

  for (const { sport, league } of sports) {
    try {
      const events = await fetchESPNEvents(date, sport, league);
      allEvents.push(...events);
    } catch (error) {
      console.warn(`Failed to fetch ${sport}/${league}:`, error.message);
    }
  }

  return allEvents;
};
```

---

## Next Steps

1. **Choose your API** from the options above
2. **Get API key** (if required)
3. **Create the integration file** using examples above
4. **Update EventsScreen.js** to use the new API
5. **Test with real dates** to see live events!

---

## Testing Tips

### Test with Recent/Upcoming Dates
Mock data uses June 2025. Real APIs need actual dates:
- Use today's date for testing
- Check league schedules for event-heavy days
- NFL: Sundays during season (Sept-Jan)
- NBA: Multiple games daily (Oct-Apr)
- MLB: Daily games (Apr-Sept)
- Premier League: Weekends (Aug-May)

### Handle Rate Limits
```javascript
// Add caching to reduce API calls
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let eventCache = {};

const fetchEventsWithCache = async (date) => {
  const key = format(date, 'yyyy-MM-dd');

  if (eventCache[key] && Date.now() - eventCache[key].timestamp < CACHE_DURATION) {
    return eventCache[key].data;
  }

  const data = await fetchEventsBySportsDB(date);
  eventCache[key] = { data, timestamp: Date.now() };

  return data;
};
```

### Error Handling
Always handle API failures gracefully:
```javascript
try {
  const events = await fetchRealAPI(date);
  setEvents(events);
} catch (error) {
  console.error('API Error:', error);
  setError('Failed to load events. Using cached data.');
  // Optionally fall back to mock data
}
```

---

## Cost Estimation

### For Personal Use
- **The Sports DB**: FREE ✅
- **ESPN Unofficial**: FREE ✅
- **API-Sports Free**: FREE (100 req/day) ✅

### For Published App (1000 daily users)
Assuming average user views 5 dates = 5,000 requests/day

- **The Sports DB**: FREE ✅
- **API-Sports**: $30/month (30k requests/day)
- **The Odds API**: $50/month (100k requests/month = ~3.3k/day) ❌ Not enough
- **SportsData.io**: $100+/month

**Recommendation**: Start with The Sports DB (free), add caching, upgrade to API-Sports if needed.

---

## Security Best Practices

### Never Hardcode API Keys
```javascript
// ❌ BAD
const API_KEY = 'abc123xyz';

// ✅ GOOD - Use environment variables
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
```

### Use Environment Variables

Create `.env`:
```
EXPO_PUBLIC_API_KEY=your_api_key_here
EXPO_PUBLIC_API_PROVIDER=api-sports
```

Install dotenv:
```bash
npm install dotenv
```

Access in code:
```javascript
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
```

### Add .env to .gitignore
```
.env
.env.local
```

---

## Ready to Implement?

Let me know which API you'd like to use and I'll:
1. Help you get an API key (if needed)
2. Create the integration file
3. Update your EventsScreen
4. Add environment variable support
5. Test the integration

**Which API interests you most?**
