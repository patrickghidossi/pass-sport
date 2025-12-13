import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility wrapper around AsyncStorage
 * Provides a similar API to localStorage but with async operations
 */
export const storage = {
  /**
   * Get an item from storage
   * @param {string} key - Storage key
   * @returns {Promise<any|null>} Parsed value or null if not found
   */
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  /**
   * Set an item in storage
   * @param {string} key - Storage key
   * @param {any} value - Value to store (will be JSON stringified)
   */
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },

  /**
   * Remove an item from storage
   * @param {string} key - Storage key
   */
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  /**
   * Clear all items from storage
   */
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};
