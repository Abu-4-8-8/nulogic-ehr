import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { CustomInput, CustomDropdown, CustomAvatar, CustomLabel } from '../../../components/common'
import { COLORS } from '../../../constants/colors'
import TYPOGRAPHY from '../../../constants/typography'
import defaultAvatar from '../../../assets/default_avatar.png'
import { PatientOnboardingFormData } from './validationSchema'

interface DemographicsProps {
  onSsnDialogOpen: () => void
  avatarSrc: string
  onAvatarUpload: (file: File) => void
}

const Demographics: React.FC<DemographicsProps> = ({
  onSsnDialogOpen,
  avatarSrc,
  onAvatarUpload
}) => {
  const { control, formState: { errors } } = useFormContext<PatientOnboardingFormData>()

  return (
    <>
      <Box sx={{ m: 2, p: 2, border: `1px solid ${COLORS.GRAY_200}`, borderRadius: '8px', backgroundColor: COLORS.GRAY_100 }}>
        <Typography variant="h5" sx={{ fontFamily: TYPOGRAPHY.fontFamily.primary, fontWeight: '500', color: COLORS.GRAY_900, fontStyle: 'SemiBold', fontSize: '14px', lineHeight: '120%', letterSpacing: '0%' }}>
          Demographics Information
        </Typography>
      </Box>

      <Card sx={{ m: 2, px: 2, borderRadius: '8px' }}>
        <CardContent>
          <Grid container>
            {/* Avatar Section */}
            <Grid
              size={{ xs: 12, sm: 12, md: 2 }}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "flex-start"
              }}
            >
              <CustomAvatar
                src={avatarSrc || defaultAvatar}
                alt="Profile Picture"
                size={150}
                allowUpload={true}
                onFileSelect={onAvatarUpload}
                uploadTooltip="Upload profile picture"
                showUploadIcon={true}
                uploadIconPosition="bottom-right"
                acceptedFileTypes="image/*"
                maxFileSize={5}
                showInitials={false}
                fallbackIcon={<Typography sx={{ fontSize: 40, fontWeight: '600' }}>+</Typography>}
              />
            </Grid>

            {/* Form Section */}
            <Grid size={{ xs: 12, sm: 12, md: 10 }}>
              <Grid container spacing={2}>
                {/* First Row: First Name, Middle Name, Last Name, Suffix */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel isRequired={true}>First Name</CustomLabel>
                  <Controller
                    name="demographics.firstName"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter First Name"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.demographics?.firstName}
                        errorMessage={errors.demographics?.firstName?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Middle Name</CustomLabel>
                  <Controller
                    name="demographics.middleName"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter Middle Name"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.demographics?.middleName}
                        errorMessage={errors.demographics?.middleName?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel isRequired={true}>Last Name</CustomLabel>
                  <Controller
                    name="demographics.lastName"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter Last Name"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.demographics?.lastName}
                        errorMessage={errors.demographics?.lastName?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Suffix</CustomLabel>
                  <Controller
                    name="demographics.suffix"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Suffix"
                        options={[
                          { value: 'jr', label: 'Jr.' },
                          { value: 'sr', label: 'Sr.' },
                          { value: 'ii', label: 'II' },
                          { value: 'iii', label: 'III' },
                          { value: 'iv', label: 'IV' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.suffix}
                        errorMessage={errors.demographics?.suffix?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                {/* Second Row: Nickname, Gender at Birth, Current Gender, Pronouns */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Nickname</CustomLabel>
                  <Controller
                    name="demographics.nickname"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter Nickname"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.demographics?.nickname}
                        errorMessage={errors.demographics?.nickname?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel isRequired={true}>Gender at Birth</CustomLabel>
                  <Controller
                    name="demographics.genderAtBirth"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Gender at Birth"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.genderAtBirth}
                        errorMessage={errors.demographics?.genderAtBirth?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel isRequired={true}>Current Gender</CustomLabel>
                  <Controller
                    name="demographics.currentGender"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Current Gender"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'non-binary', label: 'Non-binary' },
                          { value: 'other', label: 'Other' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.currentGender}
                        errorMessage={errors.demographics?.currentGender?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Pronouns</CustomLabel>
                  <Controller
                    name="demographics.pronouns"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Pronouns"
                        options={[
                          { value: 'he/him', label: 'He/Him' },
                          { value: 'she/her', label: 'She/Her' },
                          { value: 'they/them', label: 'They/Them' },
                          { value: 'other', label: 'Other' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.pronouns}
                        errorMessage={errors.demographics?.pronouns?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                {/* Third Row: Date of Birth, Marital Status, Time Zone, Preferred Language */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel isRequired={true}>Date Of Birth</CustomLabel>
                  <Controller
                    name="demographics.dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Select Date"
                        type="date"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.demographics?.dateOfBirth}
                        errorMessage={errors.demographics?.dateOfBirth?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Marital Status</CustomLabel>
                  <Controller
                    name="demographics.maritalStatus"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Marital Status"
                        options={[
                          { value: 'single', label: 'Single' },
                          { value: 'married', label: 'Married' },
                          { value: 'divorced', label: 'Divorced' },
                          { value: 'widowed', label: 'Widowed' },
                          { value: 'separated', label: 'Separated' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.maritalStatus}
                        errorMessage={errors.demographics?.maritalStatus?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Time Zone</CustomLabel>
                  <Controller
                    name="demographics.timeZone"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select"
                        options={[
                          { value: 'est', label: 'Eastern Standard Time (EST)' },
                          { value: 'cst', label: 'Central Standard Time (CST)' },
                          { value: 'mst', label: 'Mountain Standard Time (MST)' },
                          { value: 'pst', label: 'Pacific Standard Time (PST)' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.timeZone}
                        errorMessage={errors.demographics?.timeZone?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel isRequired={true}>Preferred Language</CustomLabel>
                  <Controller
                    name="demographics.preferredLanguage"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select"
                        options={[
                          { value: 'english', label: 'English' },
                          { value: 'spanish', label: 'Spanish' },
                          { value: 'french', label: 'French' },
                          { value: 'other', label: 'Other' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.preferredLanguage}
                        errorMessage={errors.demographics?.preferredLanguage?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                {/* Fourth Row: Occupation, SSN, Race, Ethnicity */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Occupation</CustomLabel>
                  <Controller
                    name="demographics.occupation"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Occupation"
                        options={[
                          { value: 'healthcare', label: 'Healthcare' },
                          { value: 'education', label: 'Education' },
                          { value: 'technology', label: 'Technology' },
                          { value: 'business', label: 'Business' },
                          { value: 'other', label: 'Other' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.occupation}
                        errorMessage={errors.demographics?.occupation?.message}
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
                    onSkipClick={onSsnDialogOpen}
                    skipNoteColor={COLORS.PRIMARY_40 || COLORS.PRIMARY}
                  >
                    SSN
                  </CustomLabel>
                  <Controller
                    name="demographics.ssn"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter SSN Number"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.demographics?.ssn}
                        errorMessage={errors.demographics?.ssn?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel isRequired={true}>Race</CustomLabel>
                  <Controller
                    name="demographics.race"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Race"
                        options={[
                          { value: 'white', label: 'White' },
                          { value: 'black', label: 'Black or African American' },
                          { value: 'asian', label: 'Asian' },
                          { value: 'native-american', label: 'American Indian or Alaska Native' },
                          { value: 'pacific-islander', label: 'Native Hawaiian or Other Pacific Islander' },
                          { value: 'other', label: 'Other' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.race}
                        errorMessage={errors.demographics?.race?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Ethnicity</CustomLabel>
                  <Controller
                    name="demographics.ethnicity"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Ethnicity"
                        options={[
                          { value: 'hispanic', label: 'Hispanic or Latino' },
                          { value: 'non-hispanic', label: 'Not Hispanic or Latino' },
                          { value: 'unknown', label: 'Unknown' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.ethnicity}
                        errorMessage={errors.demographics?.ethnicity?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                {/* Fifth Row: Treatment Type */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Treatment Type</CustomLabel>
                  <Controller
                    name="demographics.treatmentType"
                    control={control}
                    render={({ field }) => (
                      <CustomDropdown
                        placeholder="Select Treatment Type"
                        options={[
                          { value: 'inpatient', label: 'Inpatient' },
                          { value: 'outpatient', label: 'Outpatient' },
                          { value: 'emergency', label: 'Emergency' },
                          { value: 'preventive', label: 'Preventive' }
                        ]}
                        containerSx={{ mb: 0 }}
                        error={!!errors.demographics?.treatmentType}
                        errorMessage={errors.demographics?.treatmentType?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Demographics
