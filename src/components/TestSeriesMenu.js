import { Box, Button, IconButton, MenuItem, Stack, Typography, Fade, Grow, Chip, useMediaQuery } from "@mui/material";
import { styled, keyframes } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Network from '../network/Network';
import instId from '../network/instituteId';

// Modern styled components for attractive menu
const shimmer = keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
`;

const pulse = keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
`;

const DomainChip = styled(Chip)(({ theme, selected }) => ({
    backgroundColor: selected ? '#1356C5' : 'rgba(255,255,255,0.9)',
    color: selected ? '#fff' : '#2c3e50',
    border: selected ? '2px solid #0D47A1' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: '16px',
    fontWeight: 700,
    fontSize: '13px',
    padding: '8px 4px',
    margin: '4px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    boxShadow: selected
        ? '0 8px 24px rgba(19, 86, 197, 0.3), 0 4px 12px rgba(19, 86, 197, 0.2)'
        : '0 4px 12px rgba(0,0,0,0.08)',
    position: 'relative',
    overflow: 'hidden',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        transition: 'left 0.6s ease',
        zIndex: 1,
    },

    '&:hover': {
        backgroundColor: selected ? '#0D47A1' : '#1356C5',
        color: '#fff',
        transform: 'translateY(-2px) scale(1.05)',
        boxShadow: '0 12px 32px rgba(19, 86, 197, 0.4), 0 6px 16px rgba(19, 86, 197, 0.25)',
        border: '1px solid rgba(19, 86, 197, 0.3)',
        animation: `${float} 2s ease-in-out infinite`,
        '&::before': {
            left: '100%',
        }
    },

    '&:active': {
        transform: 'translateY(0px) scale(0.98)',
        transition: 'all 0.1s ease'
    },

    '& .MuiChip-label': {
        position: 'relative',
        zIndex: 2,
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        letterSpacing: '0.3px',
    }
}));

const SubDomainContainer = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '16px',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
    backdropFilter: 'blur(10px)',
    position: 'relative',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(19, 86, 197, 0.02) 0%, transparent 100%)',
        borderRadius: 'inherit',
        zIndex: 0,
    }
}));

const SubDomainItem = styled(Box)(({ theme }) => ({
    padding: '16px 20px',
    margin: '8px 0',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(19, 86, 197, 0.1), transparent)',
        transition: 'left 0.5s ease',
        zIndex: 0,
    },

    '&:hover': {
        backgroundColor: 'rgba(19, 86, 197, 0.08)',
        transform: 'translateX(8px) scale(1.02)',
        boxShadow: '0 8px 24px rgba(19, 86, 197, 0.15), 0 4px 12px rgba(19, 86, 197, 0.1)',
        border: '1px solid rgba(19, 86, 197, 0.2)',
        '&::before': {
            left: '100%',
        }
    }
}));

const TestSeriesItem = styled(Box)(({ theme }) => ({
    padding: '12px 16px',
    margin: '6px 0',
    borderRadius: '10px',
    backgroundColor: 'rgba(248,249,250,0.8)',
    border: '1px solid rgba(0,0,0,0.03)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    marginLeft: '20px',

    '&::before': {
        content: '""',
        position: 'absolute',
        left: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '0',
        backgroundColor: '#1356C5',
        borderRadius: '2px',
        transition: 'height 0.3s ease',
    },

    '&:hover': {
        backgroundColor: 'rgba(19, 86, 197, 0.06)',
        transform: 'translateX(6px) scale(1.01)',
        boxShadow: '0 6px 20px rgba(19, 86, 197, 0.12)',
        border: '1px solid rgba(19, 86, 197, 0.15)',
        '&::before': {
            height: '60%',
        }
    }
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '12px',
    width: '40px',
    height: '40px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    zIndex: 10,

    '&:hover': {
        backgroundColor: '#ff4444',
        color: '#fff',
        transform: 'scale(1.1) rotate(90deg)',
        boxShadow: '0 8px 24px rgba(255, 68, 68, 0.3)',
    },

    '& .MuiSvgIcon-root': {
        fontSize: '20px',
        transition: 'all 0.3s ease',
    }
}));

const TestSeriesMenu = ({ setAnchorElTestSeries, mobileDropDown, handleOpenNavMenuClose , type}) => {

    // console.log("TestSeriesMenu rendered with type:", type);
    
    const isMobile = useMediaQuery("(min-width:600px)");

    const MenuContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    minWidth: isMobile ? '600px' : '150px',
    padding: '24px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,250,0.95) 100%)',
    borderRadius: '20px',
    boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    position: 'relative',
    overflow: 'hidden',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(19, 86, 197, 0.02) 0%, transparent 50%)',
        borderRadius: 'inherit',
        zIndex: 0,
    }
}));

    const navigate = useNavigate();
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedTestSeries, setSelectedTestSeries] = useState(null);
    const [domainList, setDomainList] = useState([]);
    const [testSeriesList, setTestSeriesList] = useState([]);

    useEffect(() => {
        fetchDomains();
        fetchTestSeries();
    }, []);

    // Filter domainList based on type prop
    const filteredDomainList = React.useMemo(() => {
        if (!domainList || domainList.length === 0) return [];
        if (!type || type === 'header') return domainList;
        // type can be 'CS', 'CA', 'CMA'
        return domainList.filter(domain => {
            if (type === 'CS') return domain.name?.toLowerCase().includes('cs');
            if (type === 'CA') return domain.name?.toLowerCase().includes('ca');
            if (type === 'CMA') return domain.name?.toLowerCase().includes('cma');
            return true;
        });
    }, [domainList, type]);

    // Ensure first filtered domain is selected by default if not set
    useEffect(() => {
        if (filteredDomainList && filteredDomainList.length > 0 && (!selectedDomain || typeof selectedDomain === 'object')) {
            setSelectedDomain(filteredDomainList[0].id);
        }
    }, [filteredDomainList]);


    const fetchDomains = async () => {
        try {
            const response = await Network.fetchDomain(instId);

            const testSeriesDomain = response?.domains?.find(domain =>
                domain.name?.toLowerCase().includes('test series')
            );

            if (testSeriesDomain && Array.isArray(testSeriesDomain.child)) {
                const domainChildren = testSeriesDomain.child;
                setDomainList(domainChildren); // Show CA/CS-level children only

                // Auto-select: Prefer CS, fallback to CA, then first child
                const csDomain = domainChildren.find(child =>
                    child.name?.toLowerCase().includes('cs')
                );
                const caDomain = domainChildren.find(child =>
                    child.name?.toLowerCase().includes('ca')
                );

                if (csDomain) {
                    setSelectedDomain(csDomain);
                } else if (caDomain) {
                    setSelectedDomain(caDomain);
                } else {
                    setSelectedDomain(domainChildren[0]);
                }
            } else {
                // console.log("Test Series domain not found");
                setDomainList([]);
            }
        } catch (error) {
            // console.log("Error fetching domains:", error);

            // Fallback mock domains
            const mockDomainList = [
                {
                    id: 'ts1',
                    name: 'CA Test Series',
                    child: [
                        { id: 'ts1-1', name: 'CA Foundation Tests' },
                        { id: 'ts1-2', name: 'CA Intermediate Tests' },
                        { id: 'ts1-3', name: 'CA Final Tests' }
                    ]
                },
                {
                    id: 'ts2',
                    name: 'CS Test Series',
                    child: [
                        { id: 'ts2-1', name: 'CS Executive Tests' },
                        { id: 'ts2-2', name: 'CS Professional Tests' }
                    ]
                }
            ];

            // Flatten mock children and set them
            const fallbackChildren = mockDomainList.flatMap(domain => domain.child);
            setDomainList(fallbackChildren);

            // Prefer CS if available in mock
            const mockCS = fallbackChildren.find(child => child.name?.toLowerCase().includes('cs'));
            const mockCA = fallbackChildren.find(child => child.name?.toLowerCase().includes('ca'));
            setSelectedDomain(mockCS || mockCA || fallbackChildren[0]);
        }
    };

    const fetchTestSeries = async () => {
        try {
            const domainResponse = await Network.fetchDomain(instId);

            // Step 1: Find the Test Series domain
            const testSeriesDomain = domainResponse?.domains?.find(domain =>
                domain.name && domain.name.toLowerCase().includes('test series')
            );

            if (testSeriesDomain && Array.isArray(testSeriesDomain.child)) {
                const children = testSeriesDomain.child;

                // Step 2: First child domain (e.g., CA)
                const firstChild = children[0]; // CA
                const firstChildChildren = firstChild?.child || [];

                // Step 3: Second child domain (e.g., CS)
                const secondChild = children[1]; // CS
                const secondChildChildren = secondChild?.child || [];

                // console.log("1st Domain (CA):", firstChild);
                // console.log("1st Domain Children:", firstChildChildren);
                // console.log("2nd Domain (CS):", secondChild);
                // console.log("2nd Domain Children:", secondChildChildren);

                // Optional: Fetch test series data filtered by these children
                const response = await Network.fetchTestSeries(instId);
                const validDomainIds = [...firstChildChildren, ...secondChildChildren].map(d => d.id);

                const filteredTestSeries = response?.testSeries?.filter(test =>
                    test.domain?.some(d => validDomainIds.includes(d.id))
                ) || [];

                setTestSeriesList(filteredTestSeries);
                setSelectedDomain(firstChild);
            } else {
                // console.warn("No Test Series child domains found.");
                setTestSeriesList([]);
            }

        } catch (error) {
            console.log("Error fetching test series:", error);
            // Optional fallback data
            setTestSeriesList([
                {
                    id: 1,
                    title: "CA Foundation Mock Tests",
                    domain: [{ id: 'ts1-1', name: "CA Foundation Tests" }],
                    type: "mock",
                    questionsCount: 100,
                    duration: "3 hours"
                },
                {
                    id: 2,
                    title: "CA Intermediate Practice Tests",
                    domain: [{ id: 'ts1-2', name: "CA Intermediate Tests" }],
                    type: "practice",
                    questionsCount: 80,
                    duration: "2.5 hours"
                },
                {
                    id: 3,
                    title: "CS Executive Mock Tests",
                    domain: [{ id: 'ts2-1', name: "CS Executive Tests" }],
                    type: "mock",
                    questionsCount: 50,
                    duration: "2 hours"
                },
                {
                    id: 4,
                    title: "CS Professional Practice Tests",
                    domain: [{ id: 'ts2-2', name: "CS Professional Tests" }],
                    type: "practice",
                    questionsCount: 75,
                    duration: "3 hours"
                }
            ]);
        }
    };


    const handleDomainClick = (domain) => {
        setSelectedDomain(domain.id);
        // Don't navigate on main domain click - only show subdomains
    };

    const getTestSeriesForDomain = (domainId) => {
        const matchedTestSeries = testSeriesList.filter((testSeries) =>
            testSeries.domain.some((d) => d.id === domainId)
        );
        return matchedTestSeries.map((testSeries) => testSeries);
    };

    const handleOpenTestSeries = (item) => {
        if (handleOpenNavMenuClose) {
            handleOpenNavMenuClose();
        }
        setAnchorElTestSeries(null);
        setSelectedTestSeries(item);

        // Navigate to test series page with the test series ID
        navigate(`/test-series/${encodeURIComponent(item?.id)}`);
    };

    const handleSubDomainClick = (subdomain) => {
        // Navigate to TestSeriesExploreSection with subdomain data
        // Use subdomain ID as instId and subdomain name as instituteSlug
        const instituteSlug = subdomain.name.toLowerCase().replace(/\s+/g, '-');
        // console.log("Navigating to subdomain:", subdomain, "with URL:", `/${subdomain.id}/${instituteSlug}`);
        navigate(`/${subdomain.id}/${instituteSlug}`, {
            state: {
                selectedLevelOne: subdomain,
                selectedLevelTwo: null,
                selectedLevelThree: null
            }
        });

        // Close the menu after navigation
        if (handleOpenNavMenuClose) {
            handleOpenNavMenuClose();
        }
        setAnchorElTestSeries(null);
    };

    const menuClosed = () => {
        setAnchorElTestSeries(null);
    };

    // Find the selected domain object from domainList
    // Find the selected domain object from filteredDomainList
    const selectedDomainObj = filteredDomainList?.find(d => d.id === selectedDomain);

    return (
        <MenuContainer>
            {mobileDropDown === "" && (
                <CloseButton onClick={menuClosed}>
                    <CloseIcon />
                </CloseButton>
            )}

            {/* Domain Selection Header */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {/* ...existing code... */}
                {
                    domainList.length >= 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: 'center',
                        mb: 3,
                    }}
                >
                    {filteredDomainList?.map((domain, idx) => (
                        <DomainChip
                            key={domain.id}
                            label={domain.name}
                            selected={selectedDomain === domain.id || (!selectedDomain && idx === 0)}
                            onClick={() => handleDomainClick(domain)}
                            icon={<AssignmentIcon sx={{ fontSize: '16px !important' }} />}
                        />
                    ))}
                </Box>
                    )
                }
            </Box>

            {/* Sub-domains and Test Series */}
            {selectedDomainObj && selectedDomainObj.child && selectedDomainObj.child.length > 0 && (
                <Fade in={true} timeout={500}>
                    <SubDomainContainer>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#2c3e50',
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <QuizIcon sx={{ fontSize: '20px', color: '#1356C5' }} />
                            Available Test Series in {selectedDomainObj.name}
                        </Typography>

                        {selectedDomainObj?.child.map((sub) => {
                            const matchedTestSeries = testSeriesList.filter((testSeries) =>
                                testSeries.domain && testSeries.domain.some((domainItem) => domainItem.id === sub.id)
                            );

                            return (
                                <Grow in={true} timeout={600} key={sub.id}>
                                        <a
                                            href={`/${sub.id}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={e => {
                                                e.preventDefault();
                                                const instituteSlug = sub.name.toLowerCase().replace(/\s+/g, '-');
                                                window.location.assign(`/${sub.id}/${instituteSlug}`);
                                            }}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                display: 'block',
                                            }}
                                        >
                                    <SubDomainItem>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: 'relative', zIndex: 1 }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: '14px',
                                                        color: '#1356C5',
                                                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                                        letterSpacing: '0.3px',
                                                    }}
                                                >
                                                    {sub.name}
                                                </Typography>
                                            </Box>

                                            {matchedTestSeries.length > 0 && (
                                                <Box sx={{ mt: 2 }}>
                                                    {matchedTestSeries.map((testSeries, index) => (
                                                        <Fade in={true} timeout={700 + index * 100} key={testSeries.id}>
                                                            <TestSeriesItem>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '13px',
                                                                        color: selectedTestSeries?.id === testSeries.id ? "#1356C5" : "#2c3e50",
                                                                        fontWeight: 600,
                                                                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                                                        letterSpacing: '0.2px',
                                                                        position: 'relative',
                                                                        zIndex: 1,
                                                                        transition: 'color 0.3s ease',
                                                                        "&:hover": {
                                                                            color: '#1356C5',
                                                                        },
                                                                    }}
                                                                >
                                                                    📝 {testSeries?.title}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '11px',
                                                                        color: '#6c757d',
                                                                        mt: 0.5,
                                                                        position: 'relative',
                                                                        zIndex: 1,
                                                                    }}
                                                                >
                                                                    {testSeries?.questionsCount} Questions • {testSeries?.duration}
                                                                </Typography>
                                                            </TestSeriesItem>
                                                        </Fade>
                                                    ))}
                                                </Box>
                                            )}
                                    </SubDomainItem>
                                        </a>
                                </Grow>
                            );
                        })}
                    </SubDomainContainer>
                </Fade>
            )}

            {/* Empty State */}
            {selectedDomainObj && (!selectedDomainObj.child || selectedDomainObj.child.length === 0) && (
                <Fade in={true} timeout={400}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 4,
                            color: '#6c757d',
                            fontStyle: 'italic',
                        }}
                    >
                        <QuizIcon sx={{ fontSize: '48px', color: '#dee2e6', mb: 2 }} />
                        <Typography sx={{ fontSize: '14px' }}>
                            No test series available in this domain yet.
                        </Typography>
                    </Box>
                </Fade>
            )}

            {/* Initial State */}
            {!selectedDomainObj && (
                <Fade in={true} timeout={300}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 4,
                            color: '#6c757d',
                            fontStyle: 'italic',
                        }}
                    >
                        <QuizIcon sx={{ fontSize: '48px', color: '#dee2e6', mb: 2 }} />
                        <Typography sx={{ fontSize: '14px' }}>
                            Select a test series category above to view available tests
                        </Typography>
                    </Box>
                </Fade>
            )}
        </MenuContainer>
    );
};

export default TestSeriesMenu;
