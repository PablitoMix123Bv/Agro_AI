import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Leaf } from 'lucide-react-native';

export const Primer_pantalla = ({ navigation }) => {
  useEffect(() => {
    // Navigate to Login after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Logo Placeholder (Replace with your actual image later) */}
        <View style={styles.logoContainer}>
          {/* <Image source={require('../../../assets/logo.png')} style={styles.logoImage} /> */}
          <View style={styles.logoPlaceholder}>
            <Leaf color="#FFFFFF" size={60} />
          </View>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>Agro AI</Text>

        {/* Slogan */}
        <Text style={styles.slogan}>
          Tecnología que hace{'\n'}crecer tu campo.
        </Text>

        {/* Welcome Text */}
        <Text style={styles.welcome}>Bienvenido</Text>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light background matching your design
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
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#166534', // Dark green matching the logo background
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#166534', // Dark green text
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  slogan: {
    fontSize: 18,
    color: '#334155', // Dark slate gray
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 40,
    lineHeight: 24,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  }
});

import { Platform } from 'react-native';
