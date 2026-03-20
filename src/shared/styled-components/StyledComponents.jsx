import { styled, alpha } from '@mui/material/styles';
import { Card, TextField, Button, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2), // 16px
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px 0 rgba(145, 158, 171, 0.24)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 48px 0 rgba(145, 158, 171, 0.32)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: 'black',
  },
  '& .MuiInputLabel-root': {
    color: 'black',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'black',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    '& fieldset': {
      borderColor: 'rgba(145, 158, 171, 0.32)',
      transition: theme.transitions.create(['border-color', 'border-width']),
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
      borderWidth: '2px',
    },
  },
}));

export const AuthButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: 'none',
  backgroundColor: 'primary.main',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: 'primary.dark',
    boxShadow: '0 8px 16px 0 rgba(33, 43, 54, 0.24)',
  },
}));

export const ProductStyledCard = styled(Card)(({ theme }) => ({
  height: 300,
  width: 250,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 20px 40px -4px rgba(145, 158, 171, 0.12)',
  },
}));

export const StatusLabel = styled(Box)(({ theme, color = 'info' }) => {
  const isLight = theme.palette.mode === 'light';
  
  const paletteColor = theme.palette[color] || theme.palette.info;
  
  return {
    height: 24,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: isLight ? paletteColor.dark : paletteColor.lighter,
    backgroundColor: alpha(paletteColor.main, 0.16),
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'capitalize',
  };
});


