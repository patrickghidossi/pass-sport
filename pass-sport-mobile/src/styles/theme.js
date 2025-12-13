/**
 * Theme configuration for PassSport mobile app
 * Centralizes colors, spacing, typography, and other design tokens
 */

export const theme = {
  colors: {
    // Primary colors
    primary: '#007AFF',
    primaryDark: '#0051D5',
    primaryLight: '#4DA3FF',

    // Secondary colors
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    info: '#5AC8FA',

    // Neutral colors
    background: '#F2F2F7',
    backgroundSecondary: '#FFFFFF',
    card: '#FFFFFF',

    // Text colors
    text: '#000000',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',
    textInverse: '#FFFFFF',

    // Border colors
    border: '#C6C6C8',
    borderLight: '#E5E5EA',

    // Special states
    attended: '#34C759',
    attendedBackground: '#E8F5E9',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};
