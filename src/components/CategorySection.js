import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Popover,
  Dialog,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  Balance as BalanceIcon,
  PieChart as PieChartIcon,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TestSeriesMenu from './TestSeriesMenu';

const CategorySection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElTestSeries, setAnchorElTestSeries] = useState(null);
  const openTestSeries = Boolean(anchorElTestSeries);
  const [selectedType, setSelectedType] = useState('');

  const handleTestSeriesClick = (event, type) => {
    setAnchorElTestSeries(event.currentTarget);
    setSelectedType(type);
  };

  const handleCloseTestSeries = () => {
    setAnchorElTestSeries(null);
  };


  const categories = [
    {
      id: 1,
      title: "CA Test Series",
      description: "Comprehensive test series for Chartered Accountancy with detailed solutions and performance analytics.",
      icon: CalculateIcon,
      iconColor: "#4361ee",
      iconBg: "#eaefff",
      cta: "Coming Soon",
      type: "CA"
    },
    {
      id: 2,
      title: "CS Test Series",
      description: "Prepare effectively for Company Secretary exams with our well-designed test series and expert guidance.",
      icon: BalanceIcon,
      iconColor: "#10b981",
      iconBg: "#e6f8f0",
      cta: "Start CS Tests",
      type: "CS"
    },
    {
      id: 3,
      title: "CMA Test Series",
      description: "Practice-oriented test series for Cost Management Accountant students with industry-relevant case studies.",
      icon: PieChartIcon,
      iconColor: "#f72585",
      iconBg: "#fff0f6",
      cta: "Coming Soon",
      type: "CMA"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50
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
              Prepare with your Favorite Teachers
            </Typography>
            {/* <Typography
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
              Choose from our specialized test series designed for professional accounting and finance certifications
            </Typography> */}
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '16px',
                      p: 2,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'rgba(79, 70, 229, 0.3)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: theme.shadows[4],
                        '& .category-icon': {
                          transform: 'scale(1.1) translateY(-5px)',
                        },
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '0.25rem',
                        background: theme.palette.primary.main,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <motion.div
                        className="category-icon"
                        animate={{
                          y: [-5, 5, -5]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '12px',
                            background: category.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          <category.icon
                            sx={{
                              fontSize: '1.5rem',
                              color: category.iconColor
                            }}
                          />
                        </Box>
                      </motion.div>

                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          mb: 2,
                        }}
                      >
                        {category.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 4,
                          lineHeight: 1.7,
                        }}
                      >
                        {category.description}
                      </Typography>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={category.cta === 'Start CS Tests' ? (event) => handleTestSeriesClick(event, category.type) : null}
                          variant="outlined"
                          sx={{
                            color: category?.cta === 'Start CS Tests' ? theme.palette.primary.main : theme.palette.error.main,
                            borderColor: category?.cta === 'Start CS Tests' ? theme.palette.primary.main : theme.palette.error.main,
                            borderWidth: '2px',
                            borderRadius: '12px',
                            px: 3,
                            py: 1.5,
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                              color: 'white',
                              borderColor: theme.palette.primary.main,
                              '&::before': {
                                left: 0,
                              },
                            },
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: theme.palette.primary.main,
                              transition: 'left 0.3s ease',
                              zIndex: -1,
                            },
                          }}
                        >
                          {category.cta}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
      {/* <Popover
        open={openTestSeries}
        anchorEl={anchorElTestSeries}
        onClose={handleCloseTestSeries}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'top',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'top',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '20px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            overflow: 'visible',
          },
        }}
      > */}
        <Dialog open={openTestSeries} onClose={handleCloseTestSeries}>

        <TestSeriesMenu
          setAnchorElTestSeries={setAnchorElTestSeries}
          mobileDropDown=""
          handleOpenNavMenuClose={() => setMobileOpen(false)}
          type={selectedType}
        />
        </Dialog>
      {/* </Popover> */}
    </Box>
  );
};

export default CategorySection;
