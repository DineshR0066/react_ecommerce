import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { palette } from './palette';
import { typography } from './typography';

export const ColorModeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') ?? 'dark');

  const toggleTheme = () => {
    setMode((prev) => {
      const theme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      return theme;
    });
  };

  const theme = useMemo(() => {
    const p = palette(mode);
    return createTheme({
      palette: p,
      typography,
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '*': {
              scrollbarWidth: 'thin',
              scrollbarColor: `${p.primary.light} transparent`,
            },
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '*::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: p.primary.light,
              borderRadius: '8px',
              border: '2px solid transparent',
              backgroundClip: 'content-box',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: p.primary.main,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
