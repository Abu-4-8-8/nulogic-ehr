// Typography constants based on Figma design system
// Font Family: Figtree
// Weights: Regular (400), Medium (500), Bold (700)

import { createTheme } from '@mui/material/styles'

export const TYPOGRAPHY = {
  // Font Family
  fontFamily: {
    primary: 'Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700
  },

  // Responsive Font Sizes (Large/Medium/Small)
  fontSize: {
    // Headings
    h1: {
      large: '48px',    // Large screens (Desktop)
      medium: '40px',   // Medium screens (Laptop/Tablet)
      small: '40px'     // Small screens (Mobile)
    },
    h2: {
      large: '40px',
      medium: '32px',
      small: '32px'
    },
    h3: {
      large: '32px',
      medium: '24px',
      small: '24px'
    },
    h4: {
      large: '24px',
      medium: '18px',
      small: '16px'
    },
    
    // Body Text
    body1: {
      large: '24px',
      medium: '20px',
      small: '18px'
    },
    body2: {
      large: '20px',
      medium: '18px',
      small: '16px'
    },
    body3: {
      large: '18px',
      medium: '16px',
      small: '14px'
    },
    
    // Captions
    caption1: {
      large: '16px',
      medium: '14px',
      small: '12px'
    },
    caption2: {
      large: '14px',
      medium: '13px',
      small: '11px'
    },
    caption3: {
      large: '12px',
      medium: '11px',
      small: '10px'
    },
    
    // Button Text
    button: {
      large: '16px',
      medium: '14px',
      small: '12px'
    }
  },

  // Line Heights
  lineHeight: {
    // Headings
    h1: {
      large: '64px',    // 139%
      medium: '58px',   // 141%
      small: '58px'
    },
    h2: {
      large: '58px',    // 141%
      medium: '52px',   // 144%
      small: '52px'
    },
    h3: {
      large: '52px',    // 144%
      medium: '44px',   // 138%
      small: '44px'
    },
    h4: {
      large: '44px',    // 138%
      medium: '40px',   // 138%
      small: '40px'
    },
    
    // Body Text
    body1: {
      large: '36px',    // 157%
      medium: '32px',   // 160%
      small: '32px'
    },
    body2: {
      large: '32px',    // 160%
      medium: '28px',   // 156%
      small: '28px'
    },
    body3: {
      large: '28px',    // 156%
      medium: '24px',   // 156%
      small: '24px'
    },
    
    // Captions
    caption1: {
      large: '24px',    // 156%
      medium: '22px',   // 157%
      small: '22px'
    },
    caption2: {
      large: '22px',    // 157%
      medium: '20px',   // 154%
      small: '20px'
    },
    caption3: {
      large: '20px',    // 154%
      medium: '16px',   // 145%
      small: '16px'
    },
    
    // Button Text
    button: {
      large: '16px',    // 100%
      medium: '16px',   // 100%
      small: '16px'
    }
  },

  // Typography Styles
  styles: {
    // Headings
    h1: {
      fontFamily: 'Figtree',
      fontWeight: 700,
      fontSize: { xs: '40px', md: '40px', lg: '48px' },
      lineHeight: { xs: '58px', md: '58px', lg: '64px' },
      letterSpacing: '0em'
    },
    h2: {
      fontFamily: 'Figtree',
      fontWeight: 700,
      fontSize: { xs: '32px', md: '32px', lg: '40px' },
      lineHeight: { xs: '52px', md: '52px', lg: '58px' },
      letterSpacing: '0em'
    },
    h3: {
      fontFamily: 'Figtree',
      fontWeight: 700,
      fontSize: { xs: '24px', md: '24px', lg: '32px' },
      lineHeight: { xs: '44px', md: '44px', lg: '52px' },
      letterSpacing: '0em'
    },
    h4: {
      fontFamily: 'Figtree',
      fontWeight: 700,
      fontSize: { xs: '16px', md: '18px', lg: '24px' },
      lineHeight: { xs: '40px', md: '40px', lg: '44px' },
      letterSpacing: '0em'
    },
    
    // Body Text
    body1: {
      fontFamily: 'Figtree',
      fontWeight: 400,
      fontSize: { xs: '18px', md: '20px', lg: '24px' },
      lineHeight: { xs: '32px', md: '32px', lg: '36px' },
      letterSpacing: '0em'
    },
    body2: {
      fontFamily: 'Figtree',
      fontWeight: 400,
      fontSize: { xs: '16px', md: '18px', lg: '20px' },
      lineHeight: { xs: '28px', md: '28px', lg: '32px' },
      letterSpacing: '0em'
    },
    body3: {
      fontFamily: 'Figtree',
      fontWeight: 400,
      fontSize: { xs: '14px', md: '16px', lg: '18px' },
      lineHeight: { xs: '24px', md: '24px', lg: '28px' },
      letterSpacing: '0em'
    },
    
    // Captions
    caption1: {
      fontFamily: 'Figtree',
      fontWeight: 400,
      fontSize: { xs: '12px', md: '14px', lg: '16px' },
      lineHeight: { xs: '22px', md: '22px', lg: '24px' },
      letterSpacing: '0em'
    },
    caption2: {
      fontFamily: 'Figtree',
      fontWeight: 400,
      fontSize: { xs: '11px', md: '13px', lg: '14px' },
      lineHeight: { xs: '20px', md: '20px', lg: '22px' },
      letterSpacing: '0em'
    },
    caption3: {
      fontFamily: 'Figtree',
      fontWeight: 400,
      fontSize: { xs: '10px', md: '11px', lg: '12px' },
      lineHeight: { xs: '16px', md: '16px', lg: '20px' },
      letterSpacing: '0em'
    },
    
    // Button Text
    button: {
      fontFamily: 'Figtree',
      fontWeight: 500,
      fontSize: { xs: '12px', md: '14px', lg: '16px' },
      lineHeight: { xs: '16px', md: '16px', lg: '16px' },
      letterSpacing: '0em',
      textTransform: 'none' as const
    },
    
    // Medium Weight Variants
    body1Medium: {
      fontFamily: 'Figtree',
      fontWeight: 500,
      fontSize: { xs: '18px', md: '20px', lg: '24px' },
      lineHeight: { xs: '32px', md: '32px', lg: '36px' },
      letterSpacing: '0em'
    },
    body2Medium: {
      fontFamily: 'Figtree',
      fontWeight: 500,
      fontSize: { xs: '16px', md: '18px', lg: '20px' },
      lineHeight: { xs: '28px', md: '28px', lg: '32px' },
      letterSpacing: '0em'
    },
    body3Medium: {
      fontFamily: 'Figtree',
      fontWeight: 500,
      fontSize: { xs: '14px', md: '16px', lg: '18px' },
      lineHeight: { xs: '24px', md: '24px', lg: '28px' },
      letterSpacing: '0em'
    },
    
    // Bold Weight Variants
    body1Bold: {
      fontFamily: 'Figtree',
      fontWeight: 700,
      fontSize: { xs: '18px', md: '20px', lg: '24px' },
      lineHeight: { xs: '32px', md: '32px', lg: '36px' },
      letterSpacing: '0em'
    },
    body2Bold: {
      fontFamily: 'Figtree',
      fontWeight: 700,
      fontSize: { xs: '16px', md: '18px', lg: '20px' },
      lineHeight: { xs: '28px', md: '28px', lg: '32px' },
      letterSpacing: '0em'
    },
    body3Bold: {
      fontFamily: 'Figtree',
      fontWeight: 700,
      fontSize: { xs: '14px', md: '16px', lg: '18px' },
      lineHeight: { xs: '24px', md: '24px', lg: '28px' },
      letterSpacing: '0em'
    }
  }
} as const

// Helper function to get responsive font size
export const getResponsiveFontSize = (size: keyof typeof TYPOGRAPHY.fontSize, breakpoint: 'large' | 'medium' | 'small' = 'large') => {
  return TYPOGRAPHY.fontSize[size][breakpoint]
}

// Helper function to get responsive line height
export const getResponsiveLineHeight = (size: keyof typeof TYPOGRAPHY.lineHeight, breakpoint: 'large' | 'medium' | 'small' = 'large') => {
  return TYPOGRAPHY.lineHeight[size][breakpoint]
}

// Material-UI Theme Configuration
export const theme = createTheme({
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    
    // Override Material-UI default headings
    h1: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: '48px',
      lineHeight: '64px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '40px',
        lineHeight: '58px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '40px',
        lineHeight: '58px',
      },
    },
    h2: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: '40px',
      lineHeight: '58px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '32px',
        lineHeight: '52px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '32px',
        lineHeight: '52px',
      },
    },
    h3: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: '32px',
      lineHeight: '52px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '24px',
        lineHeight: '44px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '24px',
        lineHeight: '44px',
      },
    },
    h4: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: '24px',
      lineHeight: '44px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '16px',
        lineHeight: '40px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '18px',
        lineHeight: '40px',
      },
    },
    h5: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: '20px',
      lineHeight: '32px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '16px',
        lineHeight: '28px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '18px',
        lineHeight: '28px',
      },
    },
    h6: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '14px',
        lineHeight: '24px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
    
    // Body text variants
    body1: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.regular,
      fontSize: '24px',
      lineHeight: '36px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '18px',
        lineHeight: '32px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '20px',
        lineHeight: '32px',
      },
    },
    body2: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.regular,
      fontSize: '20px',
      lineHeight: '32px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '16px',
        lineHeight: '28px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '18px',
        lineHeight: '28px',
      },
    },
    
    // Caption variants
    caption: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.regular,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '12px',
        lineHeight: '22px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '14px',
        lineHeight: '22px',
      },
    },
    
    // Button text
    button: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      fontSize: '16px',
      lineHeight: '16px',
      letterSpacing: '0em',
      textTransform: 'none',
      '@media (max-width:768px)': {
        fontSize: '12px',
        lineHeight: '16px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '14px',
        lineHeight: '16px',
      },
    },
    
    // Subtitle variants
    subtitle1: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '14px',
        lineHeight: '24px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
    subtitle2: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      '@media (max-width:768px)': {
        fontSize: '12px',
        lineHeight: '22px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '14px',
        lineHeight: '22px',
      },
    },
    
    // Override text transform for buttons
    overline: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      fontWeight: TYPOGRAPHY.fontWeight.regular,
      fontSize: '12px',
      lineHeight: '20px',
      letterSpacing: '0em',
      textTransform: 'none',
      '@media (max-width:768px)': {
        fontSize: '10px',
        lineHeight: '16px',
      },
      '@media (min-width:769px) and (max-width:1024px)': {
        fontSize: '11px',
        lineHeight: '16px',
      },
    },
  },
  
  // Override component styles to use Figtree font
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: TYPOGRAPHY.fontFamily.primary,
          fontWeight: TYPOGRAPHY.fontWeight.medium,
          textTransform: 'none',
          fontSize: '16px',
          lineHeight: '16px',
          '@media (max-width:768px)': {
            fontSize: '12px',
            lineHeight: '16px',
          },
          '@media (min-width:769px) and (max-width:1024px)': {
            fontSize: '14px',
            lineHeight: '16px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: TYPOGRAPHY.fontFamily.primary,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: TYPOGRAPHY.fontFamily.primary,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: TYPOGRAPHY.fontFamily.primary,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: TYPOGRAPHY.fontFamily.primary,
        },
        secondary: {
          fontFamily: TYPOGRAPHY.fontFamily.primary,
        },
      },
    },
  },
})

export default TYPOGRAPHY
