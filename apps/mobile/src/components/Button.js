import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  icon,
  style,
  textStyle,
  disabled = false
}) => {
  const { theme } = useTheme();

  const isPrimary = variant === 'primary';
  const isDisabled = loading || disabled;

  const containerStyles = [
    styles.container,
    {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      gap: theme.spacing.sm,
    },
    isPrimary ? {
      backgroundColor: theme.colors.primary,
      ...theme.shadows.soft,
    } : {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    isDisabled && { opacity: 0.5 },
    style
  ];

  const contentTextStyle = [
    isPrimary ? styles.primaryText : { color: theme.colors.primary },
    {
      fontSize: theme.typography.sizes.md,
      fontWeight: '600',
    },
    textStyle
  ];

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.8}
      disabled={isDisabled}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#FFFFFF" : theme.colors.primary} />
      ) : (
        <>
          {icon && icon}
          <Text style={contentTextStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryText: {
    color: '#FFFFFF',
    letterSpacing: 0.5,
  }
});
