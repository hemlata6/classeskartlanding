import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ContactSection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: "Phone Number",
      details: ["+91 98765 43210", "+91 98765 43211"],
      iconColor: "#10b981",
      iconBg: "#e6f8f0",
    },
    {
      icon: EmailIcon,
      title: "Email Address",
      details: ["info@classkart.com", "support@classkart.com"],
      iconColor: "#4361ee",
      iconBg: "#eaefff",
    },
    {
      icon: LocationOnIcon,
      title: "Office Address",
      details: ["123 Education Street", "Mumbai, Maharashtra 400001"],
      iconColor: "#f72585",
      iconBg: "#fff0f6",
    },
    {
      icon: AccessTimeIcon,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      iconColor: "#f59e0b",
      iconBg: "#fef3c7",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    // Simulate form submission
    setSnackbar({
      open: true,
      message: 'Message sent successfully! We will get back to you soon.',
      severity: 'success',
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f8fafc 0%, rgba(248,250,252,0.8) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 800,
                color: theme.palette.text.primary,
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '4rem',
                  height: '0.25rem',
                  background: theme.palette.primary.main,
                  bottom: '-1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '0.125rem',
                },
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '48rem',
                mx: 'auto',
                fontSize: '1.125rem',
                lineHeight: 1.7,
                mt: 4,
              }}
            >
              Have questions about our courses? We're here to help you succeed in your professional journey
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 4,
                }}
              >
                Contact Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 3,
                        p: 2,
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          background: item.iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <item.icon 
                          sx={{ 
                            fontSize: '1.25rem', 
                            color: item.iconColor 
                          }} 
                        />
                      </Box>
                      
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 1,
                          }}
                        >
                          {item.title}
                        </Typography>
                        {item.details.map((detail, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                            }}
                          >
                            {detail}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                  boxShadow: theme.shadows[4],
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 3,
                    }}
                  >
                    Send us a Message
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.8)',
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.8)',
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.8)',
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.8)',
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          multiline
                          rows={4}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.8)',
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                              px: 4,
                              py: 1.5,
                              fontSize: '1rem',
                              fontWeight: 600,
                              borderRadius: '12px',
                              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                              boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
                              '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                                boxShadow: `0 12px 40px ${theme.palette.primary.main}60`,
                              },
                            }}
                          >
                            Send Message
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;
