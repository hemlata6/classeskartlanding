import { Box, Chip, Container, Typography, Paper } from "@mui/material";
import React from "react";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InfoIcon from '@mui/icons-material/Info';

const WhyChooseClassesKart = () => {
    const points = [
        { title: "Top Educators + Fresh Talent", desc: "Learn from the best in the field—plus discover new, rising mentors who truly connect with how students study today." },
        { title: "Focused. Not Scattered.", desc: "We specialize only in CA, CS, CMA, CFA, and Upskilling courses—so everything we offer is tailored, deep, and exam-relevant." },
        { title: "Learn Your Way", desc: "Choose from Offline, Online, or Google Drive classes—and elevate your prep with live masterclasses and mentorship circles." },
        { title: "Beyond Just Books", desc: "Get your favourite teachers' test series and books—but also bundle them with personal mentorship, so you're not studying alone." },
        { title: "Built for Today’s Learner", desc: "Our platform is designed to be student-first—with a smooth interface, gamified progress tracking, doubt resolution, and reminders." },
        { title: "Career-Ready, Not Just Exam-Ready", desc: "We bring you internship updates, job alerts, LinkedIn strategies, and soft skill content to shape your future beyond results." },
        { title: "Real Support, Real Fast", desc: "Fast WhatsApp-based support—no bots, no waiting, just real humans who care." },
        { title: "Community That Uplifts", desc: "Join webinars, challenges, peer groups, and Q&A sessions. Studying becomes easier when you're surrounded by students like you." },
        { title: "Smart Combos for Smart Students", desc: "Access curated packs with Excel tools, interview tips, mock tests, and time-saving boosters." },
        { title: "Relatable, Real, Refreshing", desc: "We talk like you, think like you, and build like students would—because that’s who we started for." },
    ];

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
            py: { xs: 6, md: 10 }
        }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        icon={<VerifiedUserIcon />}
                        label="Why Choose Us"
                        sx={{
                            bgcolor: '#dbeafe',
                            color: '#1e40af',
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            mb: 3,
                            fontSize: '0.875rem'
                        }}
                    />
                    <Typography variant="h2" sx={{
                        fontWeight: 800,
                        mb: 2,
                        background: 'linear-gradient(135deg, #1e40af 0%, #f59e0b 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                    }}>
                        Why Choose ClassesKart?
                    </Typography>
                    <Typography sx={{
                        color: '#64748b',
                        fontSize: '1.1rem',
                        fontWeight: 500
                    }}>
                        We don’t just sell classes—we understand your journey.
                    </Typography>
                </Box>

                <Paper sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    p: { xs: 4, md: 6 },
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}>
                    {points.map((item, index) => (
                        <Box key={index} sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <InfoIcon sx={{ color: '#1e40af', fontSize: 24 }} />
                                <Typography variant="h6" sx={{
                                    fontWeight: 700,
                                    color: '#1e40af',
                                    fontSize: '1.1rem'
                                }}>
                                    {item.title}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{
                                color: '#64748b',
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                pl: 4
                            }}>
                                {item.desc}
                            </Typography>
                        </Box>
                    ))}
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            color: '#1e40af'
                        }}>
                            Still thinking?
                        </Typography>
                        <Typography sx={{ color: '#64748b' }}>
                            If you’re serious about cracking CA, CS, CMA, or CFA, Upskilling courses the smart way—welcome home.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default WhyChooseClassesKart;
