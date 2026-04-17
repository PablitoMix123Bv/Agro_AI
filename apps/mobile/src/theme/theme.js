export const theme = {
  colors: {
    background: '#0B131E', // Very dark slate/blue
    surface: '#1A2436', // Lighter slate for cards
    surfaceHighlight: '#233045', // Hover/highlight state
    primary: '#10B981', // Emerald green
    primaryGradient: ['#10B981', '#059669'], // Vibrant green gradient
    accent: '#A3E635', // Lime accent
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    danger: '#EF4444',
    warning: '#F59E0B',
    border: '#334155',
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
      regular: 'System', // Will use Inter/Roboto if loaded, but System is safe
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
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    glow: {
      shadowColor: '#10B981',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 10,
    }
  }
};
