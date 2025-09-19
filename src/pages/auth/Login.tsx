import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Typography,
  Container,
  Alert,
  Card,
  CardContent,
} from '@mui/material'
import loginImage from '../../assets/login_page_image.png'
import NuLogicLogo from '../../components/ui/NuLogicLogo'
import CustomInput from '../../components/custom-fields/CustomInput'
import CustomButton from '../../components/custom-fields/CustomButton'
import { useAuth } from '../../contexts/AuthContext'

// Validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [error, setError] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  const onSubmit = async (data: LoginFormData) => {
    setError('')

    try {
      const success = await login(data.email, data.password)
      
      if (success) {
        // Navigation will be handled by the useEffect above
        const from = location.state?.from?.pathname || '/dashboard'
        navigate(from, { replace: true })
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }


  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: { xs: 'auto', md: 'hidden' },
        // Full screen background image for screens under 900px
        backgroundImage: {
          xs: `url(${loginImage})`,
          md: 'none',
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: {
            xs: 'rgba(255, 255, 255, 0.8)', // White overlay with reduced opacity
            md: 'transparent',
          },
          zIndex: 1,
        },
      }}
    >
      {/* Left Panel - Blue Background with Medical Illustration (Desktop only) */}
      <Box
        sx={{
          flex: { xs: 'none', md: 1 },
          height: { xs: '0', md: '100vh' }, // Hide on mobile
          backgroundColor: '#1976d2',
          display: { xs: 'none', md: 'flex' }, // Hide on mobile
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* Medical Illustration Image */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            component="img"
            src={loginImage}
            alt="Medical consultation illustration"
            sx={{
              maxWidth: { md: '400px', lg: '500px' },
              maxHeight: { md: '400px', lg: '500px' },
              objectFit: 'contain',
              filter: 'brightness(1.1) contrast(1.1)',
            }}
          />
        </Box>
      </Box>

      {/* Right Panel - Login Form (Full screen on mobile, half on desktop) */}
      <Box
        sx={{
          flex: { xs: 1, md: 1 },
          height: { xs: '100vh', md: '100vh' }, // Full height on mobile
          backgroundColor: {
            xs: 'transparent', // Transparent on mobile to show background
            md: 'white',       // White background on desktop
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Center all content
          padding: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Container maxWidth="sm">
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 3, sm: 4, md: 6 } }}>
            {/* Desktop Logo (960px+) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NuLogicLogo size="large" variant="horizontal" />
            </Box>
            {/* Tablet/Mobile Logo (600px - 959px) */}
            <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}>
              <NuLogicLogo size="medium" variant="horizontal" />
            </Box>
            {/* Small Mobile Logo (0px - 599px) */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <NuLogicLogo size="small" variant="horizontal" />
            </Box>
          </Box>

          {/* Login Form Card */}
          <Card
            sx={{
              background: {
                xs: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white for mobile
                md: '#FFFFFF',                    // Solid white for desktop
              },
              boxShadow: { 
                xs: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Enhanced shadow for mobile
                md: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)' 
              },
              borderRadius: { xs: '12px', md: '8px' },
              border: { xs: 'none', md: '1px solid #F3F4F6' },
              width: '100%',
              backdropFilter: { xs: 'blur(10px)', md: 'none' }, // Glass effect for mobile
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Log In Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: '700',
                    color: '#1f2937',
                    textAlign: 'left',
                    mb: { xs: 3, sm: 4, md: 4 },
                    fontSize: { xs: '28px', sm: '30px', md: '32px' },
                    lineHeight: 1.2,
                  }}
                >
                  Log In
                </Typography>

                {/* Error Alert */}
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                
                {/* Username Field */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      label="Username"
                      placeholder="Enter Username"
                      {...field}
                      hasError={!!errors.email}
                      errorMessage={errors.email?.message}
                      containerSx={{ mb: { xs: 2.5, sm: 3, md: 3 } }}
                    />
                  )}
                />

                {/* Password Field */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      label="Password"
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                      showPasswordToggle
                      hasError={!!errors.password}
                      errorMessage={errors.password?.message}
                      containerSx={{ mb: { xs: 2.5, sm: 3, md: 3 } }}
                    />
                  )}
                />

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: 'left', mb: { xs: 3, sm: 4, md: 4 } }}>
                  <CustomButton
                    variant="text"
                    label="Forgot Password?"
                    customColor="primary"
                    sx={{
                      padding: 0,
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  />
                </Box>

                {/* Log In Button */}
                <CustomButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  label={isLoading ? "Signing In..." : "Log In"}
                  customColor="primary"
                  size="large"
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}

export default Login
