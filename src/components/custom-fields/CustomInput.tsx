
import React, { forwardRef } from 'react'
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material'
import type { TextFieldProps } from "@mui/material"; 
import { Visibility, VisibilityOff } from '@mui/icons-material'

export interface CustomInputProps extends Omit<TextFieldProps, 'variant'> {
  label?: string
  placeholder?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  hasError?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  showPasswordToggle?: boolean
  containerSx?: object
  variant?: 'outlined' | 'filled' | 'standard'
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  (
    {
      label,
      placeholder,
      helperText,
      error = false,
      errorMessage,
      hasError = false,
      startIcon,
      endIcon,
      showPasswordToggle = false,
      type = 'text',
      containerSx = {},
      variant = 'outlined',
      sx = {},
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }

    const inputType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password') 
      : type

    // Determine if input has validation error
    const isError = hasError || error || !!errorMessage

    const getInputProps = () => {
      const inputProps: any = {}

      if (startIcon || endIcon || showPasswordToggle) {
        inputProps.startAdornment = startIcon ? (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ) : undefined

        inputProps.endAdornment = (
          <InputAdornment position="end">
            {showPasswordToggle && type === 'password' ? (
              <IconButton
                onClick={handleTogglePassword}
                edge="end"
                sx={{ color: '#666' }}
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ) : endIcon ? (
              endIcon
            ) : null}
          </InputAdornment>
        )
      }

      return inputProps
    }

    const defaultSx = {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#FFFFFF !important',
        borderRadius: '8px',
        height: '56px',
        fontSize: '16px',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        '& fieldset': {
          borderColor: isError ? '#DC2626' : '#C9CBCC',
          borderWidth: '1px',
        },
        '&:hover fieldset': {
          borderColor: isError ? '#DC2626' : '#9ca3af',
        },
        '&.Mui-focused fieldset': {
          borderColor: isError ? '#DC2626' : 'COLORS.PRIMARY',
          borderWidth: '1px',
        },
        '&.Mui-error fieldset': {
          borderColor: '#DC2626 !important',
        },
        '& .MuiOutlinedInput-input': {
          padding: '16px 14px',
          fontSize: '16px',
          color: '#374151',
          backgroundColor: '#FFFFFF !important',
          '&::placeholder': {
            color: '#9ca3af',
            opacity: 1,
          },
        },
      },
      '& .MuiFilledInput-root': {
        backgroundColor: '#FFFFFF',
        borderRadius: '8px 8px 0 0',
        '&:hover': {
          backgroundColor: '#eeeeee',
        },
        '&.Mui-focused': {
          backgroundColor: '#e3f2fd',
        },
        '&.Mui-error': {
          backgroundColor: '#ffebee',
        },
      },
      '& .MuiInput-root': {
        '&:before': {
          borderBottomColor: error ? '#f44336' : '#e0e0e0',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottomColor: error ? '#f44336' : 'COLORS.PRIMARY',
        },
        '&.Mui-focused:after': {
          borderBottomColor: error ? '#f44336' : 'COLORS.PRIMARY',
        },
      },
      '& .MuiInputLabel-root': {
        color: isError ? '#DC2626' : '#666',
        '&.Mui-focused': {
          color: isError ? '#DC2626' : 'COLORS.PRIMARY',
        },
      },
      '& .MuiFormHelperText-root': {
        color: isError ? '#DC2626' : '#666',
        fontSize: '14px',
        marginTop: '6px',
        marginLeft: '0px',
        fontWeight: '400',
      },
      ...sx,
    }

    return (
      <Box sx={{ mb: 2, ...containerSx }}>
        {label && (
          <Typography
            variant="body1"
            sx={{
              fontWeight: '500',
              color: '#374151',
              mb: 1.5,
              fontSize: '16px',
              lineHeight: 1.5,
            }}
          >
            {label}
          </Typography>
        )}
        <TextField
          ref={ref}
          fullWidth
          variant={variant}
          type={inputType}
          placeholder={placeholder}
          error={isError}
          helperText={isError ? errorMessage : helperText}
          InputProps={getInputProps()}
          sx={defaultSx}
          // label={label}
          {...props}
        />
      </Box>
    )
  }
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
