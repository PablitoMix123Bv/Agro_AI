import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const Card = ({ children, style, variant = 'default' }) => {
  const { theme } = useTheme();
  
  const cardStyles = [
    styles.card,
    {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      borderColor: theme.colors.border,
      ...theme.shadows.soft,
    },
    variant === 'glow' && {
      borderColor: theme.colors.primary,
      ...theme.shadows.glow,
    },
    style
  ];

  return (
    <View style={cardStyles}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  }
});
