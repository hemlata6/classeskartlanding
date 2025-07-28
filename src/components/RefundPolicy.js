import { Box, Chip, Container, Typography, Paper } from "@mui/material";
import React from "react";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InfoIcon from '@mui/icons-material/Info';

const RefundPolicy = () => {
    const sections = [
        {
            title: "1. Refund Eligibility",
            content: `Refunds are offered only in the following scenarios:

- You receive the wrong course or educator’s content.
- Video lectures or test series not accessible due to our technical issue for 7 working days.
- Books or physical products are damaged/misprinted/incomplete and reported within 48 hours.
- Full refund or equivalent course switch if a batch or course is cancelled by the educator.`
        },
        {
            title: "2. Non-Refundable Situations",
            content: `No refunds in these cases:

- Digital products have been purchased, downloaded, viewed, or activated.
- Student’s device does not meet system requirements.
- Change of mind, personal reasons, or course non-completion.
- Missed live sessions or mentorships.
- Partial refunds after coupon/discount use.`
        },
        {
            title: "3. Cancellations",
            content: `Digital product orders cannot be cancelled after payment. 
For physical items, cancellation allowed only before dispatch.`
        },
        {
            title: "4. Return Policy (for Physical Products)",
            content: `If you receive damaged/incorrect books:

- Share unboxing videos or clear images.
- Raise return request within 48 hours.
- If eligible, replacement/refund is processed in 5–7 working days.`
        },
        {
            title: "5. Refund Processing Time",
            content: `Approved refunds are processed within 7–10 working days.
Payment gateway delays may extend this. Charges are deducted.`
        },
        {
            title: "6. Contact for Support",
            content: `Email: classkarthelpdesk@gmail.com`
        },
        {
            title: "Final Note",
            content: `Each refund request is carefully reviewed. 
Classes Kart reserves the right to approve/deny based on evidence and product usage.`
        }
    ];

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
            py: { xs: 2, md: 4 }
        }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        icon={<VerifiedUserIcon />}
                        label="Legal Document"
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
                        Refund & Cancellation Policy
                    </Typography>
                    <Typography sx={{
                        color: '#64748b',
                        fontSize: '1.1rem',
                        fontWeight: 500
                    }}>
                        Please read carefully before making a purchase.
                    </Typography>
                </Box>

                <Paper sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    p: { xs: 4, md: 6 },
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}>
                    {sections.map((item, index) => (
                        <Box key={index} sx={{ mb: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <InfoIcon sx={{ color: '#1e40af', fontSize: 24 }} />
                                <Typography variant="h6" sx={{
                                    fontWeight: 700,
                                    color: '#1e40af',
                                    fontSize: '1.25rem'
                                }}>
                                    {item.title}
                                </Typography>
                            </Box>
                            <Typography sx={{
                                whiteSpace: 'pre-line',
                                color: '#64748b',
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                pl: 4
                            }}>
                                {item.content}
                            </Typography>
                        </Box>
                    ))}
                </Paper>
            </Container>
        </Box>
    );
};

export default RefundPolicy;
