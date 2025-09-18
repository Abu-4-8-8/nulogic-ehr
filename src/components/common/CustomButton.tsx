import React, { forwardRef } from 'react'
import { Button, Box, Typography } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import { COLORS } from '../../constants/colors'

export interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  label?: string
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  disabled?: boolean
  isDisabled?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  containerSx?: object
  labelSx?: object
  customColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      label,
      children,
      variant = 'contained',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      isDisabled = false,
      loading = false,
      startIcon,
      endIcon,
      containerSx = {},
      labelSx = {},
      customColor = 'primary',
      sx = {},
      ...props
    },
    ref
  ) => {
    // Combine disabled states - button is disabled if either disabled or isDisabled is true
    const isButtonDisabled = disabled || isDisabled || loading

    const getButtonStyles = () => {
      const baseStyles = {
        borderRadius: '8px',
        textTransform: 'none' as const,
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: 1.5,
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        transition: 'all 0.2s ease-in-out',
      }

      const sizeStyles = {
        small: {
          height: '40px',
          padding: '8px 16px',
          fontSize: '14px',
        },
        medium: {
          height: '48px',
          padding: '12px 24px',
          fontSize: '16px',
        },
        large: {
          height: '56px',
          padding: '16px 32px',
          fontSize: '18px',
        },
      }

      const variantStyles = {
        contained: {
          backgroundColor: customColor === 'primary' ? COLORS.PRIMARY : 
                          customColor === 'secondary' ? COLORS.SECONDARY :
                          customColor === 'success' ? COLORS.SUCCESS :
                          customColor === 'error' ? COLORS.ERROR :
                          customColor === 'warning' ? COLORS.WARNING :
                          customColor === 'info' ? COLORS.INFO : COLORS.PRIMARY,
          color: '#FFFFFF',
          '&:hover': {
                    backgroundColor: customColor === 'primary' ? COLORS.PRIMARY_1_70 :
          customColor === 'secondary' ? COLORS.PRIMARY_2_70 :
                            customColor === 'success' ? '#1b5e20' :
                            customColor === 'error' ? '#c62828' :
                            customColor === 'warning' ? '#e65100' :
                            customColor === 'info' ? '#0277bd' : COLORS.PRIMARY_1_70,
            boxShadow: '0px 4px 8px 0px rgba(16, 24, 40, 0.1)',
          },
          '&:active': {
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          },
          '&.Mui-disabled': {
            backgroundColor: COLORS.NEUTRAL_30,
            color: COLORS.NEUTRAL_50,
            boxShadow: 'none',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          color: customColor === 'primary' ? COLORS.PRIMARY : 
                customColor === 'secondary' ? COLORS.SECONDARY :
                customColor === 'success' ? COLORS.SUCCESS :
                customColor === 'error' ? COLORS.ERROR :
                customColor === 'warning' ? COLORS.WARNING :
                customColor === 'info' ? COLORS.INFO : COLORS.PRIMARY,
          border: `1px solid ${customColor === 'primary' ? COLORS.PRIMARY : 
                              customColor === 'secondary' ? COLORS.SECONDARY :
                              customColor === 'success' ? COLORS.SUCCESS :
                              customColor === 'error' ? COLORS.ERROR :
                              customColor === 'warning' ? COLORS.WARNING :
                              customColor === 'info' ? COLORS.INFO : COLORS.PRIMARY}`,
          '&:hover': {
            backgroundColor: customColor === 'primary' ? COLORS.PRIMARY_1_10 : 
                            customColor === 'secondary' ? COLORS.PRIMARY_2_10 :
                            customColor === 'success' ? 'rgba(46, 125, 50, 0.04)' :
                            customColor === 'error' ? 'rgba(211, 47, 47, 0.04)' :
                            customColor === 'warning' ? 'rgba(237, 108, 2, 0.04)' :
                            customColor === 'info' ? 'rgba(2, 136, 209, 0.04)' : COLORS.PRIMARY_1_10,
            borderColor: customColor === 'primary' ? COLORS.PRIMARY_1_70 : 
                        customColor === 'secondary' ? COLORS.PRIMARY_2_70 :
                        customColor === 'success' ? '#1b5e20' :
                        customColor === 'error' ? '#c62828' :
                        customColor === 'warning' ? '#e65100' :
                        customColor === 'info' ? '#0277bd' : COLORS.PRIMARY_70,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: COLORS.GRAY_500,
            borderColor: COLORS.GRAY_300,
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: customColor === 'primary' ? COLORS.PRIMARY : 
                customColor === 'secondary' ? COLORS.SECONDARY :
                customColor === 'success' ? COLORS.SUCCESS :
                customColor === 'error' ? COLORS.ERROR :
                customColor === 'warning' ? COLORS.WARNING :
                customColor === 'info' ? COLORS.INFO : COLORS.PRIMARY,
          '&:hover': {
            backgroundColor: customColor === 'primary' ? COLORS.PRIMARY_10 : 
                            customColor === 'secondary' ? COLORS.SECONDARY_10 :
                            customColor === 'success' ? 'rgba(46, 125, 50, 0.04)' :
                            customColor === 'error' ? 'rgba(211, 47, 47, 0.04)' :
                            customColor === 'warning' ? 'rgba(237, 108, 2, 0.04)' :
                            customColor === 'info' ? 'rgba(2, 136, 209, 0.04)' : COLORS.PRIMARY_10,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: COLORS.GRAY_500,
          },
        },
      }

      return {
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...sx,
      }
    }

    const buttonContent = (
      <>
        {startIcon && <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{startIcon}</Box>}
        {label && (
          <Typography
            variant="body1"
            sx={{
              fontWeight: '500',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              ...labelSx,
            }}
          >
            {label}
          </Typography>
        )}
        {children}
        {endIcon && <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>{endIcon}</Box>}
      </>
    )

    return (
      <Box sx={{ ...containerSx }}>
        <Button
          ref={ref}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          disabled={isButtonDisabled}
          startIcon={startIcon}
          endIcon={endIcon}
          sx={getButtonStyles()}
          {...props}
        >
          {buttonContent}
        </Button>
      </Box>
    )
  }
)

CustomButton.displayName = 'CustomButton'

export default CustomButton
