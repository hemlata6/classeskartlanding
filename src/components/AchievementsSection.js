import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const CounterAnimation = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const AchievementsSection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const achievements = [
    {
      id: 1,
      title: "Success Rate",
      value: 95,
      suffix: "%",
      description: "Students passing their exams",
      icon: TrendingUpIcon,
      iconColor: "#10b981",
      iconBg: "#e6f8f0",
    },
    {
      id: 2,
      title: "Happy Students",
      value: 5000,
      suffix: "+",
      description: "Students trust our platform",
      icon: SchoolIcon,
      iconColor: "#f72585",
      iconBg: "#fff0f6",
    },
    {
      id: 3,
      title: "Expert Rating",
      value: 4.9,
      suffix: "/5",
      description: "Average rating from students",
      icon: StarIcon,
      iconColor: "#f59e0b",
      iconBg: "#fef3c7",
    },
    {
      id: 4,
      title: "Study Groups",
      value: 200,
      suffix: "+",
      description: "Active study communities",
      icon: GroupsIcon,
      iconColor: "#4361ee",
      iconBg: "#eaefff",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                color: 'white',
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '4rem',
                  height: '0.25rem',
                  background: 'rgba(255, 255, 255, 0.8)',
                  bottom: '-1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '0.125rem',
                },
              }}
            >
              Our Achievements
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '48rem',
                mx: 'auto',
                fontSize: '1.125rem',
                lineHeight: 1.7,
                mt: 4,
              }}
            >
              Numbers that speak about our commitment to student success
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={3} key={achievement.id}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '20px',
                      p: 3,
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        '& .achievement-icon': {
                          transform: 'scale(1.2) rotate(5deg)',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <motion.div
                        className="achievement-icon"
                        animate={{ 
                          rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '20px',
                            background: achievement.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          <achievement.icon 
                            sx={{ 
                              fontSize: '2rem', 
                              color: achievement.iconColor 
                            }} 
                          />
                        </Box>
                      </motion.div>

                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: '2.5rem',
                          fontWeight: 800,
                          color: theme.palette.primary.main,
                          mb: 1,
                          background: `linear-gradient(135deg, ${achievement.iconColor} 0%, ${theme.palette.primary.main} 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        <CounterAnimation 
                          end={achievement.value} 
                          duration={2500} 
                        />
                        {achievement.suffix}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          mb: 1,
                        }}
                      >
                        {achievement.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: '0.875rem',
                        }}
                      >
                        {achievement.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        />

        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            bottom: '-19%',
            right: '-5%',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        />
      </Container>
    </Box>
  );
};

export default AchievementsSection;
