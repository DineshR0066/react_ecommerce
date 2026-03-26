import React from 'react';
import { useLogout } from '../../../app/authentication/Logout';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  alpha,
  Tooltip,
} from '@mui/material';
import {
  Storefront,
  ShoppingCart,
  GridView,
  Person,
  Home,
  Logout,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../styled-components';

export const CustomerLayout = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role');
  const isCustomer = userRole === 'customer';

  const menuItems = [
    { text: 'Home', icon: <Home fontSize="small" />, path: '/customer/search' },
    ...(isCustomer
      ? [
          { text: 'Orders', icon: <Storefront fontSize="small" />, path: '/customer/orders' },
          { icon: <Person fontSize="small" />, path: '/customer/customer-profile' },
          { icon: <ShoppingCart fontSize="small" />, path: '/customer/cart' },
        ]
      : []),
  ];

  const { handleLogout } = useLogout();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? alpha('#F0F7F8', 0.85)
              : alpha('#0B1011', 0.85),
          backdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* LOGO */}
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              color: 'primary.main',
              letterSpacing: '-0.02em',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/customer/search')}
          >
            Ecommerce
          </Typography>

          {/* NAV ITEMS */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end
                startIcon={item.icon}
                sx={(theme) => ({
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  transition: 'all 0.2s ease',
                  minWidth: 'auto',
                  '&.active': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    fontWeight: 600,
                  },
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                })}
              >
                {item.text}
              </Button>
            ))}

            <Box sx={{ 
                      ml: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      color: (theme) =>
                            theme.palette.mode === 'light'
                              ? alpha('#0B1011', 0.85)
                              : alpha('#F0F7F8', 0.85),
                      }}>
              <ThemeToggle />
              {isCustomer ? (
                <Tooltip title="Logout">
                  <IconButton
                    onClick={handleLogout}
                    size="small"
                    sx={{
                      color: 'error.main',
                      borderRadius: '8px',
                      px: 1.5,
                      py: 0.75,
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                      },
                    }}
                  >
                    <Logout fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  disableElevation
                  onClick={() => navigate('/login')}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    ml: 1,
                    px: 2,
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 3, px: { xs: 2, md: 4 } }}>
        <Outlet />
      </Container>
    </Box>
  );
};
