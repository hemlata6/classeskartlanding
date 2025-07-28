import { Box, Button, Card, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, useMediaQuery, Dialog, DialogContent, keyframes } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../network/endpoints";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import instId from "../network/instituteId";
import { Stack } from "@mui/system";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const ProceedToCheckoutForm = ({ cartCourses, setProceedToCheckoutModal, setOpenThankYouDialog }) => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [payloadCart, setPayloadCart] = useState([]);
    const [checkCoupon, setCheckCoupon] = useState([]);
    const [finalAmounts, setFinalAmounts] = useState(0);
    const [reedemCode, setReedemCode] = useState(false);
    const [couponNumber, setCouponNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isCouponValid, setIsCouponValid] = useState(null);

    const [couponDiscount, setCouponDiscount] = useState(0);

    const getColor = () => {
        if (isCouponValid === null) return 'darkblue';
        return isCouponValid ? '#329908' : 'red';
    };

    const handleNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setNumber(value);
            setError('');
            if (value.length < 10) {
                setError('Number must be 10 digits long');
            }
        }
    };

    useEffect(() => {
        if (cartCourses?.length > 0) {
            const updatedTotal = cartCourses.reduce((sum, item) => sum + (item.finalPrice ?? 0), 0);

            const updatedPurchaseArray = cartCourses.map(item => ({
                "purchaseType": "course",
                "entityId": item?.id,
                "campusId": 0,
                "courseId": 0,
                "coursePricingId": item.coursePricingId
            }));
            const checkCouponArray = cartCourses.map(item => ({
                "purchaseType": "course",
                "entityId": item?.id
            }));
            setCheckCoupon(checkCouponArray)
            setPayloadCart(updatedPurchaseArray);
            setFinalAmounts(updatedTotal);
        } else {
            // Reset if cart is empty
            setFinalAmounts(0);
            setPayloadCart([]);
        }
    }, [cartCourses]);

    const handleReedemCode = () => {
        setReedemCode(!reedemCode)
    }

    const handleCoupon = (e) => {
        setCouponNumber(e.target.value);
        setErrorMessage('');
        setIsCouponValid(null);
    }
    const handleCheckCoupon = async (e) => {
        e.preventDefault();
        const body = {
            "getCheckoutUrls": checkCoupon,
            "coupon": couponNumber,
            "contact": Number(number),
            "instId": instId,
            "amount": finalAmounts
        }
        try {
            const response = await axios.post(BASE_URL + `/student/coupon/verify`, body);
            // const response = await CourseNetwrok.checkCouponApi(body);
            if (response.data.errorCode === 0) {
                setCouponDiscount(response.data?.discount);
                setIsCouponValid(response.data?.valid);
                setErrorMessage("");
            } else {
                setIsCouponValid(response.data?.valid === null ? false : response.data?.valid);
                setErrorMessage(response.data?.message ? response.data?.message : "Invalid Coupon Code");
                setCouponDiscount(0)
                // setErrorMessage("Invalid Coupon Code")
            }
        } catch (err) {
            console.log(err);
        };
    };

    const handleSubmit = async () => {
        const body = {
            "firstName": title,
            "lastName": title,
            "contact": number,
            "email": email,
            "instId": instId,
            "campaignId": null,
            "coupon": "",
            "coursePricingId": 0,
            "entityModals": payloadCart
        }
        try {
            const response = await axios.post(BASE_URL + `/admin/payment/fetch-public-checkout-url`, body);

            if (response?.data?.status === true) {

                const width = 480;
                const height = 1080;
                const left = window.screenX + (window.outerWidth / 2) - (width / 2);
                const top = window.screenY + (window.outerHeight / 2) - (height / 2);

                window.open(
                    response?.data?.url,
                    'sharer',
                    `location=no,width=${width},height=${height},top=${top},left=${left}`
                );

                // window.open(response?.data?.url, '_blank', "noopener,noreferrer");
                // window.open(response?.data?.url, 'sharer', "location=no,width=480,height=1080");

                setTitle('');
                setNumber('');
                setEmail('')
                setPayloadCart([])
                setProceedToCheckoutModal(false);
                setOpenThankYouDialog(true);
                localStorage.removeItem('cartCourses');
            }

        } catch (err) {
            console.log(err);
        };
    };

    return (
        <Dialog
            open={true}
            onClose={() => setProceedToCheckoutModal(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    background: 'transparent',
                    boxShadow: 'none',
                    // overflow: 'visible'
                }
            }}
        >
            <DialogContent sx={{ p: 0, overflow: 'visible' }}>
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%)',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `
                                radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                                radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
                            `,
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: `
                                conic-gradient(from 0deg at 50% 50%, 
                                transparent 0deg,
                                rgba(59, 130, 246, 0.03) 60deg,
                                transparent 120deg,
                                rgba(99, 102, 241, 0.03) 180deg,
                                transparent 240deg,
                                rgba(139, 92, 246, 0.03) 300deg,
                                transparent 360deg)
                            `,
                            animation: `${shimmer} 8s linear infinite`,
                            pointerEvents: 'none',
                        },
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={() => setProceedToCheckoutModal(false)}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 1000,
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            color: '#475569',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 1)',
                                color: '#1e293b',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            p: 2,
                        }}
                    >
                        {/* Header Section */}
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#1e293b',
                                    fontWeight: '700',
                                    mb: 1,
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    animation: `${fadeInUp} 0.6s ease-out`,
                                    fontSize : { xs: '1.25rem', sm: '1.25rem', md: '1.25rem', lg: '1.25rem'  },
                                }}
                            >
                                💳 Checkout Details
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#64748b',
                                    animation: `${fadeInUp} 0.8s ease-out`,
                                }}
                            >
                                Complete your purchase in just a few steps
                            </Typography>
                        </Box>

                        {/* Form Container */}
                        <Box
                            sx={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                border: '1px solid rgba(59, 130, 246, 0.15)',
                                padding: '15px',
                                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.08)',
                                animation: `${fadeInUp} 1s ease-out`,
                            }}
                        >
                            {/* Full Name Field */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#475569', mr: 1 }}>
                                        👤
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                        Full Name
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter your full name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            color: '#1e293b',
                                            fontSize: '14px',
                                            '&:hover': {
                                                border: '1px solid rgba(59, 130, 246, 0.4)',
                                            },
                                            '&.Mui-focused': {
                                                border: '1px solid rgba(59, 130, 246, 0.6)',
                                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
                                            },
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: '#1e293b',
                                            '&::placeholder': {
                                                color: '#64748b',
                                                opacity: 1,
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            {/* Phone Number Field */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#475569', mr: 1 }}>
                                        📱
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                        Phone Number
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter 10-digit phone number"
                                    value={number}
                                    onChange={handleNumberChange}
                                    error={!!error}
                                    helperText={error}
                                    inputProps={{ maxLength: 10 }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            color: '#1e293b',
                                            fontSize: '14px',
                                            '&:hover': {
                                                border: '1px solid rgba(59, 130, 246, 0.4)',
                                            },
                                            '&.Mui-focused': {
                                                border: '1px solid rgba(59, 130, 246, 0.6)',
                                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
                                            },
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: '#1e293b',
                                            '&::placeholder': {
                                                color: 'rgba(30, 41, 59, 0.6)',
                                                opacity: 1,
                                            },
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: '#dc2626',
                                            fontWeight: '500',
                                        },
                                    }}
                                />
                            </Box>

                            {/* Email Field */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#475569', mr: 1 }}>
                                        ✉️
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                        Email Address
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            color: '#1e293b',
                                            fontSize: '14px',
                                            '&:hover': {
                                                border: '1px solid rgba(59, 130, 246, 0.4)',
                                            },
                                            '&.Mui-focused': {
                                                border: '1px solid rgba(59, 130, 246, 0.6)',
                                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
                                            },
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: '#1e293b',
                                            '&::placeholder': {
                                                color: 'rgba(30, 41, 59, 0.6)',
                                                opacity: 1,
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            {/* Coupon Code Toggle */}
                            <Box sx={{ textAlign: 'right', mb: 2 }}>
                                <Button
                                    onClick={handleReedemCode}
                                    sx={{
                                        color: '#3b82f6',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        textDecoration: 'underline',
                                        '&:hover': {
                                            background: 'transparent',
                                            color: '#1d4ed8',
                                        },
                                    }}
                                >
                                    🎟️ {reedemCode ? 'Hide' : 'Enter'} Coupon Code
                                </Button>
                            </Box>
                            {/* Coupon Code Section */}
                            {reedemCode && (
                                <Box
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '15px',
                                        padding: '20px',
                                        border: '1px solid rgba(59, 130, 246, 0.2)',
                                        mb: 3,
                                        animation: `${fadeInUp} 0.5s ease-out`,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#475569', mr: 1 }}>
                                            🎟️
                                        </Typography>
                                        <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                                            Enter Coupon Code
                                        </Typography>
                                    </Box>
                                    <OutlinedInput
                                        fullWidth
                                        placeholder="Enter your coupon code"
                                        value={couponNumber}
                                        onChange={handleCoupon}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Button
                                                    disabled={!couponNumber || !number}
                                                    onClick={handleCheckCoupon}
                                                    sx={{
                                                        minWidth: 'auto',
                                                        px: 2,
                                                        py: 1,
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        borderRadius: '8px',
                                                        background: isCouponValid === true 
                                                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                                            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            background: isCouponValid === true 
                                                                ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                                                                : 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                                                        },
                                                        '&.Mui-disabled': {
                                                            background: 'rgba(148, 163, 184, 0.3)',
                                                            color: 'rgba(148, 163, 184, 0.6)',
                                                        },
                                                    }}
                                                >
                                                    {isCouponValid === true ? (
                                                        <>
                                                            <CheckIcon sx={{ fontSize: '16px', mr: 0.5 }} />
                                                            Applied
                                                        </>
                                                    ) : (
                                                        'Apply'
                                                    )}
                                                </Button>
                                            </InputAdornment>
                                        }
                                        sx={{
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            color: '#1e293b',
                                            '&:hover': {
                                                border: '1px solid rgba(59, 130, 246, 0.4)',
                                            },
                                            '&.Mui-focused': {
                                                border: '1px solid rgba(59, 130, 246, 0.6)',
                                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
                                            },
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '& input': {
                                                color: '#1e293b',
                                                '&::placeholder': {
                                                    color: 'rgba(30, 41, 59, 0.6)',
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    />
                                    {errorMessage && (
                                        <FormHelperText
                                            error
                                            sx={{
                                                mt: 1,
                                                color: '#dc2626',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {errorMessage}
                                        </FormHelperText>
                                    )}
                                </Box>
                            )}
                            {/* Total Amount Section */}
                            <Box
                                sx={{
                                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    mb: 3,
                                    animation: `${float} 3s ease-in-out infinite`,
                                    boxShadow: '0 8px 25px rgba(238, 90, 36, 0.3)',
                                }}
                            >
                                <Stack 
                                // sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                direction={{ xs: 'column', sm: 'row' }} justifyContent={{ xs: 'center', sm: 'space-between' }} alignItems="center" spacing={1} mb={0}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ fontSize: '20px', mr: 1 }}>💰</Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'white',
                                                fontWeight: '700',
                                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                                fontSize:{xs: '1rem', sm: '1.25rem', md: '1.25rem', lg: '1.25rem' },
                                            }}
                                        >
                                            Total Amount:
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: '#ffeb3b',
                                            fontWeight: '700',
                                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                            textAlign: { xs: 'center', sm: 'right' },
                                            fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.25rem', lg: '1.25rem' },
                                        }}
                                    >
                                        ₹{finalAmounts.toFixed(2)}
                                    </Typography>
                                </Stack>
                            </Box>

                            {/* Payment Button */}
                            <Button
                                onClick={handleSubmit}
                                disabled={!title || !number || !email}
                                fullWidth
                                sx={{
                                    background: title && number && email
                                        ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                                        : 'rgba(148, 163, 184, 0.3)',
                                    color: 'white',
                                    py: 2,
                                    borderRadius: '15px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    textTransform: 'none',
                                    border: title && number && email 
                                        ? '1px solid rgba(59, 130, 246, 0.3)'
                                        : '1px solid rgba(148, 163, 184, 0.2)',
                                    boxShadow: title && number && email
                                        ? '0 8px 25px rgba(59, 130, 246, 0.25)'
                                        : 'none',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                                        transition: 'left 0.5s',
                                    },
                                    '&:hover': {
                                        background: title && number && email
                                            ? 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
                                            : 'rgba(148, 163, 184, 0.4)',
                                        transform: title && number && email ? 'translateY(-2px)' : 'none',
                                        boxShadow: title && number && email
                                            ? '0 12px 35px rgba(59, 130, 246, 0.35)'
                                            : 'none',
                                        '&::before': {
                                            left: '100%',
                                        },
                                    },
                                    '&.Mui-disabled': {
                                        color: 'rgba(148, 163, 184, 0.6)',
                                    },
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography sx={{ fontSize: '20px', mr: 1 }}>💳</Typography>
                                    Complete Payment
                                </Box>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
};

export default ProceedToCheckoutForm;