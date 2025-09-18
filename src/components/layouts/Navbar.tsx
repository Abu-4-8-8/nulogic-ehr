import React, { useState } from 'react'
import {
  AppBar, Toolbar, Box, IconButton, Menu, MenuItem, Drawer, List,
  ListItem, ListItemText, Divider, Typography, Button, Badge, useTheme, useMediaQuery
} from '@mui/material'
import {
  Menu as MenuIcon, Close as CloseIcon, Notifications as NotificationsIcon,
  Search as SearchIcon, KeyboardArrowDown as KeyboardArrowDownIcon,
  AccountCircle as AccountCircleIcon, Settings as SettingsIcon,
  Logout as LogoutIcon, Person as PersonIcon
} from '@mui/icons-material'
import { COLORS } from '../../constants/colors'
import { TYPOGRAPHY } from '../../constants/typography'
import NuLogicLogo from '../ui/NuLogicLogo'
import { CustomAvatar, CustomDropdown, DropdownOption } from '../common'

export interface NavLink {
  id?: string
  label: string
  href: string
  type?: 'link' | 'dropdown'
  items?: { label: string; href: string }[]
  active?: boolean
}

export interface UserProfile {
  name: string
  email: string
  avatar?: string
  role?: string
}

export interface NavbarProps {
  links: NavLink[]
  user?: UserProfile
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onProfileClick?: () => void
  showNotifications?: boolean
  notificationCount?: number
  onNotificationClick?: () => void
  position?: 'fixed' | 'static' | 'sticky'
}

const Navbar: React.FC<NavbarProps> = ({
  links,
  user,
  onNavigate,
  onLogout,
  onProfileClick,
  showNotifications = true,
  notificationCount = 0,
  position = 'fixed'
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width:900px)')

  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const [menuAnchor, setMenuAnchor] = useState<{ el: HTMLElement | null; type: 'profile' | 'notification' | 'billing' | null }>({
    el: null,
    type: null
  })

  const openMenu = (event: React.MouseEvent<HTMLElement>, type: 'profile' | 'notification' | 'billing') =>
    setMenuAnchor({ el: event.currentTarget, type })
  const closeMenu = () => setMenuAnchor({ el: null, type: null })

  const navigate = (href: string) => {
    onNavigate?.(href)
    setMobileOpen(false)
  }

  return (
    <>
      <AppBar 
        position={position} 
        sx={{ 
          backgroundColor: COLORS.WHITE, 
          borderBottom: `1px solid ${COLORS.NEUTRAL_5}`,
          boxShadow: 'none'
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%'
          }}>
            {/* Left Section - Logo and Navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Mobile Menu Button */}
            {isMobile && (
                <IconButton onClick={() => setMobileOpen(true)} sx={{ p: 1 }}>
                  <MenuIcon sx={{ color: COLORS.NEUTRAL_70 }} />
              </IconButton>
            )}
              
              {/* Logo */}
            <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <NuLogicLogo size="small" />
          </Box>

              {/* Desktop Navigation */}
          {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {links.map(link => (
                    <Box
                      key={link.label}
                      sx={{
                        position: 'relative',
                        borderRadius: '8px 8px 0px 0px',
                        height: 43,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                                      <Button
                        onClick={() => link.type === 'link' && navigate(link.href)}
                        onClickCapture={(e) => link.type === 'dropdown' && openMenu(e as any, 'billing')}
                        endIcon={link.type === 'dropdown' ? (
                          <KeyboardArrowDownIcon sx={{ fontSize: 18, color: COLORS.NEUTRAL_80 }} />
                        ) : undefined}
                        sx={{
                          fontFamily: 'Figtree',
                          fontWeight: link.active ? 500 : 400,
                          fontStyle: 'normal',
                          fontSize: '14px',
                          lineHeight: '120%', // 120% line-height as specified
                          letterSpacing: '0%',
                          textTransform: 'none',
                          color: link.active ? COLORS.PRIMARY : COLORS.NEUTRAL_60,
                          px: 2,
                          py: 1.5,
                          minWidth: 'auto',
                          height: '100%',
                          borderRadius: '8px 8px 0px 0px',
                          position: 'relative',
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&::after': link.active ? {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '1.5px',
                            backgroundColor: COLORS.PRIMARY
                          } : {},
                          '&:hover': {
                            backgroundColor: 'transparent',
                            color: link.active ? COLORS.PRIMARY : COLORS.NEUTRAL_80
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Figtree',
                            fontWeight: link.active ? 500 : 400,
                            fontStyle: 'normal',
                            fontSize: '14px',
                            lineHeight: '120%',
                            letterSpacing: '0%',
                            color: 'inherit',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {link.label}
                        </Typography>
                      </Button>
                    </Box>
              ))}
            </Box>
          )}
            </Box>

            {/* Right Section - Actions and Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Action Buttons - Always visible on mobile for screens < 900px */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {/* Search Button */}
                <IconButton
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    backgroundColor: COLORS.WHITE,
                    '&:hover': {
                      backgroundColor: COLORS.GRAY_50
                    }
                  }}
                >
                  <SearchIcon sx={{ fontSize: 20, color: COLORS.NEUTRAL_70 }} />
            </IconButton>

            {/* Notifications */}
            {showNotifications && (
              <>
                    <IconButton
                      onClick={(e) => openMenu(e, 'notification')}
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '10px',
                        backgroundColor: COLORS.WHITE,
                        '&:hover': {
                          backgroundColor: COLORS.GRAY_50
                        }
                      }}
                    >
                  <Badge
                    badgeContent={notificationCount > 9 ? '9+' : notificationCount}
                    color="error"
                  >
                        <NotificationsIcon sx={{ fontSize: 20, color: COLORS.NEUTRAL_70 }} />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={menuAnchor.el}
                  open={menuAnchor.type === 'notification'}
                  onClose={closeMenu}
                >
                  <MenuItem>No new notifications</MenuItem>
                </Menu>
              </>
            )}
              </Box>

              {/* User Profile - Always visible */}
            {user ? (
              <>
                <Button
                  onClick={(e) => openMenu(e, 'profile')}
                    sx={{
                      textTransform: 'none',
                      minWidth: 'auto',
                      gap: isMobile ? 0.5 : 1,
                      px: 0,
                      py: 0.5,
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    {/* Avatar */}
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: COLORS.OUTLINE_INFO,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0.75
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Figtree',
                          fontWeight: 500,
                          color: COLORS.WHITE,
                          fontSize: 12,
                          lineHeight: '14.4px', // 1.2 * 12px
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </Typography>
                    </Box>
                    
                    {/* Name - Hidden on screens < 900px */}
                    {!isMobile && (
                      <Typography
                        sx={{
                          fontFamily: 'Figtree',
                          fontSize: 14,
                          lineHeight: '16.8px', // 1.2 * 14px
                          fontWeight: 400,
                          color: COLORS.NEUTRAL_80,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {user.name}
                      </Typography>
                    )}
                    
                    {/* Dropdown Arrow */}
                    <KeyboardArrowDownIcon sx={{ 
                      fontSize: 16, 
                      color: COLORS.NEUTRAL_70 
                    }} />
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/login')}
                  sx={{
                    fontFamily: 'Figtree',
                    fontSize: 14,
                    lineHeight: '16.8px',
                    fontWeight: 400,
                    px: 2,
                    py: 1,
                    minWidth: 'auto'
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </AppBar>

                <Menu 
                  anchorEl={menuAnchor.el} 
                  open={menuAnchor.type === 'profile'} 
                  onClose={closeMenu}
                  PaperProps={{
                    sx: {
                      borderRadius: '8px',
                      boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                      border: 'none',
                      mt: 1,
                      minWidth: { xs: 120, sm: 140 },
                      maxWidth: { xs: 200, sm: 'none' },
                      width: { xs: 'auto', sm: 'auto' }
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  slotProps={{
                    paper: {
                      style: {
                        maxHeight: '300px',
                        overflowY: 'auto'
                      }
                    }
                  }}
                >
                  <MenuItem 
                    onClick={() => { onProfileClick?.(); closeMenu() }}
                    sx={{
                      px: { xs: '8px', sm: '12px' },
                      py: { xs: '6px', sm: '8px' },
                      gap: '8px',
                      alignItems: 'center',
                      minHeight: { xs: '36px', sm: '40px' },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <PersonIcon 
                      sx={{ 
                        fontSize: 18, 
                        color: COLORS.NEUTRAL_70
                      }} 
                    />
                    <Typography
                      sx={{
                        fontFamily: 'Figtree',
                        fontWeight: 400,
                        fontSize: { xs: 13, sm: 14 },
                        lineHeight: 1.2,
                        color: COLORS.NEUTRAL_70
                      }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    onClick={() => { onLogout?.(); closeMenu() }}
                    sx={{
                      px: { xs: '8px', sm: '12px' },
                      py: { xs: '6px', sm: '8px' },
                      gap: '8px',
                      alignItems: 'center',
                      minHeight: { xs: '36px', sm: '40px' },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <LogoutIcon 
                      sx={{ 
                        fontSize: 18, 
                        color: COLORS.NEGATIVE_60
                      }} 
                    />
                    <Typography
                      sx={{
                        fontFamily: 'Figtree',
                        fontWeight: 400,
                        fontSize: { xs: 13, sm: 14 },
                        lineHeight: 1.2,
                        color: COLORS.NEGATIVE_60
                      }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>

                {/* Billing Dropdown */}
                <Menu 
                  anchorEl={menuAnchor.el} 
                  open={menuAnchor.type === 'billing'} 
                  onClose={closeMenu}
                  PaperProps={{
                    sx: {
                      borderRadius: '8px',
                      boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                      border: 'none',
                      mt: 1,
                      minWidth: { xs: 140, sm: 160 },
                      maxWidth: { xs: 250, sm: 'none' },
                      width: { xs: 'auto', sm: 'auto' }
                    }
                  }}
                  transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  slotProps={{
                    paper: {
                      style: {
                        maxHeight: '300px',
                        overflowY: 'auto'
                      }
                    }
                  }}
                >
                  {links.find(l => l.id === 'billing')?.items?.map(child => (
                    <MenuItem 
                      key={child.label} 
                      onClick={() => { navigate(child.href); closeMenu() }}
                      sx={{
                        px: { xs: '8px', sm: '12px' },
                        py: { xs: '6px', sm: '8px' },
                        alignItems: 'center',
                        minHeight: { xs: '36px', sm: '40px' },
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Figtree',
                          fontWeight: 400,
                          fontSize: { xs: 13, sm: 14 },
                          lineHeight: 1.2,
                          color: COLORS.NEUTRAL_70
                        }}
                      >
                      {child.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <NuLogicLogo size="medium" />
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {links.map(link => (
              <React.Fragment key={link.label}>
                {link.type === 'dropdown' && link.items ? (
                  <>
                    <ListItem 
                      onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.id ? null : link.id || null)}
                      sx={{ 
                        cursor: 'pointer',
                        py: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <ListItemText 
                        primary={link.label} 
                        sx={{ 
                          '& .MuiListItemText-primary': { 
                            fontFamily: 'Figtree',
                            fontWeight: link.active ? 500 : 400,
                            fontStyle: 'normal',
                            fontSize: '14px',
                            lineHeight: '120%',
                            letterSpacing: '0%',
                            color: link.active ? COLORS.PRIMARY : COLORS.NEUTRAL_70,
                            whiteSpace: 'nowrap'
                          }
                        }} 
                      />
                      <KeyboardArrowDownIcon 
                        sx={{ 
                          transform: mobileDropdownOpen === link.id ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease-in-out',
                          color: COLORS.NEUTRAL_70
                        }} 
                      />
                    </ListItem>
                    {mobileDropdownOpen === link.id && (
                      <Box sx={{ backgroundColor: COLORS.GRAY_50 }}>
                        {link.items.map(item => (
                          <ListItem 
                            key={item.label} 
                            onClick={() => navigate(item.href)} 
                            sx={{ 
                              cursor: 'pointer',
                              pl: 4,
                              py: 1,
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                              }
                            }}
                          >
                            <ListItemText 
                              primary={item.label}
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  fontFamily: 'Figtree',
                                  fontWeight: 400,
                                  fontStyle: 'normal',
                                  fontSize: '14px',
                                  lineHeight: '120%',
                                  letterSpacing: '0%',
                                  color: COLORS.NEUTRAL_70,
                                  whiteSpace: 'nowrap'
                                }
                              }} 
                            />
                          </ListItem>
                        ))}
                      </Box>
                    )}
                  </>
                ) : (
                  <ListItem 
                    onClick={() => navigate(link.href)} 
                    sx={{ 
                      cursor: 'pointer',
                      py: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={link.label}
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          fontFamily: 'Figtree',
                          fontWeight: link.active ? 500 : 400,
                          fontStyle: 'normal',
                          fontSize: '14px',
                          lineHeight: '120%',
                          letterSpacing: '0%',
                          color: link.active ? COLORS.PRIMARY : COLORS.NEUTRAL_70,
                          whiteSpace: 'nowrap'
                        }
                      }} 
                    />
              </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>

      {position === 'fixed' && <Box sx={{ height: 67 }} />}
    </>
  )
}

export default Navbar
