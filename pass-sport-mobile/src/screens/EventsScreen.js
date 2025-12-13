import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import { fetchEventsByDate } from '../services/sportsApi';
import { fetchEventsBySportsDB } from '../services/sportsDatabaseApi';
import { storage } from '../utils/storage';
import { DateSelector } from '../components/DateSelector';
import { EventCard } from '../components/EventCard';
import { AttendedEventCard } from '../components/AttendedEventCard';
import { ApiSelector } from '../components/ApiSelector';
import { theme } from '../styles/theme';

/**
 * EventsScreen - Main screen for PassSport mobile app
 * Converted from web App.jsx with React Native components
 *
 * Features:
 * - Browse events by date
 * - Mark events as attended
 * - View attended events log
 * - Persist data with AsyncStorage
 */
export default function EventsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedApi, setSelectedApi] = useState('sportsdb'); // Default to mock for demo
  const [showApiSelector, setShowApiSelector] = useState(false);

  // Load attended events and API preference from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      const saved = await storage.getItem('attendedEvents');
      if (saved) {
        setAttendedEvents(saved);
      }

      const apiPref = await storage.getItem('selectedApi');
      if (apiPref) {
        setSelectedApi(apiPref);
      }
    };
    loadData();
  }, []);

  // Save attended events to AsyncStorage whenever it changes
  useEffect(() => {
    if (attendedEvents.length > 0 || attendedEvents.length === 0) {
      storage.setItem('attendedEvents', attendedEvents);
    }
  }, [attendedEvents]);

  // Fetch events for the selected date
  const fetchEvents = async (date) => {
    setLoading(true);
    setError(null);

    try {
      let eventsData;

      if (selectedApi === 'mock') {
        // Use mock data
        eventsData = await fetchEventsByDate(date, 'mock');
      } else if (selectedApi === 'sportsdb') {
        // Use The Sports DB (free, no API key)
        eventsData = await fetchEventsBySportsDB(date);
      }

      setEvents(eventsData);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events. Please try again.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle API selection change
  const handleApiChange = async (apiId) => {
    setSelectedApi(apiId);
    await storage.setItem('selectedApi', apiId);
    setShowApiSelector(false);
    // Refresh events with new API
    fetchEvents(selectedDate);
  };

  // Fetch events when selected date or API changes
  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate, selectedApi]);

  // Handle date navigation
  const handleDateChange = (direction) => {
    if (direction === 'prev') {
      setSelectedDate((prev) => subDays(prev, 1));
    } else {
      setSelectedDate((prev) => addDays(prev, 1));
    }
  };

  // Mark an event as attended
  const markAsAttended = (event) => {
    const attendedEvent = {
      ...event,
      attendedDate: new Date().toISOString(),
      loggedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };

    setAttendedEvents((prev) => {
      const filtered = prev.filter((e) => e.id !== event.id);
      return [...filtered, attendedEvent];
    });
  };

  // Remove an event from attended list
  const removeFromAttended = (eventId) => {
    setAttendedEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  // Check if an event is already attended
  const isEventAttended = (eventId) => {
    return attendedEvents.some((e) => e.id === eventId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>🏟️ PassSport</Text>
            <Text style={styles.headerSubtitle}>
              Record and log the sporting events you attend
            </Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowApiSelector(!showApiSelector)}
            activeOpacity={0.7}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* API Selector (collapsible) */}
        {showApiSelector && (
          <ApiSelector
            selectedApi={selectedApi}
            onSelectApi={handleApiChange}
          />
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Date Selector */}
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        {/* Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Events on {format(selectedDate, 'MMM d, yyyy')}
          </Text>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Loading events...</Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!loading && !error && events.length === 0 && (
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEventsText}>
                No events found for this date.
              </Text>
            </View>
          )}

          {!loading &&
            !error &&
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isAttended={isEventAttended(event.id)}
                onMarkAttended={markAsAttended}
                onRemove={removeFromAttended}
              />
            ))}
        </View>

        {/* Attended Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your Event Log ({attendedEvents.length})
          </Text>

          {attendedEvents.length === 0 ? (
            <View style={styles.noAttendedContainer}>
              <Text style={styles.noAttendedText}>
                You haven't logged any events yet. Mark events as attended to
                see them here!
              </Text>
            </View>
          ) : (
            attendedEvents.map((event) => (
              <AttendedEventCard
                key={`${event.id}-${event.attendedDate}`}
                event={event}
                onRemove={removeFromAttended}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.card,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  settingsButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
  },
  settingsIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  errorContainer: {
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  errorText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.md,
    textAlign: 'center',
  },
  noEventsContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  noAttendedContainer: {
    padding: theme.spacing.xl,
    marginHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  noAttendedText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
