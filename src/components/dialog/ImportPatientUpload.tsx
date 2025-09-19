import React, { useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Download } from '@mui/icons-material'
import { COLORS } from '../../constants/colors'
import { TYPOGRAPHY } from '../../constants/typography'

interface ImportPatientUploadProps {
  onFileSelect?: (files: File[]) => void
  onFileRemove?: (index: number) => void
  files?: File[]
  error?: boolean
  errorMessage?: string
  disabled?: boolean
}

const ImportPatientUpload: React.FC<ImportPatientUploadProps> = ({
  onFileSelect,
  onFileRemove,
  files = [],
  error = false,
  errorMessage,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || disabled) return

    const fileArray = Array.from(selectedFiles)
    const validFiles: File[] = []
    
    fileArray.forEach(file => {
      // Check file size (16MB limit)
      if (file.size <= 16 * 1024 * 1024) {
        validFiles.push(file)
      } else {
        console.warn(`File ${file.name} is too large. Maximum size is 16MB`)
      }
    })

    if (validFiles.length > 0) {
      onFileSelect?.(validFiles)
    }
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Upload Area */}
      <Box
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: `1px dashed ${
            error 
              ? COLORS.ERROR
              : dragOver 
                ? COLORS.PRIMARY_50
                : COLORS.NEUTRAL_5
          }`,
          borderRadius: '4px',
          padding: '16px 24px',
          backgroundColor: COLORS.WHITE,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': !disabled ? {
            borderColor: COLORS.PRIMARY_50,
          } : {},
        }}
      >
        {/* Upload Icon */}
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '28px',
            backgroundColor: COLORS.PRIMARY_10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `6px solid ${COLORS.PRIMARY_1}`
          }}
        >
          <Download 
            sx={{ 
              fontSize: '20px', 
              color: COLORS.PRIMARY_50,
              transform: 'rotate(180deg)'
            }} 
          />
        </Box>

        {/* Upload Text */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography
              sx={{
                fontSize: TYPOGRAPHY.fontSize.body3.large,
                fontWeight: TYPOGRAPHY.fontWeight.medium,
                color: COLORS.NEUTRAL_80,
                fontFamily: TYPOGRAPHY.fontFamily.primary
              }}
            >
              Click to upload
            </Typography>
            <Typography
              sx={{
                fontSize: TYPOGRAPHY.fontSize.body3.medium,
                fontWeight: TYPOGRAPHY.fontWeight.regular,
                color: COLORS.NEUTRAL_50,
                fontFamily: TYPOGRAPHY.fontFamily.primary
              }}
            >
              or drag and drop
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* File Size Info */}
      <Typography
        sx={{
          fontSize: TYPOGRAPHY.fontSize.caption3.large,
          fontWeight: TYPOGRAPHY.fontWeight.regular,
          color: COLORS.NEUTRAL_50,
          textAlign: 'center',
          fontFamily: TYPOGRAPHY.fontFamily.primary
        }}
      >
        CSV (max. 16 MB)
      </Typography>

      {/* Error Message */}
      {error && errorMessage && (
        <Typography
          sx={{
            fontSize: TYPOGRAPHY.fontSize.caption3.large,
            fontWeight: TYPOGRAPHY.fontWeight.regular,
            color: COLORS.ERROR,
            textAlign: 'center',
            fontFamily: TYPOGRAPHY.fontFamily.primary
          }}
        >
          {errorMessage}
        </Typography>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {files.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                border: `1px solid ${COLORS.NEUTRAL_20}`,
                borderRadius: '4px',
                backgroundColor: COLORS.WHITE,
                marginBottom: '8px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: TYPOGRAPHY.fontSize.body3.medium,
                    fontWeight: TYPOGRAPHY.fontWeight.regular,
                    color: COLORS.NEUTRAL_80,
                    fontFamily: TYPOGRAPHY.fontFamily.primary
                  }}
                >
                  {file.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        multiple={false}
        onChange={(e) => handleFileSelect(e.target.files)}
        style={{ display: 'none' }}
        disabled={disabled}
      />
    </Box>
  )
}

export default ImportPatientUpload
