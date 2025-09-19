import React, { useRef, useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { CloudUpload, Delete, InsertDriveFile } from '@mui/icons-material'
import { COLORS } from '../../constants/colors'

interface CustomUploadProps {
  label?: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  onFileSelect?: (files: File[]) => void
  onFileRemove?: (index: number) => void
  files?: File[]
  placeholder?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  containerSx?: object
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  label,
  accept = "*/*",
  multiple = false,
  maxSize = 10,
  onFileSelect,
  onFileRemove,
  files = [],
  placeholder = "Click to upload or drag and drop files here",
  error = false,
  errorMessage,
  disabled = false,
  containerSx = {}
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || disabled) return

    const fileArray = Array.from(selectedFiles)
    const validFiles: File[] = []
    
    fileArray.forEach(file => {
      // Check file size
      if (file.size <= maxSize * 1024 * 1024) {
        validFiles.push(file)
      } else {
        console.warn(`File ${file.name} is too large. Maximum size is ${maxSize}MB`)
      }
    })

    if (validFiles.length > 0) {
      onFileSelect?.(multiple ? [...files, ...validFiles] : validFiles)
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const removeFile = (index: number) => {
    if (!disabled) {
      onFileRemove?.(index)
    }
  }

  return (
    <Box sx={{ ...containerSx }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: '500',
            color: error ? COLORS.ERROR || '#d32f2f' : COLORS.GRAY_700,
            mb: 1,
            fontSize: '14px',
          }}
        >
          {label}
        </Typography>
      )}

      {/* Upload Area */}
      <Box
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${
            error 
              ? COLORS.ERROR || '#d32f2f'
              : dragOver 
                ? COLORS.PRIMARY 
                : COLORS.GRAY_300
          }`,
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: dragOver 
            ? `${COLORS.PRIMARY}08` 
            : disabled 
              ? COLORS.GRAY_100 
              : '#fafafa',
          transition: 'all 0.2s ease-in-out',
          '&:hover': !disabled ? {
            borderColor: COLORS.PRIMARY,
            backgroundColor: `${COLORS.PRIMARY}05`,
          } : {},
        }}
      >
        <CloudUpload
          sx={{
            fontSize: 48,
            color: disabled 
              ? COLORS.GRAY_400 
              : error 
                ? COLORS.ERROR || '#d32f2f'
                : COLORS.GRAY_500,
            mb: 1,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: disabled 
              ? COLORS.GRAY_400 
              : error 
                ? COLORS.ERROR || '#d32f2f'
                : COLORS.GRAY_600,
            mb: 1,
          }}
        >
          {placeholder}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: COLORS.GRAY_500,
            fontSize: '12px',
          }}
        >
          Maximum file size: {maxSize}MB
        </Typography>
      </Box>

      {/* Error Message */}
      {error && errorMessage && (
        <Typography
          variant="caption"
          sx={{
            color: COLORS.ERROR || '#d32f2f',
            fontSize: '12px',
            mt: 0.5,
            display: 'block',
          }}
        >
          {errorMessage}
        </Typography>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                border: `1px solid ${COLORS.GRAY_300}`,
                borderRadius: '6px',
                mb: 1,
                backgroundColor: '#fff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <InsertDriveFile
                  sx={{
                    color: COLORS.PRIMARY,
                    mr: 1,
                    fontSize: 20,
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: COLORS.GRAY_900,
                    }}
                  >
                    {file.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '12px',
                      color: COLORS.GRAY_500,
                    }}
                  >
                    {formatFileSize(file.size)}
                  </Typography>
                </Box>
              </Box>
              
              {!disabled && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  size="small"
                  sx={{
                    color: COLORS.ERROR || '#d32f2f',
                    '&:hover': {
                      backgroundColor: `${COLORS.ERROR || '#d32f2f'}10`,
                    },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        style={{ display: 'none' }}
        disabled={disabled}
      />
    </Box>
  )
}

export default CustomUpload
