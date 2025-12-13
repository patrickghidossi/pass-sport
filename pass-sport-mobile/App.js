import React from 'react';
import { StatusBar } from 'expo-status-bar';
import EventsScreen from './src/screens/EventsScreen';

/**
 * PassSport Mobile App - Main Entry Point
 *
 * A React Native application for tracking and logging sporting events you attend.
 * Converted from Vite + React web app to Expo + React Native.
 *
 * Features:
 * - Browse sporting events by date
 * - Mark events as attended
 * - View your event attendance log
 * - Persistent storage with AsyncStorage
 */
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <EventsScreen />
    </>
  );
}
