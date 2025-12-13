import axios from 'axios'
import { format } from 'date-fns'

// Configuration for different sports APIs
const API_CONFIGS = {
  // ESPN API (requires API key)
  espn: {
    baseURL: 'https://site.api.espn.com/apis/site/v2/sports',
    requiresKey: true
  },
  // The Odds API (free tier available)
  odds: {
    baseURL: 'https://api.the-odds-api.com/v4/sports',
    requiresKey: true
  },
  // API-Football (free tier available)
  football: {
    baseURL: 'https://v3.football.api-sports.io',
    requiresKey: true
  }
}

// Mock data for demonstration purposes
const MOCK_EVENTS = {
  '2025-06-27': [
    {
      id: 1,
      title: 'Manchester United vs Liverpool',
      sport: 'Football',
      league: 'Premier League',
      time: '20:00',
      venue: 'Old Trafford',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Lakers vs Warriors',
      sport: 'Basketball',
      league: 'NBA',
      time: '22:30',
      venue: 'Crypto.com Arena',
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      status: 'scheduled'
    }
  ],
  '2025-06-28': [
    {
      id: 3,
      title: 'Yankees vs Red Sox',
      sport: 'Baseball',
      league: 'MLB',
      time: '19:05',
      venue: 'Yankee Stadium',
      homeTeam: 'Yankees',
      awayTeam: 'Red Sox',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Real Madrid vs Barcelona',
      sport: 'Football',
      league: 'La Liga',
      time: '21:00',
      venue: 'Santiago Bernabéu',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      status: 'scheduled'
    }
  ],
  '2025-06-29': [
    {
      id: 5,
      title: 'Celtics vs Heat',
      sport: 'Basketball',
      league: 'NBA',
      time: '19:30',
      venue: 'TD Garden',
      homeTeam: 'Celtics',
      awayTeam: 'Heat',
      status: 'scheduled'
    }
  ]
}

/**
 * Fetch sporting events for a specific date
 * @param {Date} date - The date to fetch events for
 * @param {string} apiProvider - The API provider to use ('espn', 'odds', 'football', 'mock')
 * @param {string} apiKey - API key for the selected provider
 * @returns {Promise<Array>} Array of sporting events
 */
export const fetchEventsByDate = async (date, apiProvider = 'mock', apiKey = null) => {
  const formattedDate = format(date, 'yyyy-MM-dd')
  
  try {
    // For demo purposes, return mock data
    if (apiProvider === 'mock') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Return mock data for the date, or empty array if no events
      return MOCK_EVENTS[formattedDate] || []
    }
    
    // Real API implementations
    switch (apiProvider) {
      case 'espn':
        return await fetchESPNEvents(formattedDate, apiKey)
      case 'odds':
        return await fetchOddsEvents(formattedDate, apiKey)
      case 'football':
        return await fetchFootballEvents(formattedDate, apiKey)
      default:
        throw new Error(`Unsupported API provider: ${apiProvider}`)
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

/**
 * Fetch events from ESPN API
 */
const fetchESPNEvents = async (date, apiKey) => {
  if (!apiKey) {
    throw new Error('ESPN API requires an API key')
  }
  
  const response = await axios.get(`${API_CONFIGS.espn.baseURL}/soccer/eng.1/scoreboard`, {
    params: {
      dates: date,
      limit: 50
    },
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  
  return transformESPNData(response.data)
}

/**
 * Fetch events from The Odds API
 */
const fetchOddsEvents = async (date, apiKey) => {
  if (!apiKey) {
    throw new Error('The Odds API requires an API key')
  }
  
  const response = await axios.get(`${API_CONFIGS.odds.baseURL}/soccer/england_premier_league/scores`, {
    params: {
      apiKey,
      date: date
    }
  })
  
  return transformOddsData(response.data)
}

/**
 * Fetch events from API-Football
 */
const fetchFootballEvents = async (date, apiKey) => {
  if (!apiKey) {
    throw new Error('API-Football requires an API key')
  }
  
  const response = await axios.get(`${API_CONFIGS.football.baseURL}/fixtures`, {
    params: {
      date: date,
      league: 39 // Premier League
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  })
  
  return transformFootballData(response.data)
}

/**
 * Transform ESPN API data to our format
 */
const transformESPNData = (data) => {
  if (!data.events) return []
  
  return data.events.map(event => ({
    id: event.id,
    title: `${event.competitions[0]?.competitors[0]?.team.name} vs ${event.competitions[0]?.competitors[1]?.team.name}`,
    sport: event.sport.name,
    league: event.league.name,
    time: format(new Date(event.date), 'HH:mm'),
    venue: event.competitions[0]?.venue?.fullName || 'TBD',
    homeTeam: event.competitions[0]?.competitors[0]?.team.name,
    awayTeam: event.competitions[0]?.competitors[1]?.team.name,
    status: event.status.type.name
  }))
}

/**
 * Transform The Odds API data to our format
 */
const transformOddsData = (data) => {
  return data.map(event => ({
    id: event.id,
    title: event.home_team + ' vs ' + event.away_team,
    sport: 'Soccer',
    league: event.sport_title,
    time: format(new Date(event.commence_time), 'HH:mm'),
    venue: 'TBD',
    homeTeam: event.home_team,
    awayTeam: event.away_team,
    status: event.scores ? 'completed' : 'scheduled'
  }))
}

/**
 * Transform API-Football data to our format
 */
const transformFootballData = (data) => {
  if (!data.response) return []
  
  return data.response.map(fixture => ({
    id: fixture.fixture.id,
    title: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
    sport: 'Football',
    league: fixture.league.name,
    time: format(new Date(fixture.fixture.date), 'HH:mm'),
    venue: fixture.fixture.venue?.name || 'TBD',
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    status: fixture.fixture.status.short
  }))
}

/**
 * Get available API providers
 */
export const getAvailableProviders = () => {
  return Object.keys(API_CONFIGS).map(provider => ({
    name: provider,
    requiresKey: API_CONFIGS[provider].requiresKey,
    baseURL: API_CONFIGS[provider].baseURL
  }))
}

/**
 * Validate API key format (basic validation)
 */
export const validateApiKey = (apiKey, provider) => {
  if (!apiKey) return false
  
  switch (provider) {
    case 'espn':
      return apiKey.length >= 20
    case 'odds':
      return apiKey.length >= 10
    case 'football':
      return apiKey.length >= 20
    default:
      return false
  }
} 