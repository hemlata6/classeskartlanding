import { Box, Button, Dialog, Divider, Grid, Stack, Typography, useMediaQuery, Card, CardContent, Chip, IconButton, Paper, Container, Avatar, DialogContent, DialogActions, Tooltip, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import ProceedToCheckoutForm from "./ProceedToCheckoutForm";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Endpoints from "../network/endpoints";
import playStore from './playStore1.svg';
import windowsStore from './windowsStore.svg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HomeIcon from '@mui/icons-material/Home';
import { motion } from 'framer-motion';

const MultipleCourseCart = () => {

    //     const zoomInOut = keyframes`
    //   0% { transform: scale(1); }
    //   50% { transform: scale(1.1); }
    //   100% { transform: scale(1); }
    // `;
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:768px)");
    let cartData = localStorage.getItem('cartCourses');
    const [cartCourses, setCartCourses] = useState([]);
    const [finalAmounts, setFinalAmounts] = useState(0);
    const [proceedToCheckoutModal, setProceedToCheckoutModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const [previewContent, setPreviewContent] = useState({ type: '', url: '', title: '' });
    const [videoError, setVideoError] = useState(false);
    const [openThankYouDialog, setOpenThankYouDialog] = useState(false);

    //     const handleProceedToCheckout = () => {
    //     setProceedToCheckoutModal(true)
    // }

    const handleCloseThankYouDialog = () => {
        setOpenThankYouDialog(false);
    };

    useEffect(() => {
        if (cartData !== null && cartData !== undefined) {
            setCartCourses(cartData ? JSON.parse(cartData) : [])
        }
    }, [cartData])

    useEffect(() => {
        if (cartCourses) {
            updateFinalAmount(cartCourses)
        }
    }, [cartCourses])

    const handleRemoveItem = (item, i) => {
        let temp = [];
        cartCourses.forEach((item, x) => {
            if (x !== i) {
                temp.push(item)
            }
        })
        setCartCourses(temp);
        localStorage.setItem('cartCourses', JSON.stringify(temp));
        // If only one item was in the cart, go back
        if (cartCourses.length === 1) {
            navigate(-1);
        } else if (temp?.length === 0) {
            navigate(`/courseDetails?courseName=${encodeURIComponent('CA')}`)
        }
    }

    const updateFinalAmount = (cartItems) => {
        const totalAmount = cartItems.reduce((sum, item) => {
            const taxLab = item.taxLab ?? 0;
            const taxLabAmount = (item.finalPrice * taxLab) / 100;
            return sum + (item.finalPrice + taxLabAmount);
        }, 0);

        setFinalAmounts(totalAmount);
    };

    const handleProceedToCheckout = () => {
        setProceedToCheckoutModal(true)
    }

    const handlePreview = (type, url, title) => {
        setPreviewContent({ type, url, title });
        setPreviewModal(true);
    }

    const closePreview = () => {
        setPreviewModal(false);
        setPreviewContent({ type: '', url: '', title: '' });
    };

    const handlePlayStore = () => {
        const url = 'https://play.google.com/store/apps/details?id=com.classiolabs.classeskart'
        window.open(url, '_blank', 'noreferrer');
    };

    const handleWhatsApp = () => {
        const url = 'https://api.whatsapp.com/send/?phone=9049730883&text=Hi+Team%2C+is+there+any+related+service+available+%3F&type=phone_number&app_absent=0';
        window.open(url, '_blank', 'noreferrer');
    };

    const handleWindowStore = () => {
        const url = 'https://apps.microsoft.com/store/detail/9NVXFBT27F7V'
        window.open(url, '_blank', 'noreferrer');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <React.Fragment>
            {/* Back Button and Professional Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
                color: 'white',
                p: '30px 20px 30px 20px',
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'rgba(255,255,255,0.2)'
                }
            }}>
                <Container
                    sx={{
                        width: '100%',
                        maxWidth: '1500px',
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />}
                        sx={{
                            mb: 2,
                            color: '#1e40af',
                            borderColor: '#1e40af',
                            background: '#fff',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                background: '#e0e7ff',
                                borderColor: '#1e40af',
                                color: '#1e40af',
                            },
                        }}
                    >
                        Back
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                width: { xs: 48, md: 56 },
                                height: { xs: 48, md: 56 },
                                border: '2px solid rgba(255,255,255,0.3)'
                            }}>
                                <ShoppingCartIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                                    mb: 0.5, color:'#fff'
                                }}>
                                    Shopping Cart
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9, color:'#fff' }}>
                                    {cartCourses?.length > 0
                                        ? `${cartCourses.length} item${cartCourses.length !== 1 ? 's' : ''} in your cart`
                                        : 'Your cart is empty'
                                    }
                                </Typography>
                            </Box>
                        </Box>

                        {/* {finalAmounts > 0 && (
                            <Paper sx={{
                                px: 3,
                                py: 1.5,
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: 2
                            }}>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.5 }}>
                                    Total Amount
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#fbbf24' }}>
                                    ₹{finalAmounts.toFixed(2)}
                                </Typography>
                            </Paper>
                        )} */}
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Box sx={{
                bgcolor: '#f8fafc',
                // minHeight: 'calc(100vh - 200px)',
                py: { xs: 3, md: 4 }
            }}>
                <Container maxWidth="lg">
                    {cartCourses?.length > 0 ? (
                        <Grid container spacing={4}>
                            {/* Course List */}
                            <Grid item xs={12} md={8}>
                                <Paper sx={{
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}>
                                    <Box sx={{
                                        px: 3,
                                        py: 2,
                                        bgcolor: '#ffffff',
                                        borderBottom: '1px solid #e5e7eb'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                                            Course Details
                                        </Typography>
                                    </Box>

                                    <Box sx={{ bgcolor: '#ffffff' }}>
                                        {cartCourses.map((item, i) => {

                                            // console.log("Cart Item:", item);

                                            return (
                                                <Box key={i} sx={{
                                                    p: 3,
                                                    borderBottom: i < cartCourses.length - 1 ? '1px solid #f3f4f6' : 'none',
                                                    '&:hover': {
                                                        bgcolor: '#f9fafb'
                                                    },
                                                    transition: 'background-color 0.2s ease'
                                                }}>
                                                    <Grid container spacing={3} alignItems="center">
                                                        {/* Course Image */}
                                                        <Grid item xs={12} sm={6}>
                                                            <Box sx={{
                                                                position: 'relative',
                                                                borderRadius: 0.5,
                                                                overflow: 'hidden',
                                                                aspectRatio: '16/9',
                                                                border: '1px solid #e5e7eb',
                                                                cursor: 'pointer',
                                                                '&:hover .preview-overlay': {
                                                                    opacity: 1
                                                                }
                                                            }}
                                                                onClick={() => handlePreview('image', item?.logo ? Endpoints?.mediaBaseUrl + item?.logo : 'img/folder-2.png', item?.title)}
                                                            >
                                                                <img
                                                                    src={item?.logo ? Endpoints?.mediaBaseUrl + item?.logo : 'img/folder-2.png'}
                                                                    alt={item?.title}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover'
                                                                    }}
                                                                />
                                                                {/* Image Preview Overlay */}
                                                                <Box
                                                                    className="preview-overlay"
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: 0,
                                                                        right: 0,
                                                                        bottom: 0,
                                                                        background: 'rgba(0,0,0,0.6)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        opacity: 0,
                                                                        transition: 'opacity 0.3s ease'
                                                                    }}
                                                                >
                                                                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                                                                        <VisibilityIcon sx={{ fontSize: 32, mb: 1 }} />
                                                                        <Typography variant="caption" sx={{ display: 'block' }}>
                                                                            View Image
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Box>

                                                            {/* Video Preview if available */}
                                                            {item?.introVideo && !videoError && (
                                                                <Box
                                                                    sx={{
                                                                        position: 'relative',
                                                                        borderRadius: 1,
                                                                        overflow: 'hidden',
                                                                        aspectRatio: '16/9',
                                                                        border: '1px solid #e5e7eb',
                                                                        mt: 2,
                                                                        cursor: 'pointer',
                                                                        '&:hover .preview-overlay': {
                                                                            opacity: 1
                                                                        }
                                                                    }}
                                                                    onClick={() =>
                                                                        handlePreview(
                                                                            'video',
                                                                            Endpoints?.mediaBaseUrl + item?.introVideo,
                                                                            item?.title
                                                                        )
                                                                    }
                                                                >
                                                                    <video
                                                                        src={Endpoints?.mediaBaseUrl + item?.introVideo}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover'
                                                                        }}
                                                                        muted
                                                                        onError={() => setVideoError(true)}
                                                                    />
                                                                    {/* Video Preview Overlay */}
                                                                    <Box
                                                                        className="preview-overlay"
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            top: 0,
                                                                            left: 0,
                                                                            right: 0,
                                                                            bottom: 0,
                                                                            background: 'rgba(0,0,0,0.6)',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            opacity: 0,
                                                                            transition: 'opacity 0.3s ease'
                                                                        }}
                                                                    >
                                                                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                                                                            <PlayArrowIcon sx={{ fontSize: 48, mb: 1 }} />
                                                                            <Typography variant="caption" sx={{ display: 'block' }}>
                                                                                Play Preview
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            )}

                                                        </Grid>

                                                        {/* Course Info */}
                                                        <Grid item xs={12} sm={4}>
                                                            <Typography variant="h6" sx={{
                                                                fontWeight: 600,
                                                                color: '#111827',
                                                                mb: 1,
                                                                lineHeight: 1.4
                                                            }}>
                                                                {item?.title}
                                                            </Typography>

                                                            <Box sx={{
                                                                '& p': {
                                                                    color: '#6b7280',
                                                                    fontSize: '0.875rem',
                                                                    lineHeight: 1.5,
                                                                    margin: 0,
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden'
                                                                }
                                                            }}>
                                                                {item?.description ? parse(item?.description) :
                                                                    "Comprehensive course designed to enhance your professional skills."
                                                                }
                                                            </Box>

                                                            <Box sx={{ mt: 2 }}>
                                                                {item?.paid ? (
                                                                    <Chip
                                                                        label={`₹${item?.finalPrice.toFixed(2)}`}
                                                                        sx={{
                                                                            bgcolor: '#dbeafe',
                                                                            color: '#1e40af',
                                                                            fontWeight: 600,
                                                                            border: '1px solid #3b82f6'
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Chip
                                                                        label="FREE"
                                                                        sx={{
                                                                            bgcolor: '#dcfce7',
                                                                            color: '#166534',
                                                                            fontWeight: 600,
                                                                            border: '1px solid #22c55e'
                                                                        }}
                                                                    />
                                                                )}
                                                                {/* Selected Combination Details (from coursePricing) */}
                                                                <Box sx={{ mt: 1, background: '#f3f4f6', borderRadius: 1, p: 1 }}>
                                                                    <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                                                                        Selected Combination:
                                                                    </Typography>
                                                                    <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                                                                        {(() => {
                                                                            const selectedCombo = Array.isArray(item.coursePricing)
                                                                                ? item.coursePricing.find(cp => cp.id === item.coursePricingId)
                                                                                : null;

                                                                            if (!selectedCombo) return <li>No combination details found.</li>;

                                                                            const accessFields = [
                                                                                { key: 'liveAccess', label: 'Live Access' },
                                                                                { key: 'quizAccess', label: 'Quiz Access' },
                                                                                { key: 'onlineContentAccess', label: 'Recorded' },
                                                                                { key: 'offlineContentAccess', label: 'Pendrive' },
                                                                                { key: 'faceToFaceAccess', label: 'Face to Face' }
                                                                            ];

                                                                            return (
                                                                                <>
                                                                                    {/* {selectedCombo.price !== undefined && (
                                                                                        <li><b>Price:</b> ₹{selectedCombo.price}</li>
                                                                                    )} */}
                                                                                    {selectedCombo.expiry && (
                                                                                        <li>
                                                                                            <b>Expiry:</b>{' '}
                                                                                            {typeof selectedCombo.expiry === 'number'
                                                                                                ? new Date(selectedCombo.expiry).toLocaleDateString()
                                                                                                : selectedCombo.expiry}
                                                                                        </li>
                                                                                    )}

                                                                                    {/* Only show access fields if they are explicitly true */}
                                                                                    {accessFields.map(({ key, label }) => (
                                                                                        selectedCombo[key] === true ? (
                                                                                            <li key={key}><b>{label}</b></li>
                                                                                        ) : null
                                                                                    ))}

                                                                                    {selectedCombo.watchTime !== undefined || selectedCombo.watchTime === null && (
                                                                                        <li>
                                                                                            <b>Watch Time:</b>{' '}
                                                                                            {selectedCombo.watchTime !== null ? selectedCombo.watchTime : 'Unlimited'}
                                                                                        </li>
                                                                                    )}
                                                                                    {selectedCombo.listenTime !== undefined || selectedCombo.listenTime === null && (
                                                                                        <li>
                                                                                            <b>Listen Time:</b>{' '}
                                                                                            {selectedCombo.listenTime !== null ? selectedCombo.listenTime : 'Unlimited'}
                                                                                        </li>
                                                                                    )}
                                                                                </>
                                                                            );
                                                                        })()}
                                                                    </Box>


                                                                </Box>
                                                            </Box>
                                                        </Grid>

                                                        {/* Actions */}
                                                        <Grid item xs={12} sm={2}>
                                                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'baseline', justifyContent: 'end', width: '100%', heigh: '25vh' }}>
                                                                <IconButton
                                                                    onClick={() => handleRemoveItem(item, i)}
                                                                    sx={{
                                                                        color: '#dc2626',
                                                                        bgcolor: '#fef2f2',
                                                                        border: '1px solid #fecaca',
                                                                        '&:hover': {
                                                                            bgcolor: '#fee2e2',
                                                                            borderColor: '#fca5a5'
                                                                        }
                                                                    }}
                                                                >
                                                                    <RemoveCircleOutlineIcon />
                                                                </IconButton>

                                                                {/* <Typography variant="h6" sx={{
                                                                    fontWeight: 700,
                                                                    color: '#111827',
                                                                    textAlign: 'right'
                                                                }}>
                                                                    {item?.paid ? `₹${item?.finalPrice.toFixed(2)}` : 'FREE'}
                                                                </Typography> */}
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Order Summary */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    position: { md: 'sticky' },
                                    top: { md: 24 },
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}>
                                    <Box sx={{
                                        px: 3,
                                        py: 2,
                                        bgcolor: '#1f2937',
                                        color: 'white'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 , color:'#fff'}}>
                                            <BusinessIcon />
                                            Order Summary
                                        </Typography>
                                    </Box>

                                    <Box sx={{ p: 3, bgcolor: '#ffffff' }}>
                                        <Stack spacing={2} sx={{ mb: 3 }}>
                                            {cartCourses.map((item, i) => (
                                                <Box key={i} sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    py: 1
                                                }}>
                                                    <Typography variant="body2" sx={{
                                                        color: '#374151',
                                                        flex: 1,
                                                        pr: 2,
                                                        lineHeight: 1.4
                                                    }}>
                                                        {item?.title}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{
                                                        fontWeight: 600,
                                                        color: '#111827'
                                                    }}>
                                                        {item?.paid ? `₹${item?.finalPrice.toFixed(2)}` : 'FREE'}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>

                                        <Divider sx={{ my: 2 }} />

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 3
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                                                Total Amount
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e40af' }}>
                                                ₹{finalAmounts.toFixed(2)}
                                            </Typography>
                                        </Box>

                                        <Button
                                            fullWidth
                                            onClick={handleProceedToCheckout}
                                            endIcon={<ArrowForwardIcon />}
                                            sx={{
                                                bgcolor: '#1e40af',
                                                color: 'white',
                                                py: 2,
                                                borderRadius: 2,
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                                textTransform: 'none',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                '&:hover': {
                                                    bgcolor: '#1e3a8a',
                                                    boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.15)'
                                                }
                                            }}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : (
                        /* Empty State */
                        <Paper sx={{
                            textAlign: 'center',
                            py: 8,
                            px: 4,
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <Avatar sx={{
                                bgcolor: '#f3f4f6',
                                width: 80,
                                height: 80,
                                mx: 'auto',
                                mb: 3
                            }}>
                                <ShoppingCartIcon sx={{ fontSize: 40, color: '#9ca3af' }} />
                            </Avatar>

                            <Typography variant="h4" sx={{
                                fontWeight: 600,
                                color: '#111827',
                                mb: 2
                            }}>
                                Your Cart is Empty
                            </Typography>

                            <Typography variant="body1" sx={{
                                color: '#6b7280',
                                mb: 4,
                                maxWidth: '400px',
                                mx: 'auto'
                            }}>
                                Explore our comprehensive course catalog and add courses to get started with your learning journey.
                            </Typography>

                            <Button
                                onClick={() => navigate('/courses')}
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: '#1e40af',
                                    color: 'white',
                                    px: 4,
                                    py: 2,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        bgcolor: '#1e3a8a'
                                    }
                                }}
                            >
                                Browse Courses
                            </Button>
                        </Paper>
                    )}
                </Container>
            </Box>
            <Dialog
                open={proceedToCheckoutModal}
                onClose={() => setProceedToCheckoutModal(false)}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    },
                }}
            >
                <ProceedToCheckoutForm setProceedToCheckoutModal={setProceedToCheckoutModal} cartCourses={cartCourses} setOpenThankYouDialog={setOpenThankYouDialog} />
            </Dialog>
            <Dialog
                open={openThankYouDialog}
                // onClose={handleCloseThankYouDialog}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "600px",
                        },
                    },
                }}
            >
                <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'} p={1}>
                    {/* <CloseIcon sx={{ cursor: "pointer" }} onClick={handleCloseThankYouDialog} /> */}

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: '100%',
                            maxWidth: '40px',
                        }}
                    >
                        <Tooltip title="Back to Home" placement="top">
                            <IconButton
                                onClick={handleNavigateHome}
                                component='a'
                                href='/'
                                sx={{
                                    color: theme.palette.text.secondary,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    borderRadius: '12px',
                                    p: 1,
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                        background: '#f1f5f9',
                                    },
                                }}
                            >
                                <HomeIcon sx={{ cursor: "pointer" , fontSize: '2rem' }} />
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </Stack>
                <Box sx={{ padding: "30px" }}>

                    <Typography
                        fontSize={'15px'}
                        fontWeight={'500'}
                        sx={{ mb: 2 }}
                    >
                        ✅ Your enrollment in the test series is successful!
                    </Typography>
                    <Typography
                        fontSize={'15px'}
                        fontWeight={'500'}
                        sx={{ mb: 2 }}
                    >
                        📲 To access the test series, please install our Android or Windows app.
                    </Typography>
                    <Typography
                        fontSize={'15px'}
                        fontWeight={'500'}
                        sx={{ mb: 2 }}
                    >
                        👇 Click on the icon below to install the app.
                    </Typography>
                    <Typography
                        fontSize={'15px'}
                        fontWeight={'500'}
                        sx={{ mb: 4 }}
                    >
                        💬 Need any help? Reach out to us on WhatsApp – we're here for you!
                    </Typography>


                    <Stack direction={'row'} spacing={2} pb={4} justifyContent={'center'}>
                        <img
                            onClick={handlePlayStore}
                            alt=''
                            src={playStore}
                            style={{
                                position: 'relative',
                                // right: isMobile ? '0.5rem' : '1rem',
                                width: '100%',
                                maxWidth: '150px',
                                cursor: "pointer"
                            }}
                        />
                        <img
                            onClick={handleWindowStore}
                            style={{
                                position: 'relative',
                                // right: isMobile ? '0.5rem' : '1rem',
                                width: '100%',
                                maxWidth: '150px',
                                cursor: "pointer"
                            }}
                            alt=''
                            src={windowsStore}
                        />
                        <WhatsAppIcon sx={{ fontSize: "43px", color: 'green' }} onClick={handleWhatsApp} />
                    </Stack>
                </Box>
            </Dialog>
        </React.Fragment>
    )
};

export default MultipleCourseCart;