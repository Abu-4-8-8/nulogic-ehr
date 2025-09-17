import React, { forwardRef } from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import type { AvatarProps } from '@mui/material'
import { COLORS } from '../../constants/colors'

export interface CustomAvatarProps extends Omit<AvatarProps, 'variant'> {
  src?: string
  alt?: string
  name?: string
  email?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number
  variant?: 'circular' | 'rounded' | 'square'
  showName?: boolean
  showEmail?: boolean
  showInitials?: boolean
  fallbackIcon?: React.ReactNode
  icon?: React.ReactNode
  showIcon?: boolean
  iconPosition?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  containerSx?: object
  nameSx?: object
  emailSx?: object
  customColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'
  onlineStatus?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
  clickable?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>(
  (
    {
      src,
      alt,
      name,
      email,
      size = 'medium',
      variant = 'circular',
      showName = false,
      showEmail = false,
      showInitials = true,
      fallbackIcon,
      icon,
      showIcon = false,
      iconPosition = 'center',
      containerSx = {},
      nameSx = {},
      emailSx = {},
      customColor = 'primary',
      onlineStatus = 'offline',
      showStatus = false,
      clickable = false,
      onClick,
      sx = {},
      ...props
    },
    ref
  ) => {
    // Get initials from name
    const getInitials = (fullName?: string) => {
      if (!fullName) return ''
      return fullName
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    // Get size in pixels
    const getSizeInPx = (sizeValue: string | number) => {
      if (typeof sizeValue === 'number') return sizeValue
      
      const sizeMap = {
        small: 32,
        medium: 40,
        large: 56,
        xlarge: 80,
      }
      return sizeMap[sizeValue as keyof typeof sizeMap] || 40
    }

    // Get color based on customColor prop
    const getColor = () => {
      const colorMap = {
        primary: COLORS.PRIMARY,
        secondary: COLORS.SECONDARY,
        success: COLORS.SUCCESS,
        error: COLORS.ERROR,
        warning: COLORS.WARNING,
        info: COLORS.INFO,
        default: COLORS.DEFAULT,
      }
      return colorMap[customColor] || COLORS.PRIMARY
    }

    // Get status color
    const getStatusColor = () => {
      const statusMap = {
        online: COLORS.ONLINE,
        offline: COLORS.OFFLINE,
        away: COLORS.AWAY,
        busy: COLORS.BUSY,
      }
      return statusMap[onlineStatus] || COLORS.OFFLINE
    }

    const avatarSize = getSizeInPx(size)
    const avatarColor = getColor()
    const statusColor = getStatusColor()
    const initials = getInitials(name)

    const avatarStyles = {
      width: avatarSize,
      height: avatarSize,
      fontSize: avatarSize * 0.4,
      fontWeight: '600',
      backgroundColor: avatarColor,
      color: '#FFFFFF',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
      '&:hover': clickable ? {
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      } : {},
      ...sx,
    }

    const statusIndicatorStyles = {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: avatarSize * 0.25,
      height: avatarSize * 0.25,
      backgroundColor: statusColor,
      border: '2px solid #FFFFFF',
      borderRadius: '50%',
      zIndex: 1,
    }

    const getIconPositionStyles = () => {
      const iconSize = avatarSize * 0.3
      const baseStyles = {
        position: 'absolute',
        width: iconSize,
        height: iconSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        zIndex: 2,
      }

      switch (iconPosition) {
        case 'top-left':
          return { ...baseStyles, top: 2, left: 2 }
        case 'top-right':
          return { ...baseStyles, top: 2, right: 2 }
        case 'bottom-left':
          return { ...baseStyles, bottom: 2, left: 2 }
        case 'bottom-right':
          return { ...baseStyles, bottom: 2, right: 2 }
        case 'center':
        default:
          return { ...baseStyles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
      }
    }

    const nameStyles = {
      fontSize: avatarSize * 0.35,
      fontWeight: '500',
      color: COLORS.GRAY_700,
      marginTop: '8px',
      textAlign: 'center' as const,
      ...nameSx,
    }

    const emailStyles = {
      fontSize: avatarSize * 0.25,
      fontWeight: '400',
      color: COLORS.GRAY_500,
      marginTop: '4px',
      textAlign: 'center' as const,
      ...emailSx,
    }

    const renderAvatar = () => {
      if (src) {
        return (
          <Avatar
            ref={ref}
            src={src}
            alt={alt || name || 'Avatar'}
            variant={variant}
            sx={avatarStyles as any}
            {...props}
          >
            {showIcon && icon && (
              <Box sx={getIconPositionStyles()}>
                {icon}
              </Box>
            )}
          </Avatar>
        )
      }

      if (showInitials && initials) {
        return (
          <Avatar
            ref={ref}
            variant={variant}
            sx={avatarStyles as any}
            {...props}
          >
            {initials}
            {showIcon && icon && (
              <Box sx={getIconPositionStyles()}>
                {icon}
              </Box>
            )}
          </Avatar>
        )
      }

      if (fallbackIcon) {
        return (
          <Avatar
            ref={ref}
            variant={variant}
            sx={avatarStyles as any}
            {...props}
          >
            {fallbackIcon}
            {showIcon && icon && (
              <Box sx={getIconPositionStyles()}>
                {icon}
              </Box>
            )}
          </Avatar>
        )
      }

      // Default fallback
      return (
        <Avatar
          ref={ref}
          variant={variant}
          sx={avatarStyles as any}
          {...props}
        >
          <Typography sx={{ fontSize: avatarSize * 0.4, fontWeight: '600' }}>
            ?
          </Typography>
          {showIcon && icon && (
            <Box sx={getIconPositionStyles()}>
              {icon}
            </Box>
          )}
        </Avatar>
      )
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          ...containerSx,
        }}
        onClick={clickable ? onClick : undefined}
      >
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          {renderAvatar()}
          {showStatus && (
            <Box sx={statusIndicatorStyles} />
          )}
        </Box>
        
        {showName && name && (
          <Typography sx={nameStyles}>
            {name}
          </Typography>
        )}
        
        {showEmail && email && (
          <Typography sx={emailStyles}>
            {email}
          </Typography>
        )}
      </Box>
    )
  }
)

CustomAvatar.displayName = 'CustomAvatar'

export default CustomAvatar
