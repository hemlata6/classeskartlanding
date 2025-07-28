import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const VideoSection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "CA Foundation Overview",
      description: "Complete guide to CA Foundation course structure and preparation strategy",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      duration: "15:30",
      views: "25K",
    },
    {
      id: 2,
      title: "CS Executive Tips",
      description: "Expert tips and tricks for CS Executive exam preparation",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      duration: "12:45",
      views: "18K",
    },
    {
      id: 3,
      title: "CMA Study Plan",
      description: "How to create an effective study plan for CMA exams",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      duration: "20:15",
      views: "32K",
    },
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

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
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
              Educational Videos
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
              Content that will add value in your Journey
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={4}>
            {videos.map((video, index) => (
              <Grid item xs={12} md={4} key={video.id}>
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
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'rgba(79, 70, 229, 0.3)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: theme.shadows[4],
                        '& .video-thumbnail': {
                          transform: 'scale(1.05)',
                        },
                        '& .play-button': {
                          transform: 'scale(1.1)',
                          backgroundColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    onClick={() => handleVideoClick(video)}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 200,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        className="video-thumbnail"
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${video.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                      
                      {/* Overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <motion.div
                          className="play-button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconButton
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              color: theme.palette.primary.main,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                              },
                            }}
                          >
                            <PlayArrowIcon sx={{ fontSize: '2rem' }} />
                          </IconButton>
                        </motion.div>
                      </Box>

                      {/* Duration Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          color: 'white',
                          px: 1,
                          py: 0.5,
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {video.duration}
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          mb: 1,
                          lineHeight: 1.4,
                        }}
                      >
                        {video.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 2,
                          lineHeight: 1.6,
                        }}
                      >
                        {video.description}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: '0.75rem',
                        }}
                      >
                        {video.views} views
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Video Dialog */}
      <Dialog
        open={!!selectedVideo}
        onClose={handleCloseVideo}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseVideo}
            sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {selectedVideo && (
            <Box
              sx={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                borderRadius: '12px',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '12px',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VideoSection;
