import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  alpha,
} from '@mui/material';

export const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Delete',
  description = 'Are you sure want to delete?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          minWidth: 340,
          p: 0.5,
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(255,255,255,0.92)'
              : 'rgba(16,23,25,0.92)',
          backdropFilter: 'blur(20px)',
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '-0.01em',
          pb: 1,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <DialogContentText sx={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontWeight: 600,
            borderRadius: '10px',
            px: 2.5,
            textTransform: 'none',
            fontSize: '0.875rem',
            borderColor: (theme) => alpha(theme.palette.divider, 0.8),
            color: 'text.secondary',
            '&:hover': {
              borderColor: 'divider',
              backgroundColor: 'action.hover',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disableElevation
          sx={{
            fontWeight: 600,
            borderRadius: '10px',
            px: 2.5,
            textTransform: 'none',
            fontSize: '0.875rem',
            bgcolor: 'error.main',
            '&:hover': { bgcolor: 'error.dark' },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
