import { styled, alpha } from '@mui/material/styles';
import { Card, TextField, Button, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 20px 40px 0 rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 30px 60px 0 rgba(0, 0, 0, 0.15)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => {
  const isLight = theme.palette.mode === 'light';
  return {
    '& .MuiInputBase-root': {
      borderRadius: '12px',
      backgroundColor: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
      },
      '&.Mui-focused': {
        backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderColor: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
      transition: theme.transitions.create(['border-color', 'border-width']),
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'var(--font-body)',
      fontSize: '0.875rem',
      color: theme.palette.text.secondary,
    },
    '& .MuiInputBase-input': {
      padding: '16px',
    },
  };
});

export const AuthButton = styled(Button)(({ theme }) => ({
  padding: '14px 28px',
  borderRadius: '12px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  letterSpacing: '0.1em',
  boxShadow: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    boxShadow: `0 12px 24px -6px ${alpha(theme.palette.primary.main, 0.4)}`,
    transform: 'scale(1.02)',
    filter: 'brightness(1.1)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

export const ProductStyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  overflow: 'hidden',
  background: theme.palette.background.paper,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: theme.palette.mode === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.2)',
    '& .product-image': {
      transform: 'scale(1.1)',
    },
  },
}));

export const StatusLabel = styled(Box)(({ theme, color = 'info' }) => {
  const isLight = theme.palette.mode === 'light';
  const paletteColor = theme.palette[color] || theme.palette.info;
  
  return {
    height: 24,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: '8px',
    cursor: 'default',
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1.5),
    color: isLight ? paletteColor.dark : paletteColor.lighter,
    backgroundColor: alpha(paletteColor.main, 0.12),
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };
});