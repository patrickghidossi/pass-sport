import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';
import { theme } from '../styles/theme';

/**
 * AttendedEventCard component for displaying events in the user's log
 * Simplified version of EventCard for the attended events list
 */
export const AttendedEventCard = ({ event, onRemove }) => {
  return (
    <View style={styles.card}>
      {/* Header with sport badge and logged date */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{event.sport}</Text>
        </View>
        <Text style={styles.loggedDate}>
          Logged: {format(parseISO(event.attendedDate), 'MMM d, yyyy')}
        </Text>
      </View>

      {/* Event title */}
      <Text style={styles.title}>{event.title}</Text>

      {/* Event summary */}
      <Text style={styles.summary}>
        {event.league} • {event.venue} • {event.time}
      </Text>

      {/* Remove button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onRemove(event.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.attended,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.attended,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  loggedDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  summary: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  button: {
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
});
