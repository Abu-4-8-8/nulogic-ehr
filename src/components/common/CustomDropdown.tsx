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
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  OutlinedInput,
  InputLabel,
  Divider,
  useTheme,
  alpha,
} from '@mui/material'
import {
  KeyboardArrowDown,
  Search,
  Check,
  RadioButtonUnchecked,
  AccountCircle,
  ExpandMore,
} from '@mui/icons-material'
import { COLORS } from '../../constants/colors'

export interface DropdownOption {
  value: string | number
  label: string
  icon?: React.ReactNode
  avatar?: string
  badge?: string
  disabled?: boolean
  divider?: boolean // Add divider after this option
  group?: string // Group label for option grouping
}

export interface CustomDropdownProps {
  // Basic Props
  label?: string
  placeholder?: string
  supportingText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  
  // Size and Variants
  size?: 'small' | 'medium' | 'large'
  variant?: 'outlined' | 'filled' | 'standard'
  
  // Types and Features
  type?: 'default' | 'icon-leading' | 'search' | 'avatar-leading' | 'dot-leading' | 'native-select'
  showBadge?: boolean
  showLeadingIcon?: boolean
  showTrailingIcon?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  
  // Options and Selection
  options: DropdownOption[]
  value?: string | number | (string | number)[]
  onChange?: (value: string | number | (string | number)[], option: DropdownOption) => void
  onSearch?: (searchTerm: string) => void
  searchPlaceholder?: string
  multiple?: boolean
  
  // Advanced Features
  groupBy?: boolean // Enable option grouping
  virtualized?: boolean // For large lists
  clearable?: boolean // Add clear button
  loading?: boolean // Show loading state
  loadingText?: string
  noOptionsText?: string
  
  // Styling
  containerSx?: object
  labelSx?: object
  sx?: object
  menuProps?: object
  
  // Material-UI Integration
  fullWidth?: boolean
  margin?: 'none' | 'dense' | 'normal'
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  // Basic Props
  label,
  placeholder = 'Select an option',
  supportingText,
  error = false,
  errorMessage,
  disabled = false,
  required = false,
  
  // Size and Variants
  size = 'medium',
  variant = 'outlined',
  
  // Types and Features
  type = 'default',
  showBadge = false,
  showLeadingIcon = false,
  showTrailingIcon = true,
  leadingIcon,
  trailingIcon,
  
  // Options and Selection
  options = [],
  value,
  onChange,
  onSearch,
  searchPlaceholder = 'Search...',
  multiple = false,
  
  // Advanced Features
  groupBy = false,
  virtualized = false,
  clearable = false,
  loading = false,
  loadingText = 'Loading...',
  noOptionsText = 'No options found',
  
  // Styling
  containerSx = {},
  labelSx = {},
  sx = {},
  menuProps = {},
  
  // Material-UI Integration
  fullWidth = true,
  margin = 'normal',
  color = 'primary',
}) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isOpen = Boolean(anchorEl)

  // Initialize selected values when `value` changes
  useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setSelectedValues(value)
    } else if (!multiple && value !== undefined && !Array.isArray(value)) {
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

  const handleClear = () => {
    setSelectedValues([])
    onChange?.(multiple ? [] : '', options[0])
  }

  // UI Helpers
  const getSizeStyles = () => {
    switch (size) {
      case 'small': return { 
        height: '40px', 
        fontSize: '14px', 
        padding: '8px 12px',
        iconSize: '20px'
      }
      case 'large': return { 
        height: '64px', 
        fontSize: '18px', 
        padding: '20px 16px',
        iconSize: '28px'
      }
      default: return { 
        height: '56px', 
        fontSize: '16px', 
        padding: '16px 14px',
        iconSize: '24px'
      }
    }
  }

  const getIconSize = () => getSizeStyles().iconSize

  const getDefaultLeadingIcon = () => {
    switch (type) {
      case 'icon-leading': return <AccountCircle sx={{ fontSize: getIconSize(), color: theme.palette.text.secondary }} />
      case 'search': return <Search sx={{ fontSize: getIconSize(), color: theme.palette.text.secondary }} />
      case 'avatar-leading': return <AccountCircle sx={{ fontSize: getIconSize(), color: theme.palette.text.secondary }} />
      case 'dot-leading': return <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.palette.primary.main }} />
      default: return null
    }
  }

  const getDefaultTrailingIcon = () => (
    <ExpandMore
      sx={{
        fontSize: getIconSize(),
        color: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    />
  )

  // Group options if groupBy is enabled
  const groupedOptions = groupBy 
    ? options.reduce((groups, option) => {
        const group = option.group || 'Other'
        if (!groups[group]) groups[group] = []
        groups[group].push(option)
        return groups
      }, {} as Record<string, DropdownOption[]>)
    : { '': options }

  // Filtered Options
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sizeStyles = getSizeStyles()
  const isError = error || !!errorMessage

  // Enhanced Material-UI styling with theme integration
  const getVariantStyles = () => {
    const baseStyles = {
      width: '100%',
      backgroundColor: disabled ? alpha(theme.palette.action.disabled, 0.12) : theme.palette.background.paper,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: theme.transitions.create(['border-color', 'box-shadow'], {
        duration: theme.transitions.duration.shorter,
      }),
    }

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: disabled 
            ? alpha(theme.palette.action.disabled, 0.12)
            : alpha(theme.palette.text.primary, 0.06),
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
          border: 'none',
          borderBottom: `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`,
          '&:hover': {
            backgroundColor: disabled 
              ? alpha(theme.palette.action.disabled, 0.12)
              : alpha(theme.palette.text.primary, 0.09),
          },
          '&:focus-within': {
            borderBottomColor: isError ? theme.palette.error.main : theme.palette.primary.main,
            borderBottomWidth: '2px',
          },
        }
      case 'standard':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`,
          borderRadius: 0,
          '&:hover': {
            borderBottomColor: disabled 
              ? theme.palette.divider 
              : (isError ? theme.palette.error.main : theme.palette.text.primary),
          },
          '&:focus-within': {
            borderBottomColor: isError ? theme.palette.error.main : theme.palette.primary.main,
            borderBottomWidth: '2px',
          },
        }
      default: // outlined
        return {
          ...baseStyles,
          border: `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          boxShadow: isOpen
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
            : 'none',
          '&:hover': {
            borderColor: disabled 
              ? theme.palette.divider 
              : (isError ? theme.palette.error.main : theme.palette.text.primary),
          },
          '&:focus-within': {
            borderColor: isError ? theme.palette.error.main : theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${alpha(isError ? theme.palette.error.main : theme.palette.primary.main, 0.2)}`,
          },
        }
    }
  }

  // Native Select for better performance with large datasets
  if (type === 'native-select') {
    return (
      <FormControl 
        fullWidth={fullWidth}
        margin={margin}
        error={isError}
        disabled={disabled}
        required={required}
        sx={containerSx}
      >
        {label && (
          <InputLabel sx={labelSx}>
            {label}
          </InputLabel>
        )}
        <Select
          native
          value={selectedValues[0] || ''}
          onChange={(e) => {
            const selectedOption = options.find(opt => opt.value === e.target.value)
            if (selectedOption) {
              handleOptionSelect(selectedOption)
            }
          }}
          input={<OutlinedInput label={label} />}
          sx={sx}
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </Select>
        {(supportingText || errorMessage) && (
          <FormHelperText>
            {isError ? errorMessage : supportingText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }

  return (
    <FormControl 
      fullWidth={fullWidth}
      margin={margin}
      error={isError}
      disabled={disabled}
      required={required}
      sx={containerSx}
    >
      {/* Label */}
      {label && (
        <FormLabel
          sx={{
            fontWeight: 500,
            color: isError ? theme.palette.error.main : theme.palette.text.primary,
            mb: 1,
            fontSize: 16,
            lineHeight: 1.5,
            ...labelSx,
          }}
        >
          {label}
          {required && (
            <Typography component="span" sx={{ color: theme.palette.error.main, ml: 0.5 }}>
              *
            </Typography>
          )}
        </FormLabel>
      )}

      {/* Main Dropdown Box */}
      <Box
        ref={dropdownRef}
        sx={{
          ...getVariantStyles(),
          ...sx,
        }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label || placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick(e as any)
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          height: sizeStyles.height, 
          padding: sizeStyles.padding, 
          gap: 1 
        }}>
          {/* Leading Icon */}
          {(showLeadingIcon || leadingIcon) && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {leadingIcon || getDefaultLeadingIcon()}
            </Box>
          )}

          {/* Avatar for avatar-leading */}
          {type === 'avatar-leading' && !multiple && getSelectedOptions()[0]?.avatar && (
            <Avatar 
              src={getSelectedOptions()[0].avatar} 
              sx={{ 
                width: parseInt(getIconSize()), 
                height: parseInt(getIconSize()), 
                fontSize: parseInt(getIconSize()) / 2 
              }}
            >
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
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }}
                  />
                ))}
                {selectedValues.length > 2 && (
                  <Chip
                    label={`+${selectedValues.length - 2}`}
                    size="small"
                    sx={{ 
                      height: 24, 
                      fontSize: 12, 
                      backgroundColor: alpha(theme.palette.text.primary, 0.1), 
                      color: theme.palette.text.secondary 
                    }}
                  />
                )}
              </Box>
            ) : (
              <Typography
                sx={{
                  fontSize: sizeStyles.fontSize,
                  color: disabled 
                    ? theme.palette.text.disabled 
                    : (selectedValues.length > 0 ? theme.palette.text.primary : theme.palette.text.secondary),
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {loading ? loadingText : displayText}
              </Typography>
            )}
          </Box>

          {/* Badge */}
          {showBadge && (
            <Chip
              label="New"
              size="small"
              sx={{ 
                height: 20, 
                fontSize: 10, 
                backgroundColor: theme.palette.secondary.main, 
                color: theme.palette.secondary.contrastText, 
                fontWeight: 500 
              }}
            />
          )}

          {/* Clear Button */}
          {clearable && selectedValues.length > 0 && !disabled && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              sx={{ p: 0.5 }}
            >
              <Search sx={{ fontSize: '16px' }} />
            </IconButton>
          )}

          {/* Trailing Icon */}
          {showTrailingIcon && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {trailingIcon || getDefaultTrailingIcon()}
            </Box>
          )}
        </Box>
      </Box>

      {/* Supporting / Error Text */}
      {(supportingText || errorMessage) && (
        <FormHelperText sx={{ mt: 1 }}>
          {isError ? errorMessage : supportingText}
        </FormHelperText>
      )}

      {/* Enhanced Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: dropdownRef.current?.offsetWidth || 200,
            maxHeight: virtualized ? 400 : 300,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[8],
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            mt: 0.5,
            ...menuProps,
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        MenuListProps={{
          sx: {
            padding: 0,
          }
        }}
      >
        {/* Search */}
        {type === 'search' && (
          <Box sx={{ 
            padding: theme.spacing(1), 
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <TextField
              fullWidth
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  fontSize: '14px',
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.text.secondary },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
              }}
            />
          </Box>
        )}

        {/* Options */}
        {loading ? (
          <MenuItem disabled sx={{ justifyContent: 'center', py: 2 }}>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              {loadingText}
            </Typography>
          </MenuItem>
        ) : filteredOptions.length > 0 ? (
          groupBy ? (
            Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
              <Box key={groupName}>
                {groupName && (
                  <Typography
                    sx={{
                      px: 2,
                      py: 1,
                      fontSize: '12px',
                      fontWeight: 600,
                      color: theme.palette.text.secondary,
                      backgroundColor: alpha(theme.palette.text.primary, 0.04),
                    }}
                  >
                    {groupName}
                  </Typography>
                )}
                {groupOptions.map((option, index) => (
                  <Box key={option.value}>
                    <MenuItem
                      onClick={() => handleOptionSelect(option)}
                      disabled={option.disabled}
                      selected={isSelected(option.value)}
                      sx={{
                        py: 1.5,
                        px: 2,
                        fontSize: '14px',
                        fontFamily: 'Figtree',
                        color: option.disabled 
                          ? theme.palette.text.disabled 
                          : (option.value === 'logout' ? '#B1000F' : theme.palette.text.primary),
                        '&:hover': { 
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        },
                        '&.Mui-selected': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          '&:hover': { 
                            backgroundColor: alpha(theme.palette.primary.main, 0.16),
                          },
                        },
                      }}
                    >
                      {/* Selection Icon */}
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {multiple ? (
                          isSelected(option.value) ? (
                            <Check sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                          ) : (
                            <RadioButtonUnchecked sx={{ fontSize: 20, color: theme.palette.text.disabled }} />
                          )
                        ) : (
                          isSelected(option.value) && <Check sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                        )}
                      </ListItemIcon>

                      {/* Avatar */}
                      {type === 'avatar-leading' && option.avatar && (
                        <Avatar 
                          src={option.avatar} 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            fontSize: 12, 
                            mr: 1 
                          }}
                        >
                          {option.label.charAt(0)}
                        </Avatar>
                      )}

                      {/* Option Icon */}
                      {option.icon && (
                        <ListItemIcon sx={{ 
                          minWidth: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}>
                          {option.icon}
                        </ListItemIcon>
                      )}

                      {/* Text */}
                      <ListItemText 
                        primary={option.label} 
                        sx={{ 
                          '& .MuiListItemText-primary': { 
                            fontSize: '14px',
                            fontFamily: 'Figtree',
                            fontWeight: 400,
                            lineHeight: '1.2em',
                            color: option.value === 'logout' ? '#B1000F' : theme.palette.text.primary,
                          } 
                        }} 
                      />

                      {/* Badge */}
                      {option.badge && (
                        <Chip
                          label={option.badge}
                          size="small"
                          sx={{ 
                            height: 20, 
                            fontSize: 10, 
                            backgroundColor: theme.palette.secondary.main, 
                            color: theme.palette.secondary.contrastText, 
                            fontWeight: 500 
                          }}
                        />
                      )}
                    </MenuItem>
                    {option.divider && <Divider />}
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            filteredOptions.map(option => (
              <Box key={option.value}>
                <MenuItem
                  onClick={() => handleOptionSelect(option)}
                  disabled={option.disabled}
                  selected={isSelected(option.value)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    fontSize: '14px',
                    fontFamily: 'Figtree',
                    color: option.disabled 
                      ? theme.palette.text.disabled 
                      : (option.value === 'logout' ? '#B1000F' : theme.palette.text.primary),
                    '&:hover': { 
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.12),
                      '&:hover': { 
                        backgroundColor: alpha(theme.palette.primary.main, 0.16),
                      },
                    },
                  }}
                >
                  {/* Selection Icon */}
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {multiple ? (
                      isSelected(option.value) ? (
                        <Check sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                      ) : (
                        <RadioButtonUnchecked sx={{ fontSize: 20, color: theme.palette.text.disabled }} />
                      )
                    ) : (
                      isSelected(option.value) && <Check sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                    )}
                  </ListItemIcon>

                  {/* Avatar */}
                  {type === 'avatar-leading' && option.avatar && (
                    <Avatar 
                      src={option.avatar} 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        fontSize: 12, 
                        mr: 1 
                      }}
                    >
                      {option.label.charAt(0)}
                    </Avatar>
                  )}

                  {/* Option Icon */}
                  {option.icon && (
                    <ListItemIcon sx={{ 
                      minWidth: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}>
                      {option.icon}
                    </ListItemIcon>
                  )}

                  {/* Text */}
                  <ListItemText 
                    primary={option.label} 
                    sx={{ 
                      '& .MuiListItemText-primary': { 
                        fontSize: '14px',
                        fontFamily: 'Figtree',
                        fontWeight: 400,
                        lineHeight: '1.2em',
                        color: option.value === 'logout' ? '#B1000F' : theme.palette.text.primary,
                      } 
                    }} 
                  />

                  {/* Badge */}
                  {option.badge && (
                    <Chip
                      label={option.badge}
                      size="small"
                      sx={{ 
                        height: 20, 
                        fontSize: 10, 
                        backgroundColor: theme.palette.secondary.main, 
                        color: theme.palette.secondary.contrastText, 
                        fontWeight: 500 
                      }}
                    />
                  )}
                </MenuItem>
                {option.divider && <Divider />}
              </Box>
            ))
          )
        ) : (
          <MenuItem disabled sx={{ 
            justifyContent: 'center',
            py: 2
          }}>
            <Typography sx={{ 
              fontSize: '14px',
              fontFamily: 'Figtree',
              fontWeight: 400,
              color: theme.palette.text.secondary
            }}>
              {noOptionsText}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </FormControl>
  )
}

export default CustomDropdown
