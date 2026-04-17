import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { LayoutGrid, Sprout, FileText, Bell, User } from 'lucide-react-native';

import { HomeScreen } from '../screens/Dashboard/HomeScreen';
import { FieldsScreen } from '../screens/Fields/FieldsScreen';
import { StatsScreen } from '../screens/Dashboard/StatsScreen';
import { AlertsScreen } from '../screens/Alerts/AlertsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();

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
            paddingBottom: theme.spacing.md,
            paddingTop: theme.spacing.sm,
            height: 80,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 10,
          },
          tabBarActiveTintColor: theme.colors.primaryDark,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            marginTop: 4,
          }
        }}
      >
        <Tab.Screen 
          name="Inicio" 
          component={HomeScreen} 
          options={{
            tabBarLabel: 'INICIO',
            tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={22} />
          }}
        />
        <Tab.Screen 
          name="Campos" 
          component={FieldsScreen} 
          options={{
            tabBarLabel: 'CAMPOS',
            tabBarIcon: ({ color, size }) => <Sprout color={color} size={26} /> // Slightly larger as it's the active one in Figma
          }}
        />
        <Tab.Screen 
          name="Datos" 
          component={StatsScreen} 
          options={{
            tabBarLabel: 'DATOS',
            tabBarIcon: ({ color, size }) => <FileText color={color} size={22} />
          }}
        />
        <Tab.Screen 
          name="Alertas" 
          component={AlertsScreen} 
          options={{
            tabBarLabel: 'ALERTAS',
            tabBarIcon: ({ color, size }) => <Bell color={color} size={22} />
          }}
        />
        <Tab.Screen 
          name="Perfil" 
          component={ProfileScreen} 
          options={{
            tabBarLabel: 'PERFIL',
            tabBarIcon: ({ color, size }) => <User color={color} size={22} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
