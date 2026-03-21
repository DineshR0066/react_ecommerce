import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  alpha
} from '@mui/material';

export const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Finalize Action',
  description = 'Are you sure you wish to proceed with this irreversible action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          borderRadius: '24px', 
          minWidth: 380, 
          p: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)'
        },
      }}
    >
      <DialogTitle sx={{ variant: 'h3', textAlign: 'center', pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center', color: 'text.secondary' }}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 2, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            px: 4
          }}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            fontWeight: 600,
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            bgcolor: 'error.main',
            '&:hover': { bgcolor: alpha('#f44336', 0.9) },
            boxShadow: 'none'
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
