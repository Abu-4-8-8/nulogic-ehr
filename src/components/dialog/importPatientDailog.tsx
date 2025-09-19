import React, { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import CustomDialog from '../widgets/CustomDialog'
import CustomDropdown from '../custom-fields/CustomDropdown'
import CustomButton from '../custom-fields/CustomButton'
import ImportPatientUpload from './ImportPatientUpload'
import { COLORS } from '../../constants/colors'
import { TYPOGRAPHY } from '../../constants/typography'

interface ImportPatientDialogProps {
  open: boolean
  onClose: () => void
  onImport?: (data: { soberLivingHome: string; files: File[] }) => void
}

const ImportPatientDialog: React.FC<ImportPatientDialogProps> = ({
  open,
  onClose,
  onImport
}) => {
  const [soberLivingHome, setSoberLivingHome] = useState<string | number>('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  // Mock data for sober living homes
  const soberLivingOptions = [
    { value: 'home1', label: 'Sunrise Recovery Center' },
    { value: 'home2', label: 'New Beginnings Sober Living' },
    { value: 'home3', label: 'Hope House Recovery' },
    { value: 'home4', label: 'Serenity Sober Living' },
    { value: 'home5', label: 'Freedom House Recovery' },
  ]

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files)
  }

  const handleFileRemove = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }


  const handleImport = () => {
    if (soberLivingHome && selectedFiles.length > 0) {
      onImport?.({
        soberLivingHome: soberLivingHome.toString(),
        files: selectedFiles
      })
      // Reset form
      setSoberLivingHome('')
      setSelectedFiles([])
      onClose()
    }
  }


  const dialogContent = (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 16px 12px 16px',
          borderBottom: `1px solid ${COLORS.NEUTRAL_5}`
        }}
      >
        <Typography
          sx={{
            fontFamily: TYPOGRAPHY.fontFamily.primary,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            fontSize: TYPOGRAPHY.fontSize.h4.large,
            lineHeight: TYPOGRAPHY.lineHeight.h4.large,
            color: COLORS.NEUTRAL_90
          }}
        >
          Import Patients
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          <IconButton
            onClick={onClose}
            sx={{
              width: '20px',
              height: '20px',
              padding: 0,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Close sx={{ fontSize: '16px', color: COLORS.NEUTRAL_80 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '34px',
          padding: '16px',
          flex: 1
        }}
      >
        {/* Sober Living Home Dropdown */}
        <CustomDropdown
          label="Sober Living Home"
          placeholder="Select Sober Living Home"
          options={soberLivingOptions}
          value={soberLivingHome}
          onChange={(value) => setSoberLivingHome(Array.isArray(value) ? value[0] : value)}
          required
          size="large"
          sx={{
            height: '58px',
            '& .MuiOutlinedInput-root': {
              height: '58px',
              fontSize: TYPOGRAPHY.fontSize.body3.large,
              fontFamily: TYPOGRAPHY.fontFamily.primary,
              '& fieldset': {
                borderColor: COLORS.NEUTRAL_20,
                borderWidth: '1px'
              },
              '&:hover fieldset': {
                borderColor: COLORS.NEUTRAL_20
              },
              '&.Mui-focused fieldset': {
                borderColor: COLORS.PRIMARY_50,
                borderWidth: '1px'
              }
            }
          }}
          labelSx={{
            fontSize: TYPOGRAPHY.fontSize.caption3.large,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            color: COLORS.NEUTRAL_60,
            marginBottom: '6px',
            fontFamily: TYPOGRAPHY.fontFamily.primary
          }}
        />

        {/* File Upload Section */}
        <ImportPatientUpload
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          files={selectedFiles}
        />
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
            lineHeight: "1.2em",
          gap: '12px',
          padding: '16px',
          borderTop: `1px solid ${COLORS.NEUTRAL_5}`,
          backgroundColor: COLORS.NEUTRAL_1
        }}
      >
        <CustomButton
          label="Cancel"
          variant="outlined"
          customColor="primary"
          onClick={onClose}
          sx={{
            height: '44px',
            padding: '10px 18px',
            fontSize: TYPOGRAPHY.fontSize.button.large,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            minWidth: '100px',
            fontFamily: TYPOGRAPHY.fontFamily.primary,
            backgroundColor: 'transparent',
            color: COLORS.NEUTRAL_50,
            borderColor: COLORS.NEUTRAL_20,
            '&:hover': {
              backgroundColor: COLORS.NEUTRAL_5,
              borderColor: COLORS.NEUTRAL_30,
              color: COLORS.NEUTRAL_60
            }
          }}
        />
        <CustomButton
          label="Import Patients"
          variant="contained"
          customColor="primary"
          onClick={handleImport}
          // disabled={!isFormValid}
          sx={{
            height: '44px',
            padding: '10px 18px',
            fontSize: TYPOGRAPHY.fontSize.button.large,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            minWidth: '140px',
            fontFamily: TYPOGRAPHY.fontFamily.primary,
            backgroundColor: COLORS.PRIMARY_70,
            color: COLORS.WHITE,
            '&:hover': {
              backgroundColor: COLORS.PRIMARY_80
            },
            '&.Mui-disabled': {
              backgroundColor: COLORS.NEUTRAL_20,
              color: COLORS.NEUTRAL_50
            }
          }}
        />
      </Box>
    </Box>
  )

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      type="custom"
      maxWidth="sm"
      customWidth="486px"
      customHeight="auto"
      htmlContent={dialogContent}
      disableBackdropClick={false}
    />
  )
}

export default ImportPatientDialog
