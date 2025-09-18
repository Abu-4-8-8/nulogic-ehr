import React, { forwardRef } from 'react'
import { Checkbox, FormControlLabel, Box, Typography } from '@mui/material'
import type { CheckboxProps } from '@mui/material'
import { COLORS } from '../../constants/colors'

export interface CustomCheckboxProps extends Omit<CheckboxProps, 'color'> {
  label?: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom'
  containerSx?: object
  labelSx?: object
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

const CustomCheckbox = forwardRef<HTMLButtonElement, CustomCheckboxProps>(
  (
    {
      label,
      checked = false,
      indeterminate = false,
      disabled = false,
      size = 'medium',
      color = 'primary',
      labelPlacement = 'end',
      containerSx = {},
      labelSx = {},
      sx = {},
      onChange,
      ...props
    },
    ref
  ) => {
    const getCheckboxStyles = () => {
      const baseStyles = {
        padding: '4px',
        transition: 'all 0.2s ease-in-out',
      }

      const sizeStyles = {
        small: {
          '& .MuiSvgIcon-root': {
            fontSize: '16px',
          },
        },
        medium: {
          '& .MuiSvgIcon-root': {
            fontSize: '20px',
          },
        },
        large: {
          '& .MuiSvgIcon-root': {
            fontSize: '24px',
          },
        },
      }

      const colorStyles = {
        primary: {
          color: COLORS.PRIMARY,
          '&.Mui-checked': {
            color: COLORS.PRIMARY,
          },
          '&.MuiCheckbox-indeterminate': {
            color: COLORS.PRIMARY,
          },
          '&:hover': {
            backgroundColor: COLORS.PRIMARY_10,
          },
          '&.Mui-disabled': {
            color: COLORS.GRAY_400,
          },
        },
        secondary: {
          color: COLORS.SECONDARY,
          '&.Mui-checked': {
            color: COLORS.SECONDARY,
          },
          '&.MuiCheckbox-indeterminate': {
            color: COLORS.SECONDARY,
          },
          '&:hover': {
            backgroundColor: COLORS.SECONDARY_10,
          },
          '&.Mui-disabled': {
            color: COLORS.GRAY_400,
          },
        },
        success: {
          color: COLORS.SUCCESS,
          '&.Mui-checked': {
            color: COLORS.SUCCESS,
          },
          '&.MuiCheckbox-indeterminate': {
            color: COLORS.SUCCESS,
          },
          '&:hover': {
            backgroundColor: 'rgba(46, 125, 50, 0.04)',
          },
          '&.Mui-disabled': {
            color: COLORS.GRAY_400,
          },
        },
        error: {
          color: COLORS.ERROR,
          '&.Mui-checked': {
            color: COLORS.ERROR,
          },
          '&.MuiCheckbox-indeterminate': {
            color: COLORS.ERROR,
          },
          '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.04)',
          },
          '&.Mui-disabled': {
            color: COLORS.GRAY_400,
          },
        },
        warning: {
          color: COLORS.WARNING,
          '&.Mui-checked': {
            color: COLORS.WARNING,
          },
          '&.MuiCheckbox-indeterminate': {
            color: COLORS.WARNING,
          },
          '&:hover': {
            backgroundColor: 'rgba(237, 108, 2, 0.04)',
          },
          '&.Mui-disabled': {
            color: COLORS.GRAY_400,
          },
        },
        info: {
          color: COLORS.INFO,
          '&.Mui-checked': {
            color: COLORS.INFO,
          },
          '&.MuiCheckbox-indeterminate': {
            color: COLORS.INFO,
          },
          '&:hover': {
            backgroundColor: 'rgba(2, 136, 209, 0.04)',
          },
          '&.Mui-disabled': {
            color: COLORS.GRAY_400,
          },
        },
      }

      return {
        ...baseStyles,
        ...sizeStyles[size],
        ...colorStyles[color],
        ...sx,
      }
    }

    const getLabelStyles = () => {
      const baseStyles = {
        margin: 0,
        '& .MuiFormControlLabel-label': {
          fontSize: size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px',
          fontWeight: '400',
          color: disabled ? COLORS.GRAY_500 : COLORS.GRAY_700,
          ...labelSx,
        },
      }

      return baseStyles
    }

    const checkboxElement = (
      <Checkbox
        ref={ref}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        size={size}
        sx={getCheckboxStyles()}
        onChange={onChange}
        {...props}
      />
    )

    if (label) {
      return (
        <Box sx={{ ...containerSx }}>
          <FormControlLabel
            control={checkboxElement}
            label={
              <Typography
                variant="body1"
                sx={{
                  fontSize: size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px',
                  fontWeight: '400',
                  color: disabled ? COLORS.GRAY_500 : COLORS.GRAY_700,
                  ...labelSx,
                }}
              >
                {label}
              </Typography>
            }
            labelPlacement={labelPlacement}
            sx={getLabelStyles()}
          />
        </Box>
      )
    }

    return (
      <Box sx={{ ...containerSx }}>
        {checkboxElement}
      </Box>
    )
  }
)

CustomCheckbox.displayName = 'CustomCheckbox'

export default CustomCheckbox
