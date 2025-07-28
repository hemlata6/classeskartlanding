import React from 'react';
import { IconButton, Badge, Box, Typography } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
    const { itemCount, toggleCart, total } = useCart();

    const formatPrice = (price) => {
        return `₹${Number(price).toFixed(0)}`;
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Cart Total (visible on larger screens) */}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '11px' }}>
                    Cart Total
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                    {formatPrice(total)}
                </Typography>
            </Box>

            {/* Cart Icon with Badge */}
            <IconButton
                onClick={toggleCart}
                sx={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#b91c1c',
                        transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
                }}
            >
                <Badge
                    badgeContent={itemCount}
                    color="error"
                    sx={{
                        '& .MuiBadge-badge': {
                            backgroundColor: '#ef4444',
                            color: 'white',
                            fontWeight: 'bold'
                        }
                    }}
                >
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </Box>
    );
};

export default CartIcon;
