import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Divider,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Card,
    CardContent,
    RadioGroup,
    FormControlLabel,
    Radio,
    Stepper,
    Step,
    StepLabel,
    Alert
} from '@mui/material';
import {
    Payment as PaymentIcon,
    CreditCard as CreditCardIcon,
    AccountBalance as AccountBalanceIcon,
    PhoneAndroid as PhoneAndroidIcon,
    Security as SecurityIcon,
    LocalOffer as LocalOfferIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const { items, total, clearCart } = useCart();
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });

    const steps = ['Order Summary', 'Billing Details', 'Payment', 'Confirmation'];

    const formatPrice = (price) => {
        return `₹${Number(price).toFixed(2)}`;
    };

    const subtotal = total;
    const tax = subtotal * 0.18; // 18% GST
    const finalTotal = subtotal + tax;

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmitOrder = () => {
        // Process the order
        console.log('Order submitted:', { items, formData, paymentMethod, total: finalTotal });
        
        // Clear cart and proceed to confirmation
        clearCart();
        handleNext();
    };

    const renderOrderSummary = () => (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.id} divider>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <Box>
                                        <Chip 
                                            label={item.type?.toUpperCase()} 
                                            size="small" 
                                            sx={{ mr: 1, mb: 1 }} 
                                        />
                                        {item.discount > 0 && (
                                            <Chip 
                                                label={`${item.discount}% OFF`} 
                                                size="small" 
                                                color="error" 
                                            />
                                        )}
                                    </Box>
                                }
                            />
                            <ListItemSecondaryAction>
                                <Box textAlign="right">
                                    <Typography variant="body2" color="text.secondary">
                                        Qty: {item.quantity}
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {formatPrice(item.finalPrice * item.quantity)}
                                    </Typography>
                                </Box>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>{formatPrice(subtotal)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>GST (18%):</Typography>
                    <Typography>{formatPrice(tax)}</Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary">
                        {formatPrice(finalTotal)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

    const renderBillingDetails = () => (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Billing Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange('firstName')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange('lastName')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange('phone')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            value={formData.address}
                            onChange={handleInputChange('address')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            value={formData.city}
                            onChange={handleInputChange('city')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="State"
                            value={formData.state}
                            onChange={handleInputChange('state')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="ZIP Code"
                            value={formData.zipCode}
                            onChange={handleInputChange('zipCode')}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    const renderPaymentMethod = () => (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Payment Method
                </Typography>
                
                <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CreditCardIcon />
                                <span>Credit/Debit Card</span>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="netbanking"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccountBalanceIcon />
                                <span>Net Banking</span>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="upi"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneAndroidIcon />
                                <span>UPI Payment</span>
                            </Box>
                        }
                    />
                </RadioGroup>

                {paymentMethod === 'card' && (
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Card Number"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange('cardNumber')}
                                    placeholder="1234 5678 9012 3456"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Expiry Date"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange('expiryDate')}
                                    placeholder="MM/YY"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="CVV"
                                    value={formData.cvv}
                                    onChange={handleInputChange('cvv')}
                                    placeholder="123"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Cardholder Name"
                                    value={formData.cardName}
                                    onChange={handleInputChange('cardName')}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f9ff', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <SecurityIcon color="primary" />
                        <Typography variant="subtitle2" color="primary">
                            Secure Payment
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

    const renderConfirmation = () => (
        <Card>
            <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 3 }}>
                    <LocalOfferIcon sx={{ fontSize: 80, color: 'green' }} />
                </Box>
                <Typography variant="h4" gutterBottom color="green">
                    Order Confirmed!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Thank you for your purchase. Your test series have been added to your account.
                </Typography>
                <Alert severity="success" sx={{ mb: 3 }}>
                    You will receive an email confirmation shortly with access details.
                </Alert>
                <Button
                    variant="contained"
                    size="large"
                    href="/dashboard"
                    sx={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)'
                        }
                    }}
                >
                    Go to Dashboard
                </Button>
            </CardContent>
        </Card>
    );

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return renderOrderSummary();
            case 1:
                return renderBillingDetails();
            case 2:
                return renderPaymentMethod();
            case 3:
                return renderConfirmation();
            default:
                return 'Unknown step';
        }
    };

    if (items.length === 0 && activeStep < 3) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="info">
                    Your cart is empty. Please add some test series before proceeding to checkout.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Checkout
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    {getStepContent(activeStep)}
                </Grid>
            </Grid>

            {activeStep < 3 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={activeStep === steps.length - 2 ? handleSubmitOrder : handleNext}
                        sx={{
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)'
                            }
                        }}
                    >
                        {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default CheckoutPage;
