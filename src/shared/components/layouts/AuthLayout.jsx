import React from 'react';
import { Box, Typography } from '@mui/material';
import bgImage from '../../../assets/background.jpg';

export const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `
        linear-gradient(
          rgba(30,0,60,0.65),
          rgba(20,0,50,0.75)
        ),
        url(${bgImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 4, md: 12 },
      }}
    >
      <Box sx={{ color: 'white', maxWidth: 480 }}>
        <Typography variant="h1" fontWeight="bold" sx={{ mb: 2 }}>
          Ecom website
        </Typography>

        <Typography variant="h5" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
          Click. Shop. Enjoy.
        </Typography>
      </Box>

      <Box
        sx={{
          width: 700,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
