import { Box, Chip, Container, Typography, Paper } from "@mui/material";
import React from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InfoIcon from "@mui/icons-material/Info";

const TermsAndCondtion = () => {
    const sections = [
        {
            title: "1. Definitions",
            content: `“We” / “Us” / “Our” / “Company” refers to Classes Kart.

“You” / “User” / “Visitor” means any individual accessing the Website or using any service provided by Classes Kart.

“Website” refers to the domain Classeskart.in, including all its subdomains and web pages.`
        },
        {
            title: "2. Use of Website",
            content: `By using this Website, you acknowledge and agree to the following:

- You are at least 18 years old or using the Website under the supervision of a parent/guardian.
- You will only use the Website for lawful purposes.
- You will not engage in unauthorized access or misuse of data, content, or services.`
        },
        {
            title: "3. Intellectual Property Rights",
            content: `All content on the Website—such as course videos, notes, eBooks, logos, images, software, and branding—is protected under Indian intellectual property laws. These are either owned by Classes Kart or licensed from third-party educators and content creators.

You may not:
- Reproduce, duplicate, sell, rent, or redistribute any part of the Website or its content.
- Modify, copy, reverse-engineer, or create derivative works from the Website's content.
- Use Classes Kart materials for public performances, training, or re-sale.`
        },
        {
            title: "4. User Conduct & Acceptable Use",
            content: `You agree not to:
- Violate the security of the Website.
- Attempt to access accounts, data, or servers without authorization.
- Transmit any virus, malware, or harmful content.
- Engage in spam, phishing, or impersonation.
- Upload or transmit unlawful, abusive, defamatory, or obscene material.

Violation of these rules may result in immediate suspension or termination of your account, and legal action where applicable.`
        },
        {
            title: "5. Account Responsibility",
            content: `To access certain services, you may need to register and create an account.

You agree to provide accurate, complete, and updated information.

You are solely responsible for maintaining the confidentiality of your account and password.

Classes Kart is not liable for unauthorized account use.`
        },
        {
            title: "6. Services Offered",
            content: `Classes Kart offers access to:
- Online and offline courses for CA, CS, CMA, CFA, and other upskilling courses.
- Test series, mentorship programs, books, and notes.
- Content from third-party educators, which may be governed by their own terms.

We reserve the right to modify or discontinue any service without prior notice.`
        },
        {
            title: "7. Payments, Cancellations & Refunds",
            content: `All payments are processed securely via third-party payment gateways.

- Once a digital product is accessed (e.g., course video or test), it becomes non-refundable.
- Physical goods (e.g., books or pen drives) are eligible for cancellation only before dispatch.

For full details, please refer to our Refund & Cancellation Policy.`
        },
        {
            title: "8. Indemnification",
            content: `You agree to indemnify, defend, and hold harmless Classes Kart, its affiliates, educators, officers, directors, and employees from any claims, liabilities, damages, losses, or expenses arising from:
- Your use or misuse of the Website.
- Your violation of these Terms.
- Any content you submit or post to the Website.`
        },
        {
            title: "9. Limitation of Liability",
            content: `To the fullest extent permitted by law:
- Classes Kart is not liable for any indirect, incidental, consequential, or special damages (including loss of profits or data) arising from your use of or inability to use the Website.
- Our total liability shall not exceed the amount paid by you to us for the service related to the claim.`
        },
        {
            title: "10. Disclaimer",
            content: `All content and services on Classes Kart are provided on an “as is” and “as available” basis without warranties of any kind, either express or implied.

We do not guarantee that:
- The Website will be secure or error-free.
- Course content will meet your specific expectations.
- Services will be uninterrupted or always available.`
        },
        {
            title: "11. Termination",
            content: `We may suspend or terminate your account if:
- You breach any of these Terms.
- You misuse the platform or engage in unlawful activity.
- Required by law enforcement or government agency.`
        },
        {
            title: "12. Governing Law & Jurisdiction",
            content: `These Terms are governed by the laws of India. In case of any dispute, the matter shall be subject to the exclusive jurisdiction of the courts where head office of Classes Kart is registered, India.`
        },
        {
            title: "13. Contact & Grievance Redressal",
            content: `For concerns, feedback, or grievances, please contact:\n📧 Email: classeskart.in@gmail.com`
        },
        {
            title: "14. Changes to These Terms",
            content: `We may revise these Terms at any time. Updated versions will be posted on this page. Continued use of the Website after changes implies your acceptance.`
        }
    ];

    return (
        <Box sx={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)', py: { xs: 4, md: 4 } }}>
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
                    <Typography variant="h3" sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #1e40af 0%, #f59e0b 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2
                    }}>
                        Terms of Service
                    </Typography>
                    <Typography sx={{
                        background: '#fbbf24',
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        display: 'inline-block',
                        fontWeight: 500,
                        color: '#1e293b'
                    }}>
                        Website: Classeskart.in
                    </Typography>
                </Box>

                <Paper sx={{ borderRadius: 4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                    <Box sx={{ background: '#f8fafc', p: { xs: 4, md: 6 }, borderBottom: '1px solid #e2e8f0' }}>
                        <Typography sx={{ color: '#64748b', textAlign: 'center', fontSize: '1.1rem', lineHeight: 1.7 }}>
                            These Terms of Service (“Terms”) govern your use of the website and services offered by Classes Kart. By accessing or using our services, you agree to comply with and be legally bound by these Terms. If you do not agree with these Terms, please do not use the Website.
                        </Typography>
                    </Box>

                    <Box sx={{ p: { xs: 4, md: 6 } }}>
                        {sections.map((section, index) => (
                            <Box key={index} sx={{ mb: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <InfoIcon sx={{ color: '#1e40af' }} />
                                    <Typography variant="h6" sx={{
                                        fontWeight: 700,
                                        color: '#1e40af'
                                    }}>
                                        {section.title}
                                    </Typography>
                                </Box>
                                <Typography sx={{
                                    whiteSpace: 'pre-line',
                                    fontSize: '1rem',
                                    color: '#475569',
                                    lineHeight: 1.6
                                }}>
                                    {section.content}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default TermsAndCondtion;
