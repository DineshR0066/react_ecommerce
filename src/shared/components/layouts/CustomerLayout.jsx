import React from 'react';
import { useLogout } from '../../../app/authentication/Logout';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import {
  Storefront,
  ShoppingCart,
  GridView,
  Person,
  Home,
  Logout,
  Brightness4,
  Brightness7,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';
// import { ColorModeContext } from "../../../theme/themeProvider";
import { ThemeToggle, AuthButton } from '../../styled-components';

import { alpha, useScrollTrigger, Slide } from '@mui/material';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const CustomerLayout = (props) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const isCustomer = userRole === 'customer';

  const menuItems = [
    { text: 'DISCOVER', path: '/customer/search' },
    ...(isCustomer
      ? [
          { text: 'ACQUISITIONS', path: '/customer/orders' },
          { text: 'PROFILE', path: '/customer/customer-profile' },
          { text: 'COLLECTION', path: '/customer/cart' },
        ]
      : []),
  ];

  const { handleLogout } = useLogout();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <HideOnScroll {...props}>
        <AppBar 
          position="fixed" 
          sx={{ 
            background: (theme) => alpha(theme.palette.background.default, 0.8),
            backdropFilter: 'blur(20px)',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: 80 }}>
            <Typography 
              variant="h3" 
              component="div" 
              onClick={() => navigate('/')}
              sx={{ 
                cursor: 'pointer',
                letterSpacing: '0.2em',
                fontWeight: 700,
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LUMINA
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 4 } }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                {menuItems.map((item) => (
                  <Typography
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    sx={{ 
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: 'text.secondary',
                      transition: 'all 0.3s ease',
                      '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' }
                    }}
                  >
                    {item.text}
                  </Typography>
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 4 }}>
                <ThemeToggle />
                {isCustomer ? (
                  <Button
                    variant="text"
                    onClick={handleLogout}
                    sx={{ 
                      color: 'error.main', 
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      fontSize: '0.75rem'
                    }}
                  >
                    SIGN OUT
                  </Button>
                ) : (
                  <AuthButton
                    onClick={() => navigate('/login')}
                    sx={{ px: 4, py: 1 }}
                  >
                    SIGN IN
                  </AuthButton>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Spacer */}
      <Container maxWidth="xl" sx={{ mt: 4, pb: 10 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
