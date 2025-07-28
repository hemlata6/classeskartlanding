import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Fab, useMediaQuery } from '@mui/material';
import { Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import CallIcon from '@mui/icons-material/Call';

// Components
import LoadingOverlay from './components/LoadingOverlay';
import NotificationBar from './components/NotificationBar';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import CategorySection from './components/CategorySection';
import AchievementsSection from './components/AchievementsSection';
import VideoSection from './components/VideoSection';
import BannerScrollerSection from './components/BannerScrollerSection';
import AppShowcaseSection from './components/AppShowcaseSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MobileStickyMenu from './components/MobileStickyMenu';
import EnquiryPopup from './components/EnquiryPopup';
import FreeResources from './components/FreeResources';
import Home from './components/Home';
import TestSeriesExploreSection from './components/TestSeriesExploreSection';
import CheckoutPage from './components/CheckoutPage';
import Network from './network/Network';
import Endpoints from './network/endpoints';
import instId from './network/instituteId';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import whatsApplog from './C (2).png'; // Import your WhatsApp logo image

// Cart Context
import { CartProvider } from './context/CartContext';
import MultipleCourseCart from './components/MultipleCourseCart';
import PrivacyAndPolicy from './components/PrivacyPolicy';
import TermsAndCondtion from './components/TermsConditions';
import WhyChooseClassesKart from './components/WhyChooseClassKart';
import RefundPolicy from './components/RefundPolicy';
import SuccessStories from './components/SuccessStories';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
      dark: '#3730a3',
    },
    secondary: {
      main: '#06b6d4',
      dark: '#0891b2',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: '"Inter", "Poppins", system-ui, -apple-system, sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    // Continue with rest of shadows...
    ...Array(17).fill('0 8px 32px 0 rgba(31, 38, 135, 0.37)')
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          fontSmooth: 'antialiased',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f5f9',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4f46e5',
            borderRadius: '4px',
            transition: 'background 0.3s ease',
            '&:hover': {
              background: '#3730a3',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
  },
});

function App() {

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const fetchInstitue = async () => {
    try {
      const response = await Network.fetchInstitute(instId);
      // console.log("Institute response:", response);
      Endpoints.mediaBaseUrl = response?.instituteTechSetting?.mediaUrl
    } catch (error) {
      console.error("Error fetching institute data:", error);
    };
  };

  useEffect(() => {
    fetchInstitue();
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Show enquiry popup after 3 seconds
      setTimeout(() => {
        setEnquiryOpen(true);
      }, 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnquiryClose = () => {
    setEnquiryOpen(false);
  };

  const handleEnquiryOpen = () => {
    setEnquiryOpen(true);
  };

  // console.log('window.location', window.location)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <CartProvider>
          <Router>
            <Box sx={{
              // minHeight: '100vh', 
              background: theme.palette.background.default,
              // pb: { xs: '80px', md: 0 } // Add bottom padding on mobile for sticky menu
              pt: { xs: '64px', md: '80px' } // Add top padding for fixed header (adjust if your AppBar height differs)
            }}>
              {/* Loading Overlay */}
              <LoadingOverlay open={loading} />

              {/* Enquiry Popup: Show on all routes except /cart-course */}
              {(() => {
                const { pathname } = window.location;
                const hideEnquiry = pathname === '/cart-course';
                return !hideEnquiry ? (
                  <EnquiryPopup open={enquiryOpen} onClose={handleEnquiryClose} />
                ) : null;
              })()}

              {/* Notification Bar */}
              {/* <NotificationBar /> */}

              {/* Header */}
              {/* Use react-router location for reactivity */}
              {(() => {
                const { pathname } = window.location;
                // Hide only on static routes, not on /:instId/:instituteSlug
                const hideHeaderRoutes = [
                  '/privacypolicy',
                  '/terms-and-conditions',
                  '/refund-policy',
                  '/cart-course'
                ];
                const shouldHide = hideHeaderRoutes.includes(pathname);
                return !shouldHide && <NotificationBar />;
              })()}
              {/* Fixed Header */}
              {(() => {
                // Use react-router location for reactivity
                const { pathname } = window.location;
                const hideHeaderRoutes = [
                  '/privacypolicy',
                  '/terms-and-conditions',
                  '/refund-policy',
                ];
                // Regex for /:instId/:instituteSlug and /cart-course
                const testSeriesExploreRegex = /^\/[\w-]+\/[\w-]+$/;
                const cartCourseRegex = /^\/cart-course$/;
                const shouldHide =
                  hideHeaderRoutes.includes(pathname) ||
                  testSeriesExploreRegex.test(pathname) ||
                  cartCourseRegex.test(pathname);
                return !shouldHide && (
                  <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
                    <Header />
                  </Box>
                );
              })()}

              {/* Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/free-resources" element={<FreeResources />} />
                <Route path="/:instId/:instituteSlug" element={<TestSeriesExploreSection />} />
                <Route path="/cart-course" element={<MultipleCourseCart />} />
                <Route path="/privacypolicy" element={<PrivacyAndPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndCondtion />} />
                <Route path="/why-choose-us" element={<WhyChooseClassesKart />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/success-stories" element={<SuccessStories />} />
              </Routes>
              <Fab
                color="primary"
                aria-label="call"
                sx={{
                  position: 'fixed',
                  bottom: 120,
                  // right: isMobile ? 16 : 38,
                  right: 35,
                  zIndex: 1000,
                }}
                onClick={() => window.location.href = 'tel:+919049730883'}
              >
                <CallIcon />
              </Fab>
              <FloatingWhatsApp phoneNumber={'+91-9049730883'} accountName="ClassKart"
                avatar={whatsApplog} // Change this to your desired image URL
                chatMessage="Hello! How can I help you?" className="pro-vidya-whatsapp-avatar" />
              {/* Footer */}
              <Footer />

              {/* Mobile Sticky Menu */}
              {/* <MobileStickyMenu onEnquiryClick={handleEnquiryOpen} /> */}

            </Box>
          </Router>
        </CartProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
