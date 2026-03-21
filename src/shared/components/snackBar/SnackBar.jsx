import { alpha, Snackbar, Alert, Typography } from '@mui/material';

export const SnackBar = ({ open, message, severity = 'info', handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ mb: 4 }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity} 
        variant="standard" 
        sx={{ 
          width: '100%',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette[severity].main, 0.2),
          color: 'text.primary',
          boxShadow: '0 12px 32px -8px rgba(0,0,0,0.1)',
          '& .MuiAlert-icon': {
            color: (theme) => theme.palette[severity].main
          }
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};
