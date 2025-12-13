import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { theme } from '../styles/theme';

/**
 * DateSelector component for navigating between dates
 * Converted from web version with React Native components
 */
export const DateSelector = ({ selectedDate, onDateChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onDateChange('prev')}
        activeOpacity={0.7}
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
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    minWidth: 100,
  },
  buttonText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  dateText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
});
