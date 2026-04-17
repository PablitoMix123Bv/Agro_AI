import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  icon,
  style,
  textStyle
}) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.8}
        disabled={loading}
        style={[styles.container, styles.primaryContainer, style]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            {icon && icon}
            <Text style={[styles.primaryText, textStyle]}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7}
      disabled={loading}
      style={[styles.container, styles.outlineContainer, style]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.primaryDark} />
      ) : (
        <>
          {icon && icon}
          <Text style={[styles.outlineText, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  primaryContainer: {
    backgroundColor: theme.colors.primaryDark,
    ...theme.shadows.soft,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primaryDark,
  },
  outlineText: {
    color: theme.colors.primaryDark,
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});
