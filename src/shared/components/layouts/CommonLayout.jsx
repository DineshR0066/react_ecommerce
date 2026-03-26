import React, { useState } from 'react';
import {
  Drawer,
  Toolbar,
  Box,
  Typography,
  AppBar,
  IconButton,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { DrawerLayout } from './DrawerLayout';

const drawerWidth = 252;

export const CommonLayout = ({ title, menuItems, handleLogout }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', m: 0, p: 0 }}>
      {!isDesktop && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: (theme) =>
              theme.palette.mode === 'light'
                ? alpha('#F0F7F8', 0.92)
                : alpha('#0B1011', 0.92),
            backdropFilter: 'blur(16px)',
            borderBottom: (theme) =>
              `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={800}
              noWrap
              sx={{ letterSpacing: '-0.02em' }}
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation drawer"
      >
        <Drawer
          variant={isDesktop ? 'permanent' : 'temporary'}
          open={isDesktop ? true : mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: (theme) =>
                `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255,255,255,0.85)'
                  : 'rgba(14,20,22,0.85)',
              backdropFilter: 'blur(16px)',
            },
          }}
        >
          <DrawerLayout
            title={title}
            menuItems={menuItems}
            handleLogout={handleLogout}
            isDesktop={isDesktop}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'background.default',
          transition: 'background-color 0.3s ease',
          minHeight: '100vh',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
