import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  useScrollTrigger,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Popover,
  Dialog,
} from '@mui/material';
import {
  Download as DownloadIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import TestSeriesMenu from './TestSeriesMenu';
import { useCart } from '../context/CartContext';
import { styled } from '@mui/material/styles';
import '../index.css'

// Styled Components for Modern Design

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems = [] } = useCart() || {};
  const cartCount = cartItems?.length;
  const [cartItemsArray, setCartItemsArray] = useState([]);
  // console.log('Cart Items:', cartItemsArray);
  const [anchorElTestSeries, setAnchorElTestSeries] = useState(null);
  const openTestSeries = Boolean(anchorElTestSeries);

  useEffect(() => {
    setCartItemsArray(JSON.parse(localStorage.getItem('cartCourses')));
  }, []);

  const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
      background: scrolled
          ? 'rgba(255,255,255,0.98)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(248,249,250,0.95) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)', // Safari support
      boxShadow: scrolled
          ? '0 4px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)'
          : '0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
      borderBottom: scrolled
          ? '1px solid rgba(0,0,0,0.1)'
          : '1px solid rgba(0,0,0,0.06)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'fixed',
      zIndex: 1100,
      // Glass morphism effect
      '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          borderRadius: 'inherit',
          zIndex: -1,
      },
      top: isMobile ? 33 : 48,
  }));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false); // Close mobile drawer when navigating
  };

  const handleTestSeriesClick = (event) => {
    setAnchorElTestSeries(event.currentTarget);
  };

  const handleCloseTestSeries = () => {
    setAnchorElTestSeries(null);
  };

  const navigationItems = [
    { name: 'Free Resources', badge: null, path: '/free-resources' },
    { name: 'Study Planner', badge: null, path: '#' },
    { name: 'Test Series', badge: null, path: '#', hasMenu: true },
    { name: 'Upskilling Courses', badge: 'Coming Soon', path: '#' }
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.name}
            onClick={item.hasMenu ? handleTestSeriesClick : () => handleNavigation(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.name}
                    {item.badge && (
                      <Badge
                        badgeContent={item.badge}
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            borderRadius: '8px',
                            px: { xs: 2, sm: 1 }, // wider on mobile
                            py: 0.5,
                            minWidth: 'auto',
                            height: 'auto',
                            whiteSpace: 'nowrap',
                          },
                        }}
                      />
                    )}
                  </Box>
                  {item.hasMenu && (
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: '16px',
                        transform: anchorElTestSeries ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  )}
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleNavigateCart = () =>{
    navigate('/cart-course');
    setMobileOpen(false); // Close mobile drawer when navigating
  };

  return (
    <>
      <StyledAppBar appear={false} direction="down" in={!trigger}>
        <AppBar
          position="fixed"
          // elevation={trigger ? 4 : 0}
          sx={{
            background: trigger
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid #e2e8f0',
            color: theme.palette.text.primary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            py: trigger ? 0 : 0.5,
            // position: 'fixed',
            // top: 0,
            // left: 0,
            // right: 0,
            zIndex: 1300,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer'
                }}
                onClick={() => handleNavigation('/')}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="Classkart Logo"
                  sx={{
                    height: trigger ? 40 : 48,
                    transition: 'height 0.3s ease',
                  }}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    display: 'none', // Will show if logo image fails
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Classkart
                </Typography>
              </Box>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ display: 'flex', gap: 4 }}>
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Button
                          onClick={item.hasMenu ? handleTestSeriesClick : () => handleNavigation(item.path)}
                          sx={{
                            color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            position: 'relative',
                            py: 1,
                            px: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            '&:hover': {
                              background: 'transparent',
                              color: theme.palette.primary.main,
                              '&::after': {
                                width: '100%',
                              },
                            },
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              width: location.pathname === item.path ? '100%' : '0',
                              height: '2px',
                              bottom: 0,
                              left: 0,
                              background: theme.palette.primary.main,
                              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '1px',
                            },
                          }}
                        >
                          {item.name}
                          {item.hasMenu && (
                            <KeyboardArrowDownIcon
                              sx={{
                                fontSize: '16px',
                                transform: anchorElTestSeries ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                              }}
                            />
                          )}
                        </Button>
                        {item.badge && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -8,
                              right: -12,
                              backgroundColor: '#f59e0b',
                              color: 'white',
                              fontSize: '0.625rem',
                              fontWeight: 600,
                              px: 1,
                              py: 0.25,
                              borderRadius: '8px',
                              lineHeight: 1,
                              boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)',
                              animation: 'pulse 2s infinite',
                              '@keyframes pulse': {
                                '0%': {
                                  transform: 'scale(1)',
                                },
                                '50%': {
                                  transform: 'scale(1.05)',
                                },
                                '100%': {
                                  transform: 'scale(1)',
                                },
                              },
                            }}
                          >
                            {item.badge}
                          </Box>
                        )}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            )}

            {/* Right Side Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {!isMobile && (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
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
                      onClick={() => {
                        if (window.scrollToBannerScrollerSection) {
                          window.scrollToBannerScrollerSection();
                        } else {
                          // fallback: go to home and then scroll
                          navigate('/');
                          setTimeout(() => {
                            if (window.scrollToBannerScrollerSection) {
                              window.scrollToBannerScrollerSection();
                            }
                          }, 400);
                        }
                      }}
                    >
                      Get App
                    </Button>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    // onClick={handleNavigateCart}
                    component="a"
                    href='/cart-course'
                    sx={{
                      color: theme.palette.text.secondary,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '12px',
                      p: 1,
                      '&:hover': {
                        color: theme.palette.primary.main,
                        background: '#f1f5f9',
                      },
                    }}
                  >
                    <Badge badgeContent={cartItemsArray?.length} color="warning">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </motion.div>

                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ ml: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </motion.div>
          </Toolbar>
        </AppBar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Test Series Menu Popover */}
      {/* <Popover
        open={openTestSeries}
        anchorEl={anchorElTestSeries}
        onClose={handleCloseTestSeries}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '20px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            overflow: 'visible',
          },
        }}
      > */}
        <Dialog open={openTestSeries} onClose={handleCloseTestSeries}>
        <TestSeriesMenu
          setAnchorElTestSeries={setAnchorElTestSeries}
          mobileDropDown=""
          handleOpenNavMenuClose={() => setMobileOpen(false)}
          type="header"
        />
        </Dialog>
      {/* </Popver> */}
    </>
  );
};

export default Header;
