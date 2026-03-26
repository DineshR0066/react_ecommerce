import { styled, alpha } from '@mui/material/styles';
import { Card, TextField, Button, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background:
    theme.palette.mode === 'light'
      ? `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.95), rgba(240,247,248,0.85))`
      : `radial-gradient(circle at 20% 20%, rgba(22,32,34,0.92), rgba(13,20,22,0.88))`,
  backdropFilter: 'blur(20px) saturate(180%)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 4px 24px rgba(79, 124, 130, 0.08), 0 1px 4px rgba(79, 124, 130, 0.06)'
      : '0 4px 24px rgba(0,0,0,0.3)',
  transition: 'box-shadow 0.35s ease, transform 0.35s ease',
  '&:hover': {
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 12px 40px rgba(79, 124, 130, 0.15), 0 2px 8px rgba(79, 124, 130, 0.08)'
        : '0 12px 40px rgba(0,0,0,0.45)',
    transform: 'translateY(-3px)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '10px',
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.primary.main, 0.04)
        : alpha(theme.palette.primary.main, 0.06),
    transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.primary.main, 0.07)
          : alpha(theme.palette.primary.main, 0.1),
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.primary.main, 0.18),
    transition: 'border-color 0.25s ease',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.primary.main, 0.5),
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '1.5px',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
}));

export const AuthButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: '10px',
  textTransform: 'none',
  boxShadow: 'none',
  fontWeight: 600,
  letterSpacing: '0.02em',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: '#ffffff',
  transition: 'opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
  '&:hover': {
    opacity: 0.92,
    transform: 'translateY(-1px)',
    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const ProductStyledCard = styled(Card)(({ theme }) => ({
  height: 350,
  width: 250,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  borderRadius: theme.spacing(2.5),
  background:
    theme.palette.mode === 'light'
      ? `rgba(255,255,255,0.85)`
      : `rgba(18,26,28,0.85)`,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.06)}`,
  transition: 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.35s ease, border-color 0.35s ease',
  '&:hover': {
    transform: 'scale(1.03) translateY(-6px)',
    boxShadow: `0 16px 36px ${alpha(theme.palette.primary.main, 0.18)}`,
    borderColor: alpha(theme.palette.primary.main, 0.4),
  },
}));

export const StatusLabel = styled(Box)(({ theme, color = 'info' }) => {
  const isLight = theme.palette.mode === 'light';
  const paletteColor = theme.palette[color] || theme.palette.info;

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 20,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1.25),
    color: isLight ? paletteColor.dark : paletteColor.lighter || paletteColor.light,
    backgroundColor: alpha(paletteColor.main, 0.12),
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'capitalize',
    letterSpacing: '0.03em',
    border: `1px solid ${alpha(paletteColor.main, 0.18)}`,
  };
});
