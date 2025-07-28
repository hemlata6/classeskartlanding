import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, keyframes, MenuItem, Select, Tooltip, Typography, useMediaQuery, Chip, CircularProgress, Snackbar, Alert, Stack, IconButton, Badge, useTheme } from "@mui/material";
import instId from "../network/instituteId";
import Network from "../network/Network";
import parse from "html-react-parser";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QuizIcon from '@mui/icons-material/Quiz';
import TimerIcon from '@mui/icons-material/Timer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from "react-router-dom";
// import { useCart } from '../context/CartContext';
// import CartSidebar from './CartSidebar';
// import CartIcon from './CartIcon';
import { motion } from 'framer-motion';
import SuggestedCourseDialog from "./SuggestedCourseDialog";
import Endpoints from "../network/endpoints";
import { useCart } from "../context/CartContext";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const TestSeriesShowcaseSection = ({ endpointsUrl, firstFilter, secondFilter, thirdFilter, setTestSeries, selectedDomain, instituteSlug }) => {

    const zoomInOut = keyframes`
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    `;

    let cartData = localStorage.getItem('cartCourses');
    const theme = useTheme();
    // let cartData = localStorage.getItem('selectedTestSeries');
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(min-width:600px)");
    const [levelOne, setLevelOne] = useState([]);
    const [levelTwo, setLevelTwo] = useState([]);
    const [levelThree, setLevelThree] = useState([]);
    const [selectedLevelOne, setSelectedLevelOne] = useState(null);
    const [selectedLevelTwo, setSelectedLevelTwo] = useState(null);
    const [selectedLevelThree, setSelectedLevelThree] = useState(null);
    const [testSeriesList, setTestSeriesList] = useState([]);
    const [filterTestSeriesMockWise, setFilterTestSeriesMockWise] = useState([]);
    const [filterTestSeriesPracticeWise, setFilterTestSeriesPracticeWise] = useState([]);
    const [filterTestSeriesGroupWise, setFilterTestSeriesGroupWise] = useState([]);
    const [filterTestSeriesSubjectWise, setFilterTestSeriesSubjectWise] = useState([]);
    const [testSeriesExpandedDescriptions, setTestSeriesExpandedDescriptions] = useState(false);
    const [fullDes, setFullDes] = useState('');
    const [selectedTestSeries, setSelectedTestSeries] = useState([]);
    const [domainList, setDomainList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [configDialogOpen, setConfigDialogOpen] = useState(false);
    const [configItem, setConfigItem] = useState(null);
    const [selectedLectureMode, setSelectedLectureMode] = useState('');
    const [selectedExpiryDuration, setSelectedExpiryDuration] = useState('');
    const [selectedWatchLimit, setSelectedWatchLimit] = useState('');
    const [suggestedCourseDialog, setSuggestedCourseDialog] = useState(false);
    const [suggestedCourseId, setSuggestedCourseId] = useState(null);
    const [addedSuggestCourse, setAddedSuggestCourse] = useState({});
    const [cartCourses, setCartCourses] = useState([]);

    // Sync cartCourses with localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cartCourses');
        if (storedCart) {
            try {
                const parsed = JSON.parse(storedCart);
                if (Array.isArray(parsed)) {
                    setCartCourses(parsed);
                }
            } catch (e) { }
        }
    }, []);
    const [finalAmounts, setFinalAmounts] = useState(0);
    const [finalAmountsss, setFinalAmountsss] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartItems = [] } = useCart() || {};
    const cartCount = cartItems.length;



    const handleNavigateCart = () => {
        navigate('/cart-course');
        setMobileOpen(false); // Close mobile drawer when navigating
    };

    // Cart functionality
    // const { addToCart, items: cartItems } = useCart();

    // Helper to get minimum price for any test series item
    const getMinPrice = (item) => {
        if (item?.coursePricing && item.coursePricing.length > 0) {
            const minPrice = Math.min(...item.coursePricing.map(pricing => {
                const finalPrice = pricing.discount && pricing.discount > 0
                    ? pricing.price - (pricing.price * (pricing.discount / 100))
                    : pricing.price;
                return finalPrice;
            }));
            return minPrice;
        }
        // fallback to item.price if no coursePricing
        if (item.price !== undefined && item.price !== null) {
            if (item.discount && item.discount > 0) {
                return item.price - (item.price * (item.discount / 100));
            }
            return item.price;
        }
        return 0;
    };

    // const handleAddtoCart = (course) => {

    //     setCartCourses((prevCart) => {
    //         const isAlreadyAdded = prevCart.some(item => item.id === course.id);

    //         let updatedCart;

    //         if (isAlreadyAdded) {
    //             updatedCart = prevCart.filter(item => item.id !== course.id);
    //         } else {
    //             setAddedSuggestCourse(course);
    //             setSuggestedCourseId(course.id);
    //             setSuggestedCourseDialog(true);
    //             return prevCart;
    //         }
    //         return updatedCart;
    //     });
    // };

    const handleCloseSuggestedCourseDialog = () => {
        setSuggestedCourseDialog(false);
    };

    useEffect(() => {
        getDomainList();
    }, [instituteSlug, selectedDomain])

    useEffect(() => {
        if (domainList?.length > 0) {
            getCourseList();
        }
    }, [domainList])

    useEffect(() => {
        if (cartData !== null && cartData !== undefined) {
            setSelectedTestSeries(cartData ? JSON.parse(cartData) : [])
        }
    }, [cartData])

    useEffect(() => {
        if (!testSeriesList || testSeriesList.length === 0) return;

        let filtered = [...testSeriesList];

        const domainFilterMatch = (item, filterId) =>
            Array.isArray(item.domain) &&
            item.domain.some(domainItem => domainItem.id === filterId);

        // Filter by selectedLevelThree first (most specific), then selectedLevelTwo, then selectedLevelOne
        if (selectedLevelThree) {
            // console.log("🎯 Filtering by Level Three (Course):", selectedLevelThree);
            filtered = filtered.filter(item => domainFilterMatch(item, selectedLevelThree.id));
        } else if (selectedLevelTwo) {
            // console.log("🎯 Filtering by Level Two (Test Level):", selectedLevelTwo);
            filtered = filtered.filter(item => domainFilterMatch(item, selectedLevelTwo.id));
        } else if (selectedLevelOne) {
            // console.log("🎯 Filtering by Level One (Category):", selectedLevelOne);
            filtered = filtered.filter(item => domainFilterMatch(item, selectedLevelOne.id));
        }

        // console.log("📊 Filtered Test Series:", filtered);

        // Separate into mock and practice test series
        const mockTests = filtered.filter(item =>
            item.type && item.type.toLowerCase().includes('mock')
        );

        const practiceTests = filtered.filter(item =>
            item.type && item.type.toLowerCase().includes('practice')
        );

        // Separate into Group Wise and Subject Wise based on tags (similar to course filtering)
        const groupWiseTests = filtered.filter(item =>
            Array.isArray(item.tags) &&
            item.tags.some(tagObj => tagObj.tag === "Group Wise")
        );

        const subjectWiseTests = filtered.filter(item =>
            Array.isArray(item.tags) &&
            item.tags.some(tagObj => tagObj.tag === "Subject Wise")
        );

        // console.log("📚 Group Wise Tests:", groupWiseTests);
        // console.log("📝 Subject Wise Tests:", subjectWiseTests);

        const allTestSeries = [...mockTests, ...practiceTests];
        setTestSeries(allTestSeries)
        setFilterTestSeriesMockWise(mockTests);
        setFilterTestSeriesPracticeWise(practiceTests);
        setFilterTestSeriesGroupWise(groupWiseTests);
        setFilterTestSeriesSubjectWise(subjectWiseTests);
    }, [selectedLevelOne, selectedLevelTwo, selectedLevelThree, testSeriesList, selectedDomain]);

    const getDomainList = async () => {
        try {
            const domainResponse = await Network.fetchDomain(instId);
            // console.log("🔍 Domain Response:", domainResponse);
            // console.log("📍 Institute Slug:", instituteSlug);
            // console.log("🎯 Selected Domain:", selectedDomain);

            if (domainResponse?.errorCode === 0) {
                const data = domainResponse?.domains;
                setDomainList(data);
                // console.log("📊 All Domains Data:", data);

                // Find subdomain by instituteSlug if provided
                const findSubdomainBySlug = (nodes, slug) => {
                    if (!slug) return null;
                    // console.log("🔍 Searching for slug:", slug);

                    for (const node of nodes) {
                        // Convert node name to slug format for comparison
                        const nodeSlug = node.name.toLowerCase().replace(/\s+/g, '-');
                        // console.log(`📝 Comparing "${nodeSlug}" with "${slug}"`);

                        if (nodeSlug === slug) {
                            // console.log("✅ Found matching subdomain:", node);
                            return node;
                        }
                        if (node.child?.length > 0) {
                            const found = findSubdomainBySlug(node.child, slug);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                // If instituteSlug is provided, try to find the specific subdomain
                if (instituteSlug) {
                    // console.log("🎯 Searching for subdomain with slug:", instituteSlug);
                    const subdomainMatch = findSubdomainBySlug(data, instituteSlug);

                    if (subdomainMatch) {
                        // console.log("✅ Found subdomain match:", subdomainMatch);
                        // console.log("👶 Subdomain children:", subdomainMatch.child);

                        // Set the subdomain as selectedLevelOne (this will be the category)
                        setSelectedLevelOne(subdomainMatch);
                        setLevelOne([subdomainMatch]); // Set as only option

                        // Set children as levelTwo options
                        const levelTwoData = subdomainMatch.child || [];
                        setLevelTwo(levelTwoData);
                        // console.log("📚 Level Two Data (children):", levelTwoData);

                        if (levelTwoData.length > 0) {
                            setSelectedLevelTwo(levelTwoData[0]);
                            // console.log("🎯 Auto-selected Level Two:", levelTwoData[0]);

                            // Check if level two has children (level three)
                            const levelThreeData = levelTwoData[0].child || [];
                            setLevelThree(levelThreeData);
                            // console.log("📚 Level Three Data (courses):", levelThreeData);

                            if (levelThreeData.length > 0) {
                                setSelectedLevelThree(levelThreeData[0]);
                                // console.log("🎯 Auto-selected Level Three:", levelThreeData[0]);
                            } else {
                                setSelectedLevelThree(null);
                            }
                        }
                        return; // Early return as we found the specific subdomain
                    } else {
                        // console.log("❌ No subdomain match found for slug:", instituteSlug);
                    }
                }

                // Fallback to original logic if no instituteSlug match
                const findNodeById = (nodes) => {
                    for (const node of nodes) {
                        if (node.id === selectedDomain) {
                            return node;
                        }
                        if (node.child?.length > 0) {
                            const found = findNodeById(node.child);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const matchedLevel = findNodeById(data);
                // console.log("🔍 Matched Level by ID:", matchedLevel);

                if (matchedLevel?.child?.length > 0) {
                    const childArray = matchedLevel.child;
                    setLevelOne(childArray);

                    let foundItem = childArray.find(item => item.id === selectedDomain);

                    if (!foundItem && childArray.length > 0) {
                        foundItem = childArray[0];
                    }

                    if (foundItem) {
                        setSelectedLevelOne(foundItem);
                        const levelTwoData = foundItem.child || [];
                        setLevelTwo(levelTwoData);
                        if (levelTwoData.length > 0) {
                            setSelectedLevelTwo(levelTwoData[0]);
                        }
                    }
                } else {
                    setLevelOne([]);
                }
            }
        } catch (error) {
            console.error("Error fetching domain data:", error);
        }
    };

    const findDomainById = (nodes, id) => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.child?.length) {
                const found = findDomainById(node.child, id);
                if (found) return found;
            }
        }
        return null;
    };

    const getAllLeafIds = (node) => {
        if (!node.child || node.child.length === 0) {
            return [node.id];
        }
        return node.child.flatMap(child => getAllLeafIds(child));
    };

    const filterTestSeriesByThirdFilter = (testSeriesList, domainList, selectedDomain) => {
        if (!selectedDomain || !Array.isArray(domainList) || domainList.length === 0) return [];

        const matchedDomain = findDomainById(domainList, selectedDomain);

        if (!matchedDomain) return [];

        const leafIds = getAllLeafIds(matchedDomain);

        const filteredTestSeries = testSeriesList.filter(testSeries =>
            Array.isArray(testSeries.domain) &&
            testSeries.domain.some(domainItem => leafIds.includes(domainItem.id))
        );
        return filteredTestSeries;
    };

    const getCourseList = async () => {
        setIsLoading(true);
        try {
            const response = await Network.fetchCourses(instId);

            if (response?.errorCode === 0) {
                const activeTestSeries = response?.courses?.filter(testSeries =>
                    testSeries.active === true
                );
                const filteredByThird = filterTestSeriesByThirdFilter(activeTestSeries, domainList, selectedDomain);
                setTestSeriesList(selectedDomain ? filteredByThird : activeTestSeries);
                setIsLoading(false);
            } else {
                // Fallback data for testing
                const fallbackTestSeries = [
                    {
                        id: 1,
                        title: "CA Foundation Mock Test Series",
                        description: "Comprehensive mock test series for CA Foundation covering all subjects with detailed solutions and performance analysis.",
                        domain: [{ id: selectedDomain, name: "CA Foundation" }],
                        type: "mock",
                        questionsCount: 100,
                        duration: "3 hours",
                        price: 1500,
                        discount: 20,
                        paid: true,
                        active: true,
                        logo: "/test-series-logos/ca-foundation-mock.jpg"
                    },
                    {
                        id: 2,
                        title: "CA Foundation Practice Tests",
                        description: "Subject-wise practice tests for CA Foundation with instant feedback and detailed explanations.",
                        domain: [{ id: selectedDomain, name: "CA Foundation" }],
                        type: "practice",
                        questionsCount: 50,
                        duration: "1.5 hours",
                        price: 800,
                        discount: 15,
                        paid: true,
                        active: true,
                        logo: "/test-series-logos/ca-foundation-practice.jpg"
                    }
                ];
                setTestSeriesList(fallbackTestSeries);
            }
        } catch (error) {
            console.log(error);
            // Fallback data in case of error
            setIsLoading(false);
            const fallbackTestSeries = [
                {
                    id: 1,
                    title: "Sample Mock Test Series",
                    description: "Sample test series for demonstration purposes.",
                    domain: [{ id: selectedDomain, name: "Test Domain" }],
                    type: "mock",
                    questionsCount: 75,
                    duration: "2 hours",
                    price: 1000,
                    discount: 10,
                    paid: true,
                    active: true,
                    logo: "/test-series-logos/sample-mock.jpg"
                }
            ];
            setTestSeriesList(fallbackTestSeries);
        }
    };

    const handleLevelOneChange = (e) => {
        const id = parseInt(e.target.value?.id);
        setSelectedLevelOne(e.target.value);

        const selected = levelOne.find(item => item.id === id);
        const child = selected?.child || [];
        setLevelTwo(child);
    };

    const handleLevelTwoChange = (e) => {
        const id = parseInt(e.target.value?.id);
        setSelectedLevelTwo(e.target.value);

        // console.log("🔄 Level Two Changed:", e.target.value);

        // Update level three based on level two selection
        const selected = levelTwo.find(item => item.id === id);
        const levelThreeData = selected?.child || [];
        setLevelThree(levelThreeData);
        // console.log("📚 Updated Level Three Data:", levelThreeData);

        if (levelThreeData.length > 0) {
            setSelectedLevelThree(levelThreeData[0]);
            // console.log("🎯 Auto-selected Level Three:", levelThreeData[0]);
        } else {
            setSelectedLevelThree(null);
            // console.log("❌ No Level Three options available");
        }
    };

    const handleLevelThreeChange = (e) => {
        const id = parseInt(e.target.value?.id);
        setSelectedLevelThree(e.target.value);
        // console.log("🔄 Level Three Changed:", e.target.value);
    };

    const handleStartTest = (testSeries) => {
        navigate(`/test-series/${testSeries.id}`, {
            state: { testSeriesData: testSeries }
        });
    };

    const truncateDescription = (description) => {
        const decodedDescription = description
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

        const strippedDescription = decodedDescription
            .replace(/<[^>]*>/g, ' ')
            .split(/\s+/)
            .slice(0, 15)
            .join(' ');

        return strippedDescription;
    };

    const toggleExpandDescription = (des) => {
        setFullDes(des)
        setTestSeriesExpandedDescriptions(true);
    };

    const getTestTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'mock': return '#1356C5';
            case 'practice': return '#0c858b';
            default: return '#6c757d';
        }
    };

    const getTestTypeIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'mock': return <QuizIcon sx={{ fontSize: '16px' }} />;
            case 'practice': return <AssignmentIcon sx={{ fontSize: '16px' }} />;
            default: return <PlayArrowIcon sx={{ fontSize: '16px' }} />;
        }
    };

    // Cart functionality
    // const handleAddToCart = (item) => {
    //     // Open config dialog before adding to cart
    //     setConfigItem(item);
    //     setConfigDialogOpen(true);
    // };

    // Called when user confirms config dialog
    const handleConfigAddToCart = () => {
        if (!configItem) return;
        // Find selected pricing
        let selectedPricing = null;
        if (configItem.coursePricing && configItem.coursePricing.length > 0) {
            selectedPricing = configItem.coursePricing.find(pricing =>
                pricing.lectureMode === selectedLectureMode &&
                pricing.expiryDuration === selectedExpiryDuration &&
                pricing.watchLimit === selectedWatchLimit
            );
        }
        let minPrice = 0;
        if (selectedPricing) {
            minPrice = selectedPricing.discount && selectedPricing.discount > 0
                ? selectedPricing.price - (selectedPricing.price * (selectedPricing.discount / 100))
                : selectedPricing.price;
        } else if (configItem.price !== undefined && configItem.price !== null && configItem.price > 0) {
            minPrice = configItem.discount && configItem.discount > 0
                ? configItem.price - (configItem.price * (configItem.discount / 100))
                : configItem.price;
        }
        const itemWithConfig = {
            ...configItem,
            minPrice,
            selectedLectureMode,
            selectedExpiryDuration,
            selectedWatchLimit
        };
        // addToCart(itemWithConfig);
        setSnackbar({
            open: true,
            message: `${configItem.title} added to cart at ₹${minPrice.toFixed(2)}!`,
            severity: 'success'
        });
        setConfigDialogOpen(false);
        setConfigItem(null);
    };

    const isItemInCart = (itemId) => {
        // return cartItems.some(item => item.id === itemId);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleFinalAmountUpdate = (amount) => {
        setFinalAmountsss(amount);
    };

    const handleAddtoCart = (course) => {

        setCartCourses((prevCart) => {
            const isAlreadyAdded = prevCart.some(item => item.id === course.id);

            let updatedCart;

            if (isAlreadyAdded) {
                updatedCart = prevCart.filter(item => item.id !== course.id);
                localStorage.setItem('cartCourses', JSON.stringify(updatedCart));
            } else {
                setAddedSuggestCourse(course);
                setSuggestedCourseId(course.id);
                setSuggestedCourseDialog(true);
                return prevCart;
            }

            return updatedCart;
        });
    };

    // const handleNavigateHome = () => {
    //     navigate('/');
    //     setMobileOpen(false); // Close mobile drawer when navigating
    // };

    return (
        <div>
            {/* Cart Sidebar */}
            {/* <CartSidebar /> */}

            {/* Cart Icon - Fixed position */}
            {/* <Box sx={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1200,
                display: { xs: 'block', sm: 'block' }
            }}>
                <CartIcon />
            </Box> */}
            <Box sx={{
                // position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1200,
                display: { xs: 'block', sm: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2
            }}>
                <Box>
                    <Stack direction={'column'} spacing={2}>
                        {/* <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                // position: 'fixed',
                                // top: 110,
                                right: isMobile ? 32 : 2,
                                // zIndex: 2000,
                                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.15)',
                                display: 'flex',
                                justifyContent:'flex-start',
                                alignItems: 'center',
                            }}
                        > */}
                        {/* <IconButton
                                // onClick={handleNavigateCart}
                                component='a'
                                href='/'
                                // onClick={() => setMobileOpen(false)}
                                sx={{
                                    color: '#fff',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    borderRadius: '5px',
                                    background: '#1976d2',
                                    py: 2,
                                    px: 4,
                                    '&:hover': {
                                        color: '#fff',
                                        background: '#1976d2',
                                    },
                                    // fontSize: '16px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                                    fontSize: '0.650rem',
                                }}
                            > */}
                        {/* <Box sx={{background:'#0000004a', width:'100%', maxWidth:'50px', p:1, borderRadius:'50%', display:'flex', justifyContent:'center', alignItems:'center', height:'50px', mb:2, 
                            ":hover":{
                                background: '#0000004a',
                            },
                        }}> */}
                        {/* <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '100%',
                                maxWidth: '40px',

                            }}
                        >
                            <Tooltip title="Back to Home" placement="top"> */}
                        {/* <IconButton
                                    // onClick={handleNavigateHome}
                                    component='a'
                                    href='/'
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
                                > */}
                        {/* <Badge badgeContent={cartCount} color="warning"> */}
                        {/* <HomeRoundedIcon /> */}
                        <Button
                            variant="outlined"
                            component='a'
                            href='/'

                            // onClick={() => navigate(-1)}
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
                                width: '100%',
                                maxWidth: '200px',
                            }}
                        >
                            Back to Home
                        </Button>
                        {/* </Badge> */}
                        {/* </IconButton> */}
                        {/* </Tooltip>
                        </motion.div> */}
                        {/* <a href="/" style={{ textDecoration: 'none' }}>
                            <HomeRoundedIcon
                                // component='a'
                                // href='/'
                                sx={{
                                    cursor: 'pointer',
                                    color: '#1976d2',
                                    fontSize: '1.5rem',
                                    // textDecoration: 'none',
                                }}
                            />
                        </a> */}
                        {/* </Box> */}
                        {/* <Badge badgeContent={cartCount} color="warning">
                            <ShoppingCartIcon />
                        </Badge> */}
                        {/* </IconButton> */}
                        {/* </motion.div> */}
                        <Stack direction={'column'} spacing={2}>
                            {!instituteSlug && (
                                <FormControl className='mobile-select-button'>
                                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: "13px" }}>Select Test Category</InputLabel>
                                    <Select
                                        className='select-option'
                                        sx={{ mb: 3, minWidth: "100px", fontSize: "12px", width: "230px", mr: 2 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedLevelOne || ""}
                                        label="Select Test Category"
                                        onChange={handleLevelOneChange}
                                    >
                                        {
                                            levelOne && levelOne.map((data, index) => {
                                                return (
                                                    <MenuItem key={index} value={data}>{data?.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            )}

                            {/* Show selected category as read-only when instituteSlug is provided */}
                            {instituteSlug && selectedLevelOne && (
                                <Box sx={{ mb: 3, mr: 2 }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#1356C5", mb: 1 }}>
                                        Selected Institute: {selectedLevelOne.name}
                                    </Typography>
                                </Box>
                            )}

                            <Stack direction={isMobile ? 'row' : 'column'} spacing={1}>
                                <FormControl className='mobile-select-button'>
                                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: "13px" }}>Select Test Level</InputLabel>
                                    <Select
                                        className='select-option'
                                        sx={{ mb: 3, minWidth: "100px", fontSize: "12px", width: "230px", mr: 2 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedLevelTwo || ""}
                                        label="Select Test Level"
                                        onChange={handleLevelTwoChange}
                                    >
                                        {
                                            levelTwo && levelTwo.map((data, index) => {
                                                return (
                                                    <MenuItem key={index} value={data}>{data?.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>

                                {/* Show course selector if level three options are available */}
                                {levelThree && levelThree.length > 0 && (
                                    <FormControl className='mobile-select-button'>
                                        <InputLabel id="demo-simple-select-label" sx={{ fontSize: "13px" }}>Select Course</InputLabel>
                                        <Select
                                            className='select-option'
                                            sx={{ mb: 3, minWidth: "100px", fontSize: "12px", width: "230px", mr: 2 }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedLevelThree || ""}
                                            label="Select Course"
                                            onChange={handleLevelThreeChange}
                                        >
                                            {
                                                levelThree && levelThree.map((data, index) => {
                                                    return (
                                                        <MenuItem key={index} value={data}>{data?.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
                {
                    localStorage.getItem('cartCourses') && localStorage.getItem('cartCourses') !== '[]' && (
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{
                                scale: [1.3, 1.05, 1.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                position: 'fixed',
                                top: 100,
                                right: isMobile ? 32 : 40,
                                zIndex: 2000,
                                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.15)',
                            }}
                        >
                            <IconButton
                                // onClick={handleNavigateCart}
                                component='a'
                                href='/cart-course'
                                sx={{
                                    color: '#fff',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    borderRadius: '5px',
                                    background: '#1976d2',
                                    py: 2,
                                    px: 4,
                                    '&:hover': {
                                        color: '#fff',
                                        background: '#1976d2',
                                    },
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                                    fontSize: '0.650rem',
                                }}
                            >
                                Go to Cart
                                {/* <Badge badgeContent={cartCount} color="warning">
                            <ShoppingCartIcon />
                        </Badge> */}
                            </IconButton>
                        </motion.div>
                    )
                }
            </Box>

            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2, mt: 2, ml: isMobile ? 2 : 0 }}>
                    {/* Show category selector only if no instituteSlug is provided */}


                    {/* Group Wise Test Series Section */}
                    {filterTestSeriesGroupWise?.length > 0 && (
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000", mt: 2, mb: 2 }}>Group Wise</Typography>
                    )}
                    <Grid container spacing={1} sx={{ p: isMobile ? 1 : 0 }}>
                        {
                            filterTestSeriesGroupWise && filterTestSeriesGroupWise.map((item, i) => {

                                const getMinPrice = () => {
                                    if (item?.coursePricing && item.coursePricing.length > 0) {
                                        const minPrice = Math.min(...item.coursePricing.map(pricing => {
                                            const finalPrice = pricing.discount && pricing.discount > 0
                                                ? pricing.price - (pricing.price * (pricing.discount / 100))
                                                : pricing.price;
                                            return finalPrice;
                                        }));
                                        return minPrice;
                                    }
                                    return 0;
                                };

                                const minPrice = getMinPrice();

                                return <Grid item xs={12} sm={3} md={3} lg={3} sx={{ textAlign: "center", mb: 3, padding: isMobile ? "10px" : "" }} key={item.id}>
                                    <Box sx={{
                                        borderRadius: "16px",
                                        position: "relative",
                                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                                        background: '#ffffff',
                                        border: '1px solid #e0e7ff',
                                        transition: 'all 0.3s ease',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                                        }
                                    }}>
                                        {/* Header Section with Logo/Image */}
                                        <Box sx={{
                                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                            height: '200px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            color: '#fff'
                                        }}>
                                            {/* Test Type Badge */}
                                            {/* <Chip
                                                label={item.type?.toUpperCase()}
                                                icon={getTestTypeIcon(item.type)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    backgroundColor: '#f59e0b',
                                                    color: '#fff',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    zIndex: 2
                                                }}
                                            /> */}
                                            <img alt=""
                                                src={Endpoints.mediaBaseUrl + item?.logo}
                                                width={'100%'}
                                                height={'200px'}
                                                style={{
                                                    width:'100%',
                                                    height: '100%',
                                                    minHeight: '200px',
                                                    maxHeight: '200px',
                                                }}
                                            />
                                            {/* Title in Header */}
                                            {/* <Box sx={{ textAlign: 'center', p: 2 }}>
                                                <Typography variant='h6' sx={{
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    fontSize: '16px',
                                                    mb: 1,
                                                    lineHeight: 1.3
                                                }}>
                                                    {item?.title?.split(" ").slice(0, 6).join(" ")}
                                                    {item?.title?.split(" ").length > 6 && "..."}
                                                </Typography>
                                                <Typography sx={{
                                                    color: '#cbd5e1',
                                                    fontSize: '12px',
                                                    opacity: 0.8
                                                }}>
                                                    CHARTER YOUR CA JOURNEY WITH US!
                                                </Typography>
                                            </Box> */}
                                        </Box>

                                        {/* Content Section */}
                                        <Box sx={{ p: 1, textAlign: "left", backgroundColor: '#fff' }}>
                                            {/* Price Section */}
                                            <Box sx={{ mb: 1 }}>
                                                <Stack direction={'column'} sx={{ mb: 1 }}>
                                                    <Typography variant='h6' sx={{
                                                        fontWeight: 'bold',
                                                        color: '#000',
                                                        fontSize: '16px',
                                                        mb: 1,
                                                        lineHeight: 1.3
                                                    }}>
                                                        {item?.title?.split(" ").slice(0, 6).join(" ")}
                                                        {item?.title?.split(" ").length > 6 && "..."}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <Box
                                                            sx={{
                                                                background: minPrice === 0 ? '#4CAF50' : '#1976d2',
                                                                color: 'white',
                                                                padding: '4px 8px',
                                                                borderRadius: '4px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600,
                                                                mr: 1,
                                                            }}
                                                        >
                                                            {minPrice === 0 ? '🆓' : '🏷️'}
                                                        </Box>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: minPrice === 0 ? '#4CAF50' : '#1976d2',
                                                                fontWeight: 700,
                                                                fontSize: '1.25rem',
                                                            }}
                                                        >
                                                            {minPrice === 0 ? 'Free' : `₹${minPrice.toFixed(2)}`}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{
                                                        fontSize: '12px',
                                                        color: '#6b7280',
                                                        fontStyle: 'italic'
                                                    }}>
                                                        Starting from minimum price
                                                    </Typography>
                                                </Stack>
                                            </Box>

                                            {/* Description */}
                                            {/* <Typography variant='p' sx={{
                                                fontSize: "13px",
                                                color: '#6b7280',
                                                lineHeight: 1.5,
                                                mb: 3,
                                                display: 'block'
                                            }}>
                                                {truncateDescription(item?.description)}
                                                {item?.description?.length > 100 && (
                                                    <span style={{ color: '#3b82f6', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }} onClick={() => toggleExpandDescription(item?.description)}>
                                                        more
                                                    </span>
                                                )}
                                            </Typography> */}

                                            {/* Test Details */}
                                            {/* <Box sx={{ mb: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <QuizIcon sx={{ fontSize: '16px', color: '#6366f1' }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                                                        {item?.questionsCount} Questions
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <TimerIcon sx={{ fontSize: '16px', color: '#6366f1' }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                                                        {item?.duration}
                                                    </Typography>
                                                </Box>
                                            </Box> */}
                                        </Box>

                                        {/* Action Buttons */}
                                        <Box sx={{ p: 1, pt: 0 }}>
                                            {/* <Button
                                                onClick={() => handleStartTest(item)}
                                                sx={{
                                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                    color: "#fff",
                                                    width: "48%",
                                                    fontWeight: "bold",
                                                    fontSize: "12px",
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    mr: 1,
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                                                        transform: 'translateY(-1px)'
                                                    }
                                                }}
                                                className='addtocart-hover'
                                                startIcon={<PlayArrowIcon />}
                                            >
                                                View More
                                            </Button> */}

                                            <Button
                                                onClick={() => handleAddtoCart(item)}
                                                sx={{
                                                    background: cartCourses.some(a => a.id === item?.id)
                                                        ? '#fff'
                                                        : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                                                    border: cartCourses.some(a => a.id === item?.id)
                                                        ? '2px solid red'
                                                        : 'none',
                                                    color: cartCourses.some(a => a.id === item?.id)
                                                        ? 'red'
                                                        : '#fff',
                                                    width: "100%",
                                                    fontWeight: "bold",
                                                    fontSize: "12px",
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    boxShadow: cartCourses.some(a => a.id === item?.id)
                                                        ? 'none'
                                                        : '0 4px 12px rgba(25, 118, 210, 0.15)',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        background: cartCourses.some(a => a.id === item?.id)
                                                            ? 'rgba(25, 118, 210, 0.08)'
                                                            : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                                                        color: cartCourses.some(a => a.id === item?.id) ? '#1976d2' : '#fff',
                                                        borderColor: '#1565c0',
                                                        transform: 'translateY(-1px)'
                                                    },
                                                    '&:disabled': {
                                                        background: 'red',
                                                        color: '#fff',
                                                        opacity: 0.8
                                                    }
                                                }}
                                                startIcon={
                                                    cartCourses.some(a => a.id === item?.id)
                                                        ? <CancelRoundedIcon sx={{ fontSize: '16px' }} />
                                                        : <ShoppingCartIcon sx={{ fontSize: '16px' }} />
                                                }
                                            >
                                                {cartCourses.some(a => a.id === item?.id) ? "Remove" : "Add to Cart"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            })
                        }
                    </Grid>

                    {/* Subject Wise Test Series Section */}
                    {filterTestSeriesSubjectWise?.length > 0 && (
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000", mt: 6, mb: 2 }}>Subject Wise</Typography>
                    )}

                    <Grid container spacing={1} sx={{ p: isMobile ? 1 : 0 }}>
                        {
                            filterTestSeriesSubjectWise && filterTestSeriesSubjectWise.map((item, i) => {

                                const getMinPrice = () => {
                                    if (item?.coursePricing && item.coursePricing.length > 0) {
                                        const minPrice = Math.min(...item.coursePricing.map(pricing => {
                                            const finalPrice = pricing.discount && pricing.discount > 0
                                                ? pricing.price - (pricing.price * (pricing.discount / 100))
                                                : pricing.price;
                                            return finalPrice;
                                        }));
                                        return minPrice;
                                    }
                                    return 0;
                                };

                                const minPrice = getMinPrice();

                                return <Grid item xs={12} sm={3} md={3} lg={3} sx={{ textAlign: "center", mb: 3, padding: isMobile ? "10px" : "" }} key={item.id}>
                                    <Box sx={{
                                        borderRadius: "16px",
                                        position: "relative",
                                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                                        background: '#ffffff',
                                        border: '1px solid #e0e7ff',
                                        transition: 'all 0.3s ease',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                                        }
                                    }}>
                                        {/* Header Section with Logo/Image */}
                                        <Box sx={{
                                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                            height: '200px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            color: '#fff'
                                        }}>
                                            {/* Test Type Badge */}
                                            {/* <Chip
                                                label={item.type?.toUpperCase()}
                                                icon={getTestTypeIcon(item.type)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    backgroundColor: '#f59e0b',
                                                    color: '#fff',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    zIndex: 2
                                                }}
                                            /> */}
                                            <img alt=""
                                                src={Endpoints.mediaBaseUrl + item?.logo}
                                                width={'100%'}
                                                height={'200px'}
                                            />
                                            {/* Title in Header */}
                                            {/* <Box sx={{ textAlign: 'center', p: 2 }}>
                                                <Typography variant='h6' sx={{
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    fontSize: '16px',
                                                    mb: 1,
                                                    lineHeight: 1.3
                                                }}>
                                                    {item?.title?.split(" ").slice(0, 6).join(" ")}
                                                    {item?.title?.split(" ").length > 6 && "..."}
                                                </Typography>
                                                <Typography sx={{
                                                    color: '#cbd5e1',
                                                    fontSize: '12px',
                                                    opacity: 0.8
                                                }}>
                                                    CHARTER YOUR CA JOURNEY WITH US!
                                                </Typography>
                                            </Box> */}
                                        </Box>

                                        {/* Content Section */}
                                        <Box sx={{ p: 1, textAlign: "left", backgroundColor: '#fff' }}>
                                            {/* Price Section */}
                                            <Box sx={{ mb: 1 }}>
                                                <Stack direction={'column'} sx={{ mb: 1 }}>
                                                    <Typography variant='h6' sx={{
                                                        fontWeight: 'bold',
                                                        color: '#000',
                                                        fontSize: '16px',
                                                        mb: 1,
                                                        lineHeight: 1.3
                                                    }}>
                                                        {item?.title?.split(" ").slice(0, 6).join(" ")}
                                                        {item?.title?.split(" ").length > 6 && "..."}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <Box
                                                            sx={{
                                                                background: minPrice === 0 ? '#4CAF50' : '#1976d2',
                                                                color: 'white',
                                                                padding: '4px 8px',
                                                                borderRadius: '4px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600,
                                                                mr: 1,
                                                            }}
                                                        >
                                                            {minPrice === 0 ? '🆓' : '🏷️'}
                                                        </Box>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: minPrice === 0 ? '#4CAF50' : '#1976d2',
                                                                fontWeight: 700,
                                                                fontSize: '1.25rem',
                                                            }}
                                                        >
                                                            {minPrice === 0 ? 'Free' : `₹${minPrice.toFixed(2)}`}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{
                                                        fontSize: '12px',
                                                        color: '#6b7280',
                                                        fontStyle: 'italic'
                                                    }}>
                                                        Starting from minimum price
                                                    </Typography>
                                                </Stack>
                                            </Box>

                                            {/* Description */}
                                            {/* <Typography variant='p' sx={{
                                                fontSize: "13px",
                                                color: '#6b7280',
                                                lineHeight: 1.5,
                                                mb: 3,
                                                display: 'block'
                                            }}>
                                                {truncateDescription(item?.description)}
                                                {item?.description?.length > 100 && (
                                                    <span style={{ color: '#3b82f6', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }} onClick={() => toggleExpandDescription(item?.description)}>
                                                        more
                                                    </span>
                                                )}
                                            </Typography> */}

                                            {/* Test Details */}
                                            {/* <Box sx={{ mb: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <QuizIcon sx={{ fontSize: '16px', color: '#6366f1' }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                                                        {item?.questionsCount} Questions
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <TimerIcon sx={{ fontSize: '16px', color: '#6366f1' }} />
                                                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                                                        {item?.duration}
                                                    </Typography>
                                                </Box>
                                            </Box> */}
                                        </Box>

                                        {/* Action Buttons */}
                                        <Box sx={{ p: 1, pt: 0 }}>
                                            {/* <Button
                                                onClick={() => handleStartTest(item)}
                                                sx={{
                                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                    color: "#fff",
                                                    width: "48%",
                                                    fontWeight: "bold",
                                                    fontSize: "12px",
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    mr: 1,
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                                                        transform: 'translateY(-1px)'
                                                    }
                                                }}
                                                className='addtocart-hover'
                                                startIcon={<PlayArrowIcon />}
                                            >
                                                View More
                                            </Button> */}
                                            <Button
                                                onClick={() => handleAddtoCart(item)}
                                                sx={{
                                                    background: cartCourses.some(a => a.id === item?.id)
                                                        ? '#fff'
                                                        : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                                                    border: cartCourses.some(a => a.id === item?.id)
                                                        ? '2px solid red'
                                                        : 'none',
                                                    color: cartCourses.some(a => a.id === item?.id)
                                                        ? 'red'
                                                        : '#fff',
                                                    width: "100%",
                                                    fontWeight: "bold",
                                                    fontSize: "12px",
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    boxShadow: cartCourses.some(a => a.id === item?.id)
                                                        ? 'none'
                                                        : '0 4px 12px rgba(25, 118, 210, 0.15)',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        background: cartCourses.some(a => a.id === item?.id)
                                                            ? 'rgba(25, 118, 210, 0.08)'
                                                            : 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                                                        color: cartCourses.some(a => a.id === item?.id) ? '#1976d2' : '#fff',
                                                        borderColor: '#1565c0',
                                                        transform: 'translateY(-1px)'
                                                    },
                                                    '&:disabled': {
                                                        background: 'red',
                                                        color: '#fff',
                                                        opacity: 0.8
                                                    }
                                                }}
                                                startIcon={
                                                    cartCourses.some(a => a.id === item?.id)
                                                        ? <CancelRoundedIcon sx={{ fontSize: '16px' }} />
                                                        : <ShoppingCartIcon sx={{ fontSize: '16px' }} />
                                                }
                                            >
                                                {cartCourses.some(a => a.id === item?.id) ? "Remove" : "Add to Cart"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            })
                        }
                    </Grid>

                    {/* Display a message if no test series are available */}
                    {/* {(filterTestSeriesGroupWise?.length === 0 && filterTestSeriesSubjectWise?.length === 0) && (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="h6" sx={{ color: '#6b7280' }}>
                                No Course available at the moment. Please check back later.
                            </Typography>
                        </Box>
                    )} */}
                </Grid>
            </Grid>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Add a loader component to display while the test series data is loading */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <CircularProgress size={60} thickness={4} sx={{ color: '#f59e0b' }} />
                </Box>
            )}

            <Dialog
                open={suggestedCourseDialog}
                onClose={() => setSuggestedCourseDialog(false)}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        },
                    },
                }}
            >
                <SuggestedCourseDialog
                    addedSuggestCourse={addedSuggestCourse}
                    suggestedCourseId={suggestedCourseId}
                    handleClose={handleCloseSuggestedCourseDialog}
                    onFinalAmountUpdate={handleFinalAmountUpdate}
                    setCartCourses={setCartCourses}
                    setFinalAmounts={setFinalAmounts}
                />
            </Dialog>

            <Dialog open={testSeriesExpandedDescriptions} onClose={() => setTestSeriesExpandedDescriptions(false)}>
                <DialogContent dividers>
                    <Typography variant='body1'>
                        {parse(fullDes)}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTestSeriesExpandedDescriptions(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TestSeriesShowcaseSection;
