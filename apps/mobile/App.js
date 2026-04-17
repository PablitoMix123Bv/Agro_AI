import 'react-native-gesture-handler'; // Optional, good practice for navigation
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './src/theme/theme';

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
