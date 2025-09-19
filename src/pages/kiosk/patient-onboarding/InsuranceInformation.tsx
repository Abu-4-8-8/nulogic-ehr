import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Card, CardContent, Grid, Typography, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material'
import { CustomInput, CustomDropdown, CustomLabel, CustomUpload } from '../../../components/common'
import { COLORS } from '../../../constants/colors'
import TYPOGRAPHY from '../../../constants/typography'
import { PatientOnboardingFormData } from './validationSchema'

const InsuranceInformation: React.FC = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext<PatientOnboardingFormData>()
  const [frontCardFiles, setFrontCardFiles] = useState<File[]>([])
  const [backCardFiles, setBackCardFiles] = useState<File[]>([])
  
  const paymentMethod = watch('insuranceInformation.paymentMethod')
  const isInsuranceSelected = paymentMethod === 'insurance'

  const handleFrontCardFileSelect = (files: File[]) => {
    setFrontCardFiles(files)
    setValue('insuranceInformation.frontCardFiles', files)
  }

  const handleFrontCardFileRemove = (index: number) => {
    const updatedFiles = frontCardFiles.filter((_, i) => i !== index)
    setFrontCardFiles(updatedFiles)
    setValue('insuranceInformation.frontCardFiles', updatedFiles)
  }

  const handleBackCardFileSelect = (files: File[]) => {
    setBackCardFiles(files)
    setValue('insuranceInformation.backCardFiles', files)
  }

  const handleBackCardFileRemove = (index: number) => {
    const updatedFiles = backCardFiles.filter((_, i) => i !== index)
    setBackCardFiles(updatedFiles)
    setValue('insuranceInformation.backCardFiles', updatedFiles)
  }

  const checkEligibility = () => {
    // Placeholder for eligibility check functionality
    console.log('Checking eligibility...')
  }

  return (
    <>
      <Box sx={{ m: 2, p: 2, border: `1px solid ${COLORS.GRAY_200}`, borderRadius: '8px', backgroundColor: COLORS.GRAY_100 }}>
        <Typography variant="h5" sx={{ fontFamily: TYPOGRAPHY.fontFamily.primary, fontWeight: '500', color: COLORS.GRAY_900, fontStyle: 'SemiBold', fontSize: '14px', lineHeight: '120%', letterSpacing: '0%' }}>
          Insurance Information
        </Typography>
      </Box>

      <Card sx={{ m: 2, px: 2, borderRadius: '8px' }}>
        <CardContent>
          {/* Payment Method Selection */}
          <Box sx={{ mb: 4 }}>
            <CustomLabel isRequired={true}>Payment Method</CustomLabel>
            <Controller
              name="insuranceInformation.paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel
                    value="insurance"
                    control={
                      <Radio
                        sx={{
                          color: COLORS.GRAY_400,
                          '&.Mui-checked': {
                            color: COLORS.PRIMARY,
                          },
                        }}
                      />
                    }
                    label="Insurance"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '14px',
                        color: COLORS.GRAY_700,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="selfPay"
                    control={
                      <Radio
                        sx={{
                          color: COLORS.GRAY_400,
                          '&.Mui-checked': {
                            color: COLORS.PRIMARY,
                          },
                        }}
                      />
                    }
                    label="Self Pay"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '14px',
                        color: COLORS.GRAY_700,
                      },
                    }}
                  />
                </RadioGroup>
              )}
            />
            {errors.insuranceInformation?.paymentMethod && (
              <Typography
                variant="caption"
                sx={{
                  color: COLORS.ERROR || '#d32f2f',
                  fontSize: '12px',
                  mt: 0.5,
                  display: 'block',
                }}
              >
                {errors.insuranceInformation.paymentMethod.message}
              </Typography>
            )}
          </Box>

          {/* Insurance Details - Only show if Insurance is selected */}
          {isInsuranceSelected && (
            <>
              {/* Primary Insurance Header */}
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
                  Primary Insurance
                </Typography>

                <Grid container spacing={2}>
                  {/* First Row: Insurance Type, Insurance Name, Member ID, Plan Name */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Insurance Type</CustomLabel>
                    <Controller
                      name="insuranceInformation.insuranceType"
                      control={control}
                      render={({ field }) => (
                        <CustomDropdown
                          placeholder="Select Insurance Type"
                          options={[
                            { value: 'hmo', label: 'HMO' },
                            { value: 'ppo', label: 'PPO' },
                            { value: 'epo', label: 'EPO' },
                            { value: 'pos', label: 'POS' },
                            { value: 'medicare', label: 'Medicare' },
                            { value: 'medicaid', label: 'Medicaid' },
                            { value: 'other', label: 'Other' }
                          ]}
                          containerSx={{ mb: 0 }}
                          error={!!errors.insuranceInformation?.insuranceType}
                          errorMessage={errors.insuranceInformation?.insuranceType?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Insurance Name</CustomLabel>
                    <Controller
                      name="insuranceInformation.insuranceName"
                      control={control}
                      render={({ field }) => (
                        <CustomDropdown
                          placeholder="Select Insurance Name"
                          options={[
                            { value: 'aetna', label: 'Aetna' },
                            { value: 'anthem', label: 'Anthem' },
                            { value: 'bluecross', label: 'Blue Cross Blue Shield' },
                            { value: 'cigna', label: 'Cigna' },
                            { value: 'humana', label: 'Humana' },
                            { value: 'kaiser', label: 'Kaiser Permanente' },
                            { value: 'unitedhealth', label: 'UnitedHealth' },
                            { value: 'other', label: 'Other' }
                          ]}
                          containerSx={{ mb: 0 }}
                          error={!!errors.insuranceInformation?.insuranceName}
                          errorMessage={errors.insuranceInformation?.insuranceName?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Member ID</CustomLabel>
                    <Controller
                      name="insuranceInformation.memberId"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          placeholder="Enter Member ID"
                          containerSx={{ mb: 0 }}
                          hasError={!!errors.insuranceInformation?.memberId}
                          errorMessage={errors.insuranceInformation?.memberId?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Plan Name</CustomLabel>
                    <Controller
                      name="insuranceInformation.planName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          placeholder="Enter Plan Name"
                          containerSx={{ mb: 0 }}
                          hasError={!!errors.insuranceInformation?.planName}
                          errorMessage={errors.insuranceInformation?.planName?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  {/* Second Row: Plan Type, Group ID, Group Name, Effective Start & End Date */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Plan Type</CustomLabel>
                    <Controller
                      name="insuranceInformation.planType"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          placeholder="Enter Plan Type"
                          containerSx={{ mb: 0 }}
                          hasError={!!errors.insuranceInformation?.planType}
                          errorMessage={errors.insuranceInformation?.planType?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Group ID</CustomLabel>
                    <Controller
                      name="insuranceInformation.groupId"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          placeholder="Enter Group ID"
                          containerSx={{ mb: 0 }}
                          hasError={!!errors.insuranceInformation?.groupId}
                          errorMessage={errors.insuranceInformation?.groupId?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Group Name</CustomLabel>
                    <Controller
                      name="insuranceInformation.groupName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          placeholder="Enter Group Name"
                          containerSx={{ mb: 0 }}
                          hasError={!!errors.insuranceInformation?.groupName}
                          errorMessage={errors.insuranceInformation?.groupName?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomLabel isRequired={true}>Effective Start & End Date</CustomLabel>
                    <Controller
                      name="insuranceInformation.effectiveStartDate"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          placeholder="Select Date"
                          type="date"
                          containerSx={{ mb: 0 }}
                          hasError={!!errors.insuranceInformation?.effectiveStartDate}
                          errorMessage={errors.insuranceInformation?.effectiveStartDate?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                {/* Check Eligibility Button */}
                <Box sx={{ mt: 3, mb: 3 }}>
                  <Button
                    onClick={checkEligibility}
                    variant="contained"
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      color: '#fff',
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      px: 3,
                      py: 1,
                      '&:hover': {
                        backgroundColor: COLORS.PRIMARY_DARK || COLORS.PRIMARY,
                      },
                    }}
                  >
                    Check Eligibility
                  </Button>
                </Box>

                {/* Patient Relationship with Insured */}
                <Box sx={{ mb: 3 }}>
                  <CustomLabel isRequired={true}>Patient Relationship with Insured</CustomLabel>
                  <Controller
                    name="insuranceInformation.patientRelationship"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        row
                        sx={{ mt: 1 }}
                      >
                        <FormControlLabel
                          value="self"
                          control={
                            <Radio
                              sx={{
                                color: COLORS.GRAY_400,
                                '&.Mui-checked': {
                                  color: COLORS.PRIMARY,
                                },
                              }}
                            />
                          }
                          label="Self"
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '14px',
                              color: COLORS.GRAY_700,
                            },
                          }}
                        />
                        <FormControlLabel
                          value="spouse"
                          control={
                            <Radio
                              sx={{
                                color: COLORS.GRAY_400,
                                '&.Mui-checked': {
                                  color: COLORS.PRIMARY,
                                },
                              }}
                            />
                          }
                          label="Spouse"
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '14px',
                              color: COLORS.GRAY_700,
                            },
                          }}
                        />
                        <FormControlLabel
                          value="child"
                          control={
                            <Radio
                              sx={{
                                color: COLORS.GRAY_400,
                                '&.Mui-checked': {
                                  color: COLORS.PRIMARY,
                                },
                              }}
                            />
                          }
                          label="Child"
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '14px',
                              color: COLORS.GRAY_700,
                            },
                          }}
                        />
                        <FormControlLabel
                          value="dependent"
                          control={
                            <Radio
                              sx={{
                                color: COLORS.GRAY_400,
                                '&.Mui-checked': {
                                  color: COLORS.PRIMARY,
                                },
                              }}
                            />
                          }
                          label="Dependent"
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '14px',
                              color: COLORS.GRAY_700,
                            },
                          }}
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.insuranceInformation?.patientRelationship && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: COLORS.ERROR || '#d32f2f',
                        fontSize: '12px',
                        mt: 0.5,
                        display: 'block',
                      }}
                    >
                      {errors.insuranceInformation.patientRelationship.message}
                    </Typography>
                  )}
                </Box>

                {/* Upload Insurance Card */}
                <Box sx={{ mb: 3 }}>
                  <CustomLabel>Upload Insurance Card</CustomLabel>
                  
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    {/* Front of Card */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: '600',
                          color: COLORS.GRAY_700,
                          mb: 1,
                          fontSize: '14px',
                        }}
                      >
                        Front of Card
                      </Typography>
                      <CustomUpload
                        accept="image/*,.pdf"
                        multiple={false}
                        maxSize={10}
                        files={frontCardFiles}
                        onFileSelect={handleFrontCardFileSelect}
                        onFileRemove={handleFrontCardFileRemove}
                        placeholder="Click to upload front of insurance card"
                        containerSx={{ mt: 1 }}
                      />
                    </Grid>

                    {/* Back of Card */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: '600',
                          color: COLORS.GRAY_700,
                          mb: 1,
                          fontSize: '14px',
                        }}
                      >
                        Back of Card
                      </Typography>
                      <CustomUpload
                        accept="image/*,.pdf"
                        multiple={false}
                        maxSize={10}
                        files={backCardFiles}
                        onFileSelect={handleBackCardFileSelect}
                        onFileRemove={handleBackCardFileRemove}
                        placeholder="Click to upload back of insurance card"
                        containerSx={{ mt: 1 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default InsuranceInformation