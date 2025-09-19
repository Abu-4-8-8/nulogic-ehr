import { Box, Typography, IconButton, InputBase, TextField, InputAdornment, Button, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import TYPOGRAPHY from "../../../constants/typography"
import { COLORS } from "../../../constants/colors"
import { AddIcCall, Download, FileUploadOutlined } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';

const PatientListing = () => {
    return (
        <Box sx={{
            px: 3,
            py: 2,
            minHeight: '100vh'
        }}>
            {/* Header Section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            fontFamily: TYPOGRAPHY.fontFamily.primary,
                            fontWeight: 600,
                            color: COLORS.GRAY_900,
                            fontSize: '20px',
                            lineHeight: '24px'
                        }}
                    >
                        Patients
                    </Typography>

                    <Box
                        sx={{
                            ml: 1,
                            px: 1,
                            py: 0.25,
                            borderRadius: '12px',
                            backgroundColor: COLORS.GRAY_200,
                            fontSize: '12px',
                            fontWeight: 500,
                            color: COLORS.GRAY_700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px',
                            height: '20px'
                        }}
                    >
                        190
                    </Box>
                </Box>


                {/* Right side - Action Buttons */}
                <Box sx={{ 
                    display: "flex", 
                    alignItems: "stretch", // This makes all children same height
                    gap: "12px", // Exact gap from Figma
                    height: "45px" // Exact height from Figma frame
                }}>
                    {/* Search Input */}
                    <TextField
                        placeholder="Search"
                        size="small"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                minHeight: "100%", // Takes full height of parent
                                borderRadius: "4px",
                                '& fieldset': {
                                    borderColor: COLORS.GRAY_300,
                                },
                                '&:hover fieldset': {
                                    borderColor: COLORS.GRAY_300,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: COLORS.GRAY_300,
                                    borderWidth: '1px',
                                },
                                '& input': {
                                    padding: '0.5rem 0.75rem', // Reduced padding
                                }
                            },
                            backgroundColor: COLORS.WHITE,
                            color: COLORS.GRAY_700,
                            borderRadius: "4px",
                            flex: '0 0 auto', // Prevents flex shrinking
                        }}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon sx={{ color: COLORS.GRAY_500 }} />
                            </InputAdornment>
                        ),
                        }}
                    />

                    {/* Filter Button */}
                    <IconButton
                        sx={{
                            border: `1px solid ${COLORS.GRAY_300}`,
                            aspectRatio: '1', // Makes it square based on height
                            backgroundColor: COLORS.WHITE,
                            color: COLORS.GRAY_900,
                            borderRadius: "4px",
                            padding: '0.5rem', // Reduced padding
                            flex: '0 0 auto',
                        }}
                    >
                        <FilterListIcon />
                    </IconButton>

                    <Button variant="contained" sx={{
                            border: `1px solid ${COLORS.GRAY_300}`,
                            backgroundColor: COLORS.WHITE,
                            color: COLORS.GRAY_900,
                            borderRadius: "4px",
                            padding: '0.5rem 0.75rem', // Reduced padding
                            boxShadow: 'none',
                            flex: '0 0 auto',
                            '&:hover': {
                                boxShadow: 'none',
                            }
                        }}
                    >
                        <FileUploadOutlined /> Import Patient
                    </Button>
                    <Button variant="contained" 
                        sx={{
                            backgroundColor: COLORS.PRIMARY,
                            color: COLORS.WHITE,
                            borderRadius: "4px",
                            padding: '0.5rem 0.75rem', // Reduced padding
                            boxShadow: 'none',
                            flex: '0 0 auto',
                            '&:hover': {
                                boxShadow: 'none',
                            }
                        }}
                        startIcon={<AddIcon />}
                    >
                       Add Patient
                    </Button>
                </Box>
            </Box>

            {/* Patient Table */}
            <TableContainer 
                component={Paper} 
                sx={{ 
                    boxShadow: 'none',
                    border: `1px solid ${COLORS.GRAY_200}`,
                    borderRadius: '8px',
                    backgroundColor: COLORS.WHITE
                }}
            >
                <Table sx={{ minWidth: '100%' }} aria-label="patient table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: COLORS.GRAY_50 }}>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>
                                Patient Name
                            </TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Medication</TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Contact Number</TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Tags</TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Treatment Type</TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Source</TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Form</TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Current Stage</TableCell>
                            <TableCell sx={{ 
                                fontFamily: TYPOGRAPHY.fontFamily.primary,
                                fontWeight: 600,
                                fontSize: '14px',
                                color: COLORS.GRAY_700,
                                borderBottom: `1px solid ${COLORS.GRAY_200}`,
                                py: 2
                            }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:hover': { backgroundColor: COLORS.GRAY_25 } }}>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Box>
                                    <Typography sx={{ 
                                        fontFamily: TYPOGRAPHY.fontFamily.primary,
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        color: COLORS.PRIMARY,
                                        mb: 0.5
                                    }}>
                                        Robert Fox Robert Fox
                                    </Typography>
                                    <Typography sx={{ 
                                        fontFamily: TYPOGRAPHY.fontFamily.primary,
                                        fontSize: '12px',
                                        color: COLORS.GRAY_500
                                    }}>
                                        robert.fox@example.com
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFA500' }} />
                                    <Typography sx={{ fontSize: '14px', color: COLORS.GRAY_700 }}>
                                        /
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Typography sx={{ fontSize: '14px', color: COLORS.GRAY_700 }}>
                                    (206) 555-0173
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Box sx={{ px: 1, py: 0.5, backgroundColor: '#FEF2F2', borderRadius: '12px', border: '1px solid #FECACA' }}>
                                        <Typography sx={{ fontSize: '12px', color: '#DC2626', fontWeight: 500 }}>
                                            HIV Positive
                                        </Typography>
                                    </Box>
                                    <Box sx={{ px: 1, py: 0.5, backgroundColor: '#FEF2F2', borderRadius: '12px', border: '1px solid #FECACA' }}>
                                        <Typography sx={{ fontSize: '12px', color: '#DC2626', fontWeight: 500 }}>
                                            +2
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Box sx={{ px: 1, py: 0.5, backgroundColor: '#EEF2FF', borderRadius: '12px', border: '1px solid #C7D2FE' }}>
                                    <Typography sx={{ fontSize: '12px', color: '#3730A3', fontWeight: 500 }}>
                                        🔵 Non-MAT
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Typography sx={{ fontSize: '14px', color: COLORS.GRAY_700 }}>
                                    Walk-In
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Box sx={{ width: 24, height: 24, backgroundColor: '#10B981', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography sx={{ color: 'white', fontSize: '12px' }}>📄</Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <Box sx={{ px: 2, py: 0.5, backgroundColor: '#DCFCE7', borderRadius: '16px', border: '1px solid #BBF7D0' }}>
                                    <Typography sx={{ fontSize: '12px', color: '#166534', fontWeight: 500 }}>
                                        Registered
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${COLORS.GRAY_200}`, py: 2 }}>
                                <IconButton size="small">
                                    <Typography sx={{ fontSize: '16px' }}>⋮</Typography>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PatientListing;