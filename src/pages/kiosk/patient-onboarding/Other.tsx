import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Card, CardContent, Grid, Typography, Button, Checkbox, FormControlLabel } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { CustomInput, CustomDropdown, CustomLabel } from '../../../components/common'
import { COLORS } from '../../../constants/colors'
import TYPOGRAPHY from '../../../constants/typography'
import { PatientOnboardingFormData } from './validationSchema'

const Other: React.FC = () => {
  const { control, watch, formState: { errors } } = useFormContext<PatientOnboardingFormData>()
  
  // Watch the source field to show/hide Sober Living Home field
  const selectedSource = watch('other.source')

  const handleAddNewLab = () => {
    // Placeholder for add new lab functionality
    console.log('Add new lab clicked')
  }

  const labOptions = [
    { value: 'quest-diagnostics', label: 'Quest Diagnostics' },
    { value: 'labcorp', label: 'LabCorp' },
    { value: 'mayo-clinic-labs', label: 'Mayo Clinic Laboratories' },
    { value: 'arup-laboratories', label: 'ARUP Laboratories' },
    { value: 'sonic-healthcare', label: 'Sonic Healthcare' },
    { value: 'other', label: 'Other' }
  ]

  const practiceLocationOptions = [
    { value: 'main-office', label: 'Main Office' },
    { value: 'north-branch', label: 'North Branch' },
    { value: 'south-branch', label: 'South Branch' },
    { value: 'east-clinic', label: 'East Clinic' },
    { value: 'west-clinic', label: 'West Clinic' },
    { value: 'downtown', label: 'Downtown Location' }
  ]

  const sourceOptions = [
    { value: 'walk-in', label: 'Walk-in' },
    { value: 'sober-living', label: 'Sober Living Home' },
  ]

  const soberLivingHomeOptions = [
    { value: 'sunrise-recovery', label: 'Sunrise Recovery Home' },
    { value: 'serenity-house', label: 'Serenity House' },
    { value: 'new-beginnings', label: 'New Beginnings Sober Living' },
    { value: 'hope-haven', label: 'Hope Haven' },
    { value: 'recovery-residence', label: 'Recovery Residence' },
    { value: 'clean-living', label: 'Clean Living Community' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <>
      <Box sx={{ m: 2, p: 2, border: `1px solid ${COLORS.GRAY_200}`, borderRadius: '8px', backgroundColor: COLORS.GRAY_100 }}>
        <Typography variant="h5" sx={{ fontFamily: TYPOGRAPHY.fontFamily.primary, fontWeight: '500', color: COLORS.GRAY_900, fontStyle: 'SemiBold', fontSize: '14px', lineHeight: '120%', letterSpacing: '0%' }}>
          Other Information
        </Typography>
      </Box>

      <Card sx={{ m: 2, px: 2, borderRadius: '8px' }}>
        <CardContent>
          {/* Preferences Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: TYPOGRAPHY.fontFamily.primary, 
                fontWeight: '600', 
                color: COLORS.GRAY_900, 
                fontSize: '16px',
                mb: 2
              }}
            >
              Preferences
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CustomLabel>Lab</CustomLabel>
                <Controller
                  name="other.selectedLab"
                  control={control}
                  render={({ field }) => (
                    <CustomDropdown
                      placeholder="Select & Search Lab"
                      options={labOptions}
                      containerSx={{ mb: 0 }}
                      error={!!errors.other?.selectedLab}
                      errorMessage={errors.other?.selectedLab?.message}
                      {...field}
                    />
                  )}
                />
                
                {/* Add New Lab Button */}
                <Box sx={{ mt: 1 }}>
                  <Button
                    onClick={handleAddNewLab}
                    startIcon={<AddIcon />}
                    sx={{
                      color: COLORS.PRIMARY,
                      '&:hover': {
                        backgroundColor: `${COLORS.PRIMARY}10`,
                      },
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      p: 0,
                      minWidth: 'auto',
                    }}
                  >
                    Add New Lab
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Privacy Consent Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: TYPOGRAPHY.fontFamily.primary, 
                fontWeight: '600', 
                color: COLORS.GRAY_900, 
                fontSize: '16px',
                mb: 2
              }}
            >
              Privacy Consent
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Controller
                  name="other.consentToEmail"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value || false}
                          sx={{
                            color: COLORS.GRAY_400,
                            '&.Mui-checked': {
                              color: COLORS.PRIMARY,
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: '14px', color: COLORS.GRAY_700 }}>
                          Consent to Email
                        </Typography>
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Controller
                  name="other.consentToMessage"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value || false}
                          sx={{
                            color: COLORS.GRAY_400,
                            '&.Mui-checked': {
                              color: COLORS.PRIMARY,
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: '14px', color: COLORS.GRAY_700 }}>
                          Consent to Message
                        </Typography>
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Other Information Section */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: TYPOGRAPHY.fontFamily.primary, 
                fontWeight: '600', 
                color: COLORS.GRAY_900, 
                fontSize: '16px',
                mb: 2
              }}
            >
              Other Information
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CustomLabel>Practice Location</CustomLabel>
                <Controller
                  name="other.practiceLocation"
                  control={control}
                  render={({ field }) => (
                    <CustomDropdown
                      placeholder="Select Practice Location"
                      options={practiceLocationOptions}
                      containerSx={{ mb: 0 }}
                      error={!!errors.other?.practiceLocation}
                      errorMessage={errors.other?.practiceLocation?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CustomLabel>Registration Date</CustomLabel>
                <Controller
                  name="other.registrationDate"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      placeholder="Select Date"
                      type="date"
                      containerSx={{ mb: 0 }}
                      hasError={!!errors.other?.registrationDate}
                      errorMessage={errors.other?.registrationDate?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CustomLabel>Source</CustomLabel>
                <Controller
                  name="other.source"
                  control={control}
                  render={({ field }) => (
                    <CustomDropdown
                      placeholder="Select Source"
                      options={sourceOptions}
                      containerSx={{ mb: 0 }}
                      error={!!errors.other?.source}
                      errorMessage={errors.other?.source?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>

              {/* Conditional Sober Living Home Field */}
              {selectedSource === 'sober-living' && (
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <CustomLabel isRequired={true}>Sober Living Home</CustomLabel>
                  <Controller
                    name="other.soberLivingHome"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Sober Living Home"
                        options={soberLivingHomeOptions}
                        containerSx={{ mb: 0 }}
                        error={!!errors.other?.soberLivingHome}
                        errorMessage={errors.other?.soberLivingHome?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default Other