import { forwardRef, useState } from 'react'
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { COLORS } from '../../constants/colors'
import TYPOGRAPHY from '../../constants/typography'

export interface CustomDatePickerProps {
  label?: string
  placeholder?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  hasError?: boolean
  value?: Date | null
  onChange?: (date: Date | null) => void
  containerSx?: object
  disabled?: boolean
  required?: boolean
  minDate?: Date
  maxDate?: Date
}

const CustomDatePicker = forwardRef<HTMLDivElement, CustomDatePickerProps>(
  (
    {
      label,
      placeholder = 'MM/DD/YYYY',
      helperText,
      error = false,
      errorMessage,
      hasError = false,
      value,
      onChange,
      containerSx = {},
      disabled = false,
      required = false,
      minDate,
      maxDate,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const isError = hasError || error || !!errorMessage

    const formatDateToString = (date: Date | null): string => {
      if (!date) return ''
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    }

    const defaultSx = {
      '& .MuiOutlinedInput-root': {
        backgroundColor: `${COLORS.WHITE} !important`,
        borderRadius: '8px',
        height: '56px',
        fontSize: '16px',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        '& fieldset': {
          borderColor: isError ? COLORS.ERROR : COLORS.NEUTRAL_20, // #C9CBCC
          borderWidth: '1px',
        },
        '&:hover fieldset': {
          borderColor: isError ? COLORS.ERROR : COLORS.NEUTRAL_40, // #9B9E9F
        },
        '&.Mui-focused fieldset': {
          borderColor: isError ? COLORS.ERROR : COLORS.PRIMARY_70, // #00549E
          borderWidth: '1px',
        },
        '&.Mui-error fieldset': {
          borderColor: `${COLORS.ERROR} !important`,
        },
        '& .MuiOutlinedInput-input': {
          padding: '16px 14px',
          fontSize: '16px',
          color: COLORS.GRAY_700, // #374151
          backgroundColor: `${COLORS.WHITE} !important`,
          '&::placeholder': {
            color: COLORS.NEUTRAL_40, // #9B9E9F
            opacity: 1,
          },
        },
      },
      '& .MuiInputLabel-root': {
        color: isError ? COLORS.ERROR : COLORS.DEFAULT, // #6b7280
        fontFamily: TYPOGRAPHY.fontFamily.primary,
        '&.Mui-focused': {
          color: isError ? COLORS.ERROR : COLORS.PRIMARY_70,
        },
      },
      '& .MuiFormHelperText-root': {
        color: isError ? COLORS.ERROR : COLORS.DEFAULT, // #6b7280
        fontSize: '14px',
        fontFamily: TYPOGRAPHY.fontFamily.primary,
        marginTop: '6px',
        marginLeft: '0px',
        fontWeight: TYPOGRAPHY.fontWeight.regular,
      },
    }

    // Calendar popup styling
    const calendarSlotProps = {
      popper: {
        sx: {
          '& .MuiPaper-root': {
            borderRadius: '8px',
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '& .MuiPickersCalendarHeader-root': {
              padding: '16px 20px 8px',
              '& .MuiPickersCalendarHeader-label': {
                fontSize: '18px',
                fontWeight: TYPOGRAPHY.fontWeight.medium,
                fontFamily: TYPOGRAPHY.fontFamily.primary,
                color: COLORS.GRAY_900,
              },
              '& .MuiIconButton-root': {
                fontSize: '20px',
                color: COLORS.GRAY_700,
                '&:hover': {
                  backgroundColor: COLORS.GRAY_100,
                },
              },
            },
            '& .MuiDayCalendar-root': {
              padding: '8px 20px 20px',
              '& .MuiPickersDay-root': {
                fontSize: '16px',
                fontWeight: TYPOGRAPHY.fontWeight.regular,
                fontFamily: TYPOGRAPHY.fontFamily.primary,
                color: COLORS.GRAY_700,
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: COLORS.PRIMARY_10,
                },
                '&.Mui-selected': {
                  backgroundColor: COLORS.PRIMARY_70,
                  color: COLORS.WHITE,
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_80,
                  },
                },
                '&.MuiPickersDay-today': {
                  border: `1px solid ${COLORS.PRIMARY_70}`,
                  backgroundColor: 'transparent',
                  color: COLORS.PRIMARY_70,
                  fontWeight: TYPOGRAPHY.fontWeight.medium,
                },
              },
              '& .MuiDayCalendar-weekContainer': {
                '& .MuiDayCalendar-weekDayLabel': {
                  fontSize: '14px',
                  fontWeight: TYPOGRAPHY.fontWeight.medium,
                  fontFamily: TYPOGRAPHY.fontFamily.primary,
                  color: COLORS.GRAY_600,
                  width: '40px',
                  height: '32px',
                },
              },
            },
          },
        },
      },
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ ...containerSx }}>
          {label && (
            <Typography
              sx={{
                fontWeight: '500',
                color: '#374151',
                mb: 1.5,
                fontSize: '16px',
                lineHeight: 1.5,
                display: 'block',
                fontFamily: TYPOGRAPHY.fontFamily.primary,
              }}
            >
              {label}
              {required && (
                <Typography
                  component="span"
                  sx={{
                    color: '#CE0718',
                    ml: 0.25,
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: 1,
                    verticalAlign: 'top',
                  }}
                >
                  *
                </Typography>
              )}
            </Typography>
          )}

          <DatePicker
            enableAccessibleFieldDOMStructure={false}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={value}
            onChange={(newValue) => {
              onChange?.(newValue)
              setOpen(false)
            }}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            format="MM/dd/yyyy"
            slots={{
              textField: TextField
            }}
            slotProps={{
              ...calendarSlotProps,
              textField: {
                ref,
                fullWidth: true,
                placeholder: placeholder,
                error: isError,
                helperText: isError ? errorMessage : helperText,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setOpen(true)}
                        edge="end"
                        sx={{
                          color: COLORS.NEUTRAL_70,
                          padding: '4px',
                          '& .MuiSvgIcon-root': {
                            fontSize: '24px',
                          }
                        }}
                        aria-label="open calendar"
                      >
                        <CalendarToday />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                sx: defaultSx
              }
            }}
          />
        </Box>
      </LocalizationProvider>
    )
  }
)

CustomDatePicker.displayName = 'CustomDatePicker'
export default CustomDatePicker
