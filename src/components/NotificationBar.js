import React, { useEffect } from 'react';
import { Box, Typography, Chip, useTheme, Stack, AppBar, useScrollTrigger, useMediaQuery, } from '@mui/material';
import { motion } from 'framer-motion';
import Network from '../network/Network';
import CampaignIcon from '@mui/icons-material/Campaign';
import instId from '../network/instituteId';
import { styled } from '@mui/material/styles';

// Styled Components for Modern Design
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled
    ? 'rgba(255,255,255,0.98)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(248,249,250,0.95) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)', // Safari support
  boxShadow: scrolled
    ? '0 4px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)'
    : '0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
  borderBottom: scrolled
    ? '1px solid rgba(0,0,0,0.1)'
    : '1px solid rgba(0,0,0,0.06)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'fixed',
  zIndex: 1100,
  // Glass morphism effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    borderRadius: 'inherit',
    zIndex: -1,
  },
}));

const NotificationBar = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery("(min-width:600px)");
  const [announcements, setAnnouncements] = React.useState([]);

  // Converts kebab-case to title case with spaces, e.g. cs-amit-vohra => CS Amit Vohra
  // Handles abbreviations and names flexibly
  const kebabToTitleCaseWithAbbreviations = (kebab) => {
    if (!kebab) return "";
    return kebab
      .split("-")
      .map(word => {
        // If word is all uppercase or length <= 3, treat as abbreviation
        if (/^[A-Z]+$/.test(word) || word.length <= 3) {
          return word.toUpperCase();
        }
        // Otherwise, capitalize first letter
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const getAnnouncements = async () => {
    try {
      const response = await Network.fetchAnnouncements(instId);

      const path = window.location.pathname; // e.g. "/", "/503/vg-study-hub", "/483/cs-amit-vohra"
      let formattedDomain = "Home"; // default for home page
      const pathParts = path.split("/");
      // If path is like /483/cs-amit-vohra, get the second part as slug
      if (pathParts.length >= 3 && pathParts[2]) {
        const slug = pathParts[2]; // e.g. "cs-amit-vohra"
        formattedDomain = kebabToTitleCaseWithAbbreviations(slug);
      } else if (path !== "/" && pathParts.length >= 2 && pathParts[1]) {
        const slug = pathParts[1]; // e.g. "vg-study-hub"
        formattedDomain = kebabToTitleCaseWithAbbreviations(slug);
      };

      // console.log("Formatted domain from URL:", formattedDomain);
      const filtered = (response?.announcement || []).filter(item =>
        item?.domains?.some(domain =>
          domain?.name && domain.name.toLowerCase() === formattedDomain.toLowerCase()
        )
      );

      setAnnouncements(filtered);
    } catch (error) {
      console.log("Error fetching announcements:", error);
    };
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  // const scrollTexts = [
  //   "🎯 New CA Foundation Batch Starting Soon",
  //   "🔥 Limited Time Offer - 50% Off on All Courses",
  //   "📚 Expert Faculty with 10+ Years Experience",
  //   "⭐ 95% Success Rate in Professional Exams",
  //   "🚀 Join 5000+ Happy Students",
  //   "💡 Personalized Study Plans Available",
  //   "🏆 Top Rated Test Series Platform",
  //   "📱 Mobile App for Learning on the Go",
  // ];

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <StyledAppBar appear={false} direction="down" in={!trigger} >
      <Box
        sx={{
          py: 0.5,
          background: isMobile ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)` : '#4f46e5 !important',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* First Row - Left to Right */}
        <Box sx={{ mb: 0 }}>
          <Stack direction={'row'} spacing={2} alignItems="center" justifyContent="center" sx={{ overflow: 'hidden' }}>
            <CampaignIcon sx={{ color: '#fff', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }} />
            {
              announcements.length === 1 ? <>
                {
                  announcements?.map((item, i) => {
                    return (
                      <Typography
                        key={`first-${i}`}
                        variant="h6"
                        sx={{
                          color: 'white',
                          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                          fontWeight: 600,
                          itemShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          minWidth: 'max-content',
                        }}
                      >
                        {item?.title}
                        {/* {Array.isArray(item?.title) ? item.title.join(", ") : item?.title} */}
                      </Typography>
                    )
                  })
                }
              </> :
                <Stack direction={'row'} spacing={2} alignItems="center" justifyContent="center" sx={{ overflow: 'hidden' }}>
                  <CampaignIcon sx={{ color: '#fff' }} />
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      display: 'flex',
                      whiteSpace: 'nowrap',
                      gap: '4rem',
                    }}
                  >
                    {[...announcements, ...announcements].map((item, index) => (
                      <Typography
                        key={`first-${index}`}
                        variant="h6"
                        sx={{
                          color: 'white',
                          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                          fontWeight: 600,
                          itemShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          minWidth: 'max-content',
                        }}
                      >
                        {Array.isArray(item?.title) ? item.title.join(", ") : item?.title}
                      </Typography>
                    ))}
                  </motion.div>
                </Stack>
            }
          </Stack>
        </Box>

        {/* Gradient Overlays removed as requested */}
      </Box>
    </StyledAppBar>
  );
};

export default NotificationBar;
