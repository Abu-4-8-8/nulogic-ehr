import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography
} from '@mui/material'
import { COLORS } from '../../constants/colors'
import CustomButton from '../custom-fields/CustomButton'

export type ModalType = 'alert' | 'confirmation' | 'custom'

export interface CommonModalProps {
  // Modal state
  open: boolean
  onClose: () => void
  
  // Modal type
  type?: ModalType
  
  // Content props
  title?: string
  paragraph?: string
  htmlContent?: React.ReactNode // Support for HTML/JSX content
  image?: React.ReactNode
  
  // Button props
  buttons?: Array<{
    label: string
    variant?: 'contained' | 'outlined' | 'text'
    customColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
    onClick: () => void
    loading?: boolean
    disabled?: boolean
  }>
  
  // Quick setup for common modal types
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  
  // Modal configuration
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disableBackdropClick?: boolean
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  onClose,
  type = 'custom',
  title,
  paragraph,
  htmlContent,
  image,
  buttons = [],
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  maxWidth = 'xs',
  disableBackdropClick = false
}) => {
  const handleClose = (_event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClick && reason === 'backdropClick') return
    onClose()
  }

  // Generate buttons based on modal type
  const getModalButtons = () => {
    if (buttons.length > 0) {
      return buttons // Use custom buttons if provided
    }

    switch (type) {
      case 'alert':
        return [
          {
            label: 'OK',
            variant: 'contained' as const,
            customColor: 'primary' as const,
            onClick: onClose
          }
        ]
      
      case 'confirmation':
        return [
          {
            label: cancelText,
            variant: 'outlined' as const,
            customColor: 'secondary' as const,
            onClick: onCancel || onClose
          },
          {
            label: confirmText,
            variant: 'contained' as const,
            customColor: 'primary' as const,
            onClick: onConfirm || onClose
          }
        ]
      
      default:
        return []
    }
  }

  const modalButtons = getModalButtons()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          borderRadius: '8px',
          width: maxWidth === 'md' ? '590px' : '385px',
          height: maxWidth === 'md' ? '415px' : 'auto',
          backgroundColor: COLORS.WHITE,
          boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
          display: maxWidth === 'md' ? 'flex' : 'block',
          flexDirection: maxWidth === 'md' ? 'column' : 'row'
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      {/* Content */}
      <DialogContent
        sx={{
          padding: maxWidth === 'md' ? '0' : '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: maxWidth === 'md' ? '0' : '24px',
          flex: maxWidth === 'md' ? 1 : 'none',
          overflow: maxWidth === 'md' ? 'hidden' : 'visible'
        }}
      >
        {/* Render HTML Content directly for custom modals, or standard layout for others */}
        {maxWidth === 'md' && htmlContent ? (
          // Custom modal layout (like surgical history form)
          htmlContent
        ) : (
          // Standard modal layout
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* Image */}
            {image && (
              <Box
                sx={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {image}
              </Box>
            )}

            {/* Text Content */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: paragraph ? '16px' : '0px',
                width: '100%'
              }}
            >
              {/* Title */}
              {title && (
                <Typography
                  sx={{
                    fontFamily: 'Figtree',
                    fontWeight: 600,
                    fontSize: paragraph ? '16px' : '14px',
                    lineHeight: '1.2em',
                    textAlign: 'center',
                    color: COLORS.NEUTRAL_80,
                    width: '100%'
                  }}
                >
                  {title}
                </Typography>
              )}

              {/* Paragraph */}
              {paragraph && (
                <Typography
                  sx={{
                    fontFamily: 'Figtree',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '1.2em',
                    textAlign: 'center',
                    color: COLORS.NEUTRAL_70,
                    width: '100%'
                  }}
                >
                  {paragraph}
                </Typography>
              )}

              {/* HTML Content */}
              {htmlContent && (
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    '& *': {
                      fontFamily: 'Figtree',
                      color: COLORS.NEUTRAL_70
                    },
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                      color: COLORS.NEUTRAL_80,
                      fontWeight: 600,
                      margin: '8px 0'
                    },
                    '& p': {
                      fontSize: '14px',
                      lineHeight: '1.2em',
                      margin: '8px 0'
                    },
                    '& ul, & ol': {
                      textAlign: 'left',
                      paddingLeft: '20px'
                    },
                    '& li': {
                      fontSize: '14px',
                      lineHeight: '1.4em',
                      margin: '4px 0'
                    }
                  }}
                >
                  {htmlContent}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      {/* Actions - Hide for custom modals with HTML content */}
      {modalButtons.length > 0 && !(maxWidth === 'md' && htmlContent) && (
        <DialogActions
          sx={{
            padding: '0 32px 24px 32px',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          {modalButtons.map((button, index) => (
            <CustomButton
              key={index}
              label={button.label}
              variant={button.variant || 'contained'}
              customColor={button.customColor || 'primary'}
              size="large"
              fullWidth={modalButtons.length === 1}
              onClick={button.onClick}
              loading={button.loading}
              disabled={button.disabled}
              sx={{
                flex: modalButtons.length > 1 ? 1 : undefined,
                height: '44px',
                padding: '10px 18px',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '1.25em',
                borderRadius: '4px',
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
              }}
            />
          ))}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default CommonModal;