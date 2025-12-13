import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

/**
 * ApiSelector component for choosing between mock data and real API
 */
export const ApiSelector = ({ selectedApi, onSelectApi }) => {
  const apiOptions = [
    {
      id: 'mock',
      name: 'Mock Data',
      description: 'Sample events (June 27-29, 2025)',
      icon: '🎭',
      free: true,
    },
    {
      id: 'sportsdb',
      name: 'The Sports DB',
      description: 'Free live sports data',
      icon: '🏆',
      free: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Source</Text>

      {apiOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selectedApi === option.id && styles.optionSelected,
          ]}
          onPress={() => onSelectApi(option.id)}
          activeOpacity={0.7}
        >
          <View style={styles.optionHeader}>
            <Text style={styles.icon}>{option.icon}</Text>
            <View style={styles.optionInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.optionName}>{option.name}</Text>
                {option.free && (
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeText}>FREE</Text>
                  </View>
                )}
              </View>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
          </View>

          {selectedApi === option.id && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 The Sports DB provides free real-time sports data with no API key required!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  option: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  optionInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  optionName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  freeBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  freeText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
  },
  optionDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  checkmark: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
  infoBox: {
    backgroundColor: theme.colors.info + '20', // 20% opacity
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.info + '40',
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
  },
});
