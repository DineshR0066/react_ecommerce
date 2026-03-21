import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  alpha,
  Typography,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../styled-components';

export const DrawerLayout = ({ title, menuItems, handleLogout, isDesktop, handleDrawerToggle }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: '16px !important',
          mb: 4
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontSize: '1.5rem',
            letterSpacing: '0.15em',
            fontWeight: 700,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title === 'Ecommerce' ? 'LUMINA' : title}
        </Typography>

        <ThemeToggle />
      </Toolbar>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={!isDesktop ? handleDrawerToggle : undefined}
                sx={{
                  borderRadius: '16px',
                  py: 1.5,
                  transition: 'all 0.3s ease',
                  '&.active': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                  },
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateX(4px)'
                  },
                  '&.active .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'text.secondary', minWidth: 44 }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                </ListItemIcon>

                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ px: 1, pb: 2 }}>
          <Divider sx={{ mb: 2, opacity: 0.5 }} />
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{
                borderRadius: '16px',
                py: 1.5,
                color: 'error.main',
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.error.main, 0.05),
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 44 }}>
                <Logout sx={{ fontSize: 20, color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText 
                primary="SIGN OUT" 
                primaryTypographyProps={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  letterSpacing: '0.1em'
                }} 
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </Box>
  );
};
