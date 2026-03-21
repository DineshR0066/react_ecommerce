import React from 'react';
import { Box, Typography, alpha } from '@mui/material';

export const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background: (theme) => `radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${theme.palette.background.default} 50%), 
                               radial-gradient(circle at 80% 70%, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${theme.palette.background.default} 50%)`,
        backgroundAttachment: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 4 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div className="liquid-shape" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', opacity: 0.1 }} />
      <div className="liquid-shape" style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '30vw', height: '30vw', opacity: 0.05, animationDelay: '-5s' }} />

      <Box 
        sx={{ 
          maxWidth: 480, 
          textAlign: { xs: 'center', md: 'left' },
          mr: { md: 12 },
          mb: { xs: 8, md: 0 },
          zIndex: 1
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            mb: 2, 
            letterSpacing: '0.2em',
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          LUMINA
        </Typography>

        <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 500, opacity: 0.8 }}>
          Curated Excellence.
          <br />
          Defined by You.
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          maxWidth: 440,
          zIndex: 1
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
