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
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../styled-components';

export const DrawerLayout = ({ title, menuItems, handleLogout, isDesktop, handleDrawerToggle }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" color="primary" fontWeight="bold" noWrap>
          {title}
        </Typography>

        <ThemeToggle />
      </Toolbar>

      <Divider />

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={!isDesktop ? handleDrawerToggle : undefined}
                sx={{
                  '&.active': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                  '&.active .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box>
          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
