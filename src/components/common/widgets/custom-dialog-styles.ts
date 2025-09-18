import { COLORS } from '../../../constants/colors'

export const customDialogStyles = {
  dialog: {
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  },
  dialogTitle: {
    padding: '20px 24px 0px 24px',
    '& .MuiTypography-root': {
      fontWeight: 600,
      fontSize: '18px',
      color: COLORS.GRAY_900,
    },
  },
  closeIcon: {
    color: COLORS.GRAY_500,
    padding: '4px',
    '&:hover': {
      backgroundColor: COLORS.GRAY_100,
    },
  },
}
