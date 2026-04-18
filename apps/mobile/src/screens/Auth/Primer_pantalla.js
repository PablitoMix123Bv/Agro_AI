import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';

export const Primer_pantalla = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    // Navigate to Login after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.content}>
        
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/logo.jpg')}
            style={styles.logoSplash}
            resizeMode="contain"
          />
        </View>

        {/* App Name */}
        <Text style={[styles.appName, { color: theme.colors.primary }]}>AgroIA</Text>

        {/* Slogan */}
        <Text style={[styles.slogan, { color: theme.colors.textSecondary }]}>
          Tecnología que hace{'\n'}crecer tu campo.
        </Text>

        {/* Welcome Text */}
        <Text style={[styles.welcome, { color: theme.colors.text }]}>Bienvenido</Text>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  logoContainer: {
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
      }
    }),
  },
  logoSplash: {
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  slogan: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 40,
    lineHeight: 24,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '700',
  }
});
