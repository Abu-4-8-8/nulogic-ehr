import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Button,
  Typography,
  Container,
  Alert,
  Card,
  CardContent,
} from '@mui/material'
import loginImage from '../../assets/login_page_image.png'
import NuLogicLogo from '../../components/ui/NuLogicLogo'
import { CustomInput } from '../../components/common'
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
      }}
    >
      {/* Left Panel - Blue Background with Medical Illustration */}
      <Box
        sx={{
          flex: { xs: 'none', md: 1 },
          height: { xs: '25vh', sm: '30vh', md: '100vh' },
          backgroundColor: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
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
              maxWidth: { xs: '180px', sm: '250px', md: '400px', lg: '500px' },
              maxHeight: { xs: '140px', sm: '200px', md: '400px', lg: '500px' },
              objectFit: 'contain',
              filter: 'brightness(1.1) contrast(1.1)',
            }}
          />
        </Box>
      </Box>

      {/* Right Panel - White Background with Login Form */}
      <Box
        sx={{
          flex: { xs: 1, md: 1 },
          minHeight: { xs: '75vh', sm: '70vh', md: '100vh' },
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 1.5, sm: 2, md: 4 },
          py: { xs: 3, sm: 4, md: 8 },
        }}
      >
        <Container maxWidth="sm">
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 2.5, sm: 4, md: 6 } }}>
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
              background: '#FFFFFF',
              boxShadow: { 
                xs: 'none', 
                md: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)' 
              },
              borderRadius: { xs: '0px', md: '8px' },
              border: { xs: 'none', md: '1px solid #F3F4F6' },
              width: '100%',
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Log In Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: '700',
                    color: '#1f2937',
                    textAlign: 'left',
                    mb: { xs: 2.5, sm: 3, md: 4 },
                    fontSize: { xs: '24px', sm: '28px', md: '32px' },
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
                      containerSx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}
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
                      containerSx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}
                    />
                  )}
                />

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: 'left', mb: { xs: 2.5, sm: 3, md: 4 } }}>
                  <Button
                    variant="text"
                    sx={{
                      color: '#1976d2',
                      textTransform: 'none',
                      fontWeight: '400',
                      fontSize: '16px',
                      padding: 0,
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Box>

                {/* Log In Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                    disabled={isLoading}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    py: 2,
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textTransform: 'none',
                    height: '56px',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                      boxShadow: 'none',
                    },
                    '&:disabled': {
                      backgroundColor: '#9ca3af',
                      color: 'white',
                    },
                  }}
                >
                  {isLoading ? 'Signing In...' : 'Log In'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}

export default Login
