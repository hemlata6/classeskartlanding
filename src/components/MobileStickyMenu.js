import React from 'react';
import {
  Box,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  Fab,
  Button,
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  Call as CallIcon,
  Download as DownloadIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MobileStickyMenu = ({ cartCount = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    {
      icon: WhatsAppIcon,
      color: '#25d366',
      action: () => window.open('https://wa.me/919049730883', '_blank'),
      label: 'WhatsApp',
    },
    {
      icon: CallIcon,
      color: '#4caf50',
      action: () => window.open('tel:+919049730883', '_self'),
      label: 'Call',
    },
    // {
    //   icon: DownloadIcon,
    //   color: '#2196f3',
    //   action: () => window.open('https://play.google.com/store/apps/details?id=com.classiolabs.classeskart&hl=en_IN', '_blank'),
    //   label: 'Download',
    // },
    // {
    //   icon: ShoppingCartIcon,
    //   color: '#ff9800',
    //   action: () => {
    //     // Handle cart
    //     console.log('Open cart');
    //   },
    //   label: 'Cart',
    //   badge: cartCount,
    // },
  ];

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px 20px 0 0',
            p: 2,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
            },
          }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box sx={{ position: 'relative' }}>
                {item.badge && item.badge > 0 ? (
                  <Badge
                    badgeContent={item.badge}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.75rem',
                        minWidth: '18px',
                        height: '18px',
                        borderRadius: '9px',
                      },
                    }}
                  >
                    <Fab
                      size="medium"
                      onClick={item.action}
                      sx={{
                        backgroundColor: item.color,
                        color: 'white',
                        width: 56,
                        height: 56,
                        boxShadow: `0 4px 20px ${item.color}40`,
                        '&:hover': {
                          backgroundColor: item.color,
                          boxShadow: `0 6px 28px ${item.color}60`,
                        },
                      }}
                    >
                      <item.icon />
                    </Fab>
                  </Badge>
                ) : (
                  <Fab
                    size="medium"
                    onClick={item.action}
                    sx={{
                      backgroundColor: item.color,
                      color: 'white',
                      width: 56,
                      height: 56,
                      boxShadow: `0 4px 20px ${item.color}40`,
                      '&:hover': {
                        backgroundColor: item.color,
                        boxShadow: `0 6px 28px ${item.color}60`,
                      },
                    }}
                  >
                    <item.icon />
                  </Fab>
                )}
              </Box>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              component="a"
              href="https://play.google.com/store/apps/details?id=com.classiolabs.classeskart&hl=en_IN"
              target="_blank"
              startIcon={<DownloadIcon />}
              sx={{
                background: theme.palette.primary.main,
                color: 'white',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: theme.shadows[3],
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: theme.palette.primary.dark,
                  boxShadow: theme.shadows[4],
                  '&::after': {
                    width: '200px',
                    height: '200px',
                  },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '0',
                  height: '0',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.4s, height 0.4s',
                },
              }}
            >
              Get App
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileStickyMenu;
