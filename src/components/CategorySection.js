import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  useTheme,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Import local images
import caTestSeriesImg from '../catestseries.png';
import csTestSeriesImg from '../cstestseries.png';
import cmaTestSeriesImg from '../cmatestseries.png';

const CategorySection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const categories = [
    {
      id: 1,
      image: caTestSeriesImg,
      alt: "CA Test Series Background",
      type: "CA",
    },
    {
      id: 2,
      image: csTestSeriesImg,
      alt: "CS Test Series Background",
      type: "CS",
    },
    {
      id: 3,
      image: cmaTestSeriesImg,
      alt: "CMA Test Series Background",
      type: "CMA",
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
                <Box
                  component='a'
                  href={'/test-series'}
                  sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  style={{ cursor: category.type === 'CS' ? 'pointer' : 'default' }}
                >
                  <motion.div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                    }}
                    variants={{
                      rest: { y: 0 },
                      hover: {
                        y: -8,
                        transition: { type: "spring", stiffness: 300 }
                      }
                    }}
                  >
                    {/* Main Image */}
                    <motion.img
                      src={category.image}
                      alt={category.alt}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        display: 'block',
                      }}
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.05, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                    />

                    {/* Glass Overlay */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        // backdropFilter: 'blur(2px)',
                        borderRadius: '12px',
                        pointerEvents: 'none',
                      }}
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1, transition: { duration: 0.4 } }
                      }}
                    />

                    {/* Decorative Glossy Dot */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.9)',
                      }}
                      variants={{
                        rest: { opacity: 0, y: 0 },
                        hover: {
                          opacity: 0.6,
                          y: [-3, -8, -3],
                          transition: {
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 0.3 }
                          }
                        }
                      }}
                    />

                    {/* Shine Sweep Effect */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                        borderRadius: '12px',
                        pointerEvents: 'none',
                      }}
                      variants={{
                        rest: { x: '-100%', opacity: 0 },
                        hover: {
                          x: '100%',
                          opacity: 1,
                          transition: { duration: 0.8, ease: "easeInOut" }
                        }
                      }}
                    />
                  </motion.div>
                </motion.div>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CategorySection;
