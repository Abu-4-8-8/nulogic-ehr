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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [mobileOpen, setMobileOpen] = useState(false)
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
      <AppBar position={position} sx={{ backgroundColor: COLORS.WHITE, borderBottom: `1px solid ${COLORS.GRAY_200}` }}>
        <Toolbar sx={{ minHeight: 59, px: 3 }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <NuLogicLogo size="small" />
            </Box>
          </Box>

          {/* Center Section - Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 6, flex: 1 }}>
              {links.map(link => (
                <Button
                  key={link.label}
                  onClick={() => link.type === 'link' && navigate(link.href)}
                  endIcon={link.type === 'dropdown' ? <KeyboardArrowDownIcon fontSize="small" /> : undefined}
                  onClickCapture={(e) => link.type === 'dropdown' && openMenu(e as any, 'billing')}
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Figtree',
                    fontSize: 16,
                    color: link.active ? COLORS.PRIMARY : COLORS.GRAY_700,
                    borderBottom: link.active ? `2px solid ${COLORS.PRIMARY}` : 'none'
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            {/* Search */}
            <IconButton>
              <SearchIcon />
            </IconButton>

            {/* Notifications */}
            {showNotifications && (
              <>
                <IconButton onClick={(e) => openMenu(e, 'notification')}>
                  <Badge
                    badgeContent={notificationCount > 9 ? '9+' : notificationCount}
                    color="error"
                  >
                    <NotificationsIcon />
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

            {/* User Profile */}
            {user ? (
              <>
                <Button
                  onClick={(e) => openMenu(e, 'profile')}
                  startIcon={<CustomAvatar name={user.name} size="small" />}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ textTransform: 'none', fontFamily: 'Figtree' }}
                >
                  {user.name}
                </Button>

                <Menu anchorEl={menuAnchor.el} open={menuAnchor.type === 'profile'} onClose={closeMenu}>
                  <MenuItem onClick={() => { onProfileClick?.(); closeMenu() }}>
                    <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => { onLogout?.(); closeMenu() }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>

                {/* Billing Dropdown */}
                <Menu anchorEl={menuAnchor.el} open={menuAnchor.type === 'billing'} onClose={closeMenu}>
                  {links.find(l => l.id === 'billing')?.items?.map(child => (
                    <MenuItem key={child.label} onClick={() => { navigate(child.href); closeMenu() }}>
                      {child.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button variant="outlined" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

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
              <ListItem button key={link.label} onClick={() => navigate(link.href)}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {position === 'fixed' && <Box sx={{ height: 59 }} />}
    </>
  )
}

export default Navbar
