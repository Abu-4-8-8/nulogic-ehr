import React from 'react'
import { Box } from '@mui/material'
import { Error as ErrorIconMui } from '@mui/icons-material'
import { COLORS } from '../../constants/colors'

export interface ErrorIconProps {
  size?: number
}

const ErrorIcon: React.FC<ErrorIconProps> = ({
  size = 80
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#DC2626', // Red color for error
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <ErrorIconMui
        sx={{
          fontSize: size * 0.8125, // 65px for 80px container
          color: COLORS.WHITE
        }}
      />
    </Box>
  )
}

export default ErrorIcon 