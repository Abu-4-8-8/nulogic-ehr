import React from 'react'
import { Box, Typography } from '@mui/material'
import MainLayout from '../components/layouts/MainLayout'

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
        {/* Page header */}
        <Box
          sx={{
            borderBottom: '1px solid #DBDBDB', // Neutral/10 from Figma
            paddingBottom: '16px',
            marginBottom: '24px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Figtree',
              fontWeight: 600,
              fontSize: {
                xs: '20px',
                sm: '24px',
              },
              lineHeight: '1.2em',
              color: '#21262B', // Neutral/80 from Figma
              margin: 0,
            }}
          >
            Welcome to Dashboard
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'Figtree',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1.2em',
              color: '#595F63', // Neutral/60 from Figma
              marginTop: '8px',
            }}
          >
            This is a sample dashboard page using the MainLayout component.
          </Typography>
        </Box>

        {/* Sample content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Figtree',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '1.2em',
              color: '#21262B', // Neutral/80 from Figma
            }}
          >
            Dashboard Content
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'Figtree',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1.4em',
              color: '#595F63', // Neutral/60 from Figma
            }}
          >
            This layout provides proper spacing and centering for your content. 
            The design is inspired by the Figma layout structure with consistent 
            padding, margins, and responsive behavior.
          </Typography>

          {/* Sample content sections */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                sx={{
                  backgroundColor: '#F5F5F5', // Neutral/1 from Figma
                  borderRadius: '6px',
                  padding: '16px',
                  border: '1px solid #E7E7E7', // Neutral/5 from Figma
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Figtree',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#21262B',
                    marginBottom: '8px',
                  }}
                >
                  Sample Card {item}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Figtree',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#595F63',
                  }}
                >
                  This is sample content for card {item}.
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default Dashboard
