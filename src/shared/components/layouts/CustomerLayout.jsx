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
import { ThemeToggle } from '../../styled-components';

export const CustomerLayout = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role');
  const isCustomer = userRole === 'customer';

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/customer/search' },
    ...(isCustomer
      ? [
          { text: 'Orders', icon: <Storefront />, path: '/customer/orders' },
          { icon: <Person />, path: '/customer/customer-profile' },
          { icon: <ShoppingCart />, path: '/customer/cart' },
        ]
      : []),
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  const { handleLogout } = useLogout();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#4f7c82'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Ecommerce
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item, index) => (
              <Button
                color="inherit"
                key={item.path || index}
                onClick={() => handleNavigate(item.path)}
              >
                {item.icon}
                {item.text}
              </Button>
            ))}
            {/* <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
                            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                        </IconButton> */}
            <ThemeToggle />
            {isCustomer ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                color='#80ed99'
                onClick={() => navigate('/login')}
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ mt: 4, pt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
