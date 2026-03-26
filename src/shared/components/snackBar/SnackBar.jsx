import React from 'react';
import { Snackbar, Alert, alpha } from '@mui/material';

export const SnackBar = ({ open, message, severity = 'info', handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          borderRadius: '12px',
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.875rem',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          '& .MuiAlert-icon': {
            alignItems: 'center',
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
