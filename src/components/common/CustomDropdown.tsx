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
  value?: string | number | (string | number)[]
  onChange?: (value: string | number | (string | number)[], option: DropdownOption) => void
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

  // Initialize selected values when `value` changes
  useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setSelectedValues(value)
    } else if (!multiple && value !== undefined) {
      setSelectedValues([value])
    } else {
      setSelectedValues([])
    }
  }, [value, multiple])

  // Helpers
  const getSelectedOptions = (): DropdownOption[] => {
    return options.filter(opt => selectedValues.includes(opt.value))
  }

  const isSelected = (val: string | number) => selectedValues.includes(val)

  const displayText = (() => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder
      if (selectedValues.length === 1) return getSelectedOptions()[0]?.label
      return `${selectedValues.length} items selected`
    }
    return getSelectedOptions()[0]?.label || placeholder
  })()

  // Event Handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearchTerm('')
  }

  const handleOptionSelect = (option: DropdownOption) => {
    if (option.disabled) return

    if (multiple) {
      const newValues = isSelected(option.value)
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

  // UI Helpers
  const getSizeStyles = () => {
    switch (size) {
      case 'small': return { height: '40px', fontSize: '14px', padding: '8px 12px' }
      case 'large': return { height: '64px', fontSize: '18px', padding: '20px 16px' }
      default: return { height: '56px', fontSize: '16px', padding: '16px 14px' }
    }
  }

  const getIconSize = () => (size === 'small' ? '20px' : size === 'large' ? '28px' : '24px')

  const getDefaultLeadingIcon = () => {
    switch (type) {
      case 'icon-leading': return <AccountCircle sx={{ fontSize: getIconSize(), color: COLORS.GRAY_500 }} />
      case 'search': return <Search sx={{ fontSize: getIconSize(), color: COLORS.GRAY_500 }} />
      case 'avatar-leading': return <AccountCircle sx={{ fontSize: getIconSize(), color: COLORS.GRAY_500 }} />
      case 'dot-leading': return <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.PRIMARY }} />
      default: return null
    }
  }

  const getDefaultTrailingIcon = () => (
    <KeyboardArrowDown
      sx={{
        fontSize: getIconSize(),
        color: disabled ? COLORS.GRAY_400 : COLORS.GRAY_500,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease-in-out',
      }}
    />
  )

  // Filtered Options
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sizeStyles = getSizeStyles()
  const isError = error || !!errorMessage

  const defaultSx = {
    width: '100%',
    backgroundColor: disabled ? COLORS.GRAY_100 : COLORS.WHITE,
    border: `1px solid ${isError ? COLORS.ERROR : COLORS.GRAY_300}`,
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: isOpen
      ? '0px 0px 0px 4px rgba(0, 119, 198, 0.1)'
      : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
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
      {/* Label */}
      {label && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: isError ? COLORS.ERROR : COLORS.GRAY_700,
            mb: 1.5,
            fontSize: 16,
            lineHeight: 1.5,
            ...labelSx,
          }}
        >
          {label}{required && <Typography component="span" sx={{ color: COLORS.ERROR, ml: 0.5 }}>*</Typography>}
        </Typography>
      )}

      {/* Main Box */}
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
        <Box sx={{ display: 'flex', alignItems: 'center', height: sizeStyles.height, padding: sizeStyles.padding, gap: 1 }}>
          {/* Leading Icon */}
          {(showLeadingIcon || leadingIcon) && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {leadingIcon || getDefaultLeadingIcon()}
            </Box>
          )}

          {/* Avatar for avatar-leading */}
          {type === 'avatar-leading' && !multiple && getSelectedOptions()[0]?.avatar && (
            <Avatar src={getSelectedOptions()[0].avatar} sx={{ width: 24, height: 24, fontSize: 12 }}>
              {getSelectedOptions()[0].label.charAt(0)}
            </Avatar>
          )}

          {/* Display */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {multiple && selectedValues.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {getSelectedOptions().slice(0, 2).map(opt => (
                  <Chip
                    key={opt.value}
                    label={opt.label}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: 12,
                      backgroundColor: COLORS.PRIMARY_10,
                      color: COLORS.PRIMARY,
                    }}
                  />
                ))}
                {selectedValues.length > 2 && (
                  <Chip
                    label={`+${selectedValues.length - 2}`}
                    size="small"
                    sx={{ height: 24, fontSize: 12, backgroundColor: COLORS.GRAY_200, color: COLORS.GRAY_600 }}
                  />
                )}
              </Box>
            ) : (
              <Typography
                sx={{
                  fontSize: sizeStyles.fontSize,
                  color: disabled ? COLORS.GRAY_400 : (selectedValues.length > 0 ? COLORS.GRAY_900 : COLORS.GRAY_500),
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
              sx={{ height: 20, fontSize: 10, backgroundColor: COLORS.SECONDARY, color: COLORS.WHITE, fontWeight: 500 }}
            />
          )}

          {/* Trailing Icon */}
          {showTrailingIcon && <Box sx={{ display: 'flex', alignItems: 'center' }}>{trailingIcon || getDefaultTrailingIcon()}</Box>}
        </Box>
      </Box>

      {/* Supporting / Error Text */}
      {(supportingText || errorMessage) && (
        <Typography sx={{ fontSize: 14, color: isError ? COLORS.ERROR : COLORS.GRAY_600, mt: '6px', fontWeight: 400 }}>
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
            maxHeight: 300,
            borderRadius: 2,
            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
            border: `1px solid ${COLORS.GRAY_200}`,
            mt: 1,
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {/* Search */}
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
                    <Search sx={{ fontSize: 20, color: COLORS.GRAY_500 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  fontSize: 14,
                  '& fieldset': { borderColor: COLORS.GRAY_300 },
                  '&:hover fieldset': { borderColor: COLORS.GRAY_400 },
                  '&.Mui-focused fieldset': { borderColor: COLORS.PRIMARY },
                },
              }}
            />
          </Box>
        )}

        {/* Options */}
        {filteredOptions.length > 0 ? (
          filteredOptions.map(option => (
            <MenuItem
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              disabled={option.disabled}
              sx={{
                py: 1.5,
                px: 2,
                fontSize: 16,
                color: option.disabled ? COLORS.GRAY_400 : COLORS.GRAY_900,
                '&:hover': { backgroundColor: COLORS.PRIMARY_10 },
                '&.Mui-selected': {
                  backgroundColor: COLORS.PRIMARY_10,
                  '&:hover': { backgroundColor: COLORS.PRIMARY_20 },
                },
              }}
            >
              {/* Selection Icon */}
              <ListItemIcon sx={{ minWidth: 32 }}>
                {multiple ? (
                  isSelected(option.value) ? (
                    <Check sx={{ fontSize: 20, color: COLORS.PRIMARY }} />
                  ) : (
                    <RadioButtonUnchecked sx={{ fontSize: 20, color: COLORS.GRAY_400 }} />
                  )
                ) : (
                  isSelected(option.value) && <Check sx={{ fontSize: 20, color: COLORS.PRIMARY }} />
                )}
              </ListItemIcon>

              {/* Avatar */}
              {type === 'avatar-leading' && (
                <Avatar src={option.avatar} sx={{ width: 24, height: 24, fontSize: 12, mr: 1 }}>
                  {option.label.charAt(0)}
                </Avatar>
              )}

              {/* Option Icon */}
              {option.icon && <ListItemIcon sx={{ minWidth: 32 }}>{option.icon}</ListItemIcon>}

              {/* Text */}
              <ListItemText primary={option.label} sx={{ '& .MuiListItemText-primary': { fontSize: 16, fontWeight: 400 } }} />

              {/* Badge */}
              {option.badge && (
                <Chip
                  label={option.badge}
                  size="small"
                  sx={{ height: 20, fontSize: 10, backgroundColor: COLORS.SECONDARY, color: COLORS.WHITE, fontWeight: 500 }}
                />
              )}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled sx={{ py: 2, px: 2, textAlign: 'center' }}>
            <Typography sx={{ color: COLORS.GRAY_500, fontSize: 14 }}>No options found</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}

export default CustomDropdown
