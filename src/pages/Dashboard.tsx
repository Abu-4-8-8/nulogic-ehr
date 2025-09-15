import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Person,
  Schedule,
  AccountCircle,
  Notifications,
} from '@mui/icons-material'
import NuLogicLogo from '../components/ui/NuLogicLogo'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: 2 }}>
            <NuLogicLogo size="small" showText={false} />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EHR System - Welcome, {user?.name || user?.email}
          </Typography>
          
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Welcome to NuLogic EHR System
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  You are successfully logged in as: <strong>{user?.email}</strong>
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label="Authenticated" 
                    color="success" 
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Patient Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage patient records and appointments
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Person />}>
                  View Patients
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Appointments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule and manage appointments
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Schedule />}>
                  View Schedule
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Dashboard
