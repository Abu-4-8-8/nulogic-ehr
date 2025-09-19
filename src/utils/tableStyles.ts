import { SxProps, Theme } from '@mui/material/styles';
import { COLORS } from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';

// Table Container Styles
export const tableContainerStyles: SxProps<Theme> = {
  boxShadow: 'none',
  border: `1px solid ${COLORS.GRAY_200}`,
  borderRadius: '8px',
  backgroundColor: COLORS.WHITE
};

// Table Styles
export const tableStyles: SxProps<Theme> = {
  minWidth: '100%',
  borderColor: COLORS.NEUTRAL_5
};

// Table Head Row Styles
export const tableHeadRowStyles: SxProps<Theme> = {
  backgroundColor: COLORS.NEUTRAL_5,
  color: COLORS.NEUTRAL_60
};

// Table Header Cell Styles
export const tableHeaderCellStyles: SxProps<Theme> = {
  fontFamily: TYPOGRAPHY.fontFamily.primary,
  fontWeight: 600,
  fontSize: '14px',
  color: COLORS.NEUTRAL_60,
  borderBottom: `1px solid ${COLORS.GRAY_200}`,
  py: 2
};

// Table Body Row Styles
export const tableBodyRowStyles: SxProps<Theme> = {
  '&:hover': { 
    backgroundColor: COLORS.WHITE 
  }
};

// Table Body Cell Styles
export const tableBodyCellStyles: SxProps<Theme> = {
  borderBottom: `1px solid ${COLORS.GRAY_200}`,
  py: 0.75
};

// Two Line Cell Styles (for primary + secondary text layout)
export const twoLineCellStyles = {
  container: tableBodyCellStyles,
  primaryText: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontWeight: 500,
    fontSize: '14px',
    color: COLORS.PRIMARY_50,
    mb: 0.25,
    lineHeight: 1.2
  },
  secondaryText: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontSize: '12px',
    color: COLORS.GRAY_500,
    lineHeight: 1.2
  }
};

// Standard Text Cell Styles
export const textCellStyles = {
  container: tableBodyCellStyles,
  text: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontSize: '14px',
    color: COLORS.GRAY_700
  }
};

// Tag Cell Styles (matching ServiceTypeLogo pattern)
export const tagCellStyles = {
  container: tableBodyCellStyles,
  tagBox: {
    display: 'flex',
    gap: 1
  },
  redTag: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 28,
    padding: '4px 12px',
    backgroundColor: '#FEF2F2',
    borderRadius: '14px',
    border: '1px solid #FECACA'
  },
  redTagText: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontSize: '12px',
    color: '#DC2626',
    lineHeight: 1,
    whiteSpace: 'nowrap'
  },
  blueTag: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 28,
    padding: '4px 12px',
    backgroundColor: '#EEF2FF',
    borderRadius: '14px',
    border: '1px solid #C7D2FE'
  },
  blueTagText: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontSize: '12px',
    color: '#3730A3',
    lineHeight: 1,
    whiteSpace: 'nowrap'
  },
  cyanTag: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 28,
    padding: '4px 12px',
    backgroundColor: '#E0F2FE',
    borderRadius: '14px',
    border: '1px solid #7DD3FC'
  },
  cyanTagText: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontSize: '12px',
    color: '#0369A1',
    lineHeight: 1,
    whiteSpace: 'nowrap'
  }
};

// Status Badge Styles (matching ServiceTypeLogo pattern)
export const statusBadgeStyles = {
  container: tableBodyCellStyles,
  registered: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 28,
    padding: '4px 12px',
    backgroundColor: '#DCFCE7',
    borderRadius: '14px',
    border: '1px solid #BBF7D0'
  },
  registeredText: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontSize: '12px',
    color: '#166534',
    lineHeight: 1,
    whiteSpace: 'nowrap'
  },
  checkedIn: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 28,
    padding: '4px 12px',
    backgroundColor: '#DBEAFE',
    borderRadius: '14px',
    border: '1px solid #93C5FD'
  },
  checkedInText: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontSize: '12px',
    color: '#1D4ED8',
    lineHeight: 1,
    whiteSpace: 'nowrap'
  }
};

// Form Icon Styles
export const formIconStyles = {
  container: tableBodyCellStyles,
  iconBox: {
    width: 24,
    height: 24,
    backgroundColor: '#10B981',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    color: 'white',
    fontSize: '12px'
  }
};

// Action Menu Styles
export const actionMenuStyles = {
  container: tableBodyCellStyles,
  iconButton: {
    color: COLORS.GRAY_600,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  menu: {
    '& .MuiPaper-root': {
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${COLORS.GRAY_200}`,
      minWidth: '160px'
    }
  },
  menuItem: {
    fontSize: '14px',
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    color: COLORS.GRAY_700,
    py: 1.5,
    px: 2,
    '&:hover': {
      backgroundColor: COLORS.GRAY_50
    }
  },
  deleteMenuItem: {
    fontSize: '14px',
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    color: '#DC2626',
    py: 1.5,
    px: 2,
    '&:hover': {
      backgroundColor: '#FEF2F2'
    }
  }
};

// Medication Icon Styles
export const medicationIconStyles = {
  container: tableBodyCellStyles,
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  }
};
