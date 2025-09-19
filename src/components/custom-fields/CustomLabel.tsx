import React from 'react'
import { Typography, Box } from '@mui/material'
import type { TypographyProps } from '@mui/material'
import { COLORS } from '../../constants/colors'

export interface CustomLabelProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode
  isRequired?: boolean
  requiredColor?: string
  containerSx?: object
  asteriskSx?: object
  htmlFor?: string
  showSkipNote?: boolean
  onSkipClick?: () => void
  skipNoteText?: string
  skipNoteColor?: string
}

const CustomLabel: React.FC<CustomLabelProps> = ({
  children,
  isRequired = false,
  requiredColor = '#CE0718',
  containerSx = {},
  asteriskSx = {},
  htmlFor,
  showSkipNote = false,
  onSkipClick,
  skipNoteText = 'Skip & add note',
  skipNoteColor = COLORS.PRIMARY_40 || COLORS.PRIMARY,
  sx = {},
  ...props
}) => {
  const defaultSx = {
    fontWeight: '500',
    color: '#374151',
    mb: 1.5,
    fontSize: '16px',
    lineHeight: 1.5,
    display: 'block',
    ...sx,
  }

  const defaultAsteriskSx = {
    color: requiredColor,
    ml: 0.25,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: 1,
    verticalAlign: 'top',
    ...asteriskSx,
  }

  return (
    <Box sx={{ mb: 0, ...containerSx }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          component="label"
          htmlFor={htmlFor}
          variant="body1"
          sx={defaultSx}
          {...props}
        >
          {children}
          {isRequired && (
            <Typography
              component="span"
              sx={defaultAsteriskSx}
            >
              *
            </Typography>
          )}
        </Typography>
        
        {showSkipNote && (
          <Typography
            component="button"
            type="button"
            onClick={onSkipClick}
            sx={{
              color: skipNoteColor,
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {skipNoteText}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

CustomLabel.displayName = 'CustomLabel'

export default CustomLabel
