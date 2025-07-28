import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Badge,
    Chip,
    Paper,
    Grid
} from '@mui/material';
import {
    Close as CloseIcon,
    Delete as DeleteIcon,
    ShoppingCart as ShoppingCartIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
    const navigate = useNavigate();
    const { 
        items, 
        isOpen, 
        total, 
        itemCount, 
        toggleCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
    } = useCart();

    const handleProceedToCheckout = () => {
        toggleCart(); // Close the cart sidebar
        navigate('/checkout'); // Navigate to checkout page
    };

    const formatPrice = (price) => {
        return `₹${Number(price).toFixed(2)}`;
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleCart}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 400 },
                    backgroundColor: '#f8fafc'
                }
            }}
        >
            <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingCartIcon sx={{ color: '#dc2626' }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                            My Cart
                        </Typography>
                        <Chip 
                            label={itemCount} 
                            size="small" 
                            sx={{ 
                                backgroundColor: '#dc2626', 
                                color: 'white', 
                                fontWeight: 'bold' 
                            }} 
                        />
                    </Box>
                    <IconButton onClick={toggleCart} sx={{ color: '#6b7280' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Cart Items */}
                {items.length === 0 ? (
                    <Box sx={{ 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                        <ShoppingCartIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: '#6b7280', mb: 1 }}>
                            Your cart is empty
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                            Add some test series to get started!
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ flex: 1, overflowY: 'auto' }}>
                            {items.map((item) => (
                                <Paper
                                    key={item.id}
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', flex: 1 }}>
                                                    {item.title}
                                                </Typography>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => removeFromCart(item.id)}
                                                    sx={{ color: '#ef4444' }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Chip
                                                    label={item.type?.toUpperCase()}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: '#e0e7ff',
                                                        color: '#3730a3',
                                                        fontSize: '10px'
                                                    }}
                                                />
                                                {item.discount > 0 && (
                                                    <Chip
                                                        label={`${item.discount}% OFF`}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#fee2e2',
                                                            color: '#dc2626',
                                                            fontSize: '10px'
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    sx={{ 
                                                        backgroundColor: '#f3f4f6',
                                                        '&:hover': { backgroundColor: '#e5e7eb' }
                                                    }}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ 
                                                    minWidth: 30, 
                                                    textAlign: 'center',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    sx={{ 
                                                        backgroundColor: '#f3f4f6',
                                                        '&:hover': { backgroundColor: '#e5e7eb' }
                                                    }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#dc2626' }}>
                                                    {formatPrice(item.finalPrice * item.quantity)}
                                                </Typography>
                                                {item.discount > 0 && (
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            textDecoration: 'line-through',
                                                            color: '#6b7280'
                                                        }}
                                                    >
                                                        {formatPrice(item.price * item.quantity)}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Box>

                        {/* Cart Summary & Actions */}
                        <Box sx={{ mt: 2 }}>
                            <Divider sx={{ mb: 2 }} />
                            
                            {/* Total */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                                    Total Amount:
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#dc2626' }}>
                                    {formatPrice(total)}
                                </Typography>
                            </Box>

                            {/* Action Buttons */}
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={clearCart}
                                        sx={{
                                            borderColor: '#ef4444',
                                            color: '#ef4444',
                                            '&:hover': {
                                                borderColor: '#dc2626',
                                                backgroundColor: '#fef2f2'
                                            }
                                        }}
                                    >
                                        Clear Cart
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleProceedToCheckout}
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)'
                                            }
                                        }}
                                    >
                                        Checkout
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default CartSidebar;
