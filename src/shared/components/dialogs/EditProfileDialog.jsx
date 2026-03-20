import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
} from '@mui/material';

export const EditProfileDialog = ({
  open,
  onClose,
  onSave,
  userType,
  initialData,
  onDeleteAddress,
}) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [newAddress, setNewAddress] = useState({
    address_line: '',
    city: '',
    state: '',
    zip_code: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email || '',
      });
    }
    // Reset new address fields when dialog opens/closes
    if (!open) {
      setNewAddress({
        address_line: '',
        city: '',
        state: '',
        zip_code: '',
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave({
      email: formData.email,
      newAddress: newAddress.address_line ? newAddress : null,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>Edit Profile</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 1,
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        <TextField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />

        <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
          Saved Addresses
        </Typography>
        {initialData?.addresses && initialData.addresses.length > 0 ? (
          initialData.addresses.map((addr) => (
            <Box
              key={addr._id}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {addr.address_line}, {addr.city}, {addr.state} - {addr.zip_code}
              </Typography>
              <Button
                size="small"
                color="error"
                onClick={() => onDeleteAddress(addr._id)}
                sx={{ fontWeight: 700 }}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No addresses saved yet.
          </Typography>
        )}

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Add New Address
        </Typography>
        <TextField
          label="Address Line"
          name="address_line"
          value={newAddress.address_line}
          onChange={handleNewAddressChange}
          fullWidth
        />
        <Box display="flex" gap={2}>
          <TextField
            label="City"
            name="city"
            value={newAddress.city}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <TextField
            label="State"
            name="state"
            value={newAddress.state}
            onChange={handleNewAddressChange}
            fullWidth
          />
        </Box>
        <TextField
          label="Zip Code"
          name="zip_code"
          value={newAddress.zip_code}
          onChange={handleNewAddressChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 1.5, fontWeight: 700, px: 3 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ borderRadius: 1.5, fontWeight: 700, px: 3, boxShadow: 'none' }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
