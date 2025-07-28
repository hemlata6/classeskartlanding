import { Box, Typography, Button, Divider, Grid, useMediaQuery, Dialog, DialogContent, DialogActions, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Card, CardActions, IconButton, Container, CardMedia, Chip, Fade, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../network/endpoints";
import instId from "../network/instituteId";
import axios from "axios";
import Network from "../network/Network";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useSnackbar } from "notistack";
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GetAppIcon from '@mui/icons-material/GetApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FreeResources = () => {

    const { enqueueSnackbar } = useSnackbar();
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:960px)");
    const [isVisible, setIsVisible] = useState(false);
    const [Endpoints, setEndpoints] = useState('');
    const [coursesList, setCoursesList] = useState([]);
    const [activeCoursesList, setActiveCoursesList] = useState([]);
    const [selectedSceduleList, setSelectedSceduleList] = useState([]);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [selectCourse, setSelectCourse] = useState("");
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsVisible(true);
        getInstituteDetail();
        getAllCourses();
    }, []);

    useEffect(() => {
        if (coursesList?.length > 0) {
            getMergedSchedules()
        }
    }, [coursesList])

    const getInstituteDetail = async () => {
        try {
            let requestOptions = {
                // headers: { "X-Auth": token },
                withCredentials: false,
            };
            const response = await axios.get(
                BASE_URL + "/getMetaData/fetch-institute/" + instId,
                requestOptions
            );
            if (response?.data?.errorCode === 0) {
                setEndpoints(response?.data?.instituteTechSetting?.mediaUrl)
                // Endpoints = response?.data?.instituteTechSetting?.mediaUrl
            };
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCourses = async () => {
        try {
            const response = await Network.fetchCourses(instId);
            const course = response?.courses || [];
            const ActivefilteredCourses = course.filter(course =>
                course?.active === true
            );
            setActiveCoursesList(ActivefilteredCourses);
            
            const filteredCourses = course.filter(course =>
                course?.active === true &&
                course?.tags?.some(tagObj => tagObj?.tag?.toLowerCase() === "free")
            );
            // console.log('courseeeee', filteredCourses);
    
            setCoursesList(filteredCourses);
        } catch (error) {
            console.log(error);
        };
    };

    const getMergedSchedules = async () => {
        try {
            let allSchedules = [];

            await Promise.all(
                coursesList.map(async (course) => {
                    const response = await Network.fetchCheduleApi(course.id, 0);
                    if (response?.contentList) {
                        allSchedules = [...allSchedules, ...response.contentList];
                    }
                })
            );
            setSelectedSceduleList(allSchedules);
        } catch (error) {
            console.error("Error fetching course schedules:", error);
        }
    };

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setFormModalOpen(true);
    };

    const handleClose = () => {
        setName('');
        setNumber('');
        setSelectCourse('');
        setFormModalOpen(false);
    }

    const handleSubmit = async () => {
        try {
            const body = {
                instId: instId,
                firstName: name,
                lastName: name,
                contact: number,
                campaignId: null,
                contentId: selectCourse?.id,
                enquiryType: "course"
            }
            let requestOptions = {
                // headers: { "X-Auth": token },
                withCredentials: false,
            };
            const response = await axios.post(
                BASE_URL + "leadManagement/create-lead-form", body,
                requestOptions
            );

            if (response?.data?.errorCode !== 0) {
                enqueueSnackbar(`${response?.data?.errorDescription}`, { variant: 'error', autoHideDuration: 3000 })
            } else if (response?.data?.errorCode === 0) {
                enqueueSnackbar(`Thank You For Submitting`, { variant: "success", autoHideDuration: 3000 }
                );
                if (selectedItem?.entityType === "video" && selectedItem?.video?.video) {
                    window.open(Endpoints + selectedItem?.video?.video, "_blank");
                } else if (selectedItem?.entityType === "note" && selectedItem?.note?.note) {
                    window.open(Endpoints + selectedItem?.note?.note, "_blank");
                } else {
                    console.warn("No valid URL found for this item.");
                }
                setName('');
                setNumber('');
                setSelectCourse('');
                handleClose();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeCourse = (event) => {
        setSelectCourse(event.target.value)
    };

    // console.log("Selected Schedule List:", selectedSceduleList);

    return (
        <React.Fragment>
            <Box sx={{
                background: 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(255,255,255,0.98) 50%, rgba(240,249,255,0.95) 100%)',
                position: 'relative',
                overflow: 'hidden',
                py: { xs: 1, md: 1 },
                // minHeight: '90vh',
                mt: 8
            }}>
                {/* Background Decorative Elements */}
                <Box sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '8%',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(2, 135, 215, 0.06) 0%, rgba(2, 135, 215, 0.02) 70%, transparent 100%)',
                    filter: 'blur(30px)',
                    zIndex: 0
                }} />
                
                <Box sx={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '5%',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(254, 221, 61, 0.06) 0%, rgba(254, 221, 61, 0.02) 70%, transparent 100%)',
                    filter: 'blur(25px)',
                    zIndex: 0
                }} />

                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Header Section */}
                    <Fade in={isVisible} timeout={800}>
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Chip 
                                icon={<LibraryBooksIcon sx={{ color: '#0287D7 !important' }} />}
                                label="Free Learning Resources"
                                sx={{
                                    background: 'linear-gradient(135deg, rgba(2, 135, 215, 0.08), rgba(2, 135, 215, 0.03))',
                                    border: '1px solid rgba(2, 135, 215, 0.15)',
                                    color: '#0287D7',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    mb: 3,
                                    borderRadius: '20px',
                                    py: 1,
                                    px: 2,
                                    boxShadow: '0 4px 12px rgba(2, 135, 215, 0.15)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(2, 135, 215, 0.25)'
                                    }
                                }}
                            />
                            
                            <Typography
                                variant={isMobile ? "h5" : "h4"}
                                sx={{
                                    background: 'linear-gradient(135deg, #333 0%, #0287D7 50%, #333 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                Unlock Your Learning Journey with{' '}
                                <span style={{ 
                                    background: 'linear-gradient(135deg, #FEDD3D 0%, #F4C842 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    Free Resources
                                </span>
                            </Typography>
                            
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: '#666',
                                    maxWidth: '600px',
                                    mx: 'auto',
                                    fontSize: { xs: '14px', md: '16px' }
                                }}
                            >
                                Access premium educational content at no cost. Start your learning adventure today!
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Resources Grid */}
                    <Grid container spacing={3} sx={{ mb: 1 }}>
                        {selectedSceduleList?.length > 0 && selectedSceduleList?.map((item, i) => {
                            if (item?.paid === false) {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                        <Zoom in={isVisible} timeout={1000 + (i * 100)}>
                                            <Card 
                                                onClick={() => handleCardClick(item)}
                                                sx={{
                                                    borderRadius: "24px",
                                                    overflow: 'hidden',
                                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                                                    backdropFilter: 'blur(20px)',
                                                    border: '1px solid rgba(255,255,255,0.4)',
                                                    boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.04)',
                                                    height: '100%',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    '&:hover': {
                                                        transform: 'translateY(-12px)',
                                                        boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 15px 40px rgba(0,0,0,0.08)',
                                                        '& .resource-image': {
                                                            transform: 'scale(1.05)',
                                                        },
                                                        '& .free-badge': {
                                                            transform: 'scale(1.1)',
                                                        },
                                                        '& .content-icon': {
                                                            transform: 'scale(1.2) rotate(5deg)',
                                                        }
                                                    }
                                                }}
                                            >
                                                {/* Free Badge */}
                                                <Chip
                                                    className="free-badge"
                                                    label="FREE"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 15,
                                                        right: 15,
                                                        background: 'linear-gradient(135deg, #09c23d, #07a832)',
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        fontSize: '11px',
                                                        boxShadow: '0 4px 12px rgba(9, 194, 61, 0.4)',
                                                        zIndex: 2,
                                                        transition: 'all 0.3s ease',
                                                        height: '28px'
                                                    }}
                                                />

                                                {/* Image Section */}
                                                <Box sx={{ 
                                                    position: 'relative', 
                                                    overflow: 'hidden',
                                                    height: '200px',
                                                    borderRadius: '20px 20px 0 0',
                                                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                                                }}>
                                                    {item?.thumb ? (
                                                        <CardMedia
                                                            className="resource-image"
                                                            component="img"
                                                            image={Endpoints + item?.thumb}
                                                            alt={item?.title}
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                transition: 'transform 0.4s ease'
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            height: '100%',
                                                            background: 'linear-gradient(135deg, rgba(2, 135, 215, 0.1), rgba(254, 221, 61, 0.1))'
                                                        }}>
                                                            {item?.entityType === "video" || item?.entityType === "blog" ? 
                                                                <PlayCircleIcon sx={{ fontSize: 60, color: '#0287D7', opacity: 0.7 }} /> : 
                                                                <PictureAsPdfIcon sx={{ fontSize: 60, color: '#e53e3e', opacity: 0.7 }} />
                                                            }
                                                        </Box>
                                                    )}
                                                    
                                                    {/* Content Type Icon */}
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        bottom: 10,
                                                        left: 10,
                                                        background: 'rgba(0,0,0,0.7)',
                                                        borderRadius: '12px',
                                                        p: 1,
                                                        backdropFilter: 'blur(10px)'
                                                    }}>
                                                        {item?.entityType === "video" || item?.entityType === "blog" ? 
                                                            <PlayCircleIcon className="content-icon" sx={{ color: '#fff', fontSize: 20, transition: 'all 0.3s ease' }} /> : 
                                                            <PictureAsPdfIcon className="content-icon" sx={{ color: '#fff', fontSize: 20, transition: 'all 0.3s ease' }} />
                                                        }
                                                    </Box>
                                                </Box>

                                                {/* Content Section */}
                                                <Box sx={{
                                                    p: 3,
                                                    flexGrow: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    {/* Title */}
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            color: '#333',
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                            mb: 2,
                                                            lineHeight: 1.4,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {item?.title || 'Resource Title'}
                                                    </Typography>

                                                    {/* Date and Download Info */}
                                                    <Box sx={{ mt: 'auto' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                            <AccessTimeIcon sx={{ color: '#666', fontSize: 16, mr: 1 }} />
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: '#666',
                                                                    fontSize: '12px'
                                                                }}
                                                            >
                                                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                }) : "Recently Added"}
                                                            </Typography>
                                                        </Box>

                                                        {/* Download Button */}
                                                        <Button
                                                            startIcon={<GetAppIcon />}
                                                            fullWidth
                                                            sx={{
                                                                background: 'linear-gradient(135deg, #0287D7, #0066cc)',
                                                                color: 'white',
                                                                borderRadius: '12px',
                                                                textTransform: 'none',
                                                                fontWeight: '600',
                                                                py: 1.5,
                                                                fontSize: '14px',
                                                                boxShadow: '0 4px 12px rgba(2, 135, 215, 0.3)',
                                                                transition: 'all 0.3s ease',
                                                                '&:hover': {
                                                                    background: 'linear-gradient(135deg, #0066cc, #004499)',
                                                                    transform: 'translateY(-2px)',
                                                                    boxShadow: '0 6px 20px rgba(2, 135, 215, 0.4)'
                                                                }
                                                            }}
                                                        >
                                                            Access Now
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Zoom>
                                    </Grid>
                                );
                            }
                            return null;
                        })}
                    </Grid>

                    {/* No Resources Available */}
                    {selectedSceduleList?.length === 0 && (
                        <Fade in={isVisible} timeout={1000}>
                            <Box sx={{ 
                                textAlign: "center", 
                                py: 8,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.8))',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.4)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                            }}>
                                <LibraryBooksIcon sx={{ fontSize: 80, color: '#0287D7', opacity: 0.3, mb: 2 }} />
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        color: '#333',
                                        fontWeight: 'bold',
                                        mb: 1
                                    }}
                                >
                                    No Free Resources Available
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: '#666',
                                        maxWidth: '400px',
                                        mx: 'auto'
                                    }}
                                >
                                    Check back soon for exciting new learning materials!
                                </Typography>
                            </Box>
                        </Fade>
                    )}
                </Container>
            </Box>
            {/* Enhanced Modal Dialog */}
            <Dialog 
                open={formModalOpen} 
                onClose={() => setFormModalOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 30px 80px rgba(0,0,0,0.15), 0 15px 40px rgba(0,0,0,0.08)',
                        maxWidth: '480px',
                        width: '90%',
                    }
                }}
                BackdropProps={{
                    sx: {
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(8px)'
                    }
                }}
            >
                <DialogContent sx={{ p: 0, overflow: 'scroll' }}>
                    <Box sx={{
                        background: 'linear-gradient(135deg, #0287D7 0%, #0066cc 100%)',
                        p: 4,
                        color: 'white',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: 'radial-gradient(circle at 70% 20%, rgba(254, 221, 61, 0.15) 0%, transparent 50%)',
                            zIndex: 0
                        }
                    }}>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 15,
                                top: 15,
                                color: 'white',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.2)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease',
                                zIndex: 1
                            }}
                        >
                            <CloseIcon fontSize="1rem" />
                        </IconButton>
                        
                        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <LibraryBooksIcon sx={{ fontSize: 50, mb: 1, opacity: 0.9 }} />
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 , color: 'white' }}>
                                🎯 Claim Your Free Resource
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: '300px', mx: 'auto', color: 'white' }}>
                                Enter your details to unlock premium educational content at no cost
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            {/* Name Field */}
                            <Grid item xs={12}>
                                <Typography sx={{ 
                                    color: "#333", 
                                    fontSize: "14px", 
                                    mb: 1,
                                    fontWeight: '600'
                                }}>
                                    Full Name *
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            background: 'rgba(248,250,252,0.8)',
                                            border: '1px solid rgba(2, 135, 215, 0.1)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                border: '1px solid rgba(2, 135, 215, 0.3)',
                                            },
                                            '&.Mui-focused': {
                                                border: '2px solid #0287D7',
                                                boxShadow: '0 0 0 3px rgba(2, 135, 215, 0.1)',
                                            }
                                        }
                                    }}
                                />
                            </Grid>

                            {/* Mobile Field */}
                            <Grid item xs={12}>
                                <Typography sx={{ 
                                    color: "#333", 
                                    fontSize: "14px", 
                                    mb: 1,
                                    fontWeight: '600'
                                }}>
                                    Mobile Number *
                                </Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    placeholder='Enter your mobile number'
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            background: 'rgba(248,250,252,0.8)',
                                            border: '1px solid rgba(2, 135, 215, 0.1)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                border: '1px solid rgba(2, 135, 215, 0.3)',
                                            },
                                            '&.Mui-focused': {
                                                border: '2px solid #0287D7',
                                                boxShadow: '0 0 0 3px rgba(2, 135, 215, 0.1)',
                                            }
                                        }
                                    }}
                                />
                            </Grid>

                            {/* Course Selection */}
                            <Grid item xs={12}>
                                <Typography sx={{ 
                                    color: "#333", 
                                    fontSize: "14px", 
                                    mb: 1,
                                    fontWeight: '600'
                                }}>
                                    Interested Course *
                                </Typography>
                                <Select
                                    fullWidth
                                    displayEmpty
                                    value={selectCourse}
                                    onChange={handleChangeCourse}
                                    sx={{
                                        borderRadius: '12px',
                                        background: 'rgba(248,250,252,0.8)',
                                        border: '1px solid rgba(2, 135, 215, 0.1)',
                                        '&:hover': {
                                            border: '1px solid rgba(2, 135, 215, 0.3)',
                                        },
                                        '&.Mui-focused': {
                                            border: '2px solid #0287D7',
                                            boxShadow: '0 0 0 3px rgba(2, 135, 215, 0.1)',
                                        }
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select your course of interest
                                    </MenuItem>
                                    {activeCoursesList?.map((data, index) => (
                                        <MenuItem key={index} value={data}>
                                            {data?.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    disabled={!name || !number || !selectCourse?.id}
                                    sx={{
                                        background: !name || !number || !selectCourse?.id 
                                            ? 'rgba(2, 135, 215, 0.3)' 
                                            : 'linear-gradient(135deg, #0287D7, #0066cc)',
                                        color: 'white',
                                        borderRadius: '12px',
                                        py: 1.8,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        boxShadow: !name || !number || !selectCourse?.id 
                                            ? 'none' 
                                            : '0 8px 25px rgba(2, 135, 215, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: !name || !number || !selectCourse?.id 
                                                ? 'rgba(2, 135, 215, 0.3)' 
                                                : 'linear-gradient(135deg, #0066cc, #004499)',
                                            transform: !name || !number || !selectCourse?.id 
                                                ? 'none' 
                                                : 'translateY(-2px)',
                                            boxShadow: !name || !number || !selectCourse?.id 
                                                ? 'none' 
                                                : '0 12px 35px rgba(2, 135, 215, 0.4)',
                                        },
                                        '&:disabled': {
                                            color: 'rgba(255,255,255,0.7)'
                                        }
                                    }}
                                >
                                    🚀 Access Free Resource
                                </Button>
                                
                                {/* Security Note */}
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        display: 'block',
                                        textAlign: 'center',
                                        color: '#666',
                                        mt: 2,
                                        fontSize: '12px'
                                    }}
                                >
                                    🔒 Your information is secure and will only be used for educational purposes
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default FreeResources;
