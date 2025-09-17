import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material'
import {
  KeyboardArrowDown,
  Search,
  Check,
  RadioButtonUnchecked,
  AccountCircle,
} from '@mui/icons-material'
import { COLORS } from '../../constants/colors'

export interface DropdownOption {
  value: string | number
  label: string
  icon?: React.ReactNode
  avatar?: string
  badge?: string
  disabled?: boolean
}

export interface CustomDropdownProps {
  label?: string
  placeholder?: string
  supportingText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'icon-leading' | 'search' | 'avatar-leading' | 'dot-leading'
  showBadge?: boolean
  showLeadingIcon?: boolean
  showTrailingIcon?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  options: DropdownOption[]
  value?: string | number
  onChange?: (value: string | number, option: DropdownOption) => void
  onSearch?: (searchTerm: string) => void
  searchPlaceholder?: string
  multiple?: boolean
  containerSx?: object
  labelSx?: object
  sx?: object
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  placeholder = 'Select an option',
  supportingText,
  error = false,
  errorMessage,
  disabled = false,
  required = false,
  size = 'medium',
  type = 'default',
  showBadge = false,
  showLeadingIcon = false,
  showTrailingIcon = true,
  leadingIcon,
  trailingIcon,
  options = [],
  value,
  onChange,
  onSearch,
  searchPlaceholder = 'Search...',
  multiple = false,
  containerSx = {},
  labelSx = {},
  sx = {},
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isOpen = Boolean(anchorEl)

  // Initialize selected values
  useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setSelectedValues(value)
    } else if (!multiple && value !== undefined) {
      setSelectedValues([value])
    }
  }, [value, multiple])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearchTerm('')
  }

  const handleOptionSelect = (option: DropdownOption) => {
    if (option.disabled) return

    if (multiple) {
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value]
      setSelectedValues(newValues)
      onChange?.(newValues, option)
    } else {
      setSelectedValues([option.value])
      onChange?.(option.value, option)
      handleClose()
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    setSearchTerm(searchValue)
    onSearch?.(searchValue)
  }

  const getSelectedOption = () => {
    if (multiple) {
      return options.filter(option => selectedValues.includes(option.value))
    }
    return options.find(option => option.value === selectedValues[0])
  }

  const getDisplayText = () => {
    if (multiple) {
      const selected = getSelectedOption() as DropdownOption[]
      if (selected.length === 0) return placeholder
      if (selected.length === 1) return selected[0].label
      return `${selected.length} items selected`
    }
    
    const selected = getSelectedOption() as DropdownOption | undefined
    return selected ? selected.label : placeholder
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: '40px',
          fontSize: '14px',
          padding: '8px 12px',
        }
      case 'large':
        return {
          height: '64px',
          fontSize: '18px',
          padding: '20px 16px',
        }
      default:
        return {
          height: '56px',
          fontSize: '16px',
          padding: '16px 14px',
        }
    }
  }

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return '20px'
      case 'large':
        return '28px'
      default:
        return '24px'
    }
  }

  const getDefaultLeadingIcon = () => {
    switch (type) {
      case 'icon-leading':
        return <AccountCircle sx={{ fontSize: getIconSize(), color: COLORS.GRAY_500 }} />
      case 'search':
        return <Search sx={{ fontSize: getIconSize(), color: COLORS.GRAY_500 }} />
      case 'avatar-leading':
        return <AccountCircle sx={{ fontSize: getIconSize(), color: COLORS.GRAY_500 }} />
      case 'dot-leading':
        return (
          <Box
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: COLORS.PRIMARY,
            }}
          />
        )
      default:
        return null
    }
  }

  const getDefaultTrailingIcon = () => {
    return (
      <KeyboardArrowDown
        sx={{
          fontSize: getIconSize(),
          color: disabled ? COLORS.GRAY_400 : COLORS.GRAY_500,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out',
        }}
      />
    )
  }

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sizeStyles = getSizeStyles()
  const displayText = getDisplayText()
  const selectedOption = getSelectedOption()
  const isError = error || !!errorMessage

  const defaultSx = {
    width: '100%',
    backgroundColor: disabled ? COLORS.GRAY_100 : COLORS.WHITE,
    border: `1px solid ${isError ? COLORS.ERROR : COLORS.GRAY_300}`,
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: isOpen ? '0px 0px 0px 4px rgba(0, 119, 198, 0.1)' : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&:hover': {
      borderColor: disabled ? COLORS.GRAY_300 : (isError ? COLORS.ERROR : COLORS.GRAY_400),
    },
    '&:focus-within': {
      borderColor: isError ? COLORS.ERROR : COLORS.PRIMARY,
      boxShadow: `0px 0px 0px 4px ${COLORS.PRIMARY_10}`,
    },
    ...sx,
  }

  return (
    <Box sx={{ mb: 2, ...containerSx }}>
      {label && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: '500',
            color: isError ? COLORS.ERROR : COLORS.GRAY_700,
            mb: 1.5,
            fontSize: '16px',
            lineHeight: 1.5,
            ...labelSx,
          }}
        >
          {label}
          {required && (
            <Typography component="span" sx={{ color: COLORS.ERROR, ml: 0.5 }}>
              *
            </Typography>
          )}
        </Typography>
      )}

      <Box
        ref={dropdownRef}
        sx={defaultSx}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick(e as any)
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: sizeStyles.height,
            padding: sizeStyles.padding,
            gap: 1,
          }}
        >
          {/* Leading Icon */}
          {(showLeadingIcon || leadingIcon) && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {leadingIcon || getDefaultLeadingIcon()}
            </Box>
          )}

          {/* Avatar for avatar-leading type */}
          {type === 'avatar-leading' && selectedOption && !Array.isArray(selectedOption) && (
            <Avatar
              src={selectedOption.avatar}
              sx={{
                width: '24px',
                height: '24px',
                fontSize: '12px',
              }}
            >
              {selectedOption.label.charAt(0)}
            </Avatar>
          )}

          {/* Display Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {multiple && selectedValues.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {getSelectedOption().slice(0, 2).map((option: DropdownOption) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    size="small"
                    sx={{
                      height: '24px',
                      fontSize: '12px',
                      backgroundColor: COLORS.PRIMARY_10,
                      color: COLORS.PRIMARY,
                    }}
                  />
                ))}
                {selectedValues.length > 2 && (
                  <Chip
                    label={`+${selectedValues.length - 2}`}
                    size="small"
                    sx={{
                      height: '24px',
                      fontSize: '12px',
                      backgroundColor: COLORS.GRAY_200,
                      color: COLORS.GRAY_600,
                    }}
                  />
                )}
              </Box>
            ) : (
              <Typography
                sx={{
                  fontSize: sizeStyles.fontSize,
                  color: disabled ? COLORS.GRAY_400 : (selectedValues.length > 0 ? COLORS.GRAY_900 : COLORS.GRAY_500),
                  fontWeight: selectedValues.length > 0 ? '400' : '400',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {displayText}
              </Typography>
            )}
          </Box>

          {/* Badge */}
          {showBadge && (
            <Chip
              label="New"
              size="small"
              sx={{
                height: '20px',
                fontSize: '10px',
                backgroundColor: COLORS.SECONDARY,
                color: COLORS.WHITE,
                fontWeight: '500',
              }}
            />
          )}

          {/* Trailing Icon */}
          {showTrailingIcon && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {trailingIcon || getDefaultTrailingIcon()}
            </Box>
          )}
        </Box>
      </Box>

      {/* Supporting Text or Error Message */}
      {(supportingText || errorMessage) && (
        <Typography
          sx={{
            fontSize: '14px',
            color: isError ? COLORS.ERROR : COLORS.GRAY_600,
            marginTop: '6px',
            fontWeight: '400',
          }}
        >
          {isError ? errorMessage : supportingText}
        </Typography>
      )}

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: dropdownRef.current?.offsetWidth || 200,
            maxHeight: '300px',
            borderRadius: '8px',
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: `1px solid ${COLORS.GRAY_200}`,
            mt: 1,
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {/* Search Input */}
        {type === 'search' && (
          <Box sx={{ p: 1, borderBottom: `1px solid ${COLORS.GRAY_200}` }}>
            <TextField
              fullWidth
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: '20px', color: COLORS.GRAY_500 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                  fontSize: '14px',
                  '& fieldset': {
                    borderColor: COLORS.GRAY_300,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.GRAY_400,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: COLORS.PRIMARY,
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Menu Items */}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              disabled={option.disabled}
              sx={{
                py: 1.5,
                px: 2,
                fontSize: '16px',
                color: option.disabled ? COLORS.GRAY_400 : COLORS.GRAY_900,
                '&:hover': {
                  backgroundColor: COLORS.PRIMARY_10,
                },
                '&.Mui-selected': {
                  backgroundColor: COLORS.PRIMARY_10,
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_20,
                  },
                },
              }}
            >
              {/* Selection Icon */}
              <ListItemIcon sx={{ minWidth: '32px' }}>
                {multiple ? (
                  selectedValues.includes(option.value) ? (
                    <Check sx={{ fontSize: '20px', color: COLORS.PRIMARY }} />
                  ) : (
                    <RadioButtonUnchecked sx={{ fontSize: '20px', color: COLORS.GRAY_400 }} />
                  )
                ) : (
                  selectedValues.includes(option.value) && (
                    <Check sx={{ fontSize: '20px', color: COLORS.PRIMARY }} />
                  )
                )}
              </ListItemIcon>

              {/* Avatar for avatar-leading type */}
              {type === 'avatar-leading' && (
                <Avatar
                  src={option.avatar}
                  sx={{
                    width: '24px',
                    height: '24px',
                    fontSize: '12px',
                    mr: 1,
                  }}
                >
                  {option.label.charAt(0)}
                </Avatar>
              )}

              {/* Option Icon */}
              {option.icon && (
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  {option.icon}
                </ListItemIcon>
              )}

              {/* Option Text */}
              <ListItemText
                primary={option.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '16px',
                    fontWeight: '400',
                  },
                }}
              />

              {/* Badge */}
              {option.badge && (
                <Chip
                  label={option.badge}
                  size="small"
                  sx={{
                    height: '20px',
                    fontSize: '10px',
                    backgroundColor: COLORS.SECONDARY,
                    color: COLORS.WHITE,
                    fontWeight: '500',
                  }}
                />
              )}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled sx={{ py: 2, px: 2, textAlign: 'center' }}>
            <Typography sx={{ color: COLORS.GRAY_500, fontSize: '14px' }}>
              No options found
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}

export default CustomDropdown
