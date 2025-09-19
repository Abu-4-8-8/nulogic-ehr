import { Box, Typography, IconButton, InputBase, TextField, InputAdornment, Button, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Menu, MenuItem, Tooltip } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TYPOGRAPHY from "../../../constants/typography"
import { COLORS } from "../../../constants/colors"
import { AddIcCall, Download, FileUploadOutlined, DescriptionOutlined } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PillIcon from "../../../components/icons/PillIcon";
import VaccineIcon from "../../../components/icons/VaccineIcon";
import Paginator from "../../../components/common/Paginator";
import ServiceTypeLogo from "../../../components/ui/ServiceTypeLogo";
import ImportPatientDialog from "../../../components/dialog/importPatientDailog";
import {
    tableContainerStyles,
    tableStyles,
    tableHeadRowStyles,
    tableHeaderCellStyles,
    tableBodyRowStyles,
    twoLineCellStyles,
    textCellStyles,
    tagCellStyles,
    statusBadgeStyles,
    actionMenuStyles,
    medicationIconStyles
} from "../../../utils/tableStyles";

// Custom Filter Icon Component
const FilterIcon: React.FC<{ color?: string; size?: number }> = ({ color = "#343330", size = 16 }) => (
    <svg width={size} height={Math.round(size * 15/16)} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.214 1.4826C15.1275 1.28256 14.984 1.1124 14.8015 0.99326C14.619 0.874121 14.4054 0.811268 14.1875 0.812518H1.81248C1.59475 0.812947 1.38181 0.876552 1.19951 0.995617C1.01722 1.11468 0.873387 1.28409 0.785474 1.48329C0.697561 1.68249 0.669343 1.90292 0.704244 2.11784C0.739144 2.33276 0.835663 2.53294 0.982091 2.69408L0.987716 2.70041L5.74998 7.78541V13.1875C5.74993 13.3911 5.80514 13.5909 5.90973 13.7656C6.01431 13.9403 6.16434 14.0834 6.34383 14.1795C6.52332 14.2756 6.72553 14.3212 6.92891 14.3115C7.13228 14.3017 7.3292 14.237 7.49865 14.1241L9.74865 12.6236C9.90289 12.5209 10.0294 12.3816 10.1168 12.2182C10.2043 12.0548 10.25 11.8724 10.25 11.687V7.78541L15.0129 2.70041L15.0186 2.69408C15.1665 2.53367 15.264 2.33323 15.2988 2.11778C15.3335 1.90232 15.3041 1.68141 15.214 1.4826ZM9.27826 7.18142C9.18095 7.28459 9.12621 7.42071 9.12498 7.56252V11.687L6.87498 13.1875V7.56252C6.87502 7.41968 6.82073 7.28218 6.72311 7.17791L1.81248 1.93752H14.1875L9.27826 7.18142Z" fill={color}/>
    </svg>
);

const PatientListing = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [importDialogOpen, setImportDialogOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    
    // Mock patient data
    const patientData = [
        {
            id: 1,
            name: "Robert Fox Robert Fox",
            email: "robert.fox@example.com",
            medication: "pill",
            contactNumber: "(206) 555-0173",
            tags: ["HIV Positive", "+2"],
            allTags: ["HIV Positive", "Diabetes", "Hypertension"],
            treatmentType: "non-mat" as const,
            source: "Walk-In",
            currentStage: "Registered",
            formCompleted: true
        },
        {
            id: 2,
            name: "Jessica Jones",
            email: "jessica.jones@example.com",
            medication: "injection",
            contactNumber: "(202) 555-0176",
            tags: ["HIV Positive", "+2"],
            allTags: ["HIV Positive", "Anxiety", "Depression"],
            treatmentType: "mat" as const,
            source: "Walk-In",
            currentStage: "Checked-In",
            formCompleted: false
        },
        {
            id: 3,
            name: "Hannah Montana",
            email: "hannah.montana@example.com",
            medication: "pill",
            contactNumber: "(602) 555-0190",
            tags: [],
            treatmentType: "mat" as const,
            source: "Sober Living home",
            currentStage: "Checked-In",
            formCompleted: true
        },
        {
            id: 4,
            name: "George Washington",
            email: "george.washington@example.com",
            medication: "pill",
            contactNumber: "(718) 555-0189",
            tags: [],
            treatmentType: "non-mat" as const,
            source: "Walk-In",
            currentStage: "Checked-In",
            formCompleted: false
        },
        {
            id: 5,
            name: "Michael Scott",
            email: "michael.scott@example.com",
            medication: null,
            contactNumber: "(808) 555-0142",
            tags: ["HIV Positive", "+2"],
            allTags: ["HIV Positive", "PTSD", "Substance Abuse"],
            treatmentType: "psych" as const,
            source: "Walk-In",
            currentStage: "Registered",
            formCompleted: true
        },
        {
            id: 6,
            name: "Kevin Hart",
            email: "kevin.hart@example.com",
            medication: null,
            contactNumber: "(850) 555-0181",
            tags: ["HIV Positive", "+2"],
            allTags: ["HIV Positive", "Chronic Pain", "Sleep Disorder"],
            treatmentType: "non-mat" as const,
            source: "Walk-In",
            currentStage: "Registered",
            formCompleted: false
        },
        {
            id: 7,
            name: "Charlie Brown",
            email: "charlie.brown@example.com",
            medication: "pill",
            contactNumber: "(303) 555-0157",
            tags: [],
            treatmentType: "sti" as const,
            source: "Sober Living home",
            currentStage: "Checked-In",
            formCompleted: true
        },
        {
            id: 8,
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            medication: null,
            contactNumber: "(702) 555-0168",
            tags: ["HIV Positive", "+2"],
            allTags: ["HIV Positive", "Bipolar Disorder", "Addiction Recovery"],
            treatmentType: "mat" as const,
            source: "Sober Living home",
            currentStage: "Registered",
            formCompleted: false
        }
    ];
    
    const totalRecords = 190;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
    };

    const handleAddPatient = () => {
        navigate('/add-patient');
    };

    const handleImportPatient = () => {
        setImportDialogOpen(true);
    };

    const handleImportDialogClose = () => {
        setImportDialogOpen(false);
    };

    const handleImportSubmit = (data: { soberLivingHome: string; files: File[] }) => {
        // Handle the import logic here
        console.log('Import data:', data);
        // You can add your import logic here
        // For example, send data to API, update patient list, etc.
    };
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
                            minWidth: '280px',
                            "& .MuiOutlinedInput-root": {
                                height: "100%",
                                borderRadius: "8px",
                                backgroundColor: COLORS.WHITE,
                                '& fieldset': {
                                    borderColor: COLORS.GRAY_300,
                                    borderWidth: '1px',
                                },
                                '&:hover fieldset': {
                                    borderColor: COLORS.GRAY_300,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: COLORS.GRAY_300,
                                    borderWidth: '1px',
                                },
                                '& input': {
                                    padding: '12px 14px',
                                    fontSize: '14px',
                                    fontFamily: TYPOGRAPHY.fontFamily.primary,
                                    color: COLORS.GRAY_900,
                                    '&::placeholder': {
                                        color: COLORS.GRAY_500,
                                        opacity: 1,
                                    }
                                }
                            },
                            flex: '0 0 auto',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ 
                                        color: COLORS.GRAY_500, 
                                        fontSize: '20px',
                                        ml: 0.5
                                    }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Filter Button */}
                    <IconButton
                        sx={{
                            border: `1px solid ${COLORS.GRAY_300}`,
                            width: '45px',
                            height: '45px',
                            backgroundColor: COLORS.WHITE,
                            color: COLORS.GRAY_600,
                            borderRadius: "8px",
                            padding: 0,
                            flex: '0 0 auto',
                            '&:hover': {
                                backgroundColor: COLORS.WHITE,
                                borderColor: COLORS.GRAY_300,
                            }
                        }}
                    >
                        <FilterIcon color={COLORS.GRAY_600} size={20} />
                    </IconButton>

                    <Button variant="contained" 
                        onClick={handleImportPatient}
                        sx={{
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
                        onClick={handleAddPatient}
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
            <TableContainer sx={tableContainerStyles}>
                <Table sx={tableStyles} aria-label="patient table">
                    <TableHead>
                        <TableRow sx={tableHeadRowStyles}>
                            <TableCell sx={tableHeaderCellStyles}>
                                Patient Name
                            </TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Medication</TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Contact Number</TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Tags</TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Treatment Type</TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Source</TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Form</TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Current Stage</TableCell>
                            <TableCell sx={tableHeaderCellStyles}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patientData.map((patient) => (
                            <TableRow key={patient.id} sx={tableBodyRowStyles}>
                                {/* Patient Name */}
                                <TableCell sx={twoLineCellStyles.container}>
                                    <Box>
                                        <Typography sx={twoLineCellStyles.primaryText}>
                                            {patient.name}
                                        </Typography>
                                        <Typography sx={twoLineCellStyles.secondaryText}>
                                            {patient.email}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                {/* Medication */}
                                <TableCell sx={medicationIconStyles.container}>
                                    <Box sx={medicationIconStyles.iconContainer}>
                                        {patient.medication === "pill" ? (
                                            <PillIcon 
                                                width={16} 
                                                height={16} 
                                                tooltip="Medication prescribed"
                                                tooltipPlacement="top"
                                            />
                                        ) : patient.medication === "injection" ? (
                                            <VaccineIcon 
                                                width={16} 
                                                height={16} 
                                                tooltip="Injection prescribed"
                                                tooltipPlacement="top"
                                            />
                                        ) : (
                                            <Typography sx={{ fontSize: '14px', color: COLORS.GRAY_700 }}>
                                                -
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>

                                {/* Contact Number */}
                                <TableCell sx={textCellStyles.container}>
                                    <Typography sx={textCellStyles.text}>
                                        {patient.contactNumber}
                                    </Typography>
                                </TableCell>

                                {/* Tags */}
                                <TableCell sx={tagCellStyles.container}>
                                    <Box sx={tagCellStyles.tagBox}>
                                        {patient.tags.map((tag, index) => {
                                            const isPlusTag = tag.startsWith('+');
                                            
                                            if (isPlusTag && patient.allTags) {
                                                return (
                                                    <Tooltip
                                                        key={index}
                                                        title={
                                                            <Box>
                                                                {patient.allTags.map((fullTag, tooltipIndex) => (
                                                                    <Typography key={tooltipIndex} sx={{ fontSize: '12px', mb: 0.5 }}>
                                                                        {fullTag}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                        }
                                                        arrow
                                                        placement="top"
                                                        sx={{
                                                            '& .MuiTooltip-tooltip': {
                                                                backgroundColor: '#1F2937',
                                                                color: 'white',
                                                                fontSize: '12px',
                                                                borderRadius: '8px',
                                                                padding: '8px 12px'
                                                            },
                                                            '& .MuiTooltip-arrow': {
                                                                color: '#1F2937'
                                                            }
                                                        }}
                                                    >
                                                        <Typography sx={{
                                                            fontSize: '12px',
                                                            color: COLORS.PRIMARY_50,
                                                            fontWeight: TYPOGRAPHY.fontWeight.medium,
                                                            cursor: 'pointer',
                                                            fontFamily: TYPOGRAPHY.fontFamily.primary
                                                        }}>
                                                            {tag}
                                                        </Typography>
                                                    </Tooltip>
                                                );
                                            }
                                            
                                            return (
                                                <Box key={index} sx={tagCellStyles.redTag}>
                                                    <Typography sx={tagCellStyles.redTagText}>
                                                        {tag}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                        {patient.tags.length === 0 && (
                                            <Typography sx={{ fontSize: '14px', color: COLORS.GRAY_700 }}>
                                                -
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>

                                {/* Treatment Type */}
                                <TableCell sx={textCellStyles.container}>
                                    <ServiceTypeLogo 
                                        serviceType={patient.treatmentType}
                                        size="small"
                                    />
                                </TableCell>

                                {/* Source */}
                                <TableCell sx={textCellStyles.container}>
                                    <Typography sx={textCellStyles.text}>
                                        {patient.source}
                                    </Typography>
                                </TableCell>

                                {/* Form */}
                                <TableCell sx={statusBadgeStyles.container}>
                                    <Typography sx={textCellStyles.text}>
                                        <DescriptionOutlined sx={{ 
                                            color: patient.formCompleted ? '#10B981' : '#F59E0B', 
                                            fontSize: '16px' 
                                        }} />
                                    </Typography>
                                </TableCell>

                                {/* Current Stage */}
                                <TableCell sx={statusBadgeStyles.container}>
                                    <Box sx={
                                        patient.currentStage === "Registered" 
                                            ? statusBadgeStyles.registered 
                                            : statusBadgeStyles.checkedIn
                                    }>
                                        <Typography sx={
                                            patient.currentStage === "Registered" 
                                                ? statusBadgeStyles.registeredText 
                                                : statusBadgeStyles.checkedInText
                                        }>
                                            {patient.currentStage}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                {/* Action */}
                                <TableCell sx={actionMenuStyles.container}>
                                    <IconButton 
                                        size="small"
                                        onClick={handleMenuClick}
                                        sx={actionMenuStyles.iconButton}
                                    >
                                        <MoreVertIcon sx={{ fontSize: '20px' }} />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        sx={actionMenuStyles.menu}
                                    >
                                        <MenuItem onClick={handleMenuClose} sx={actionMenuStyles.menuItem}>
                                            View Details
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} sx={actionMenuStyles.menuItem}>
                                            Edit Patient
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} sx={actionMenuStyles.menuItem}>
                                            Archive
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose} sx={actionMenuStyles.deleteMenuItem}>
                                            Delete Patient
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Paginator
                page={page}
                totalPages={totalPages}
                totalRecords={totalRecords}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />

            {/* Import Patient Dialog */}
            <ImportPatientDialog
                open={importDialogOpen}
                onClose={handleImportDialogClose}
                onImport={handleImportSubmit}
            />
        </Box>
    )
}

export default PatientListing;