import React from 'react'
import { Box } from '@mui/material'
import { Warning as WarningIconMui } from '@mui/icons-material'
import { COLORS } from '../../../constants/colors'

export interface WarningIconProps {
  size?: number
}

const WarningIcon: React.FC<WarningIconProps> = ({
  size = 80
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#F59E0B', // Amber color for warning
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <WarningIconMui
        sx={{
          fontSize: size * 0.8125, // 65px for 80px container
          color: COLORS.WHITE
        }}
      />
    </Box>
  )
}

export default WarningIcon 