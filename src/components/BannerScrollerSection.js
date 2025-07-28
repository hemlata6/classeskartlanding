import React, { use, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  YouTube,
  Instagram,
  LinkedIn,
  Twitter,
  Telegram,
} from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import { motion } from 'framer-motion';
import Network from '../network/Network';
import instId from '../network/instituteId';

const BannerScrollerSection = () => {

  const isMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [instituteSocial, setInstituteSocial] = React.useState([]);
  const [faceBooklink, setFaceBooklink] = React.useState("");
  const [instaLink, setInstaLink] = React.useState("");
  const [linkedInLink, setLinkedInLink] = React.useState("");
  const [twitterLink, setTwitterLink] = React.useState("");
  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [telegramLink, setTelegramLink] = React.useState("");

  const scrollTexts = [
    "🎯 New CA Foundation Batch Starting Soon",
    "🔥 Limited Time Offer - 50% Off on All Courses",
    "📚 Expert Faculty with 10+ Years Experience",
    "⭐ 95% Success Rate in Professional Exams",
    "🚀 Join 5000+ Happy Students",
    "💡 Personalized Study Plans Available",
    "🏆 Top Rated Test Series Platform",
    "📱 Mobile App for Learning on the Go",
  ];

  const fetchInstitute = async () => {
    try {
      const response = await Network.fetchInstitute(instId);
      // console.log("Institute data:", response?.instituteAppSetting);
      setInstituteSocial(response?.instituteAppSetting || []);
    } catch (error) {
      console.error("Error fetching institute data:", error);
    }
  };

  useEffect(() => {
    fetchInstitute();
  }, []);

  useEffect(() => {
    setFaceBooklink(instituteSocial?.facebookLink || "https://facebook.com");
    setInstaLink(instituteSocial?.instagramLink || "https://instagram.com");
    setYoutubeLink(instituteSocial?.youtubeLink || "https://youtube.com");
    setLinkedInLink(instituteSocial?.linkedinLink || "https://linkedin.com");
    setTwitterLink(instituteSocial?.twitterLink || "https://twitter.com");
    setTelegramLink(instituteSocial?.telegramLink || "https://telegram.org");
  }, [instituteSocial]);

  const handleSocialClick = (url) => {
    if (url && url !== "") {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
  };

  const socialIcons = [
    { icon: Facebook, link: faceBooklink, color: '#1877F2', name: 'Facebook' },
    { icon: YouTube, link: youtubeLink, color: '#FF0000', name: 'YouTube' },
    { icon: Instagram, link: instaLink, color: '#E4405F', name: 'Instagram' },
    { icon: LinkedIn, link: linkedInLink, color: '#0A66C2', name: 'LinkedIn' },
    { icon: XIcon, link: twitterLink, color: '#1DA1F2', name: 'Twitter' },
    { icon: Telegram, link: telegramLink, color: '#0088CC', name: 'Telegram' },
  ];

  // console.log("Fetching institute data:", instituteSocial);

  return (
    <Box
      sx={{
        py: 2,
        background: isMobile ?  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)` :'#4f46e5',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* First Row - Left to Right */}
      <Box>
        {/* <motion.div
          // animate={{
          //   x: ['-100%', '100%'],
          // }}
          // transition={{
          //   duration: 30,
          //   repeat: Infinity,
          //   ease: "linear",
          // }}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            gap: '4rem',
          }}
        >
          {[...scrollTexts, ...scrollTexts].map((text, index) => (
            <Typography
              key={`first-${index}`}
              variant="h6"
              sx={{
                color: 'white',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                minWidth: 'max-content',
              }}
            >
              {text}
            </Typography>
          ))}
        </motion.div> */}
        <Stack
          direction={isMobile ? "row" : "column"}
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            py: 0,
          }}
        >
          <Typography
            fontSize={{ xs: '0.875rem', sm: '1rem', md: '1.125rem' }}
            sx={{
              color: 'white',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Connect with us :
          </Typography>
          <Stack
            direction={'row'}
            spacing={2}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              py: 0,
            }}
          >
            {socialIcons.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  onClick={() => handleSocialClick(social.link)}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    width: 48,
                    height: 48,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: social.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${social.color}40`,
                    },
                  }}
                >
                  <social.icon sx={{ fontSize: 24 }} />
                </IconButton>
              </motion.div>
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* Second Row - Right to Left */}
      {/* <Box>
        <motion.div
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            gap: '4rem',
          }}
        >
          {[...scrollTexts.slice().reverse(), ...scrollTexts.slice().reverse()].map((text, index) => (
            <Typography
              key={`second-${index}`}
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                fontWeight: 500,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                minWidth: 'max-content',
              }}
            >
              {text}
            </Typography>
          ))}
        </motion.div>
      </Box> */}

      {/* Gradient Overlays removed as requested */}
    </Box>
  );
};

export default BannerScrollerSection;
