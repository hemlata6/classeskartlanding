import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Tooltip, Typography, useMediaQuery, Container, Card, CardMedia, Chip, Fade, Zoom, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BASE_URL } from "../network/endpoints";
import axios from "axios";
import Network from "../network/Network";
import instId from "../network/instituteId";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';


const SuccessStories = () => {

    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:960px)");
    const [isVisible, setIsVisible] = useState(false);
    const [shortsList, setShortsList] = useState([]);
    const [peviewImgVideo, setPeviewImgVideo] = useState({});
    const [endpointsUrl, setEndpointsUrl] = useState('')
    const [instituteRes, setInstituteRes] = useState('')

    // console.log("SuccessStories component rendered", instituteRes);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsVisible(true);
        getInstituteDetail();
    }, []);


    useEffect(() => {
        if (endpointsUrl) {
            getBanners();
        }
    }, [endpointsUrl])

    const getInstituteDetail = async () => {
        try {
            let requestOptions = {
                // headers: { "X-Auth": token },
                withCredentials: false,
            };
            const response = await axios.get(
                BASE_URL + "/getMetaData/fetch-institute/" + instId,
                requestOptions
            );
            if (response?.data?.errorCode === 0) {
                setInstituteRes(response?.data?.institute)
                setEndpointsUrl(response?.data?.instituteTechSetting?.mediaUrl)
            };
        } catch (error) {
            console.log(error);
        }
    };

    const getBanners = async () => {

        try {
            const response = await Network.getBannersApi(instId);
            const fetchedBanners = response.banners || [];
            if (fetchedBanners.length > 0) {
                setShortsList(fetchedBanners);
            } else {
                setShortsList([]);
            }
        } catch (error) {
            setShortsList([]);
        }
    };


    const handlePreview = (url, type, itemId) => {
        setPeviewImgVideo((prev) => ({ ...prev, [itemId]: { url, type } }));
    };

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(255,255,255,0.98) 50%, rgba(240,249,255,0.95) 100%)',
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 6, md: 2 },
            // minHeight: '70vh',
            mt: 8
        }}>
            {/* Background Decorative Elements */}
            <Box sx={{
                position: 'absolute',
                top: '15%',
                right: '8%',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(2, 135, 215, 0.06) 0%, rgba(2, 135, 215, 0.02) 70%, transparent 100%)',
                filter: 'blur(30px)',
                zIndex: 0
            }} />
            
            <Box sx={{
                position: 'absolute',
                bottom: '25%',
                left: '5%',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(254, 221, 61, 0.06) 0%, rgba(254, 221, 61, 0.02) 70%, transparent 100%)',
                filter: 'blur(25px)',
                zIndex: 0
            }} />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                {instituteRes?.gallery?.length > 0 && (
                    <>
                        {/* Enhanced Header Section */}
                        <Fade in={isVisible} timeout={800}>
                            <Box sx={{ textAlign: 'center', mb: 6 }}>
                                {/* Badge */}
                                <Chip 
                                    icon={<GradeIcon sx={{ color: '#0287D7 !important' }} />}
                                    label="Success Stories"
                                    sx={{
                                        background: 'linear-gradient(135deg, rgba(2, 135, 215, 0.08), rgba(2, 135, 215, 0.03))',
                                        border: '1px solid rgba(2, 135, 215, 0.15)',
                                        color: '#0287D7',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        mb: 3,
                                        borderRadius: '20px',
                                        py: 1,
                                        px: 2,
                                        boxShadow: '0 4px 12px rgba(2, 135, 215, 0.15)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 20px rgba(2, 135, 215, 0.25)'
                                        }
                                    }}
                                />
                                
                                {/* Main Heading */}
                                <Typography
                                    variant={isMobile ? "h5" : "h4"}
                                    sx={{
                                        background: 'linear-gradient(135deg, #333 0%, #0287D7 50%, #333 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 'bold',
                                        mb: 2,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Overwhelming{' '}
                                    <span style={{ 
                                        background: 'linear-gradient(135deg, #FEDD3D 0%, #F4C842 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        Success
                                    </span>{' '}
                                    in feedback
                                </Typography>
                                
                                {/* Subtitle */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: '#666',
                                        maxWidth: '600px',
                                        mx: 'auto',
                                        fontSize: { xs: '14px', md: '16px' }
                                    }}
                                >
                                    Discover the inspiring journey of our successful students
                                </Typography>
                            </Box>
                        </Fade>

                        {/* Enhanced Gallery Carousel */}
                        <Box sx={{ 
                            position: 'relative',
                            '& .swiper': {
                                paddingBottom: '30px',
                                overflow: 'visible'
                            },
                            '& .swiper-slide': {
                                height: 'auto'
                            },
                            '& .swiper-button-next, & .swiper-button-prev': {
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.4)',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                marginTop: '-25px',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 12px 35px rgba(0,0,0,0.15)'
                                },
                                '&::after': {
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#0287D7'
                                }
                            }
                        }}>
                            <Swiper
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                centeredSlides={false}
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 16 },
                                    768: { slidesPerView: 2, spaceBetween: 20 },
                                    1024: { slidesPerView: 3, spaceBetween: 24 },
                                    1200: { slidesPerView: 4, spaceBetween: 24 }
                                }}
                                navigation={true}
                                pagination={false}
                                modules={[Navigation, Autoplay]}
                                className="gallery-swiper"
                            >
                                {instituteRes?.gallery?.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <Zoom in={isVisible} timeout={800 + (i * 100)}>
                                            <Card
                                                sx={{
                                                    borderRadius: "24px",
                                                    overflow: 'hidden',
                                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                                                    backdropFilter: 'blur(20px)',
                                                    border: '1px solid rgba(255,255,255,0.4)',
                                                    boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.04)',
                                                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                    position: 'relative',
                                                    height: '100%',
                                                    mx: 1,
                                                    '&:hover': {
                                                        transform: 'translateY(-12px)',
                                                        boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 15px 40px rgba(0,0,0,0.08)',
                                                        '& .gallery-image': {
                                                            transform: 'scale(1.05)',
                                                        },
                                                        '& .gallery-overlay': {
                                                            opacity: 1,
                                                        },
                                                        '& .gallery-actions': {
                                                            transform: 'translateY(0)',
                                                            opacity: 1
                                                        },
                                                        '& .success-badge': {
                                                            transform: 'scale(1.1) rotate(5deg)',
                                                        }
                                                    }
                                                }}
                                            >
                                                {/* Image Container */}
                                                <Box sx={{ 
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    height: '280px',
                                                    borderRadius: '20px 20px 0 0'
                                                }}>
                                                    <CardMedia
                                                        className="gallery-image"
                                                        component="img"
                                                        image={endpointsUrl + item}
                                                        alt={`Success Story ${i + 1}`}
                                                        sx={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.4s ease'
                                                        }}
                                                    />
                                                    
                                                    {/* Gradient Overlay */}
                                                    <Box
                                                        className="gallery-overlay"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
                                                            opacity: 0,
                                                            transition: 'opacity 0.3s ease'
                                                        }}
                                                    />
                                                    
                                                    {/* Success Badge */}
                                                    <Chip
                                                        className="success-badge"
                                                        icon={<StarIcon sx={{ color: 'white !important', fontSize: '16px' }} />}
                                                        label={`Story ${i + 1}`}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 15,
                                                            right: 15,
                                                            background: 'linear-gradient(135deg, #FEDD3D, #F4C842)',
                                                            color: '#333',
                                                            fontWeight: 'bold',
                                                            fontSize: '11px',
                                                            boxShadow: '0 4px 12px rgba(254, 221, 61, 0.4)',
                                                            zIndex: 2,
                                                            transition: 'all 0.3s ease',
                                                            height: '28px'
                                                        }}
                                                    />
                                                    
                                                    {/* Action Buttons */}
                                                    {/* <Box
                                                        className="gallery-actions"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 16,
                                                            right: 16,
                                                            display: 'flex',
                                                            gap: 1,
                                                            transform: 'translateY(20px)',
                                                            opacity: 0,
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <IconButton
                                                            sx={{
                                                                background: 'rgba(255,255,255,0.9)',
                                                                backdropFilter: 'blur(10px)',
                                                                color: '#FF5722',
                                                                width: 36,
                                                                height: 36,
                                                                '&:hover': {
                                                                    background: 'rgba(255,255,255,1)',
                                                                    transform: 'scale(1.1)'
                                                                }
                                                            }}
                                                        >
                                                            <FavoriteIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                        
                                                        <IconButton
                                                            sx={{
                                                                background: 'rgba(255,255,255,0.9)',
                                                                backdropFilter: 'blur(10px)',
                                                                color: '#0287D7',
                                                                width: 36,
                                                                height: 36,
                                                                '&:hover': {
                                                                    background: 'rgba(255,255,255,1)',
                                                                    transform: 'scale(1.1)'
                                                                }
                                                            }}
                                                        >
                                                            <ShareIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                        
                                                        <IconButton
                                                            sx={{
                                                                background: 'rgba(255,255,255,0.9)',
                                                                backdropFilter: 'blur(10px)',
                                                                color: '#4CAF50',
                                                                width: 36,
                                                                height: 36,
                                                                '&:hover': {
                                                                    background: 'rgba(255,255,255,1)',
                                                                    transform: 'scale(1.1)'
                                                                }
                                                            }}
                                                        >
                                                            <VisibilityIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Box> */}

                                                    {/* Achievement Icon */}
                                                    {/* <Box sx={{
                                                        position: 'absolute',
                                                        bottom: 10,
                                                        left: 10,
                                                        background: 'rgba(0,0,0,0.7)',
                                                        borderRadius: '12px',
                                                        p: 1,
                                                        backdropFilter: 'blur(10px)'
                                                    }}>
                                                        <ThumbUpIcon sx={{ color: '#FEDD3D', fontSize: 20 }} />
                                                    </Box> */}
                                                </Box>

                                                {/* Card Footer */}
                                                <Box sx={{
                                                    background: 'linear-gradient(135deg, #001149 0%, #0d2d6b 100%)',
                                                    p: 3,
                                                    position: 'relative',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        background: 'radial-gradient(circle at 70% 20%, rgba(254, 221, 61, 0.08) 0%, transparent 50%)',
                                                        zIndex: 0
                                                    }
                                                }}>
                                                    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                                                        <Typography
                                                            sx={{
                                                                background: 'linear-gradient(135deg, #ffffff 0%, #FEDD3D 100%)',
                                                                backgroundClip: 'text',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                                fontWeight: 'bold',
                                                                fontSize: '16px',
                                                                mb: 1
                                                            }}
                                                        >
                                                            🎉 Success Story #{i + 1}
                                                        </Typography>
                                                        
                                                        <Typography
                                                            sx={{
                                                                color: '#fff',
                                                                fontSize: '13px',
                                                                fontWeight: '500',
                                                                opacity: 0.9,
                                                                background: 'rgba(254, 221, 61, 0.1)',
                                                                py: 1,
                                                                px: 2,
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(254, 221, 61, 0.2)'
                                                            }}
                                                        >
                                                            Outstanding Achievement!
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Zoom>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default SuccessStories;
