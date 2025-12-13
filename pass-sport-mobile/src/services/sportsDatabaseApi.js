import axios from 'axios';
import { format } from 'date-fns';

/**
 * The Sports DB API Integration
 *
 * Free sports API with no authentication required
 * Website: https://www.thesportsdb.com/api.php
 *
 * Coverage: 30+ sports including:
 * - Soccer (Premier League, La Liga, Serie A, etc.)
 * - Basketball (NBA)
 * - American Football (NFL)
 * - Baseball (MLB)
 * - Hockey (NHL)
 */

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

/**
 * Popular league IDs for The Sports DB
 * Find more at: https://www.thesportsdb.com/api/v1/json/3/all_leagues.php
 */
export const LEAGUE_IDS = {
  // Soccer
  PREMIER_LEAGUE: '4328',
  LA_LIGA: '4335',
  SERIE_A: '4332',
  BUNDESLIGA: '4331',
  LIGUE_1: '4334',
  CHAMPIONS_LEAGUE: '4480',

  // Basketball
  NBA: '4387',

  // American Football
  NFL: '4391',

  // Baseball
  MLB: '4424',

  // Hockey
  NHL: '4380',
};

/**
 * Default leagues to fetch events from
 * You can customize this array to include your preferred leagues
 */
const DEFAULT_LEAGUES = [
  LEAGUE_IDS.PREMIER_LEAGUE,
  LEAGUE_IDS.NBA,
  LEAGUE_IDS.NFL,
  LEAGUE_IDS.MLB,
  LEAGUE_IDS.LA_LIGA,
  LEAGUE_IDS.CHAMPIONS_LEAGUE,
];

/**
 * Fetch events from The Sports DB for a specific date and league
 * @param {Date} date - The date to fetch events for
 * @param {string} leagueId - The Sports DB league ID
 * @returns {Promise<Array>} Array of events
 */
const fetchLeagueEvents = async (date, leagueId) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');

    const response = await axios.get(`${BASE_URL}/eventsday.php`, {
      params: {
        d: formattedDate,
        l: leagueId
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.data.events) {
      return [];
    }

    return response.data.events;
  } catch (error) {
    console.error(`Error fetching league ${leagueId}:`, error.message);
    return [];
  }
};

/**
 * Transform Sports DB event to our app's event format
 * @param {Object} event - Sports DB event object
 * @returns {Object} Transformed event
 */
const transformEvent = (event) => {
  return {
    id: event.idEvent,
    title: event.strEvent,
    sport: event.strSport,
    league: event.strLeague,
    time: event.strTime || event.strTimeLocal || 'TBD',
    venue: event.strVenue || event.strLocation || 'TBD',
    homeTeam: event.strHomeTeam || 'Home Team',
    awayTeam: event.strAwayTeam || 'Away Team',
    status: event.strStatus || 'scheduled',

    // Additional data (optional, not displayed but stored)
    date: event.dateEvent,
    thumbnail: event.strThumb,
    description: event.strDescriptionEN,
  };
};

/**
 * Fetch sporting events for a specific date from The Sports DB
 * @param {Date} date - The date to fetch events for
 * @param {Array} leagueIds - Array of league IDs to fetch (optional)
 * @returns {Promise<Array>} Array of sporting events
 */
export const fetchEventsBySportsDB = async (date, leagueIds = DEFAULT_LEAGUES) => {
  try {
    console.log(`Fetching events for ${format(date, 'yyyy-MM-dd')} from The Sports DB...`);

    // Fetch events from multiple leagues in parallel
    const leaguePromises = leagueIds.map(leagueId =>
      fetchLeagueEvents(date, leagueId)
    );

    const leagueResults = await Promise.all(leaguePromises);

    // Flatten and combine all events
    const allEvents = leagueResults.flat();

    // Remove duplicates (same event ID)
    const uniqueEvents = Array.from(
      new Map(allEvents.map(event => [event.idEvent, event])).values()
    );

    // Transform to our format
    const transformedEvents = uniqueEvents.map(transformEvent);

    console.log(`✅ Fetched ${transformedEvents.length} events from The Sports DB`);

    return transformedEvents;
  } catch (error) {
    console.error('Error fetching events from Sports DB:', error);
    throw new Error('Failed to fetch events from The Sports DB. Please check your internet connection.');
  }
};

/**
 * Search for events by team name
 * @param {string} teamName - Name of the team to search for
 * @returns {Promise<Array>} Array of events
 */
export const searchEventsByTeam = async (teamName) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchevents.php`, {
      params: { e: teamName },
      timeout: 10000,
    });

    if (!response.data.event) {
      return [];
    }

    return response.data.event.map(transformEvent);
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};

/**
 * Get all available leagues from The Sports DB
 * @returns {Promise<Array>} Array of leagues
 */
export const getAllLeagues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all_leagues.php`);
    return response.data.leagues || [];
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

/**
 * Get next 5 events for a specific league
 * @param {string} leagueId - The Sports DB league ID
 * @returns {Promise<Array>} Array of upcoming events
 */
export const getNextEventsForLeague = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventsnextleague.php`, {
      params: { id: leagueId },
      timeout: 10000,
    });

    if (!response.data.events) {
      return [];
    }

    return response.data.events.map(transformEvent);
  } catch (error) {
    console.error('Error fetching next events:', error);
    throw error;
  }
};
