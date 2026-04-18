import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

export const Header = ({ showUser = true }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <Image 
          source={require('../../assets/logo.jpg')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.brandName, { color: theme.colors.primary }]}>AgroIA</Text>
      </View>
      
      {showUser && (
        <TouchableOpacity style={[styles.userButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <User color={theme.colors.primary} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  userButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  }
});
