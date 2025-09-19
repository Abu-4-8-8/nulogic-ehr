import React from 'react'
import { Box } from '@mui/material'
import { Check as CheckIcon } from '@mui/icons-material'
import { COLORS } from '../../constants/colors'

export interface SuccessIconProps {
  size?: number
}

const SuccessIcon: React.FC<SuccessIconProps> = ({
  size = 80
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: COLORS.PRIMARY, // #0077C6 from Figma
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <CheckIcon
        sx={{
          fontSize: size * 0.8125, // 65px for 80px container
          color: COLORS.WHITE
        }}
      />
    </Box>
  )
}

export default SuccessIcon 