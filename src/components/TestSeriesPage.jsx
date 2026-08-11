import React, { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    useTheme,
    useMediaQuery,
    Chip,
    Breadcrumbs,
    Link,
    CircularProgress,
    Card,
    CardActionArea,
    CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Network from '../network/Network';
import instId from '../network/instituteId';
import Endpoints from '../network/endpoints';

const TestSeriesPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [domains, setDomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [institutes, setInstitutes] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState('all');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allDomains, setAllDomains] = useState([]);
    const [bannerList, setBannerList] = useState([]);

    // Helper: Convert "VG Study Hub" → "vg-study-hub"
    const toSlug = (name) => {
        const slug = name
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        // console.log("Converted slug:", name, "to", slug);
        return slug;
    };

    // Fetch all data on mount
    useEffect(() => {
        fetchInitialData();
        fetchBannerList();
    }, []);

    const fetchBannerList = async () => {
        try {
            const response = await Network.fetchBannerss(instId);

            if (response && response.banners) {
                // Get all active banners (with or without domains)
                const allActiveBanners = response.banners.filter(banner =>
                    banner.active === true
                );

                // Sort banners by creation date (newest first)
                allActiveBanners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setBannerList(allActiveBanners);
            } else {
                setBannerList([]);
            }
        } catch (error) {
            console.log("Error fetching banners:", error);
            setBannerList([]);
        };
    };


    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            // Fetch domains
            const domainResponse = await Network.fetchDomain(instId);
            if (domainResponse?.domains) {
                const allDoms = domainResponse.domains;
                setAllDomains(allDoms);

                // Find the "Test Series" parent domain
                const testSeriesParent = allDoms.find(d =>
                    d.name?.toLowerCase().includes('test series')
                );

                if (testSeriesParent?.child) {
                    // Filter to only CS, CA, CMA level children
                    const examDomains = testSeriesParent.child.filter(d => {
                        const name = d.name?.toLowerCase();
                        return name.includes('cs') || name.includes('ca') || name.includes('cma');
                    });
                    setDomains(examDomains);

                    // Default select first domain (prefer CS)
                    if (examDomains.length > 0) {
                        const csDomain = examDomains.find(d => d.name?.toLowerCase().includes('cs'));
                        setSelectedDomain(csDomain || examDomains[0]);
                    }
                }
            }

            // Fetch courses/test series
            const courseResponse = await Network.fetchCourses(instId);
            if (courseResponse?.courses) {
                const activeCourses = courseResponse.courses.filter(c => c.active === true);
                setCourses(activeCourses);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Update institutes when domain changes
    useEffect(() => {
        if (selectedDomain) {
            // Get the child domains (institutes) of the selected exam domain
            const childInst = selectedDomain.child || [];

            // Find the "All" institutes from the main domain list
            // Look through allDomains for sub-domains under Test Series > {domain}
            const testSeriesParent = allDomains.find(d =>
                d.name?.toLowerCase().includes('test series')
            );

            if (testSeriesParent?.child) {
                const domainNode = testSeriesParent.child.find(d => d.id === selectedDomain.id);
                if (domainNode?.child) {
                    setInstitutes(domainNode.child);
                } else {
                    setInstitutes(childInst);
                }
            } else {
                setInstitutes(childInst);
            }

            setSelectedInstitute('all');
        }
    }, [selectedDomain, allDomains]);

    // Filter courses by selected domain and institute
    const filteredCourses = useMemo(() => {
        if (!selectedDomain) return [];

        let filtered = courses.filter(course => {
            if (!course.domain || !Array.isArray(course.domain)) return false;
            return course.domain.some(d => {
                // Check if course belongs to selected domain or its children
                const domainIds = [selectedDomain.id, ...(selectedDomain.child || []).map(c => c.id)];
                return domainIds.includes(d.id);
            });
        });

        // Further filter by institute if not "all"
        if (selectedInstitute !== 'all' && selectedInstitute) {
            const inst = institutes.find(i => i.id === selectedInstitute);
            if (inst) {
                const instIds = [inst.id, ...(inst.child || []).map(c => c.id)];
                filtered = filtered.filter(course =>
                    course.domain?.some(d => instIds.includes(d.id))
                );
            }
        }

        return filtered;
    }, [courses, selectedDomain, selectedInstitute, institutes]);

    const getDomainLabel = (domain) => {
        if (!domain) return '';
        const name = domain.name || '';
        if (name.toLowerCase().includes('cs')) return 'CS';
        if (name.toLowerCase().includes('ca')) return 'CA';
        if (name.toLowerCase().includes('cma')) return 'CMA';
        return name;
    };

    const getInstituteLabel = (inst) => {
        return inst.name || '';
    };

    const handleDomainClick = (domain) => {
        setSelectedDomain(domain);
    };

    const handleInstituteClick = (instId) => {
        setSelectedInstitute(instId);
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleJoinNow = (course, instituteSlug) => {
        if (selectedDomain && instituteSlug) {
            navigate(`/${selectedDomain.id}/${instituteSlug}`, {
                state: {
                    selectedLevelOne: selectedDomain,
                    selectedLevelTwo: instituteSlug,
                }
            });
        }
    };

    // Group courses by institute for card display
    const groupedByInstitute = useMemo(() => {
        const grouped = {};
        filteredCourses.forEach(course => {
            // Find which institute this course belongs to
            let instId = 'other';
            let instName = 'Other';
            let instSlug = '';

            for (const inst of institutes) {
                const instIds = [inst.id, ...(inst.child || []).map(c => c.id)];
                if (course.domain?.some(d => instIds.includes(d.id))) {
                    instId = inst.id;
                    instName = inst.name;
                    instSlug = inst.name?.toLowerCase().replace(/\s+/g, '-');
                    break;
                }
            }

            if (!grouped[instId]) {
                grouped[instId] = {
                    instituteName: instName,
                    instituteSlug: instSlug,
                    courses: [],
                };
            }
            grouped[instId].courses.push(course);
        });
        return grouped;
    }, [filteredCourses, institutes]);

    const groupedEntries = Object.entries(groupedByInstitute);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                pt: { xs: 2, md: 2 },
                pb: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="">
                {/* Breadcrumb */}
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 3 }}
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={handleNavigateHome}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: theme.palette.text.secondary,
                            fontSize: '0.875rem',
                            '&:hover': { color: theme.palette.primary.main },
                        }}
                    >
                        <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                        Home
                    </Link>
                    <Typography
                        color="text.primary"
                        sx={{ fontSize: '0.875rem', fontWeight: 600 }}
                    >
                        Test Series
                    </Typography>
                </Breadcrumbs>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Box sx={{ textAlign: 'center', mb: 1 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                                fontWeight: 800,
                                mb: 1,
                                fontFamily: '"Inter", sans-serif',
                                letterSpacing: '-0.025em',
                                lineHeight: 1.167,
                                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Test Series Explorer
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            Choose your domain and explore comprehensive test series and study materials
                        </Typography>
                    </Box>
                </motion.div>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/* Domain Selector - "Select Your Exam" */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Box sx={{ textAlign: 'center', mb: 2, mt: 4 }}>
                                <Typography
                                    sx={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: theme.palette.text.secondary,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        mb: 1.5,
                                    }}
                                >
                                    Select Your Exam
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {domains.map((domain) => {
                                        const isSelected = selectedDomain?.id === domain.id;
                                        return (
                                            <Chip
                                                key={domain.id}
                                                label={getDomainLabel(domain)}
                                                onClick={() => handleDomainClick(domain)}
                                                sx={{
                                                    px: 1,
                                                    py: 1.5,
                                                    fontSize: '1rem',
                                                    fontWeight: 700,
                                                    borderRadius: '50px',
                                                    cursor: 'pointer',
                                                    border: isSelected
                                                        ? '2px solid #3b82f6'
                                                        : '2px solid #e2e8f0',
                                                    backgroundColor: isSelected ? '#3b82f6' : '#ffffff',
                                                    color: isSelected ? '#ffffff' : '#334155',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: isSelected ? '#2563eb' : '#f1f5f9',
                                                        borderColor: '#3b82f6',
                                                    },
                                                }}
                                            />
                                        );
                                    })}
                                </Box>
                            </Box>
                        </motion.div>

                        {/* Institute Selector - "Select Institute in {domain}" */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Box sx={{ textAlign: 'center', mb: 4, mt: 3 }}>
                                <Typography
                                    sx={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: theme.palette.text.secondary,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        mb: 1.5,
                                    }}
                                >
                                    Select Institute in {getDomainLabel(selectedDomain)}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {/* "All" chip */}
                                    <Chip
                                        label="All"
                                        onClick={() => handleInstituteClick('all')}
                                        sx={{
                                            px: 1.5,
                                            py: 1.5,
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            borderRadius: '50px',
                                            cursor: 'pointer',
                                            border: selectedInstitute === 'all'
                                                ? '2px solid #f97316'
                                                : '2px solid #e2e8f0',
                                            backgroundColor: selectedInstitute === 'all' ? '#f97316' : '#ffffff',
                                            color: selectedInstitute === 'all' ? '#ffffff' : '#334155',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: selectedInstitute === 'all' ? '#ea580c' : '#f1f5f9',
                                                borderColor: '#f97316',
                                            },
                                        }}
                                    />

                                    {institutes.map((inst) => {
                                        const isSelected = selectedInstitute === inst.id;
                                        return (
                                            <Chip
                                                key={inst.id}
                                                label={getInstituteLabel(inst)}
                                                onClick={() => handleInstituteClick(inst.id)}
                                                sx={{
                                                    px: 2.5,
                                                    py: 2,
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                    borderRadius: '50px',
                                                    cursor: 'pointer',
                                                    border: isSelected
                                                        ? '2px solid #3b82f6'
                                                        : '2px solid #e2e8f0',
                                                    backgroundColor: isSelected ? '#3b82f6' : '#ffffff',
                                                    color: isSelected ? '#ffffff' : '#334155',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: isSelected ? '#2563eb' : '#f1f5f9',
                                                        borderColor: '#3b82f6',
                                                    },
                                                }}
                                            />
                                        );
                                    })}
                                </Box>
                            </Box>
                        </motion.div>

                        {/* Banner Cards - Study Materials Style */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {(() => {
                                const filteredBanners = bannerList.filter(banner => {
                                    // Only show banners with exactly ONE domain to avoid duplicates
                                    if (!banner.domains || banner.domains.length !== 1) return false;
                                    if (selectedInstitute === 'all') {
                                        return institutes.some(inst =>
                                            inst.name?.toLowerCase() === banner.domains[0].name?.toLowerCase()
                                        );
                                    }
                                    const selectedInst = institutes.find(i => i.id === selectedInstitute);
                                    if (!selectedInst) return false;
                                    return banner.domains[0].name?.toLowerCase() === selectedInst.name?.toLowerCase();
                                });

                                if (filteredBanners.length === 0) {
                                    return (
                                        <Box sx={{ textAlign: 'center', py: 8 }}>
                                            <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                                                No study materials available for the selected filters.
                                            </Typography>
                                        </Box>
                                    );
                                }

                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 3,
                                            justifyContent: { xs: 'center', md: 'flex-start' },
                                        }}
                                    >
                                        {filteredBanners.map((banner) => {
                                            const instituteName = banner.domains?.[0]?.name || '';
                                            const instituteSlug = toSlug(instituteName);
                                            return (
                                                <Card
                                                    key={banner.id}
                                                    sx={{
                                                        width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(32.5% - 12px)' },
                                                        minWidth: 280,
                                                        borderRadius: '16px',
                                                        overflow: 'hidden',
                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                                        border: '1px solid rgba(0,0,0,0.06)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                            transform: 'translateY(-4px)',
                                                        },
                                                    }}
                                                >
                                                    <CardActionArea
                                                        onClick={() => {
                                                            if (instituteSlug) {
                                                                handleJoinNow(null, instituteSlug);
                                                            }
                                                        }}
                                                        sx={{
                                                            position: 'relative',
                                                            aspectRatio: '2/1',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {/* Banner Image */}
                                                        <CardMedia
                                                            component="img"
                                                            image={Endpoints.mediaBaseUrl + banner.banner}
                                                            alt={banner.title || instituteName}
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'contain',
                                                                backgroundColor: '#f5f7fa',
                                                            }}
                                                        />

                                                        {/* Bottom Gradient Overlay */}
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7))',
                                                                pointerEvents: 'none',
                                                            }}
                                                        />

                                                        {/* Domain Badge - top right */}
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 12,
                                                                right: 12,
                                                                zIndex: 2,
                                                            }}
                                                        >
                                                            <Chip
                                                                label={instituteName}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                                                    color: '#1e293b',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.7rem',
                                                                    borderRadius: '8px',
                                                                    height: 24,
                                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                                                                    '& .MuiChip-label': {
                                                                        px: 1.2,
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </CardActionArea>
                                                </Card>
                                            );
                                        })}
                                    </Box>
                                );
                            })()}
                        </motion.div>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default TestSeriesPage;
