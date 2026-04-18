import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { LayoutGrid, Sprout, FileText, Bell, User } from 'lucide-react-native';

import { Pagina_principal } from '../screens/Dashboard/Pagina_principal';
import { FieldsScreen } from '../screens/Fields/FieldsScreen';
import { Primer_pantalla } from '../screens/Auth/Primer_pantalla';
import { Login_Screen } from '../screens/Auth/Login_Screen';
import { Registrar_usuario } from '../screens/Auth/Registrar_usuario';
import { StatsScreen } from '../screens/Dashboard/StatsScreen';
import { AlertsScreen } from '../screens/Alerts/AlertsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  const { theme, isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 16,
          paddingTop: 8,
          height: 80,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 4,
        }
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={Pagina_principal} 
        options={{
          tabBarLabel: 'INICIO',
          tabBarIcon: ({ color }) => <LayoutGrid color={color} size={22} />
        }}
      />
      <Tab.Screen 
        name="Campos" 
        component={FieldsScreen} 
        options={{
          tabBarLabel: 'CAMPOS',
          tabBarIcon: ({ color }) => <Sprout color={color} size={26} />
        }}
      />
      <Tab.Screen 
        name="Datos" 
        component={StatsScreen} 
        options={{
          tabBarLabel: 'DATOS',
          tabBarIcon: ({ color }) => <FileText color={color} size={22} />
        }}
      />
      <Tab.Screen 
        name="Alertas" 
        component={AlertsScreen} 
        options={{
          tabBarLabel: 'ALERTAS',
          tabBarIcon: ({ color }) => <Bell color={color} size={22} />
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'PERFIL',
          tabBarIcon: ({ color }) => <User color={color} size={22} />
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { isDarkMode, theme } = useTheme();

  const customNavigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={customNavigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Primer_pantalla} />
        <Stack.Screen name="Login" component={Login_Screen} />
        <Stack.Screen name="Register" component={Registrar_usuario} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
