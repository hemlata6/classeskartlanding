import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Divider,
  useTheme,
  Badge,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'About Us', href: '/why-choose-us' },
    { name: 'Upskilling Courses', href: '#', badge: 'Coming Soon' },
    { name: 'Test Series', href: '/test-series' },
    { name: 'Success Stories', href: '/success-stories' },
  ];

  const support = [
    { name: 'Privacy Policy', href: '/privacypolicy' },
    { name: 'Terms of Service', href: '/terms-and-conditions' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: 'https://www.instagram.com/classeskart/?__pwa=1', color: '#1877f2' },
    { icon: TwitterIcon, href: 'https://www.instagram.com/classeskart/?__pwa=1', color: '#1da1f2' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/classeskart/?__pwa=1', color: '#e4405f' },
    { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/classes-kart-4281a3378', color: '#0a66c2' },
    { icon: YouTubeIcon, href: 'https://www.instagram.com/classeskart/?__pwa=1', color: '#ff0000' },
  ];

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': { color: theme.palette.primary.main },
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', pt: 8, pb: 3, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05,
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120,198,255,0.3) 0%, transparent 50%)`
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Brand + Social */}
          <Grid item xs={12} md={3}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Typography component={'a'} href="/" sx={{
                fontSize: '2rem', fontWeight: 800, mb: 1,
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                cursor: 'pointer', display: 'inline-block'
              }}>
                ClassesKart
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, mb: 3, maxWidth: 360 }}>
                Your premier destination for professional exam preparation. We provide comprehensive courses, test series, and study materials for CA, CS, and CMA aspirants.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <IconButton href={social.href} target="_blank" sx={{
                      color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', transition: 'all 0.3s ease',
                      '&:hover': { color: social.color, borderColor: social.color, backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}>
                      <social.icon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <Typography variant="h6" sx={{ fontSize: '1.125rem', fontWeight: 700, mb: 3, color: 'white' }}>Contact Us</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: '1rem', color: theme.palette.primary.main }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>classeskart.in@gmail.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: '1rem', color: theme.palette.primary.main }} />
                  <Typography component="a" href="tel:+917498597352" variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>+91 74985 97352</Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <Typography variant="h6" sx={{ fontSize: '1.125rem', fontWeight: 700, mb: 3, color: 'white' }}>Quick Links</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                {quickLinks.map((link, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box component="a" href={link.href !== '#' ? link.href : undefined} onClick={(e) => { if (link.href === '#') e.preventDefault(); }} sx={linkStyle}>{link.name}</Box>
                      {link.badge && (
                        <Badge badgeContent={link.badge} sx={{ '& .MuiBadge-badge': { backgroundColor: '#f59e0b', color: 'white', fontSize: '0.6rem', fontWeight: 600, borderRadius: '8px', px: 1, py: 0.5, minWidth: 'auto', height: 'auto', position: 'relative', top: -2, left: '-60px' } }} />
                      )}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <Typography variant="h6" sx={{ fontSize: '1.125rem', fontWeight: 700, mb: 3, color: 'white' }}>Support</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {support.map((item, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }}>
                    <Box component="a" href={item.href} sx={linkStyle}>{item.name}</Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontSize: '0.8rem' }}>
            © 2024 ClassesKart All rights reserved. Made with ❤️ for aspiring professionals
            {' | '}Tech Partner:
            <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600, ml: 0.5 }}>CLASSIQ LABS</Box>
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
