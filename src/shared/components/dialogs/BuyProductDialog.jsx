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
} from '@mui/material';
import { useBuyProductMutation } from '../../utils';

export const BuyProductDialog = ({ open, onClose, product, onSuccess }) => {
  const [buyProduct, { isLoading, isSuccess, isError, error, reset }] = useBuyProductMutation();

  const [formData, setFormData] = useState({
    // quantity: product.quantity || 1,
    payment_type: 'credit_card',
    payment_installments: 1,
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
      setMessage('Missing product or customer details. Please log in again.');
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
      setMessage('Product purchased successfully!');
      if (onSuccess) {
        onSuccess();
      }

      // Auto close after success message
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Purchase failed:', err);
      setMessage(err?.data?.message || 'Purchase failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Buy Product</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {product && (
            <Alert severity="info">
              Buying: <strong>{product.product_category_name || 'Product'}</strong>
            </Alert>
          )}

          {message && <Alert severity={isSuccess ? 'success' : 'error'}>{message}</Alert>}

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 1 }}
          />

          <TextField
            select
            label="Payment Type"
            name="payment_type"
            value={formData.payment_type}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="credit_card">Credit Card</MenuItem>
            <MenuItem value="debit_card">Debit Card</MenuItem>
            <MenuItem value="boleto">Boleto</MenuItem>
            <MenuItem value="voucher">Voucher</MenuItem>
          </TextField>

          <TextField
            label="Payment Installments"
            name="payment_installments"
            type="number"
            value={formData.payment_installments}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 1, max: 24 }}
            disabled={formData.payment_type !== 'credit_card'}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || isSuccess}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Processing...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
