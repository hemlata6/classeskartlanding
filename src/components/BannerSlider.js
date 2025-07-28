import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Network from '../network/Network';
import instId from '../network/instituteId';
import Endpoints from '../network/endpoints';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const BannerSlider = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerList, setBannerList] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(1);


  const fetchBannerList = async () => {
    try {
      // console.log("Fetching banners for instId:", instId);
      const response = await Network.fetchBannerss(instId);
      // console.log("Banner response:", response);

      if (response && response.banners) {
      let filteredBanners = response.banners.filter(banner =>
        banner.active === true &&
        (!banner.domains || banner.domains.length === 0) &&
        (!banner.groups || banner.groups.length === 0)
      );

      // Sort banners by creation date (newest first)
      filteredBanners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBannerList(filteredBanners);
    } else {
        // console.log("No banners found, using fallback");
        // Fallback banners for testing
        setBannerList([
          {
            id: 539,
            banner: "classioclasskart/image/banner1744732451630",
            domains: [{ name: "VG Study Hub" }],
            createdByName: "Priyesh Solanki"
          },
          {
            id: 534,
            banner: "classioclasskart/image/banner1744626048971",
            domains: [{ name: "VG Study Hub" }],
            createdByName: "9049730883"
          }
        ]);
      }
    } catch (error) {
      console.log("Error fetching banners:", error);
      // Fallback banners in case of error
      setBannerList([
        {
          id: 539,
          banner: "classioclasskart/image/banner1744732451630",
          domains: [{ name: "VG Study Hub" }],
          createdByName: "Priyesh Solanki"
        }
      ]);
    };
  };

  useEffect(() => {
    fetchBannerList();
  }, []);

  // Update cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(1); // Always show 1 card
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (bannerList.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => {
          const maxSlide = bannerList.length - 1;
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [bannerList.length]);

  const handlePrevClick = () => {
    setCurrentSlide((prev) => {
      const maxSlide = bannerList.length - 1;
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => {
      const maxSlide = bannerList.length - 1;
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  // Show loading if no banners
  if (bannerList.length === 0) {
    return (
      <Box
        sx={{
          width: '100vw',
          aspectRatio: '3/1',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }}
      >
        <Typography variant="h4" color="primary">
          Loading banners...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        aspectRatio: '3/1',
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        mt:[4.5, 5], // Add top padding for fixed header
        height: isMobile ? '16vh' : '65vh'
      }}
    >
      {/* Carousel Container */}
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Cards Container */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.6s ease-in-out',
            }}
          >
            {bannerList.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  flex: '0 0 100%',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  {/* Banner Image */}
                  <img
                    src={Endpoints.mediaBaseUrl + banner.banner}
                    alt={banner.title}
                    style={{
                      width: '100%',
                      height: isMobile ? '' : '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  
                  {/* Optional overlay for better text readability */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Navigation Arrows */}
        {/* <IconButton
          onClick={handlePrevClick}
          sx={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: '#3b82f6',
            width: 48,
            height: 48,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              bgcolor: 'white',
              transform: 'translateY(-50%) scale(1.05)',
            },
          }}
        >
          <ArrowCircleLeftIcon />
        </IconButton> */}

        {/* <IconButton
          onClick={handleNextClick}
          sx={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: '#3b82f6',
            width: 48,
            height: 48,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              bgcolor: 'white',
              transform: 'translateY(-50%) scale(1.05)',
            },
          }}
        >
          <ArrowCircleRightIcon />
        </IconButton> */}

        {/* Dots Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            top: isMobile ? '88%' : '96%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            zIndex: 2,
          }}
        >
          {Array.from({ length: bannerList.length }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                bgcolor: index === currentSlide ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: index === currentSlide 
                  ? '0 4px 12px rgba(59, 130, 246, 0.4)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.2)',
                border: index === currentSlide ? '2px solid #ffffff' : '2px solid transparent',
                '&:hover': {
                  bgcolor: index === currentSlide ? '#2563eb' : 'rgba(255, 255, 255, 0.9)',
                  transform: 'scale(1.15)',
                  boxShadow: index === currentSlide 
                    ? '0 6px 16px rgba(59, 130, 246, 0.5)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.3)',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BannerSlider;
