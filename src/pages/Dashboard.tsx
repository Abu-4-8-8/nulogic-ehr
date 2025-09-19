import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import MainLayout from '../components/layouts/MainLayout'
import ServiceTypeLogo from '../components/ui/ServiceTypeLogo'
import { CustomButton } from '../components/custom-fields'

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      {/* Main content area */}
      <Box
        sx={{
          // Content card with white background and shadow - inspired by Figma design
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.12)', // Shadow from Figma
          padding: {
            xs: '16px', // Mobile padding
            // sm: '24px', // Larger screens - matches Figma content padding
          },
          flex: 1,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Dashboard
        </Typography>
        <CustomButton
          label="Add New Patient"
          startIcon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 7C13.75 7.14918 13.6907 7.29226 13.5852 7.39775C13.4798 7.50324 13.3367 7.5625 13.1875 7.5625H7.5625V13.1875C7.5625 13.3367 7.50324 13.4798 7.39775 13.5852C7.29226 13.6907 7.14918 13.75 7 13.75C6.85082 13.75 6.70774 13.6907 6.60225 13.5852C6.49676 13.4798 6.4375 13.3367 6.4375 13.1875V7.5625H0.8125C0.663316 7.5625 0.520242 7.50324 0.414753 7.39775C0.309263 7.29226 0.25 7.14918 0.25 7C0.25 6.85082 0.309263 6.70774 0.414753 6.60225C0.520242 6.49676 0.663316 6.4375 0.8125 6.4375H6.4375V0.8125C6.4375 0.663316 6.49676 0.520242 6.60225 0.414753C6.70774 0.309263 6.85082 0.25 7 0.25C7.14918 0.25 7.29226 0.309263 7.39775 0.414753C7.50324 0.520242 7.5625 0.663316 7.5625 0.8125V6.4375H13.1875C13.3367 6.4375 13.4798 6.49676 13.5852 6.60225C13.6907 6.70774 13.75 6.85082 13.75 7Z" fill="white"/>
              </svg>
            }
          variant="contained"
          customColor="primary"
        />
        <CustomButton
          label="Add New Patient"
          endIcon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 7C13.75 7.14918 13.6907 7.29226 13.5852 7.39775C13.4798 7.50324 13.3367 7.5625 13.1875 7.5625H7.5625V13.1875C7.5625 13.3367 7.50324 13.4798 7.39775 13.5852C7.29226 13.6907 7.14918 13.75 7 13.75C6.85082 13.75 6.70774 13.6907 6.60225 13.5852C6.49676 13.4798 6.4375 13.3367 6.4375 13.1875V7.5625H0.8125C0.663316 7.5625 0.520242 7.50324 0.414753 7.39775C0.309263 7.29226 0.25 7.14918 0.25 7C0.25 6.85082 0.309263 6.70774 0.414753 6.60225C0.520242 6.49676 0.663316 6.4375 0.8125 6.4375H6.4375V0.8125C6.4375 0.663316 6.49676 0.520242 6.60225 0.414753C6.70774 0.309263 6.85082 0.25 7 0.25C7.14918 0.25 7.29226 0.309263 7.39775 0.414753C7.50324 0.520242 7.5625 0.663316 7.5625 0.8125V6.4375H13.1875C13.3367 6.4375 13.4798 6.49676 13.5852 6.60225C13.6907 6.70774 13.75 6.85082 13.75 7Z" fill="white"/>
              </svg>
            }
          variant="contained"
          customColor="primary"
        />
        {/* Service Type Logo Demo Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Service Type Logos
          </Typography>
          
          <Grid container spacing={3}>
            {/* Small Size */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Small Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <ServiceTypeLogo serviceType="non-mat" size="small" />
                <ServiceTypeLogo serviceType="sti" size="small" />
                <ServiceTypeLogo serviceType="psych" size="small" />
                <ServiceTypeLogo serviceType="mat" size="small" />
              </Box>
            </Grid>

            {/* Medium Size */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Medium Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <ServiceTypeLogo serviceType="non-mat" size="medium" />
                <ServiceTypeLogo serviceType="sti" size="medium" />
                <ServiceTypeLogo serviceType="psych" size="medium" />
                <ServiceTypeLogo serviceType="mat" size="medium" />
              </Box>
            </Grid>

            {/* Large Size */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Large Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <ServiceTypeLogo serviceType="non-mat" size="large" />
                <ServiceTypeLogo serviceType="sti" size="large" />
                <ServiceTypeLogo serviceType="psych" size="large" />
                <ServiceTypeLogo serviceType="mat" size="large" />
              </Box>
            </Grid>

            {/* Interactive Example */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Interactive Example (Click to see console log)
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <ServiceTypeLogo 
                  serviceType="non-mat" 
                  size="medium" 
                  onClick={() => console.log('Non-MAT clicked')} 
                />
                <ServiceTypeLogo 
                  serviceType="sti" 
                  size="medium" 
                  onClick={() => console.log('STI clicked')} 
                />
                <ServiceTypeLogo 
                  serviceType="psych" 
                  size="medium" 
                  onClick={() => console.log('Psych clicked')} 
                />
                <ServiceTypeLogo 
                  serviceType="mat" 
                  size="medium" 
                  onClick={() => console.log('MAT clicked')} 
                />
               
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Rest of existing dashboard content */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            Welcome to the NuLogic EHR Dashboard. This is a demo of the ServiceTypeLogo component.
          </Typography>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default Dashboard
