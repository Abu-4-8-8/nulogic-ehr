import * as yup from 'yup'

export const patientOnboardingSchema = yup.object({
  // Demographics Section
  demographics: yup.object({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string().optional(),
    lastName: yup.string().required('Last name is required'),
    suffix: yup.string().optional(),
    nickname: yup.string().optional(),
    genderAtBirth: yup.string().required('Gender at birth is required'),
    currentGender: yup.string().required('Current gender is required'),
    pronouns: yup.string().optional(),
    dateOfBirth: yup.date().required('Date of birth is required'),
    maritalStatus: yup.string().optional(),
    timeZone: yup.string().optional(),
    preferredLanguage: yup.string().required('Preferred language is required'),
    occupation: yup.string().optional(),
    ssn: yup.string().optional(),
    ssnNote: yup.string().optional(),
    race: yup.string().required('Race is required'),
    ethnicity: yup.string().optional(),
    treatmentType: yup.string().optional(),
    avatar: yup.string().optional(),
  }).required().test(
    'ssn-or-note-required',
    'Either SSN or a note explaining why SSN cannot be provided is required',
    function (value) {
      const { ssn, ssnNote } = value || {}
      const hasSSN = ssn && ssn.trim() !== ''
      const hasNote = ssnNote && ssnNote.trim() !== ''
      
      if (!hasSSN && !hasNote) {
        return this.createError({
          path: 'ssn',
          message: 'Either SSN or a note explaining why SSN cannot be provided is required'
        })
      }
      
      return true
    }
  ),

  // Contact Information Section
  contactInformation: yup.object({
    mobileNumber: yup.string().required('Mobile number is required'),
    homeNumber: yup.string().optional(),
    emailId: yup.string().optional(),
    emailNote: yup.string().optional(),
    faxNumber: yup.string().optional(),
    addressLine1: yup.string().required('Address line 1 is required'),
    addressLine2: yup.string().optional(),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    zipCode: yup.string().required('Zip code is required'),
  }).required().test(
    'email-or-note-required',
    'Either Email ID or a note explaining why Email ID cannot be provided is required',
    function (value) {
      const { emailId, emailNote } = value || {}
      const hasEmail = emailId && emailId.trim() !== ''
      const hasNote = emailNote && emailNote.trim() !== ''
      
      if (!hasEmail && !hasNote) {
        return this.createError({
          path: 'emailId',
          message: 'Either Email ID or a note explaining why Email ID cannot be provided is required'
        })
      }
      
      return true
    }
  ),

  // Emergency Contact Section (Optional)
  emergencyContact: yup.object({
    contacts: yup.array().of(
      yup.object({
        relationshipWithPatient: yup.string().optional(),
        firstName: yup.string().optional(),
        lastName: yup.string().optional(),
        phoneNumber: yup.string().optional(),
        email: yup.string().email('Please enter a valid email address').optional(),
      }).test(
        'emergency-contact-completeness',
        'If you provide any emergency contact information, relationship, first name, last name, and phone number are required',
        function (value) {
          const { relationshipWithPatient, firstName, lastName, phoneNumber } = value || {}
          
          // Check if any field has data
          const hasAnyData = relationshipWithPatient || firstName || lastName || phoneNumber
          
          if (hasAnyData) {
            // If any field has data, then all required fields must be filled
            if (!relationshipWithPatient) {
              return this.createError({
                path: 'relationshipWithPatient',
                message: 'Relationship with patient is required when contact details are provided'
              })
            }
            if (!firstName) {
              return this.createError({
                path: 'firstName',
                message: 'First name is required when contact details are provided'
              })
            }
            if (!lastName) {
              return this.createError({
                path: 'lastName',
                message: 'Last name is required when contact details are provided'
              })
            }
            if (!phoneNumber) {
              return this.createError({
                path: 'phoneNumber',
                message: 'Phone number is required when contact details are provided'
              })
            }
          }
          
          return true
        }
      )
    ).optional(),
  }).optional(),

  // Insurance Information Section
  insuranceInformation: yup.object({
    paymentMethod: yup.string().required('Payment method is required'),
    // Primary Insurance (only required if payment method is 'insurance')
    insuranceType: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Insurance type is required'),
      otherwise: (schema) => schema.optional(),
    }),
    insuranceName: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Insurance name is required'),
      otherwise: (schema) => schema.optional(),
    }),
    memberId: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Member ID is required'),
      otherwise: (schema) => schema.optional(),
    }),
    planName: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Plan name is required'),
      otherwise: (schema) => schema.optional(),
    }),
    planType: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Plan type is required'),
      otherwise: (schema) => schema.optional(),
    }),
    groupId: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Group ID is required'),
      otherwise: (schema) => schema.optional(),
    }),
    groupName: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Group name is required'),
      otherwise: (schema) => schema.optional(),
    }),
    effectiveStartDate: yup.date().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Effective start date is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    effectiveEndDate: yup.date().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.nullable(),
    }),
    patientRelationship: yup.string().when('paymentMethod', {
      is: 'insurance',
      then: (schema) => schema.required('Patient relationship is required'),
      otherwise: (schema) => schema.optional(),
    }),
    frontCardFiles: yup.array().of(yup.mixed()).optional(),
    backCardFiles: yup.array().of(yup.mixed()).optional(),
  }).required(),

  // Other Section
  other: yup.object({
    // Preferences
    selectedLab: yup.string().optional(),
    
    // Privacy Consent
    consentToEmail: yup.boolean().optional(),
    consentToMessage: yup.boolean().optional(),
    
    // Other Information
    practiceLocation: yup.string().optional(),
    registrationDate: yup.date().optional(),
    source: yup.string().optional(),
    soberLivingHome: yup.string().when('source', {
      is: 'sober-living',
      then: (schema) => schema.required('Sober Living Home selection is required'),
      otherwise: (schema) => schema.optional(),
    }),
  }).optional(),
}).required()

export type PatientOnboardingFormData = yup.InferType<typeof patientOnboardingSchema>

// Default values for the form
export const defaultValues: PatientOnboardingFormData = {
  demographics: {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    nickname: '',
    genderAtBirth: '',
    currentGender: '',
    pronouns: '',
    dateOfBirth: null as any,
    maritalStatus: '',
    timeZone: '',
    preferredLanguage: '',
    occupation: '',
    ssn: '',
    ssnNote: '',
    race: '',
    ethnicity: '',
    treatmentType: '',
    avatar: '',
  },
  contactInformation: {
    mobileNumber: '',
    homeNumber: '',
    emailId: '',
    emailNote: '',
    faxNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  emergencyContact: {
    contacts: [
      {
        relationshipWithPatient: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      }
    ]
  },
  insuranceInformation: {
    paymentMethod: '',
    insuranceType: '',
    insuranceName: '',
    memberId: '',
    planName: '',
    planType: '',
    groupId: '',
    groupName: '',
    effectiveStartDate: null as any,
    effectiveEndDate: null as any,
    patientRelationship: '',
    frontCardFiles: [],
    backCardFiles: [],
  },
  other: {
    selectedLab: '',
    consentToEmail: false,
    consentToMessage: false,
    practiceLocation: '',
    registrationDate: null as any,
    source: '',
    soberLivingHome: ''
  },
}
