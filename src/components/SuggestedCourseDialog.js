import { Badge, Box, Button, Card, CardContent, CardMedia, Checkbox, Divider, FormControl, Grid, IconButton, InputLabel, ListItemText, MenuItem, Paper, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid2';
import HTMLRenderer from "react-html-renderer";
import moment from 'moment';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import instId from '../network/instituteId';
import Network from '../network/Network';
import { useCart } from '../context/CartContext';

const SuggestedCourseDialog = ({ addedSuggestCourse, handleClose, onFinalAmountUpdate, suggestedCourseId, setCartCourses, setFinalAmounts }) => {

    // const courseId = 527;
    const theme = useTheme();
    const isMobile = useMediaQuery("(min-width:600px)");
    const [course, setCourse] = useState(null);
    const [coursePricing, setCoursePricing] = useState([]);
    const [coursePublic, setCoursesPublic] = useState([]);
    const [publicCourses, setPublicCourses] = useState([]);
    const [suggestedLength, setSuggestedLength] = useState([]);
    const [tagName, setTagName] = useState('');
    const [courseIdData, setCourseIdData] = useState({});
    const [finalCoursePricing, setFinalCoursePricing] = useState([]);
    const [selectedAccess, setSelectedAccess] = useState('');
    const [selectedVariant, setSelectedVariant] = useState("");
    const [selectedValidityType, setSelectedValidityType] = useState("");
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedWatchTime, setSelectedWatchTime] = useState(null);
    const [variationsList, setVariationsList] = useState([]);
    const [validityTypeList, settValidityTypeList] = useState([]);
    const [validityDateList, setValidityDateList] = useState([]);
    const [watchTimeList, setWatchTimeList] = useState([]);

    const discount = finalCoursePricing[0]?.discount ?? 0;
    const taxLab = course?.taxLab ?? 0;
    const price = finalCoursePricing[0]?.price ?? 0;

    const discountedAmount = (price * discount) / 100;
    const finalPrice = price - discountedAmount;
    const taxLabAmount = (finalPrice * taxLab) / 100;
    const finalAmount = finalPrice + taxLabAmount;


    useEffect(() => {
        if (variationsList.length === 1) {
            setSelectedVariant(variationsList[0]);
        }
        if (validityTypeList.length === 1) {
            setSelectedValidityType(validityTypeList[0]);
        }
        // Only set default selectedDuration if not already set
        if (validityDateList.length > 0 && (selectedDuration === null || !validityDateList.includes(selectedDuration))) {
            setSelectedDuration(validityDateList[0]);
        }
        if (watchTimeList.length === 1) {
            setSelectedWatchTime(watchTimeList[0] === "Unlimited" ? "Unlimited" : Number(watchTimeList[0]));
        }
    }, [variationsList, validityTypeList, validityDateList, watchTimeList]);

    useEffect(() => {
        const uniqueModes = getUniqueLearningModes();
        if (uniqueModes.length > 0) {
            setSelectedAccess(uniqueModes[0]);
        }
    }, [coursePricing]);

    useEffect(() => {
        filterCourses();
    }, [selectedAccess, selectedVariant, selectedValidityType, selectedDuration, selectedWatchTime]);

    useEffect(() => {
        getCourseById();
    }, [suggestedCourseId]);

    useEffect(() => {
        getAllCourses();
    }, [coursePublic]);

    useEffect(() => {
        getAllCoursesPublic();
    }, []);

    useEffect(() => {
        const activeCourses = publicCourses.filter(item => item.active === true);

        const filteredCourses = activeCourses.filter(item =>
            (item.tags || []).some(tag => tag.id === coursePublic?.setting?.checkoutTag) &&
            item.id !== Number(suggestedCourseId)
        );

        const tagNames = activeCourses.filter(item =>
            (item?.tags || []).some(tag => tag?.id === coursePublic?.setting?.checkoutTag)
        );

        function findTagById(dataArray, id) {
            let matchedTag = null;
            dataArray.forEach(item => {
                if (item?.tags && Array.isArray(item?.tags)) {
                    const tag = item?.tags.find(tag => tag.id === id);
                    if (tag) {
                        matchedTag = tag;
                        return;
                    }
                }
            });
            return matchedTag;
        }

        const matchedTag = findTagById(tagNames, coursePublic?.setting?.checkoutTag);
        setTagName(matchedTag);
        setSuggestedLength(filteredCourses);

        if (activeCourses.length > 0) {
            const selectedCourse = activeCourses.find(item => suggestedCourseId === item.id);
            if (selectedCourse) {
                setCourseIdData(selectedCourse);
            }
        }
    }, [publicCourses, suggestedCourseId, coursePublic]);

    const getCourseById = async () => {
        if (!suggestedCourseId) return;
        try {
            let response = await Network.fetchCourseById(suggestedCourseId);
            setCourse(response?.course || null);
            let coursePricing = response?.course?.coursePricing;
            setCoursePricing(coursePricing);
        } catch (error) {
            console.error("Error fetching course:", error);
        };
    };

    const getAllCoursesPublic = async () => {
        try {
            const response = await Network.getBuyCourseDetailsSecond(Number(suggestedCourseId));
            setCoursesPublic(response.course);
            // getInstituteDetail(response.course?.instId);
        } catch (error) {
            console.log(error);
        };
    };

    const getAllCourses = async () => {
        try {
            const response = await Network.fetchCourses(instId);
            setPublicCourses(response.courses);
        } catch (error) {
            console.log(error);
        };
    };


    const getUniqueLearningModes = () => {
        const modeSet = new Set();

        coursePricing?.forEach(course => {
            let modes = [];
            if (course.liveAccess) modes.push("Live Access");
            if (course.onlineContentAccess) modes.push("Recorded");
            if (course.offlineContentAccess) modes.push("Pendrive");
            if (course.faceToFaceAccess) modes.push("Face to Face");
            if (course.quizAccess) modes.push("Quiz Access");
            if (modes.length) {
                modeSet.add(modes.join(" + "));
            }
        });

        return Array.from(modeSet);
    };

    const filterCourses = () => {
        let filtered = [...coursePricing];
        if (selectedAccess) {

            filtered = coursePricing?.filter(course => {
                const selectedModes = selectedAccess.split(" + ");

                const matchesSelection = (
                    (selectedModes.includes("Live Access") ? course.liveAccess === true : course.liveAccess === null) &&
                    (selectedModes.includes("Recorded") ? course.onlineContentAccess === true : course.onlineContentAccess === null) &&
                    (selectedModes.includes("Pendrive") ? course.offlineContentAccess === true : course.offlineContentAccess === null) &&
                    (selectedModes.includes("Quiz Access") ? course.quizAccess === true : course.quizAccess === null) &&
                    (selectedModes.includes("Face to Face") ? course.faceToFaceAccess === true : course.faceToFaceAccess === null)
                );

                return matchesSelection;
            });
        };

        const variationsList = newgetVariationList(filtered);
        setVariationsList(variationsList)

        if (selectedVariant) {
            filtered = filtered?.filter((course) =>
                selectedVariant === "None"
                    ? !course.variation || course.variation.trim() === ""
                    : course.variation === selectedVariant
            );
        }

        const validityTypes = [...new Set(filtered.map(course => course.validityType))];
        settValidityTypeList(validityTypes);


        if (selectedValidityType) {
            filtered = filtered?.filter(course => course.validityType === selectedValidityType);
        }

        const validityDates = [
            ...new Set(
                filtered.map(course =>
                    selectedValidityType === "validity"
                        ? formatMilliseconds(course.duration)
                        : formatTimestamp(course.expiry)
                ).filter(value => value !== "N/A")
            )
        ];

        setValidityDateList(validityDates);

        if (selectedDuration) {
            filtered = filtered?.filter(course =>
                selectedValidityType === "validity"
                    ? formatMilliseconds(course.duration) === selectedDuration
                    : formatTimestamp(course.expiry) === selectedDuration
            );
        }

        const watchTimeList = filtered?.map(course =>
            course.watchTime ? course.watchTime : "Unlimited"
        );
        setWatchTimeList([...new Set(watchTimeList)]);

        if (selectedWatchTime !== null && selectedWatchTime !== undefined) {

            filtered = filtered?.filter(course =>
                selectedWatchTime === "Unlimited"
                    ? course.watchTime === null || course.watchTime === undefined || course.watchTime === ""
                    : Number(course.watchTime) === Number(selectedWatchTime)
            );
        }

        setFinalCoursePricing(filtered);
    };

    const newgetVariationList = (filtered) => {
        const variationsSet = new Set();

        filtered?.forEach((course) => {
            if (course.variation && course.variation.trim() !== "") {
                variationsSet.add(course.variation);
            }
        });

        if (filtered?.some((course) => !course.variation || course.variation === null || course.variation.trim() === "")) {
            variationsSet.add("None");
        }

        return Array.from(variationsSet);
    };

    function formatMilliseconds(ms) {
        if (!ms) return "N/A";

        const millisecondsInYear = 365 * 24 * 60 * 60 * 1000;
        const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
        const millisecondsInDay = 24 * 60 * 60 * 1000;

        const years = Math.floor(ms / millisecondsInYear);
        ms %= millisecondsInYear;

        const months = Math.floor(ms / millisecondsInMonth);
        ms %= millisecondsInMonth;

        const days = Math.floor(ms / millisecondsInDay);

        let result = [];
        if (years > 0) result.push(`${years} Year${years > 1 ? 's' : ''}`);
        if (months > 0) result.push(`${months} Month${months > 1 ? 's' : ''}`);
        if (days > 0) result.push(`${days} Day${days > 1 ? 's' : ''}`);

        return result.length > 0 ? result.join(" ") : "N/A";
    }

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "N/A";

        return new Date(timestamp).toLocaleDateString();
    };

    const handleChangeAccess = (event) => { setSelectedAccess(event.target.value); }
    const handleSelectVariant = (event) => setSelectedVariant(event.target.value);
    const handleSelectValidityType = (event) => setSelectedValidityType(event.target.value);
    const handleSelectDuration = (event) => setSelectedDuration(event.target.value);
    const handleSelectWatchTime = (event) => setSelectedWatchTime(event.target.value !== "Unlimited" ? Number(event.target.value) : event.target.value);

    const handleAddedInCart = (course, combination) => {
        if (!combination) {
            console.error('Error: Missing combination pricing object');
            return;
        }

        setCartCourses((prevCart) => {
            const isAlreadyAdded = prevCart.some((item) => item.coursePricingId === combination.id);

            if (isAlreadyAdded) {
                const updatedCart = prevCart.filter((item) => item.coursePricingId !== combination.id);
                updateFinalAmount(updatedCart);
                return updatedCart;
            } else {
                const discount = combination.discount ?? 0;
                const price = combination.price ?? 0;
                const discountedAmount = (price * discount) / 100;
                const finalPrice = price - discountedAmount;
                const updatedCourse = {
                    ...course,
                    finalPrice,
                    coursePricingId: combination.id
                };

                const updatedCart = [...prevCart, updatedCourse];
                updateFinalAmount(updatedCart);
                return updatedCart;
            }
        });
        handleClose();
    };

    const updateFinalAmount = (cartItems) => {
        const totalAmount = cartItems.reduce((sum, item) => {
            const taxLab = item.taxLab ?? 0;
            const taxLabAmount = (item.finalPrice * taxLab) / 100;
            return sum + (item.finalPrice + taxLabAmount);
        }, 0);

        setFinalAmounts(totalAmount);
    };

    const { addToCart } = useCart();

    const handleAddToCart = (course ,combination) => {
        const item = {
            id: course.id,
            name: course.name,
            price: course.price,
            // any other properties
        };
        setCartCourses((prevCart) => {
            const isAlreadyAdded = prevCart.some((item) => item.coursePricingId === combination.id);

            if (isAlreadyAdded) {
                const updatedCart = prevCart.filter((item) => item.coursePricingId !== combination.id);
                updateFinalAmount(updatedCart);
                return updatedCart;
            } else {
                const discount = combination.discount ?? 0;
                const price = combination.price ?? 0;
                const discountedAmount = (price * discount) / 100;
                const finalPrice = price - discountedAmount;
                const updatedCourse = {
                    ...course,
                    finalPrice,
                    coursePricingId: combination.id
                };

                const updatedCart = [...prevCart, updatedCourse];
                updateFinalAmount(updatedCart);
                localStorage.setItem('cartCourses', JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
        handleClose();
        addToCart(item);
    };

    return (
        <Box
            sx={{
                // maxWidth: 500,
                width: '100%',
                margin: 'auto',
                backgroundColor: 'white',
                borderRadius: 2,
                // overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
        >
            {/* Header Section with Blue Background */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    p: 1,
                    position: 'relative'
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CancelIcon />
                </IconButton>

                {/* Course Configuration Badge */}
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: 20,
                        px: 2,
                        py: 0.5,
                        mb: 2,
                        fontSize: '12px',
                        fontWeight: 500
                    }}
                >
                    ⚙️ Course Configuration
                </Box>

                {/* Course Title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: '18px'
                    }}
                >
                    {course?.title || 'CSEET NOVEMBER 2025'}
                </Typography>

                {/* Course Description */}
                <Typography
                    variant="body2"
                    sx={{
                        opacity: 0.9,
                        lineHeight: 1.4
                    }}
                >
                    {course?.shortDescription || 'LIVE + RECORDED CLASSES WITH TEST SERIES & WRITING PRACTICE'}
                </Typography>
            </Box>

            {/* Form Content */}
            <Box sx={{ p: 3 }}>
                <Stack spacing={3}>
                    {/* Lecture Mode Dropdown: Only show if more than one option */}
                    {getUniqueLearningModes()?.length > 1 && (
                        <FormControl fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: '14px',
                                    '&.MuiInputLabel-shrunk': {
                                        color: '#666'
                                    }
                                }}
                            >
                                🎯 LECTURE MODE
                            </InputLabel>
                            <Select
                                label="🎯 LECTURE MODE"
                                value={selectedAccess}
                                onChange={handleChangeAccess}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa'
                                    },
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }
                                }}
                            >
                                {getUniqueLearningModes()?.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#f44336'
                                                }}
                                            />
                                            {option}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Course Variant: Only show if more than one option */}
                    {variationsList?.length > 1 && selectedAccess && (
                        <FormControl fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: '14px',
                                    '&.MuiInputLabel-shrunk': {
                                        color: '#666'
                                    }
                                }}
                            >
                                📋 COURSE VARIANT
                            </InputLabel>
                            <Select
                                label="📋 COURSE VARIANT"
                                value={selectedVariant}
                                onChange={handleSelectVariant}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa'
                                    },
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }
                                }}
                            >
                                {variationsList.map((variant) => (
                                    <MenuItem key={variant} value={variant}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#ff9800'
                                                }}
                                            />
                                            {variant === "None" ? "WITH HARD COPY NOTES" : variant}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Validity Type: Only show if more than one option */}
                    {validityTypeList?.length > 1 && selectedAccess && (
                        <FormControl fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: '14px',
                                    '&.MuiInputLabel-shrunk': {
                                        color: '#666'
                                    }
                                }}
                            >
                                🔄 VALIDITY TYPE
                            </InputLabel>
                            <Select
                                label="🔄 VALIDITY TYPE"
                                value={selectedValidityType}
                                onChange={handleSelectValidityType}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa'
                                    },
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }
                                }}
                            >
                                {validityTypeList?.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#4caf50'
                                                }}
                                            />
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Expiry Duration: Only show if more than one option and not lifetime */}
                    {selectedValidityType && selectedValidityType !== "lifetime" && validityDateList?.length > 1 && (
                        <FormControl fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: '14px',
                                    '&.MuiInputLabel-shrunk': {
                                        color: '#666'
                                    }
                                }}
                            >
                                📅 EXPIRY DURATION
                            </InputLabel>
                            <Select
                                label="📅 EXPIRY DURATION"
                                value={selectedDuration || ''}
                                onChange={handleSelectDuration}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa'
                                    },
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }
                                }}
                            >
                                {validityDateList?.map((duration) => (
                                    <MenuItem key={duration} value={duration}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#9c27b0'
                                                }}
                                            />
                                            {duration}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Watch Time Limit: Only show if more than one option */}
                    {selectedValidityType && watchTimeList?.length > 1 && (
                        <FormControl fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: '14px',
                                    '&.MuiInputLabel-shrunk': {
                                        color: '#666'
                                    }
                                }}
                            >
                                ⏰ WATCH TIME LIMIT
                            </InputLabel>
                            <Select
                                label="⏰ WATCH TIME LIMIT"
                                value={selectedWatchTime}
                                onChange={handleSelectWatchTime}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#f8f9fa'
                                    },
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }
                                }}
                            >
                                {watchTimeList?.map((watchTime) => (
                                    <MenuItem key={watchTime} value={watchTime ? watchTime : "Unlimited"}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#ff5722'
                                                }}
                                            />
                                            {watchTime !== "Unlimited" ? `${watchTime}x` : watchTime}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Stack>
            </Box>

            {/* Pricing Summary Section */}
            <Box
                sx={{
                    backgroundColor: '#f8f9fa',
                    p: 3,
                    borderTop: '1px solid #e0e0e0'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1976d2'
                    }}
                >
                    💰 PRICING SUMMARY
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Course Price:
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            ₹{price.toFixed(2)}
                        </Typography>
                    </Box>
                    {discount > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Discount ({discount}%):
                            </Typography>
                            <Typography variant="body2" color="success.main" fontWeight={600}>
                                -₹{discountedAmount.toFixed(2)}
                            </Typography>
                        </Box>
                    )}
                    {taxLab > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Tax ({taxLab}%):
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                                +₹{taxLabAmount.toFixed(2)}
                            </Typography>
                        </Box>
                    )}
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight={700}>
                            TOTAL AMOUNT:
                        </Typography>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{
                                color: '#1976d2',
                                fontSize: '20px'
                            }}
                        >
                            ₹{finalAmount.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                {/* Add to Cart Button */}
                <Button
                    onClick={() => {
                        // console.log('Selected Combination:', finalCoursePricing[0]);
                        handleAddToCart(course, finalCoursePricing[0]);
                    }}
                    fullWidth
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                        color: 'white',
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}
                >
                    🛒 Add to Cart
                </Button>
            </Box>
        </Box>
    )
}

export default SuggestedCourseDialog
