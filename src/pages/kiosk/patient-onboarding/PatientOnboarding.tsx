import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Tab, Tabs, Typography, Alert, Snackbar } from "@mui/material"
import { COLORS } from "../../../constants/colors";
import TYPOGRAPHY from "../../../constants/typography";
import CheckIcon from "@mui/icons-material/Check";
import { CustomButton } from "../../../components/custom-fields";
import AddNoteDialog  from "../../../components/dialog/AddNoteDialog";
import { 
    Demographics, 
    ContactInformation, 
    EmergencyContact, 
    InsuranceInformation, 
    Other 
} from "./";
import { patientOnboardingSchema, defaultValues, PatientOnboardingFormData } from "./validationSchema";

const PatientOnboarding = () => {
    const [avatarSrc, setAvatarSrc] = useState<string>('')
    const [ssnDialogOpen, setSsnDialogOpen] = useState(false)
    const [emailDialogOpen, setEmailDialogOpen] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const [validationError, setValidationError] = useState('')
    const [showValidationError, setShowValidationError] = useState(false)

    // Setup React Hook Form with Yup resolver
    const methods = useForm<PatientOnboardingFormData>({
        resolver: yupResolver(patientOnboardingSchema) as any,
        defaultValues,
        mode: 'onChange',
    })

    const { handleSubmit, setValue, watch, trigger } = methods

    const handleAvatarUpload = (file: File) => {
        // Create a URL for the uploaded file to display it
        const imageUrl = URL.createObjectURL(file)
        setAvatarSrc(imageUrl)
        setValue('demographics.avatar', imageUrl)

        // Here you would typically upload the file to your server
        console.log('File selected:', file)
    }

    const onSubmit = (data: PatientOnboardingFormData) => {
        console.log('Form submitted:', data)
        // Handle form submission here
    }

    const handleSsnNoteSubmit = (note: string) => {
        setValue('demographics.ssnNote', note)
        // Clear SSN field if note is provided
        if (note.trim()) {
            setValue('demographics.ssn', '')
        }
    }

    const handleSsnDialogClose = () => {
        setSsnDialogOpen(false)
    }

    const handleSsnDialogOpen = () => {
        setSsnDialogOpen(true)
    }

    const handleEmailNoteSubmit = (note: string) => {
        setValue('contactInformation.emailNote', note)
        // Clear Email field if note is provided
        if (note.trim()) {
            setValue('contactInformation.emailId', '')
        }
    }

    const handleEmailDialogClose = () => {
        setEmailDialogOpen(false)
    }

    const handleEmailDialogOpen = () => {
        setEmailDialogOpen(true)
    }

    const steps = [
        { label: "Demographic", key: "demographics" },
        { label: "Contact Information", key: "contactInformation" },
        { label: "Emergency Contact", key: "emergencyContact" },
        { label: "Insurance Information", key: "insuranceInformation" },
        { label: "Other", key: "other" },
    ];

    // Step validation function
    const validateCurrentStep = async () => {
        const currentStepKey = steps[activeStep].key
        try {
            // Trigger validation for the current step
            const isValid = await trigger(currentStepKey as keyof PatientOnboardingFormData)
            return isValid
        } catch (error) {
            console.error('Validation error:', error)
            return false
        }
    }

    // Navigation functions
    const handleNext = async () => {
        const isValid = await validateCurrentStep()
        if (isValid) {
            // Mark current step as completed
            if (!completedSteps.includes(activeStep)) {
                setCompletedSteps(prev => [...prev, activeStep])
            }
            
            if (activeStep < steps.length - 1) {
                setActiveStep(prev => prev + 1)
            } else {
                // Last step - submit the form
                handleSubmit(onSubmit)()
            }
        } else {
            setValidationError('Please complete all required fields before proceeding to the next step.')
            setShowValidationError(true)
        }
    }

    const handlePrevious = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1)
        }
    }

    const handleTabChange = async (_event: React.SyntheticEvent, newValue: number) => {
        // Allow navigation only to completed steps or current step
        // If trying to go to a future step, validate current step first
        if (newValue < activeStep) {
            // Going backward - always allowed to completed steps
            if (completedSteps.includes(newValue)) {
                setActiveStep(newValue)
            }
        } else if (newValue === activeStep) {
            // Staying on current step - always allowed
            return
        } else {
            // Going forward - validate current step first
            const isCurrentStepValid = await validateCurrentStep()
            if (isCurrentStepValid) {
                // Mark current step as completed
                if (!completedSteps.includes(activeStep)) {
                    setCompletedSteps(prev => [...prev, activeStep])
                }
                setActiveStep(newValue)
            } else {
                // Show validation errors by triggering validation
                await trigger(steps[activeStep].key as keyof PatientOnboardingFormData)
                setValidationError('Please complete all required fields in the current step before proceeding.')
                setShowValidationError(true)
            }
        }
    }

    const handleCancel = () => {
        // Reset form or navigate away
        console.log('Cancel clicked')
        // You can add navigation logic here
    }

    // Render current step content
    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Demographics 
                        onSsnDialogOpen={handleSsnDialogOpen}
                        avatarSrc={avatarSrc}
                        onAvatarUpload={handleAvatarUpload}
                    />
                )
            case 1:
                return <ContactInformation onEmailDialogOpen={handleEmailDialogOpen} />
            case 2:
                return <EmergencyContact />
            case 3:
                return <InsuranceInformation />
            case 4:
                return <Other />
            default:
                return null
        }
    }

    const CustomTab = ({
        label,
        index,
        activeStep,
        completed,
    }: {
        label: string;
        index: number;
        activeStep: number;
        completed: boolean;
    }) => (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                padding: "8px 16px",
                borderRadius: activeStep === index ? "4px" : "0",
                backgroundColor: activeStep === index ? "#F0F9FF" : "inherit",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    backgroundColor: completed
                        ? COLORS.SECONDARY_60
                        : activeStep === index
                            ? COLORS.PRIMARY_10
                            : COLORS.GRAY_300,
                    color: completed
                        ? COLORS.WHITE
                        : activeStep === index
                            ? COLORS.PRIMARY
                            : COLORS.GRAY_600,
                    fontWeight: activeStep === index ? "bold" : "normal",
                    fontSize: activeStep === index ? "1rem" : "0.875rem",
                }}
            >
                {completed ? <CheckIcon sx={{ fontSize: '16px' }} /> : index + 1}
            </Box>
            <Typography variant="body2" sx={{ ml: 2, fontWeight: "bold" }}>
                {label}
            </Typography>
        </Box>
    );

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.12)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, borderBottom: `2px solid ${COLORS.GRAY_200}` }}>
                    <IconButton
                        onClick={handleCancel}
                        sx={{ fontFamily: TYPOGRAPHY.fontFamily.primary, fontWeight: '600', color: COLORS.GRAY_900, fontStyle: 'SemiBold', fontSize: '18px', lineHeight: '120%', letterSpacing: '0%' }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <Typography variant="h5" sx={{ fontFamily: TYPOGRAPHY.fontFamily.primary, fontWeight: '600', color: COLORS.GRAY_900, fontStyle: 'SemiBold', fontSize: '18px', lineHeight: '120%', letterSpacing: '0%' }}>
                        Add Patient
                    </Typography>
                </Box>

                {/* Stepper Tabs */}
                <Box sx={{ px: 2, mb: 2 }}>
                    <Tabs
                        value={activeStep}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                        {steps.map((step, index) => (
                            <Tab
                                key={step.label}
                                disabled={!completedSteps.includes(index) && index > activeStep}
                                label={
                                    <CustomTab
                                        label={step.label}
                                        index={index}
                                        activeStep={activeStep}
                                        completed={completedSteps.includes(index)}
                                    />
                                }
                                sx={{
                                    flexGrow: 1,
                                    backgroundColor: activeStep === index ? COLORS.PRIMARY_1 : "inherit",
                                    textTransform: "none",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    opacity: (!completedSteps.includes(index) && index > activeStep) ? 0.6 : 1,
                                    cursor: (!completedSteps.includes(index) && index > activeStep) ? 'not-allowed' : 'pointer',
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Step Content */}
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    {renderStepContent()}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 3, 
                    borderTop: `1px solid ${COLORS.GRAY_200}`,
                    backgroundColor: '#FFFFFF'
                }}>
                    <CustomButton
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{
                            minWidth: '100px',
                            height: '40px',
                            borderColor: COLORS.GRAY_300,
                            color: COLORS.GRAY_700,
                            '&:hover': {
                                borderColor: COLORS.GRAY_400,
                                backgroundColor: COLORS.GRAY_50,
                            },
                        }}
                    >
                        Cancel
                    </CustomButton>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {activeStep > 0 && (
                            <CustomButton
                                variant="outlined"
                                onClick={handlePrevious}
                                sx={{
                                    minWidth: '100px',
                                    height: '40px',
                                    borderColor: COLORS.PRIMARY,
                                    color: COLORS.PRIMARY,
                                    '&:hover': {
                                        borderColor: COLORS.PRIMARY_DARK || COLORS.PRIMARY,
                                        backgroundColor: COLORS.PRIMARY_LIGHT || `${COLORS.PRIMARY}10`,
                                    },
                                }}
                            >
                                Previous
                            </CustomButton>
                        )}
                        
                        <CustomButton
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                                minWidth: '120px',
                                height: '40px',
                                backgroundColor: COLORS.PRIMARY,
                                '&:hover': {
                                    backgroundColor: COLORS.PRIMARY_DARK || COLORS.PRIMARY,
                                },
                            }}
                        >
                            {activeStep === steps.length - 1 ? 'Save & Complete' : 'Save & Next'}
                        </CustomButton>
                    </Box>
                </Box>

                {/* SSN Note Dialog */}
                <AddNoteDialog
                    open={ssnDialogOpen}
                    onClose={handleSsnDialogClose}
                    onSubmit={handleSsnNoteSubmit}
                    title="Add Note for SSN"
                    initialNote={watch('demographics.ssnNote') || ''}
                    fieldName="ssn"
                />

                {/* Email Note Dialog */}
                <AddNoteDialog
                    open={emailDialogOpen}
                    onClose={handleEmailDialogClose}
                    onSubmit={handleEmailNoteSubmit}
                    title="Add Note for Email ID"
                    initialNote={watch('contactInformation.emailNote') || ''}
                    fieldName="email"
                />

                {/* Validation Error Snackbar */}
                <Snackbar
                    open={showValidationError}
                    autoHideDuration={4000}
                    onClose={() => setShowValidationError(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setShowValidationError(false)}
                        severity="error"
                        sx={{
                            width: '100%',
                            backgroundColor: COLORS.ERROR,
                            color: COLORS.WHITE,
                            '& .MuiAlert-icon': {
                                color: COLORS.WHITE,
                            },
                            '& .MuiAlert-action': {
                                color: COLORS.WHITE,
                            },
                        }}
                    >
                        {validationError}
                    </Alert>
                </Snackbar>
            </Box>
        </FormProvider>
    )
}

export default PatientOnboarding;
