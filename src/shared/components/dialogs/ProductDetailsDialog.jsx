import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Grid,
} from '@mui/material';
import { ShoppingCart, ShoppingBag } from '@mui/icons-material';

import { 
  AuthButton 
} from '../../styled-components/StyledComponents';

export const ProductDetailsDialog = ({ open, onClose, product, onAddToCart, onBuy }) => {
  if (!product) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        sx: { 
          borderRadius: '32px', 
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                minHeight: { xs: 300, md: 500 },
                objectFit: 'cover',
              }}
              src={product.product_image_url || 'https://via.placeholder.com/600'}
              alt={product.product_name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {product.product_category_name}
                </Typography>
                <Typography variant="h2" sx={{ my: 1 }}>
                  {product.product_name || 'Masterpiece No. ' + product.product_id.slice(-4)}
                </Typography>
                <Typography variant="h3" sx={{ color: 'text.primary', mt: 2 }}>
                  ₹{Number(product.price).toLocaleString()}
                </Typography>
              </Box>

              <Divider sx={{ my: 4, opacity: 0.5 }} />

              <Stack spacing={4}>
                <Box>
                  <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    Specifications
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      { label: 'Weight', value: `${product.product_weight_g}g` },
                      { label: 'Height', value: `${product.product_height_cm}cm` },
                      { label: 'Width', value: `${product.product_width_cm}cm` },
                    ].map((spec) => (
                      <Grid item xs={4} key={spec.label}>
                        <Typography variant="caption" color="text.secondary" display="block">{spec.label}</Typography>
                        <Typography variant="body1" fontWeight={600}>{spec.value}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    Availability
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: product.product_qty > 0 ? 'success.main' : 'error.main',
                      fontWeight: 600
                    }}
                  >
                    {product.product_qty > 0 ? `Ready for Acquisition (${product.product_qty})` : 'Curated / Out of Stock'}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ mt: 'auto', pt: 6 }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ShoppingCart />}
                    onClick={() => {
                      onAddToCart(product.product_id);
                      onClose();
                    }}
                    sx={{ py: 2, borderRadius: '12px' }}
                  >
                    Add to Cart
                  </Button>
                  <AuthButton
                    fullWidth
                    startIcon={<ShoppingBag />}
                    onClick={() => {
                      onBuy(product);
                      onClose();
                    }}
                    sx={{ py: 2 }}
                  >
                    Acquire Now
                  </AuthButton>
                </Stack>
                <Button 
                  fullWidth 
                  onClick={onClose} 
                  sx={{ mt: 2, color: 'text.disabled' }}
                >
                  Dismiss
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
