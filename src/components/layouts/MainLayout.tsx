import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../layouts/Navbar'
import type { NavLink, UserProfile } from '../layouts/Navbar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Default navigation links
  const navigationLinks: NavLink[] = [
    {
      id: 'scheduling',
      label: 'Scheduling',
      href: '/scheduling',
      type: 'link'
    },
    {
      id: 'patients',
      label: 'Patients',
      href: '/patients',
      type: 'link',
      active: true // Set patients as active for demo
    },
    {
      id: 'billing',
      label: 'Billing',
      href: '/billing',
      type: 'dropdown',
      items: [
        { label: 'Invoices', href: '/billing/invoices' },
        { label: 'Payments', href: '/billing/payments' },
        { label: 'Reports', href: '/billing/reports' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      href: '/reports',
      type: 'link'
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      type: 'link'
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      href: '/audit-logs',
      type: 'link'
    }
  ]

  // Default user profile
  const userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@nulogic.com',
    role: 'Provider'
  }

  const handleNavigation = (href: string) => {
    console.log('Navigate to:', href)
    // Implement your navigation logic here
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    // Implement logout logic here
  }

  const handleProfileClick = () => {
    console.log('Profile clicked')
    // Implement profile logic here
  }

  return (
    <Box
      sx={{
        // Main container - inspired by Figma layout structure
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F5F6F8', // Background color from Figma
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <Navbar
        links={navigationLinks}
        user={userProfile}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
        showNotifications={true}
        notificationCount={3}
        position="fixed"
      />

      {/* Content wrapper with 5px margin on all sides */}
      <Box
        sx={{
          // Content container with centered layout and 5px margin
          // width: '100%',
          margin: '5px', // 5px margin on all four sides
          padding: {
            xs: '16px', // Mobile padding
            sm: '16px', // Small screens
            md: '16px', // Medium screens and up - matches Figma padding
          },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          // gap: '8px', // Gap between content sections from Figma
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout 