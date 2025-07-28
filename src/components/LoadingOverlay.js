import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingOverlay = ({ open }) => {
  if (!open) return null;

  return (
    <Fade in={open} timeout={800}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: 'white',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                border: '4px solid rgba(255,255,255,0.3)',
                borderTop: '4px solid white',
                borderRadius: '50%',
                margin: '0 auto 2rem',
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 600,
                mb: 1,
                color: 'white',
              }}
            >
              Welcome to Classkart
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                fontSize: '1rem',
                color: 'white',
              }}
            >
              Preparing your learning experience...
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </Fade>
  );
};

export default LoadingOverlay;
