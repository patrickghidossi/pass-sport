import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

/**
 * EventCard component for displaying individual sporting events
 * Converted from web version with React Native components
 */
export const EventCard = ({ event, isAttended, onMarkAttended, onRemove }) => {
  return (
    <View style={[styles.card, isAttended && styles.cardAttended]}>
      {/* Header with sport badge and league */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{event.sport}</Text>
        </View>
        <Text style={styles.league}>{event.league}</Text>
      </View>

      {/* Event title */}
      <Text style={styles.title}>{event.title}</Text>

      {/* Event details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time:</Text>
          <Text style={styles.detailText}>{event.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Venue:</Text>
          <Text style={styles.detailText}>{event.venue}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Teams:</Text>
          <Text style={styles.detailText}>
            {event.homeTeam} vs {event.awayTeam}
          </Text>
        </View>
      </View>

      {/* Action button */}
      <TouchableOpacity
        style={[styles.button, isAttended && styles.buttonSecondary]}
        onPress={isAttended ? () => onRemove(event.id) : () => onMarkAttended(event)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isAttended ? 'Remove from Log' : 'Mark as Attended'}
        </Text>
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
    ...theme.shadows.md,
  },
  cardAttended: {
    borderWidth: 2,
    borderColor: theme.colors.attended,
    backgroundColor: theme.colors.attendedBackground,
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
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  league: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  details: {
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  detailLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginRight: theme.spacing.xs,
  },
  detailText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    flex: 1,
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
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
});
