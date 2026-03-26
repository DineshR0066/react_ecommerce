import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import bgImage from '../../../assets/background.jpg';

export const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundImage: (theme) =>
          theme.palette.mode === 'light'
            ? `linear-gradient(160deg, rgba(240,247,248,0.97) 0%, rgba(224,237,239,0.94) 100%), url(${bgImage})`
            : `linear-gradient(160deg, rgba(9,14,15,0.97) 0%, rgba(15,23,25,0.94) 100%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 6 },
        gap: { md: 10 },
        animation: 'fadeInUp 0.6s ease-out',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* BRAND PANEL */}
      <Box
        sx={{
          maxWidth: 420,
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 4, md: 0 },
          animation: 'fadeInUp 0.7s ease-out 0.1s both',
        }}
      >
        <Typography
          variant="h1"
          fontWeight={800}
          sx={{
            mb: 1.5,
            color: 'primary.main',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            fontSize: { xs: '2.5rem', md: '3rem' },
          }}
        >
          Ecom website
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: (theme) => alpha(theme.palette.primary.main, 0.7),
            fontWeight: 400,
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.15rem' },
          }}
        >
          Click. Shop. Enjoy.
        </Typography>

        {/* Decorative element */}
        <Box
          sx={{
            mt: 4,
            display: { xs: 'none', md: 'flex' },
            gap: 1,
          }}
        >
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                height: 4,
                width: i === 1 ? 32 : 12,
                borderRadius: 4,
                bgcolor: 'primary.main',
                opacity: i === 1 ? 1 : 0.35,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* FORM PANEL */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 440,
          animation: 'fadeInUp 0.7s ease-out 0.2s both',
          '@keyframes fadeInUp': {
            from: { opacity: 0, transform: 'translateY(16px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
