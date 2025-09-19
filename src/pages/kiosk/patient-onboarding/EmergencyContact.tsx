import React from 'react'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { CustomInput, CustomDropdown, CustomLabel } from '../../../components/custom-fields'
import { COLORS } from '../../../constants/colors'
import TYPOGRAPHY from '../../../constants/typography'
import { PatientOnboardingFormData } from './validationSchema'

const EmergencyContact: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<PatientOnboardingFormData>()
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContact.contacts"
  })

  const addNewContact = () => {
    append({
      relationshipWithPatient: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    })
  }

  const removeContact = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const relationshipOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'friend', label: 'Friend' },
    { value: 'guardian', label: 'Guardian' },
    { value: 'caregiver', label: 'Caregiver' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <>
      <Box sx={{ m: 2, p: 2, border: `1px solid ${COLORS.GRAY_200}`, borderRadius: '8px', backgroundColor: COLORS.GRAY_100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: TYPOGRAPHY.fontFamily.primary, fontWeight: '500', color: COLORS.GRAY_900, fontStyle: 'SemiBold', fontSize: '14px', lineHeight: '120%', letterSpacing: '0%' }}>
            Emergency Contact Information
          </Typography>
        </Box>
      </Box>

      <Card sx={{ m: 2, px: 2, borderRadius: '8px' }}>
        <CardContent>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ mb: 4 }}>
              {/* Contact Header */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2,
                pb: 1,
                borderBottom: index > 0 ? `1px solid ${COLORS.GRAY_200}` : 'none',
                pt: index > 0 ? 2 : 0
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: TYPOGRAPHY.fontFamily.primary, 
                    fontWeight: '600', 
                    color: COLORS.GRAY_900, 
                    fontSize: '16px' 
                  }}
                >
                  Emergency Contact {index + 1}
                </Typography>
                
                {fields.length > 1 && (
                  <Button
                    onClick={() => removeContact(index)}
                    startIcon={<DeleteIcon />}
                    sx={{
                      color: COLORS.ERROR || '#d32f2f',
                      '&:hover': {
                        backgroundColor: `${COLORS.ERROR || '#d32f2f'}10`,
                      },
                      textTransform: 'none',
                      fontSize: '14px',
                    }}
                  >
                    Remove Contact
                  </Button>
                )}
              </Box>

              <Grid container spacing={2}>
                {/* First Row: Relationship, First Name, Last Name, Phone Number */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Relationship with Patient</CustomLabel>
                  <Controller
                    name={`emergencyContact.contacts.${index}.relationshipWithPatient`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <CustomDropdown
                        placeholder="Select Relationship with Patient"
                        options={relationshipOptions}
                        containerSx={{ mb: 0 }}
                        error={!!errors.emergencyContact?.contacts?.[index]?.relationshipWithPatient}
                        errorMessage={errors.emergencyContact?.contacts?.[index]?.relationshipWithPatient?.message}
                        {...controllerField}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>First Name</CustomLabel>
                  <Controller
                    name={`emergencyContact.contacts.${index}.firstName`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <CustomInput
                        placeholder="Enter First Name"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.emergencyContact?.contacts?.[index]?.firstName}
                        errorMessage={errors.emergencyContact?.contacts?.[index]?.firstName?.message}
                        {...controllerField}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Last Name</CustomLabel>
                  <Controller
                    name={`emergencyContact.contacts.${index}.lastName`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <CustomInput
                        placeholder="Enter Last Name"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.emergencyContact?.contacts?.[index]?.lastName}
                        errorMessage={errors.emergencyContact?.contacts?.[index]?.lastName?.message}
                        {...controllerField}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Phone Number</CustomLabel>
                  <Controller
                    name={`emergencyContact.contacts.${index}.phoneNumber`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <CustomInput
                        placeholder="Enter Phone Number"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.emergencyContact?.contacts?.[index]?.phoneNumber}
                        errorMessage={errors.emergencyContact?.contacts?.[index]?.phoneNumber?.message}
                        {...controllerField}
                      />
                    )}
                  />
                </Grid>

                {/* Second Row: Email */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomLabel>Email</CustomLabel>
                  <Controller
                    name={`emergencyContact.contacts.${index}.email`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <CustomInput
                        placeholder="Enter Email"
                        type="email"
                        containerSx={{ mb: 0 }}
                        hasError={!!errors.emergencyContact?.contacts?.[index]?.email}
                        errorMessage={errors.emergencyContact?.contacts?.[index]?.email?.message}
                        {...controllerField}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}

          {/* Add New Emergency Contact Button */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={addNewContact}
              startIcon={<AddIcon />}
              sx={{
                color: COLORS.PRIMARY,
                '&:hover': {
                  backgroundColor: `${COLORS.PRIMARY}10`,
                },
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Add New Emergency Contact
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default EmergencyContact