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
  Typography,
  alpha,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../styled-components';

export const DrawerLayout = ({ title, menuItems, handleLogout, isDesktop, handleDrawerToggle }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TOP HEADER */}
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2.5,
          minHeight: '64px !important',
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          noWrap
          sx={{
            color: 'primary.main',
            letterSpacing: '-0.02em',
            fontSize: '1rem',
          }}
        >
          {title}
        </Typography>
        <ThemeToggle />
      </Toolbar>

      <Divider sx={{ opacity: 0.5 }} />

      {/* SIDEBAR CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        {/* MENU ITEMS */}
        <List sx={{ px: 1.5, pt: 1.5 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={!isDesktop ? handleDrawerToggle : undefined}
                sx={(theme) => ({
                  borderRadius: '10px',
                  py: 1,
                  px: 1.5,
                  transition: 'all 0.2s ease',
                  color: 'text.secondary',
                  '&.active': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 700,
                      color: 'primary.main',
                    },
                  },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.06),
                    color: 'primary.main',
                    transform: 'translateX(3px)',
                  },
                })}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 36,
                    '& svg': { fontSize: '1.1rem' },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* LOGOUT AT BOTTOM */}
        <Box sx={{ px: 1.5, pb: 2 }}>
          <Divider sx={{ mb: 1.5, opacity: 0.5 }} />
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={(theme) => ({
                  borderRadius: '10px',
                  py: 1,
                  px: 1.5,
                  color: 'error.main',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.08),
                  },
                })}
              >
                <ListItemIcon sx={{ color: 'error.main', minWidth: 36, '& svg': { fontSize: '1.1rem' } }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.875rem' }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
