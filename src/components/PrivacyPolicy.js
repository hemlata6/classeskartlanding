import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Container, Card, Chip, Fade, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SecurityIcon from '@mui/icons-material/Security';
import PolicyIcon from '@mui/icons-material/Policy';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InfoIcon from '@mui/icons-material/Info';

const PrivacyPolicy = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(255,255,255,0.98) 50%, rgba(240,249,255,0.95) 100%)',
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 0, md: 3 },
            // minHeight: '100vh',
            mt: 0
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

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Fade in={isVisible} timeout={800}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        {/* Badge */}
                        <Chip
                            icon={<PolicyIcon sx={{ color: '#0287D7 !important' }} />}
                            label="Legal Document"
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
                            variant={isMobile ? "h4" : "h3"}
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
                            Privacy &{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #FEDD3D 0%, #F4C842 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Policy
                            </span>
                        </Typography>

                        {/* Effective Date */}
                        <Chip
                            label="Effective Date: 22 Feb 2024"
                            sx={{
                                background: 'linear-gradient(135deg, rgba(254, 221, 61, 0.1), rgba(254, 221, 61, 0.05))',
                                border: '1px solid rgba(254, 221, 61, 0.2)',
                                color: '#F4C842',
                                fontWeight: '600',
                                fontSize: '12px',
                                mb: 3
                            }}
                        />
                    </Box>
                </Fade>

                {/* Main Content Card */}
                <Fade in={isVisible} timeout={1000}>
                    <Card sx={{
                        borderRadius: "24px",
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.04)',
                        p: { xs: 3, md: 6 }
                    }}>
                        {/* Introduction Section */}
                        <Box sx={{ mb: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <SecurityIcon sx={{ color: '#0287D7', fontSize: 28, mr: 2 }} />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#333',
                                        background: 'linear-gradient(135deg, #333 0%, #0287D7 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    Our Commitment to Your Privacy
                                </Typography>
                            </Box>

                            <Paper sx={{
                                background: 'linear-gradient(135deg, rgba(2, 135, 215, 0.05), rgba(2, 135, 215, 0.02))',
                                border: '1px solid rgba(2, 135, 215, 0.1)',
                                borderRadius: '16px',
                                p: 3,
                                mb: 4
                            }}>
                                <Typography
                                    sx={{
                                        fontSize: { xs: '16px', md: '18px' },
                                        lineHeight: 1.7,
                                        color: '#555',
                                        textAlign: 'center'
                                    }}
                                >
                                    At ClassesKart, we are committed to safeguarding your privacy and ensuring that your personal data is secure, confidential, and handled with the utmost integrity.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: { xs: '16px', md: '18px' },
                                        lineHeight: 1.7,
                                        color: '#555',
                                        textAlign: 'center'
                                    }}
                                >
                                    By visiting our website, mobile application, or using our services, you agree to the terms outlined in this Privacy Policy and consent to our collection, use, storage, and sharing of your personal information as described herein.
                                </Typography>
                            </Paper>
                        </Box>

                        <Grid container spacing={4}>
                            {/* Section 1: Information We Collect */}
                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        {/* <InfoIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} /> */}
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            ✅ User Consent
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        By submitting your personal data through our website or mobile application, you expressly consent to the terms of this Privacy Policy. This includes the collection, use, and disclosure of your personal information in accordance with applicable law and the terms below.
                                    </Typography>
                                </Card>
                            </Grid>
                            {/* Section 1: Information We Collect */}
                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <InfoIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            1. 📥 Information We Collect
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        We collect both personally identifiable information (PII) and non-personal data to serve you better. This may include:
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { title: "Personal Identification Information", desc: "Full name, email address, mobile number" },
                                            { title: "Educational Information", desc: "Billing and shipping addresses" },
                                            { title: "Payment Information", desc: "Payment details (debit/credit card, UPI, etc.)" },
                                            { title: "Usage Data", desc: "Transaction history, order preferences" },
                                            { title: "Other Information", desc: "Browser type, IP address, and device information" },
                                            { title: "Other Information", desc: "Messages, emails, or feedback sent to our tea" },
                                            { title: "Other Information", desc: "Behavioral data (such as usage patterns and click activity)" }
                                        ].map((item, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Paper sx={{
                                                    background: 'linear-gradient(135deg, rgba(248,250,252,0.8), rgba(255,255,255,0.8))',
                                                    border: '1px solid rgba(2, 135, 215, 0.08)',
                                                    borderRadius: '12px',
                                                    p: 2,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateX(8px)',
                                                        borderColor: 'rgba(2, 135, 215, 0.2)'
                                                    }
                                                }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#0287D7', mb: 1 }}>
                                                        • {item.desc}
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#666', fontSize: '14px', pl: 2 }}>
                                                        {item.desc}
                                                    </Typography> */}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Typography sx={{ mt: 3, color: '#666', fontSize: '16px' }}>
                                        You may choose not to share certain information, but this could restrict access to specific features or services.
                                    </Typography>
                                </Card>
                            </Grid>

                            {/* Section 2: How We Use Your Information */}
                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <VerifiedUserIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            2. 🎯 How We Use Your Information
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        We use your data to
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { title: "Process orders and enable transactions", desc: "To enroll you in coaching programs, provide study materials, and offer personalized mentoring." },
                                            { title: "Deliver online/offline classes, books, and test series", desc: "To send you important updates, notifications, and information related to your course or inquiries." },
                                            { title: "Offer customer support and resolve issues", desc: "To inform you about new courses, promotions, events, and other educational offerings." },
                                            { title: "Share course recommendations or offers (with your consent)", desc: "To understand how students use our services, to improve content, curriculum, and overall student experience." },
                                            { title: "Improve website functionality and course curation", desc: "To process your transactions and maintain records for billing purposes." },
                                            { title: "Monitor fraud or suspicious activity", desc: "To comply with applicable laws and regulations." },
                                            { title: "Ful fill legal obligations", desc: "To comply with applicable laws and regulations." }
                                        ].map((item, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <Paper sx={{
                                                    background: 'linear-gradient(135deg, rgba(254, 221, 61, 0.05), rgba(254, 221, 61, 0.02))',
                                                    border: '1px solid rgba(254, 221, 61, 0.1)',
                                                    borderRadius: '12px',
                                                    p: 2,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        borderColor: 'rgba(254, 221, 61, 0.3)'
                                                    }
                                                }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#F4C842', mb: 1 }}>
                                                        • {item.title}
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#666', fontSize: '14px' }}>
                                                        {item.desc}
                                                    </Typography> */}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Typography sx={{ mt: 3, color: '#666', fontSize: '16px' }}>
                                        You may opt out of promotional communication anytime through your account or email.
                                    </Typography>
                                </Card>
                            </Grid>

                            {/* Section 2: How We Use Your Information */}
                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <VerifiedUserIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            3. 🔗 Sharing of Information
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        We do not sell or rent your personal information to third parties. However, we may share it with:
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { title: "Trusted service partners (delivery, payment gateways, etc.)", desc: "To enroll you in coaching programs, provide study materials, and offer personalized mentoring." },
                                            { title: "Government or legal authorities (when required by law)", desc: "To send you important updates, notifications, and information related to your course or inquiries." },
                                            { title: "Affiliated entities during business reorganization, mergers, or acquisitions", desc: "To inform you about new courses, promotions, events, and other educational offerings." },
                                            { title: "Internal teams for fraud detection, analytics, or customer service", desc: "To understand how students use our services, to improve content, curriculum, and overall student experience." }
                                        ].map((item, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <Paper sx={{
                                                    background: 'linear-gradient(135deg, rgba(254, 221, 61, 0.05), rgba(254, 221, 61, 0.02))',
                                                    border: '1px solid rgba(254, 221, 61, 0.1)',
                                                    borderRadius: '12px',
                                                    p: 2,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        borderColor: 'rgba(254, 221, 61, 0.3)'
                                                    }
                                                }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#F4C842', mb: 1 }}>
                                                        • {item.title}
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#666', fontSize: '14px' }}>
                                                        {item.desc}
                                                    </Typography> */}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Typography sx={{ mt: 3, color: '#666', fontSize: '16px' }}>
                                        All third-party access is governed by strict confidentiality agreements.
                                    </Typography>
                                </Card>
                            </Grid>

                            {/* Section 2: How We Use Your Information */}
                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <VerifiedUserIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            4. ⚖️ Legal Rights and Compliance
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        We may disclose your data to law enforcement, regulatory authorities, or judicial bodies under the following circumstances:
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { title: "In response to court orders, legal notices, or subpoenas", desc: "To enroll you in coaching programs, provide study materials, and offer personalized mentoring." },
                                            { title: "To exercise our legal rights or defend against claims", desc: "To send you important updates, notifications, and information related to your course or inquiries." },
                                            { title: "To comply with applicable laws or protect the rights, safety, or property of ClassesKart, our users, or the public", desc: "To inform you about new courses, promotions, events, and other educational offerings." }
                                        ].map((item, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <Paper sx={{
                                                    background: 'linear-gradient(135deg, rgba(254, 221, 61, 0.05), rgba(254, 221, 61, 0.02))',
                                                    border: '1px solid rgba(254, 221, 61, 0.1)',
                                                    borderRadius: '12px',
                                                    p: 2,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        borderColor: 'rgba(254, 221, 61, 0.3)'
                                                    }
                                                }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#F4C842', mb: 1 }}>
                                                        • {item.title}
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#666', fontSize: '14px' }}>
                                                        {item.desc}
                                                    </Typography> */}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <VerifiedUserIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            5. 🔐 Security Measures
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        Your privacy is protected with robust data security protocols, including:
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { title: "SSL encryption on payment and login pages", desc: "To enroll you in coaching programs, provide study materials, and offer personalized mentoring." },
                                            { title: "Secure servers and restricted internal access", desc: "To send you important updates, notifications, and information related to your course or inquiries." },
                                            { title: "Periodic audits to detect potential vulnerabilities", desc: "To inform you about new courses, promotions, events, and other educational offerings." },
                                            { title: "Real-time monitoring of suspicious activity", desc: "To inform you about new courses, promotions, events, and other educational offerings." }
                                        ].map((item, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <Paper sx={{
                                                    background: 'linear-gradient(135deg, rgba(254, 221, 61, 0.05), rgba(254, 221, 61, 0.02))',
                                                    border: '1px solid rgba(254, 221, 61, 0.1)',
                                                    borderRadius: '12px',
                                                    p: 2,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        borderColor: 'rgba(254, 221, 61, 0.3)'
                                                    }
                                                }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#F4C842', mb: 1 }}>
                                                        • {item.title}
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#666', fontSize: '14px' }}>
                                                        {item.desc}
                                                    </Typography> */}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Typography sx={{ mt: 3, color: '#666', fontSize: '16px' }}>
                                        Your privacy is protected with robust data security protocols, including:
                                    </Typography>

                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <VerifiedUserIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            6. 🧾 External Links
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        Our platform may contain links to third-party websites. These websites have separate and independent privacy policies. We are not responsible for their practices or content.
                                    </Typography>

                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <VerifiedUserIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            7. 👥 Access and Choice
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        You can review, update, or delete your personal information by logging into your ClassesKart account. You also have the right to:
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { title: "Request data correction", desc: "To enroll you in coaching programs, provide study materials, and offer personalized mentoring." },
                                            { title: "Opt out of marketing communication", desc: "To send you important updates, notifications, and information related to your course or inquiries." },
                                            { title: "Request account deletion (subject to order record retention laws)", desc: "To inform you about new courses, promotions, events, and other educational offerings." }
                                        ].map((item, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <Paper sx={{
                                                    background: 'linear-gradient(135deg, rgba(254, 221, 61, 0.05), rgba(254, 221, 61, 0.02))',
                                                    border: '1px solid rgba(254, 221, 61, 0.1)',
                                                    borderRadius: '12px',
                                                    p: 2,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        borderColor: 'rgba(254, 221, 61, 0.3)'
                                                    }
                                                }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#F4C842', mb: 1 }}>
                                                        • {item.title}
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#666', fontSize: '14px' }}>
                                                        {item.desc}
                                                    </Typography> */}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {/* <Typography sx={{ mt: 3, color: '#666', fontSize: '16px' }}>
                                      Your privacy is protected with robust data security protocols, including:
                                    </Typography> */}

                                </Card>
                            </Grid>

                            {/* Additional Policy Sections */}
                            <Grid item xs={12}>
                                <Card sx={{
                                    borderRadius: "16px",
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    p: 4,
                                    mb: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#333',
                                            mb: 3,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {/* <SecurityIcon sx={{ color: '#0287D7', fontSize: 24, mr: 2 }} /> */}
                                        8. 📊 Google Analytics & Cookies
                                    </Typography>
                                    <Typography sx={{ mb: 3, color: '#666', fontSize: '16px' }}>
                                        We use Google Analytics and similar tools to analyze how users interact with our website. These tools use cookies to collect information such as:
                                    </Typography>

                                    <Grid container spacing={3}>
                                        {[
                                            { title: "Frequency of site visits", desc: "We do not sell or share your personal information with third parties, except with service providers, for legal obligations, or with your consent." },
                                            { title: "Pages visited and duration", desc: "We implement technical, administrative, and physical security measures to protect your personal data from unauthorized access." },
                                            { title: "Referring websites or traffic sources", desc: "You have rights to access, correct, delete your data, and opt-out of marketing communications." }
                                        ].map((item, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <Paper sx={{
                                                    background: 'linear-gradient(135deg, rgba(248,250,252,0.8), rgba(255,255,255,0.8))',
                                                    border: '1px solid rgba(2, 135, 215, 0.08)',
                                                    borderRadius: '12px',
                                                    p: 3,
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        borderColor: 'rgba(2, 135, 215, 0.2)'
                                                    }
                                                }}>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#0287D7', mb: 2, fontSize: '16px' }}>
                                                        {item.title}
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
                                                        {item.desc}
                                                    </Typography> */}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Typography sx={{ mt: 3, color: '#666', fontSize: '16px' }}>
                                        We use this information solely to improve site performance, content quality, and user experience. No personal identity is disclosed through these analytics.
                                    </Typography>
                                </Card>
                            </Grid>

                            {/* App Association Notice */}
                            <Grid item xs={12}>
                                <Paper sx={{
                                    background: 'linear-gradient(135deg, rgba(2, 135, 215, 0.05), rgba(2, 135, 215, 0.02))',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    borderRadius: '16px',
                                    p: 4,
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(2, 135, 215, 0.15)'
                                    }
                                }}>
                                    <Typography sx={{
                                        fontWeight: 'bold',
                                        color: '#0287D7',
                                        fontSize: '18px',
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {/* <VerifiedUserIcon sx={{ mr: 1 }} /> */}
                                        🔒 Policy Updates
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '16px', mb: 1 }}>
                                        This Privacy Policy is subject to change at any time. All changes will be updated on this page with the “Last Updated” date at the bottom. Continued use of our services after updates constitutes your acceptance of the revised policy.
                                    </Typography>
                                    {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                        <Chip 
                                            label="ProVidya Education Developer Console"
                                            sx={{ 
                                                background: 'rgba(2, 135, 215, 0.1)',
                                                color: '#0287D7',
                                                fontWeight: '600'
                                            }}
                                        />
                                        <Chip 
                                            label="ProVidya Test Series Android App"
                                            sx={{ 
                                                background: 'rgba(254, 221, 61, 0.1)',
                                                color: '#F4C842',
                                                fontWeight: '600'
                                            }}
                                        />
                                    </Box> */}
                                </Paper>
                            </Grid>
                            {/* App Association Notice */}
                            <Grid item xs={12}>
                                <Paper sx={{
                                    background: 'linear-gradient(135deg, rgba(2, 135, 215, 0.05), rgba(2, 135, 215, 0.02))',
                                    border: '1px solid rgba(2, 135, 215, 0.1)',
                                    borderRadius: '16px',
                                    p: 4,
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(2, 135, 215, 0.15)'
                                    }
                                }}>
                                    <Typography sx={{
                                        fontWeight: 'bold',
                                        color: '#0287D7',
                                        fontSize: '18px',
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {/* <VerifiedUserIcon sx={{ mr: 1 }} /> */}
                                        📩 Grievance Redressal
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '16px', mb: 1 }}>
                                        For questions, complaints, or concerns about this Privacy Policy or data handling practices, please contact:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                        <Chip
                                            label="📧 Email: classkarthelpdesk@gmail.com"
                                            sx={{
                                                background: 'rgba(2, 135, 215, 0.1)',
                                                color: '#0287D7',
                                                fontWeight: '600'
                                            }}
                                        />
                                        {/* <Chip 
                                            label="ProVidya Test Series Android App"
                                            sx={{ 
                                                background: 'rgba(254, 221, 61, 0.1)',
                                                color: '#F4C842',
                                                fontWeight: '600'
                                            }}
                                        /> */}
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Card>
                </Fade>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;
