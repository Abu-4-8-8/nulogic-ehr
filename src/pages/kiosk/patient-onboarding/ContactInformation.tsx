import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { CustomInput, CustomDropdown, CustomLabel } from '../../../components/custom-fields'
import { COLORS } from '../../../constants/colors'
import TYPOGRAPHY from '../../../constants/typography'
import { PatientOnboardingFormData } from './validationSchema'

interface ContactInformationProps {
  onEmailDialogOpen: () => void
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  onEmailDialogOpen
}) => {
  const { control, formState: { errors } } = useFormContext<PatientOnboardingFormData>()

  return (
    <>
      <Box sx={{ m: 2, p: 2, border: `1px solid ${COLORS.GRAY_200}`, borderRadius: '8px', backgroundColor: COLORS.GRAY_100 }}>
        <Typography variant="h5" sx={{ fontFamily: TYPOGRAPHY.fontFamily.primary, fontWeight: '500', color: COLORS.GRAY_900, fontStyle: 'SemiBold', fontSize: '14px', lineHeight: '120%', letterSpacing: '0%' }}>
          Contact Information
        </Typography>
      </Box>

      <Card sx={{ m: 2, px: 2, borderRadius: '8px' }}>
        <CardContent>
          <Grid container spacing={2}>
            {/* First Row: Mobile Number, Home Number, Email ID, Fax Number */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel isRequired={true}>Mobile Number</CustomLabel>
              <Controller
                name="contactInformation.mobileNumber"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter Mobile Number"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.mobileNumber}
                    errorMessage={errors.contactInformation?.mobileNumber?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel>Home Number</CustomLabel>
              <Controller
                name="contactInformation.homeNumber"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter Home Number"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.homeNumber}
                    errorMessage={errors.contactInformation?.homeNumber?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel
                isRequired={true}
                showSkipNote={true}
                skipNoteText="Skip & add note"
                onSkipClick={onEmailDialogOpen}
                skipNoteColor={COLORS.PRIMARY_40 || COLORS.PRIMARY}
              >
                Email ID
              </CustomLabel>
              <Controller
                name="contactInformation.emailId"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter Email ID"
                    type="email"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.emailId}
                    errorMessage={errors.contactInformation?.emailId?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel>Fax Number</CustomLabel>
              <Controller
                name="contactInformation.faxNumber"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter Fax Number"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.faxNumber}
                    errorMessage={errors.contactInformation?.faxNumber?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Second Row: Address Line 1, Address Line 2 */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <CustomLabel isRequired={true}>Address Line 1</CustomLabel>
              <Controller
                name="contactInformation.addressLine1"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter Address Line 1"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.addressLine1}
                    errorMessage={errors.contactInformation?.addressLine1?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <CustomLabel>Address Line 2</CustomLabel>
              <Controller
                name="contactInformation.addressLine2"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter Address Line 2"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.addressLine2}
                    errorMessage={errors.contactInformation?.addressLine2?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Third Row: City, State, Country, Zip Code */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel isRequired={true}>City</CustomLabel>
              <Controller
                name="contactInformation.city"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter City"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.city}
                    errorMessage={errors.contactInformation?.city?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel isRequired={true}>State</CustomLabel>
              <Controller
                name="contactInformation.state"
                control={control}
                render={({ field }) => (
                  <CustomDropdown
                    placeholder="Select State"
                    options={[
                      { value: 'AL', label: 'Alabama' },
                      { value: 'AK', label: 'Alaska' },
                      { value: 'AZ', label: 'Arizona' },
                      { value: 'AR', label: 'Arkansas' },
                      { value: 'CA', label: 'California' },
                      { value: 'CO', label: 'Colorado' },
                      { value: 'CT', label: 'Connecticut' },
                      { value: 'DE', label: 'Delaware' },
                      { value: 'FL', label: 'Florida' },
                      { value: 'GA', label: 'Georgia' },
                      { value: 'HI', label: 'Hawaii' },
                      { value: 'ID', label: 'Idaho' },
                      { value: 'IL', label: 'Illinois' },
                      { value: 'IN', label: 'Indiana' },
                      { value: 'IA', label: 'Iowa' },
                      { value: 'KS', label: 'Kansas' },
                      { value: 'KY', label: 'Kentucky' },
                      { value: 'LA', label: 'Louisiana' },
                      { value: 'ME', label: 'Maine' },
                      { value: 'MD', label: 'Maryland' },
                      { value: 'MA', label: 'Massachusetts' },
                      { value: 'MI', label: 'Michigan' },
                      { value: 'MN', label: 'Minnesota' },
                      { value: 'MS', label: 'Mississippi' },
                      { value: 'MO', label: 'Missouri' },
                      { value: 'MT', label: 'Montana' },
                      { value: 'NE', label: 'Nebraska' },
                      { value: 'NV', label: 'Nevada' },
                      { value: 'NH', label: 'New Hampshire' },
                      { value: 'NJ', label: 'New Jersey' },
                      { value: 'NM', label: 'New Mexico' },
                      { value: 'NY', label: 'New York' },
                      { value: 'NC', label: 'North Carolina' },
                      { value: 'ND', label: 'North Dakota' },
                      { value: 'OH', label: 'Ohio' },
                      { value: 'OK', label: 'Oklahoma' },
                      { value: 'OR', label: 'Oregon' },
                      { value: 'PA', label: 'Pennsylvania' },
                      { value: 'RI', label: 'Rhode Island' },
                      { value: 'SC', label: 'South Carolina' },
                      { value: 'SD', label: 'South Dakota' },
                      { value: 'TN', label: 'Tennessee' },
                      { value: 'TX', label: 'Texas' },
                      { value: 'UT', label: 'Utah' },
                      { value: 'VT', label: 'Vermont' },
                      { value: 'VA', label: 'Virginia' },
                      { value: 'WA', label: 'Washington' },
                      { value: 'WV', label: 'West Virginia' },
                      { value: 'WI', label: 'Wisconsin' },
                      { value: 'WY', label: 'Wyoming' }
                    ]}
                    containerSx={{ mb: 0 }}
                    error={!!errors.contactInformation?.state}
                    errorMessage={errors.contactInformation?.state?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel isRequired={true}>Country</CustomLabel>
              <Controller
                name="contactInformation.country"
                control={control}
                render={({ field }) => (
                  <CustomDropdown
                    placeholder="Select Country"
                    options={[
                      { value: 'US', label: 'United States' },
                      { value: 'CA', label: 'Canada' },
                      { value: 'MX', label: 'Mexico' },
                      { value: 'GB', label: 'United Kingdom' },
                      { value: 'AU', label: 'Australia' },
                      { value: 'DE', label: 'Germany' },
                      { value: 'FR', label: 'France' },
                      { value: 'IT', label: 'Italy' },
                      { value: 'ES', label: 'Spain' },
                      { value: 'JP', label: 'Japan' },
                      { value: 'CN', label: 'China' },
                      { value: 'IN', label: 'India' },
                      { value: 'BR', label: 'Brazil' },
                      { value: 'OTHER', label: 'Other' }
                    ]}
                    containerSx={{ mb: 0 }}
                    error={!!errors.contactInformation?.country}
                    errorMessage={errors.contactInformation?.country?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomLabel isRequired={true}>Zip Code</CustomLabel>
              <Controller
                name="contactInformation.zipCode"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder="Enter Zip Code"
                    containerSx={{ mb: 0 }}
                    hasError={!!errors.contactInformation?.zipCode}
                    errorMessage={errors.contactInformation?.zipCode?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ContactInformation