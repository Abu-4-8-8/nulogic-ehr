import React, { useState } from 'react'
import { Box, Typography, IconButton, TextField } from '@mui/material'
import { Close } from '@mui/icons-material'
import CustomDialog from '../widgets/CustomDialog'
import CustomButton from '../custom-fields/CustomButton'
import { COLORS } from '../../constants/colors'
import { TYPOGRAPHY } from '../../constants/typography'

interface AddNoteDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (note: string) => void
  title: string
  initialNote?: string
  fieldName: string
}

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  initialNote = '',
  fieldName
}) => {
  const [note, setNote] = useState(initialNote)

  const handleSubmit = () => {
    onSubmit(note)
    setNote('')
    onClose()
  }

  const handleClose = () => {
    setNote('')
    onClose()
  }

  const dialogContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: COLORS.WHITE,
        borderRadius: '8px',
      }}
    >
      {/* Header with title and close button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 16px 12px 16px',
          gap: '10px',
        }}
      >
        <Typography
          sx={{
            fontFamily: TYPOGRAPHY.fontFamily.primary,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            fontSize: '18px',
            lineHeight: '1.21em',
            color: COLORS.NEUTRAL_90,
            flex: 1,
          }}
        >
          {title}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            width: '20px',
            height: '20px',
            padding: 0,
            color: COLORS.NEUTRAL_80,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <Close sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>

      {/* Content area */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '34px',
          padding: '8px 16px 16px',
        }}
      >
        {/* Note input section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamily.primary,
                  fontWeight: TYPOGRAPHY.fontWeight.medium,
                  fontSize: '16px',
                  lineHeight: '1.21em',
                  color: COLORS.NEUTRAL_80,
                }}
              >
                Note
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type here"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontFamily: TYPOGRAPHY.fontFamily.primary,
                    backgroundColor: COLORS.WHITE,
                    boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.16)',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '8px',
                      color: COLORS.NEUTRAL_90,
                      '&::placeholder': {
                        color: COLORS.NEUTRAL_50,
                        fontFamily: TYPOGRAPHY.fontFamily.primary,
                        fontWeight: TYPOGRAPHY.fontWeight.regular,
                        fontSize: '14px',
                        lineHeight: '1.21em',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Action buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
        }}
      >
        <CustomButton
          variant="outlined"
          onClick={handleClose}
          sx={{
            minWidth: '80px',
            height: '40px',
            borderColor: COLORS.PRIMARY_50,
            color: COLORS.PRIMARY_50,
            backgroundColor: COLORS.PRIMARY_1,
            fontFamily: TYPOGRAPHY.fontFamily.primary,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            fontSize: '14px',
            lineHeight: '1.25em',
            borderRadius: '4px',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              borderColor: COLORS.PRIMARY_50,
              backgroundColor: COLORS.PRIMARY_1,
            },
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant="contained"
          onClick={handleSubmit}
          sx={{
            minWidth: '80px',
            height: '40px',
            backgroundColor: COLORS.PRIMARY_50,
            color: COLORS.WHITE,
            fontFamily: TYPOGRAPHY.fontFamily.primary,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            fontSize: '14px',
            lineHeight: '1.25em',
            borderRadius: '4px',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              backgroundColor: COLORS.PRIMARY_60,
            },
          }}
        >
          Add Note
        </CustomButton>
      </Box>
    </Box>
  )

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      type="custom"
      maxWidth="sm"
      htmlContent={dialogContent}
      disableBackdropClick={false}
    />
  )
}

export default AddNoteDialog
