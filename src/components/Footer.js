import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  Divider,
  useTheme,
  Badge,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from '../C (2).png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
   const isMobile = useMediaQuery("(max-width:600px)");
   const navigate = useNavigate();

  const quickLinks = [
    { name: 'About Us', href: '/why-choose-us' },
    { name: 'Upskilling Courses', href: '#', badge: 'Coming Soon' },
    {
      name: 'Test Series',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
        if (window.scrollToCategorySection) {
          window.scrollToCategorySection();
        } else {
          window.location.href = '/'; // fallback: go to home
        }
      }
    },
    // { name: 'Faculty', href: '#' },
    { name: 'Success Stories', href: '/success-stories' },
    // { name: 'Blog', href: '#' },
  ];

  const courses = [
    { name: 'CA Foundation', href: '#' },
    { name: 'CA Intermediate', href: '#' },
    { name: 'CA Final', href: '#' },
    { name: 'CS Executive', href: '#' },
    { name: 'CS Professional', href: '#' },
    { name: 'CMA Foundation', href: '#' },
  ];

  const support = [
    // { name: 'Help Center', href: 'tel:+919049730883' },
    // { name: 'Contact Us', href: 'https://wa.me/919049730883' },
    { name: 'Privacy Policy', href: '/privacypolicy' },
    { name: 'Terms of Service', href: '/terms-and-conditions' },
    { name: 'Refund Policy', href: '/refund-policy' },
    // { name: 'Student Portal', href: '#' },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: '#', color: '#1877f2' },
    { icon: TwitterIcon, href: '#', color: '#1da1f2' },
    { icon: InstagramIcon, href: '#', color: '#e4405f' },
    { icon: LinkedInIcon, href: '#', color: '#0a66c2' },
    { icon: YouTubeIcon, href: '#', color: '#ff0000' },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        pt: 8,
        pb: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 198, 255, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h4"
                // component="a"
                // href="/"
                onClick={() => navigate('/')}
                sx={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  mb: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  cursor: 'pointer',
                  display: isMobile ? 'flex' : 'block',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                 <img src={Logo} alt="ClassesKart Logo" style={{ width: 80, marginBottom: '1rem' , borderRadius: '50%' }} />
                {/* ClassesKart */}
                <Typography 
                sx={{
                  color:'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                }}
                >
                  ClassesKart
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                Your premier destination for professional exam preparation. 
                We provide comprehensive courses, test series, and study materials 
                for CA, CS, and CMA aspirants.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ fontSize: '1rem', mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    info@classkart.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ fontSize: '1rem', mr: 1, color: theme.palette.primary.main }} />
                  <Typography component="a" href="tel:+919049730883" variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' , textDecoration: 'none' }}>
                    +91 90497 30883
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <LocationOnIcon sx={{ fontSize: '1rem', mr: 1, mt: 0.5, color: theme.palette.primary.main }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    123 Education Street,<br />Mumbai, Maharashtra 400001
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      href={social.href}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: social.color,
                          borderColor: social.color,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <social.icon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4} padding={isMobile ? '' :'40px 0px 0px 130px !important'}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  mb: 3,
                  color: 'white',
                }}
              >
                Quick Links
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Link
                        href={link.href}
                        onClick={link.onClick}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                      {link.badge && (
                        <Badge
                          badgeContent={link.badge}
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: '#f59e0b',
                              color: 'white',
                              fontSize: '0.45rem',
                              fontWeight: 600,
                              borderRadius: '8px',
                              px: 1,
                              py: 0.5,
                              minWidth: 'auto',
                              height: 'auto',
                              ml: -7,
                              position: 'relative',
                              top: -5,
                            },
                          }}
                        />
                      )}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Courses */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  mb: 3,
                  color: 'white',
                }}
              >
                Courses
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={course.href}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {course.name}
                    </Link>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid> */}

          {/* Support */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  mb: 3,
                  color: 'white',
                }}
              >
                Support
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {support.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={item.href}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider 
          sx={{ 
            my: 6, 
            backgroundColor: 'rgba(255, 255, 255, 0.1)' 
          }} 
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              © 2024 ClassKart. All rights reserved. Made with ❤️ for aspiring professionals.
            </Typography>

            {/* <Box
              sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Cookie Policy
              </Link>
            </Box> */}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
