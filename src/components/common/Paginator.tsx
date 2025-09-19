import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TYPOGRAPHY from '../../constants/typography';
import { COLORS } from '../../constants/colors';

interface PaginatorProps {
  page: number;
  totalPages: number;
  totalRecords: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  page,
  totalPages,
  totalRecords,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    onRowsPerPageChange(Number(event.target.value));
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };


  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      mt: 2,
      py: 2,
    //   borderTop: `1px solid ${COLORS.GRAY_200}`,
      gap: 3
    }}>
      {/* Rows per page */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ 
          fontFamily: TYPOGRAPHY.fontFamily.primary,
          fontSize: '14px',
          color: COLORS.GRAY_600
        }}>
          Rows per page:
        </Typography>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          variant="standard"
          disableUnderline
          sx={{
            minWidth: '20px',
            fontFamily: TYPOGRAPHY.fontFamily.primary,
            fontSize: '14px',
            color: COLORS.GRAY_600,
            backgroundColor: 'transparent',
            '& .MuiSelect-select': {
              padding: 0,
              paddingRight: '20px !important',
              fontSize: '14px',
              fontFamily: TYPOGRAPHY.fontFamily.primary,
              color: COLORS.GRAY_600,
            },
            '& .MuiSelect-icon': {
              color: COLORS.GRAY_600,
              right: 0,
            },
            '&:before': {
              display: 'none',
            },
            '&:after': {
              display: 'none',
            },
            '&:hover': {
              backgroundColor: 'transparent',
            }
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Box>

      {/* Pagination controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {/* Previous button */}
        <IconButton
          onClick={handlePreviousPage}
          disabled={page === 1}
          sx={{
            width: '32px',
            height: '32px',
            borderRadius: '4px',
            color: page === 1 ? COLORS.NEUTRAL_40 : COLORS.NEUTRAL_70,
            backgroundColor: 'transparent',
            border: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-disabled': {
              color: COLORS.NEUTRAL_40,
            }
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: '18px' }} />
        </IconButton>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum === '...' ? (
              <Typography sx={{ 
                px: 1, 
                color: COLORS.GRAY_400,
                fontSize: '14px',
                fontFamily: TYPOGRAPHY.fontFamily.primary
              }}>
                ...
              </Typography>
            ) : (
              <IconButton
                onClick={() => onPageChange(pageNum as number)}
                sx={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: page === pageNum ? COLORS.PRIMARY_1 : 'transparent',
                  color: page === pageNum ? COLORS.PRIMARY_50 : COLORS.BLACK,
                  fontSize: '14px',
                  fontFamily: TYPOGRAPHY.fontFamily.primary,
                  fontWeight: 400,
                  border: 'none',
                  '&:hover': {
                    backgroundColor: page === pageNum ? COLORS.PRIMARY_1 : 'transparent',
                  }
                }}
              >
                {pageNum}
              </IconButton>
            )}
          </React.Fragment>
        ))}

        {/* Next button */}
        <IconButton
          onClick={handleNextPage}
          disabled={page === totalPages}
          sx={{
            width: '32px',
            height: '32px',
            borderRadius: '4px',
            color: page === totalPages ? COLORS.NEUTRAL_40 : COLORS.NEUTRAL_70,
            backgroundColor: 'transparent',
            border: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-disabled': {
              color: COLORS.NEUTRAL_40,
            }
          }}
        >
          <ChevronRightIcon sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Paginator;
