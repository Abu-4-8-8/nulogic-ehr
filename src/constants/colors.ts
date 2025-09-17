// Color constants for the NeLogic application
// Primary color palette from Figma design: https://www.figma.com/design/n5d8AF0qMKA4DzUXH7I9WN/NuLogic?node-id=117-22265
// Secondary color palette from Figma design: https://www.figma.com/design/n5d8AF0qMKA4DzUXH7I9WN/NuLogic?node-id=117-22291
export const COLORS = {
  // Primary brand color palette (from Figma design)
  PRIMARY: '#0077C6', // Main primary color (primary/50)
  PRIMARY_1: '#F4FBFE',   // Very light blue
  PRIMARY_5: '#DAF8FC',   // Light blue
  PRIMARY_10: '#A0E2FA',  // Lighter blue
  PRIMARY_20: '#72C8ED',  // Light blue
  PRIMARY_30: '#48AEE0',  // Medium light blue
  PRIMARY_40: '#2292D4',  // Medium blue
  PRIMARY_50: '#0077C6',  // Main primary (your specified color)
  PRIMARY_60: '#005BA1',  // Medium dark blue
  PRIMARY_70: '#00549E',  // Dark blue
  PRIMARY_80: '#003C78',  // Darker blue
  PRIMARY_90: '#002652',  // Very dark blue
  
  // Legacy primary color mappings for backward compatibility
  PRIMARY_LIGHT: '#A0E2FA', // Maps to PRIMARY_10
  PRIMARY_DARK: '#003C78',  // Maps to PRIMARY_80
  
  // Secondary brand color palette (from Figma design)
  SECONDARY: '#05AB58', // Main secondary color (secondary/50)
  SECONDARY_1: '#EAFFF1',   // Very light green
  SECONDARY_5: '#D3EBDB',   // Light green
  SECONDARY_10: '#95DEAF',  // Lighter green
  SECONDARY_20: '#6BD194',  // Light green
  SECONDARY_30: '#45C47C',  // Medium light green
  SECONDARY_40: '#23B868',  // Medium green
  SECONDARY_50: '#05AB58',  // Main secondary (your specified color)
  SECONDARY_60: '#008547',  // Medium dark green
  SECONDARY_70: '#005E35',  // Dark green
  SECONDARY_80: '#003822',  // Darker green
  SECONDARY_90: '#002315',  // Very dark green
  
  // Legacy secondary color mappings for backward compatibility
  SECONDARY_LIGHT: '#95DEAF', // Maps to SECONDARY_10
  SECONDARY_DARK: '#003822',  // Maps to SECONDARY_80
  
  // Status colors
  SUCCESS: '#2e7d32',
  ERROR: '#d32f2f',
  WARNING: '#ed6c02',
  INFO: '#0288d1',
  
  // Neutral colors
  DEFAULT: '#6b7280',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  
  // Gray scale palette
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',
  
  // Online status colors
  ONLINE: '#10b981',
  OFFLINE: '#6b7280',
  AWAY: '#f59e0b',
  BUSY: '#ef4444',
} as const

// Type for color keys
export type ColorKey = keyof typeof COLORS

// Helper function to get color with optional opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Helper function to get color palette for a specific color
export const getColorPalette = (colorName: 'primary' | 'secondary') => {
  if (colorName === 'primary') {
    return {
      1: COLORS.PRIMARY_1,
      5: COLORS.PRIMARY_5,
      10: COLORS.PRIMARY_10,
      20: COLORS.PRIMARY_20,
      30: COLORS.PRIMARY_30,
      40: COLORS.PRIMARY_40,
      50: COLORS.PRIMARY_50,
      60: COLORS.PRIMARY_60,
      70: COLORS.PRIMARY_70,
      80: COLORS.PRIMARY_80,
      90: COLORS.PRIMARY_90,
    }
  } else {
    return {
      1: COLORS.SECONDARY_1,
      5: COLORS.SECONDARY_5,
      10: COLORS.SECONDARY_10,
      20: COLORS.SECONDARY_20,
      30: COLORS.SECONDARY_30,
      40: COLORS.SECONDARY_40,
      50: COLORS.SECONDARY_50,
      60: COLORS.SECONDARY_60,
      70: COLORS.SECONDARY_70,
      80: COLORS.SECONDARY_80,
      90: COLORS.SECONDARY_90,
    }
  }
}

// Helper function to get primary color by percentage (1-90)
export const getPrimaryColor = (percentage: number): string => {
  const colorMap: { [key: number]: string } = {
    1: COLORS.PRIMARY_1,
    5: COLORS.PRIMARY_5,
    10: COLORS.PRIMARY_10,
    20: COLORS.PRIMARY_20,
    30: COLORS.PRIMARY_30,
    40: COLORS.PRIMARY_40,
    50: COLORS.PRIMARY_50,
    60: COLORS.PRIMARY_60,
    70: COLORS.PRIMARY_70,
    80: COLORS.PRIMARY_80,
    90: COLORS.PRIMARY_90,
  }
  return colorMap[percentage] || COLORS.PRIMARY
}

// Helper function to get secondary color by percentage (1-90)
export const getSecondaryColor = (percentage: number): string => {
  const colorMap: { [key: number]: string } = {
    1: COLORS.SECONDARY_1,
    5: COLORS.SECONDARY_5,
    10: COLORS.SECONDARY_10,
    20: COLORS.SECONDARY_20,
    30: COLORS.SECONDARY_30,
    40: COLORS.SECONDARY_40,
    50: COLORS.SECONDARY_50,
    60: COLORS.SECONDARY_60,
    70: COLORS.SECONDARY_70,
    80: COLORS.SECONDARY_80,
    90: COLORS.SECONDARY_90,
  }
  return colorMap[percentage] || COLORS.SECONDARY
}
