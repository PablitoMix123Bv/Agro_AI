import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Droplets, BarChart2, Settings } from 'lucide-react-native';

import { HomeScreen } from '../screens/Dashboard/HomeScreen';
import { IrrigationScreen } from '../screens/Fields/IrrigationScreen';
import { StatsScreen } from '../screens/Dashboard/StatsScreen';
import { theme } from '../theme/theme';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder for Settings until implemented
const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
    <Text style={{ color: theme.colors.text }}>Configuración</Text>
  </View>
);

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
            paddingBottom: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
            height: 65,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
          }
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Irrigation" 
          component={IrrigationScreen} 
          options={{
            tabBarLabel: 'Riego',
            tabBarIcon: ({ color, size }) => <Droplets color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Stats" 
          component={StatsScreen} 
          options={{
            tabBarLabel: 'Estadísticas',
            tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            tabBarLabel: 'Ajustes',
            tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
