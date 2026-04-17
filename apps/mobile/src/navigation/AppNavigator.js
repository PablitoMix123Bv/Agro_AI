import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LayoutGrid, Sprout, BarChart3, Bell, User } from 'lucide-react-native';
import { View, Text } from 'react-native';
import { Primer_pantalla } from '../screens/Auth/Primer_pantalla';
import { Login_Screen } from '../screens/Auth/Login_Screen';
import { Registrar_usuario } from '../screens/Auth/Registrar_usuario';
import { Pagina_principal } from '../screens/Dashboard/Pagina_principal';
import { IrrigationScreen } from '../screens/Fields/IrrigationScreen';
import { StatsScreen } from '../screens/Dashboard/StatsScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PlaceholderScreen = ({ title }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
    <Text style={{ color: '#166534', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
  </View>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#166534',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 4,
          letterSpacing: 0.5,
        }
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={Pagina_principal} 
        options={{
          tabBarLabel: 'INICIO',
          tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Campos" 
        options={{
          tabBarLabel: 'CAMPOS',
          tabBarIcon: ({ color, size }) => <Sprout color={color} size={24} />
        }}
      >
        {() => <PlaceholderScreen title="Campos" />}
      </Tab.Screen>
      <Tab.Screen 
        name="Datos" 
        options={{
          tabBarLabel: 'DATOS',
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={24} />
        }}
      >
        {() => <PlaceholderScreen title="Datos" />}
      </Tab.Screen>
      <Tab.Screen 
        name="Alertas" 
        options={{
          tabBarLabel: 'ALERTAS',
          tabBarIcon: ({ color, size }) => <Bell color={color} size={24} />
        }}
      >
        {() => <PlaceholderScreen title="Alertas" />}
      </Tab.Screen>
      <Tab.Screen 
        name="Perfil" 
        options={{
          tabBarLabel: 'PERFIL',
          tabBarIcon: ({ color, size }) => <User color={color} size={24} />
        }}
      >
        {() => <PlaceholderScreen title="Perfil" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Primer_pantalla} />
        <Stack.Screen name="Login" component={Login_Screen} />
        <Stack.Screen name="Register" component={Registrar_usuario} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
