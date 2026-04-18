export const lightTheme = {
  colors: {
    background: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceHighlight: '#F3F4F6',
    primary: '#064E3B',
    primaryDark: '#064E3B',
    primaryGradient: ['#064E3B', '#064E3B'],
    accent: '#84CC16',
    text: '#111827',
    textSecondary: '#6B7280',
    danger: '#EF4444',
    dangerBackground: '#FEF2F2',
    warning: '#F59E0B',
    border: '#E5E7EB',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    round: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      bold: 'System',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
      title: 40,
    }
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    glow: {
      shadowColor: '#064E3B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    }
  }
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#0D1B2A', // Dark navy requested
    surface: '#1A2B3C',    // Darker card requested
    surfaceHighlight: '#253341',
    primary: '#064E3B',    // Standardized green
    primaryDark: '#064E3B',
    primaryGradient: ['#064E3B', '#064E3B'],
    text: '#FFFFFF',       // Primary white text
    textSecondary: '#9E9E9E', // Secondary grey text
    border: '#253341',
    dangerBackground: '#450a0a',
  },
  shadows: {
    ...lightTheme.shadows,
    soft: {
      ...lightTheme.shadows.soft,
      shadowColor: '#000',
      shadowOpacity: 0.3,
    },
    glow: {
      ...lightTheme.shadows.glow,
      shadowColor: '#064E3B',
    }
  }
};

export const theme = lightTheme;
