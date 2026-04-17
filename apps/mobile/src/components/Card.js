import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const Card = ({ children, style, variant = 'default' }) => {
  return (
    <View style={[styles.card, variant === 'glow' && styles.glow, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.soft,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  glow: {
    borderColor: theme.colors.primary,
    ...theme.shadows.glow,
  }
});
