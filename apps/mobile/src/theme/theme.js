export const theme = {
  colors: {
    background: '#F9FAFB', // Light gray background
    surface: '#FFFFFF', // White cards
    surfaceHighlight: '#F3F4F6', // Hover/highlight state
    primary: '#10B981', // Emerald green (accents, badges)
    primaryDark: '#166534', // Dark green (main buttons, primary text)
    primaryGradient: ['#10B981', '#059669'],
    accent: '#84CC16', // Lime green
    text: '#111827', // Very dark gray/black
    textSecondary: '#6B7280', // Gray
    danger: '#EF4444', // Red for critical alerts
    dangerBackground: '#FEF2F2',
    warning: '#F59E0B',
    border: '#E5E7EB', // Light gray border
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
      shadowColor: '#10B981',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    }
  }
};
