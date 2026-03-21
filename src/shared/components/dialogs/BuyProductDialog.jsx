import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
  Box,
  Typography,
  alpha
} from '@mui/material';
import { useBuyProductMutation } from '../../utils';

import { 
  StyledTextField, 
  AuthButton 
} from '../../styled-components/StyledComponents';

export const BuyProductDialog = ({ open, onClose, product, onSuccess }) => {
  const [buyProduct, { isLoading, isSuccess, reset }] = useBuyProductMutation();

  const [formData, setFormData] = useState({
    payment_type: 'credit_card',
    payment_installments: 1,
    quantity: 1,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        quantity: product.quantity || 1,
      }));
    }
  }, [product]);

  const handleClose = () => {
    setMessage('');
    reset();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const customerId = localStorage.getItem('user_id');
    if (!product || !customerId) {
      setMessage('Session expired. Please sign in again.');
      return;
    }

    const payload = {
      product_id: String(product.product_id),
      quantity: Number(formData.quantity),
      customer_id: customerId,
      payment_type: formData.payment_type,
      payment_installments: Number(formData.payment_installments),
    };

    try {
      await buyProduct(payload).unwrap();
      setMessage('Acquisition successful');
      if (onSuccess) onSuccess();
      setTimeout(handleClose, 2000);
    } catch (err) {
      setMessage(err?.data?.message || 'Transaction failed');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: { 
          borderRadius: '24px', 
          p: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)'
        }
      }}
    >
      <DialogTitle sx={{ variant: 'h3', textAlign: 'center', pb: 0 }}>Acquire Piece</DialogTitle>
      <DialogContent>
        <Stack spacing={4} sx={{ mt: 3 }}>
          {product && (
            <Box sx={{ p: 2, borderRadius: '16px', bgcolor: alpha('#4F7C82', 0.05), border: '1px solid', borderColor: alpha('#4F7C82', 0.1) }}>
              <Typography variant="overline" color="primary.main" display="block">Selected Work</Typography>
              <Typography variant="h5">{product.product_name || product.product_category_name}</Typography>
            </Box>
          )}

          {message && (
            <Alert 
              severity={isSuccess ? 'success' : 'error'} 
              sx={{ borderRadius: '12px' }}
            >
              {message}
            </Alert>
          )}

          <StyledTextField
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 1 }}
          />

          <StyledTextField
            select
            label="Method of Payment"
            name="payment_type"
            value={formData.payment_type}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="credit_card">Premium Card</MenuItem>
            <MenuItem value="debit_card">Digital Core</MenuItem>
            <MenuItem value="boleto">Direct Transfer</MenuItem>
            <MenuItem value="voucher">Signature Credit</MenuItem>
          </StyledTextField>

          {formData.payment_type === 'credit_card' && (
            <StyledTextField
              label="Installments"
              name="payment_installments"
              type="number"
              value={formData.payment_installments}
              onChange={handleChange}
              fullWidth
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 4, pt: 2, gap: 2 }}>
        <Button onClick={handleClose} sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Dismiss
        </Button>
        <AuthButton
          onClick={handleSubmit}
          disabled={isLoading || isSuccess}
          sx={{ px: 6 }}
        >
          {isLoading ? 'Processing...' : 'Confirm Acquisition'}
        </AuthButton>
      </DialogActions>
    </Dialog>
  );
};
