import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Container,
    useTheme,
    useMediaQuery,
    Avatar,
    Chip,
    Skeleton,
    CircularProgress,
    Fade,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import {
    PlayArrow as PlayArrowIcon,
    Pause as PauseIcon,
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    Visibility as VisibilityIcon,
    School as SchoolIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Network from '../network/Network';
import Endpoints from '../network/endpoints';
import instId from '../network/instituteId';

const StudentShorts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [playingVideos, setPlayingVideos] = useState(new Set());
    const videoRefs = useRef({});
    const containerRef = useRef(null);

    // Fetch videos from API
    const fetchStudentVideos = async () => {
        let body = {
            page: 0,
            pageSize: 25
        }
        try {
            setLoading(true);
            // Replace with actual API endpoint for student videos
            const response = await Network.getShortsApi(body, instId);

            if (response && response.videos) {
                setVideos(response.videos);
            } else {
                // Fallback demo data
                setVideos([
                    {
                        id: 1,
                        videoUrl: '/demo-video1.mp4',
                        thumbnail: '/demo-thumb1.jpg',
                        studentName: 'Rahul Sharma',
                        course: 'JEE Main 2024',
                        batch: 'Batch A',
                        title: 'My journey from 60% to 95% in Physics!',
                        views: 12500,
                        likes: 890,
                        duration: '00:45',
                        createdAt: new Date().toISOString(),
                    },
                    {
                        id: 2,
                        videoUrl: '/demo-video2.mp4',
                        thumbnail: '/demo-thumb2.jpg',
                        studentName: 'Priya Patel',
                        course: 'NEET 2024',
                        batch: 'Batch B',
                        title: 'Chemistry tips that changed my life',
                        views: 8900,
                        likes: 645,
                        duration: '01:12',
                        createdAt: new Date().toISOString(),
                    },
                    {
                        id: 3,
                        videoUrl: '/demo-video3.mp4',
                        thumbnail: '/demo-thumb3.jpg',
                        studentName: 'Arjun Kumar',
                        course: 'IIT JEE Advanced',
                        batch: 'Batch C',
                        title: 'From failure to success - My story',
                        views: 15600,
                        likes: 1200,
                        duration: '02:30',
                        createdAt: new Date().toISOString(),
                    },
                    {
                        id: 4,
                        videoUrl: '/demo-video4.mp4',
                        thumbnail: '/demo-thumb4.jpg',
                        studentName: 'Sneha Gupta',
                        course: 'CA Foundation',
                        batch: 'Batch D',
                        title: 'Accounting made simple in 60 seconds',
                        views: 7800,
                        likes: 520,
                        duration: '01:05',
                        createdAt: new Date().toISOString(),
                    },
                ]);
            }
        } catch (error) {
            console.error('Error fetching student videos:', error);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentVideos();
    }, []);

    // Handle video play/pause
    const toggleVideoPlay = (videoId) => {
        const video = videoRefs.current[videoId];
        if (!video) return;

        if (playingVideos.has(videoId)) {
            video.pause();
            setPlayingVideos(prev => {
                const newSet = new Set(prev);
                newSet.delete(videoId);
                return newSet;
            });
        } else {
            // Pause all other videos
            Object.values(videoRefs.current).forEach(v => v && v.pause());
            setPlayingVideos(new Set([videoId]));
            video.play().catch(console.error);
        }
    };

    // Handle scroll navigation
    const scrollToVideo = (direction) => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const cardWidth = isMobile ? window.innerWidth : 320;
        const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    // Handle mobile swipe navigation
    const handleTouchStart = useRef(null);
    const handleTouchMove = useRef(null);

    const onTouchStart = (e) => {
        handleTouchStart.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
        if (!handleTouchStart.current) return;

        handleTouchMove.current = e.touches[0].clientY;
        const diff = handleTouchStart.current - handleTouchMove.current;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentVideoIndex < videos.length - 1) {
                setCurrentVideoIndex(prev => prev + 1);
            } else if (diff < 0 && currentVideoIndex > 0) {
                setCurrentVideoIndex(prev => prev - 1);
            }
            handleTouchStart.current = null;
            handleTouchMove.current = null;
        }
    };

    // Format numbers
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString();
    };

    // const handleShare = (e, video) => {
    //     const videoUrl = `${'/' + Endpoints.mediaBaseUrl}${video?.video}.mp4`; // Ensure correct URL format
    //     console.log('Sharing video URL:', video);
    //     if (navigator.share) {
    //         navigator.share({
    //             title: video?.title || 'Student Story',
    //             text: `${video?.caption}`,
    //             url: videoUrl,
    //         })
    //             .then(() => console.log(''))
    //             .catch((error) => console.error('Sharing failed', error));
    //     } else {
    //         // Fallback for browsers that don't support Web Share API
    //         navigator.clipboard.writeText(videoUrl).then(() => {
    //             alert('Link copied to clipboard!');
    //         }).catch(() => {
    //             alert('Failed to copy link.');
    //         });
    //     }
    // };


    // Loading skeleton
    const LoadingSkeleton = () => (
        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            {[1, 2, 3, 4].map((item) => (
                <Box key={item} sx={{ minWidth: 280 }}>
                    <Skeleton variant="rectangular" width={280} height={480} sx={{ borderRadius: 4 }} />
                    <Box sx={{ p: 2 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width="80%" height={24} sx={{ mt: 1 }} />
                        <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                </Box>
            ))}
        </Box>
    );

    if (loading) {
        return (
            <Box sx={{ py: 6, background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            🎓 Listen to the voice of future Professionals
                        </Typography>
                    </Box>
                    <LoadingSkeleton />
                </Container>
            </Box>
        );
    }

    if (videos.length === 0) {
        return (
            <Box sx={{ py: 6, background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                                mb: 4,
                            }}
                        >
                            🎓 Listen to the voice of future Professionals
                        </Typography>
                        <Box
                            sx={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 4,
                                p: 8,
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <SchoolIcon sx={{ fontSize: 80, color: '#667eea', opacity: 0.7, mb: 2 }} />
                            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                                No Student Stories Available
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Check back soon for inspiring student success stories!
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 6, background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', overflow: 'hidden' }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Fade in timeout={800}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            🎓 Listen to the voice of future Professionals
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                maxWidth: '600px',
                                mx: 'auto',
                                fontSize: { xs: '14px', md: '16px' }
                            }}
                        >
                            Real stories, real success, real inspiration from our students
                        </Typography>
                    </Box>
                </Fade>

                {/* Videos Container */}
                <Box sx={{ position: 'relative' }}>
                    {/* Desktop Navigation Arrows */}
                    {!isMobile && (
                        <>
                            <IconButton
                                onClick={() => scrollToVideo('left')}
                                sx={{
                                    position: 'absolute',
                                    left: -20,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 2,
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: '#fff',
                                    width: 48,
                                    height: 48,
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        transform: 'translateY(-50%) scale(1.1)',
                                    },
                                }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => scrollToVideo('right')}
                                sx={{
                                    position: 'absolute',
                                    right: -20,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 2,
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: '#fff',
                                    width: 48,
                                    height: 48,
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        transform: 'translateY(-50%) scale(1.1)',
                                    },
                                }}
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        </>
                    )}

                    {/* Videos Scroll Container */}
                    <Box
                        ref={containerRef}
                        onTouchStart={isMobile ? onTouchStart : undefined}
                        onTouchMove={isMobile ? onTouchMove : undefined}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 3,
                            overflowX: isMobile ? 'hidden' : 'auto',
                            overflowY: 'hidden',
                            scrollBehavior: 'smooth',
                            pb: 2,
                            px: 1,
                            '&::-webkit-scrollbar': {
                                height: 8,
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 4,
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: 4,
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.5)',
                                },
                            },
                        }}
                    >
                        <AnimatePresence>
                            {videos.map((video, index) => {
                                // console.log('========>',Endpoints.mediaBaseUrl + video?.video);
                                return (
                                    <Stack px={[1, 4]} direction={'row'} justifyContent="center" alignItems="center" key={index}>
                                        <motion.div
                                            key={video.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <Card
                                                sx={{
                                                    width: 280,
                                                    height: 500,
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    backdropFilter: 'blur(20px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: 4,
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-8px)',
                                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    },
                                                }}
                                                onClick={() => toggleVideoPlay(video.id)}
                                            >
                                                {/* Video/Thumbnail */}
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        height: '100%',
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {/* Video element (hidden for demo) */}
                                                    <video
                                                        ref={(el) => {
                                                            if (el) videoRefs.current[video.id] = el;
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            //   objectFit: 'cover',
                                                            //   display: 'none', // Hidden for demo
                                                        }}
                                                        loop
                                                        muted
                                                        playsInline
                                                        controls
                                                    >
                                                        <source src={Endpoints.mediaBaseUrl + video?.video} type="video/mp4" />
                                                    </video>

                                                    {/* Thumbnail/Demo placeholder */}
                                                    {/* <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), url(${video.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconButton
                          sx={{
                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                            color: '#fff',
                            width: 60,
                            height: 60,
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.8)',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          {playingVideos.has(video?.id) ? (
                            <PauseIcon sx={{ fontSize: 30 }} />
                          ) : (
                            <PlayArrowIcon sx={{ fontSize: 30 }} />
                          )}
                        </IconButton>
                      </Box> */}

                                                    {/* Duration Badge */}
                                                    {/* <Chip
                        label={video?.duration}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                          color: '#fff',
                          fontSize: '12px',
                          height: 24,
                        }}
                      /> */}

                                                    {/* Action Icons */}
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            right: 12,
                                                            bottom: 70,
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                                                color: '#fff',
                                                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                                                            }}
                                                        >
                                                            <FavoriteIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            // onClick={(e) => handleShare(e, video)}
                                                            sx={{
                                                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                                                color: '#fff',
                                                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                                                            }}
                                                        >
                                                            <ShareIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Box>
                                                </Box>

                                                {/* Content */}
                                                <CardContent sx={{ height: '30%', p: 2 }}>
                                                    {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}> */}
                                                    {/* <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          {video?.studentName?.charAt(0)}
                        </Avatar> */}
                                                    {/* <Box sx={{ ml: 1, flex: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              lineHeight: 1.2,
                            }}
                          >
                            {video?.studentName}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontSize: '12px',
                            }}
                          >
                            {video?.course} • {video?.batch}
                          </Typography>
                        </Box> */}
                                                    {/* </Box> */}

                                                    {/* <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: 'rgba(255, 255, 255, 0.9)',
                                                            fontSize: '13px',
                                                            lineHeight: 1.3,
                                                            mb: 1,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {video?.caption}
                                                    </Typography> */}

                                                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <VisibilityIcon sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)' }} />
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '11px' }}
                          >
                            {formatNumber(video?.views)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <FavoriteIcon sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)' }} />
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '11px' }}
                          >
                            {formatNumber(video?.likes)}
                          </Typography>
                        </Box>
                      </Box> */}
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Stack>
                                )
                            })}
                        </AnimatePresence>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default StudentShorts