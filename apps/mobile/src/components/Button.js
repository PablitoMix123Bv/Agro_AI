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
  style 
}) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.8}
        disabled={loading}
        style={[styles.container, style]}
      >
        <LinearGradient
          colors={theme.colors.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.text} />
          ) : (
            <>
              {icon && icon}
              <Text style={styles.text}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7}
      disabled={loading}
      style={[styles.outlineContainer, style]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.primary} />
      ) : (
        <>
          {icon && icon}
          <Text style={styles.outlineText}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.soft,
  },
  gradient: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  outlineContainer: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'transparent',
  },
  outlineText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});
