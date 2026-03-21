import React from 'react';
import { useState } from 'react';
import { Stack, Button, Container, IconButton, Box, Typography, alpha } from '@mui/material';
import {
  useCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
  AdminTableLayout,
  BuyProductDialog,
  BuyAllDialog,
  DeleteDialog,
  SnackBar,
  StyledCard, 
  AuthButton
} from '../../../shared';
import { Add, Remove, DeleteOutline, ShoppingBagOutlined } from '@mui/icons-material';

export const Cart = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isBuyAllDialogOpen, setIsBuyAllDialogOpen] = useState(false);

  const [remove] = useRemoveFromCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const { data, isLoading, error } = useCartQuery({
    page: 1,
    limit: 100, // Show all for now for a better list experience
  });

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsBuyDialogOpen(true);
  };

  const handleBuyAll = () => {
    if (!data || data.length === 0) {
      setSnackMessage('Your collection is empty');
      setSnackSeverity('warning');
      setSnackOpen(true);
      return;
    }
    setIsBuyAllDialogOpen(true);
  };

  const handleBuyAllSuccess = async () => {
    try {
      const uid = localStorage.getItem('user_id');
      const removePromises = data.map((item) => remove({ uid, pid: item.product_id }).unwrap());
      await Promise.all(removePromises);

      setSnackMessage('All pieces acquired successfully');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to finalize collection');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const handleRemove = (pid) => {
    setSelectedProductId(pid);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await remove({ uid: localStorage.getItem('user_id'), pid: selectedProductId }).unwrap();
      setSnackMessage('Piece removed from collection');
      setSnackSeverity('success');
      setSnackOpen(true);
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to remove piece');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const handleIncrease = async (row) => {
    try {
      await updateCart({
        uid: localStorage.getItem('user_id'),
        pid: row.product_id,
        qty: row.quantity + 1,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async (row) => {
    try {
      if (row.quantity <= 1) {
        handleRemove(row.product_id);
      } else {
        await updateCart({
          uid: localStorage.getItem('user_id'),
          pid: row.product_id,
          qty: row.quantity - 1,
        }).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = data?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;

  if (isLoading) return <Box sx={{ py: 10, textAlign: 'center' }}><Typography variant="h3">Unveiling your collection...</Typography></Box>;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-end" sx={{ mb: 6, gap: 3 }}>
        <Box>
          <Typography variant="h1" sx={{ mb: 1 }}>My Collection</Typography>
          <Typography variant="body1" color="text.secondary">
            {data?.length || 0} exquisite pieces awaiting your acquisition
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="overline" color="primary.main" sx={{ display: 'block', mb: 0.5 }}>Total Investment</Typography>
            <Typography variant="h3">₹{totalPrice.toLocaleString()}</Typography>
          </Box>
          <AuthButton
            variant="contained"
            onClick={handleBuyAll}
            startIcon={<ShoppingBagOutlined />}
            sx={{ px: 4, py: 2 }}
          >
            Acquire All
          </AuthButton>
        </Stack>
      </Stack>

      {data?.length > 0 ? (
        <Stack spacing={3}>
          {data.map((item) => (
            <StyledCard key={item.product_id} sx={{ p: 0, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box
                  component="img"
                  src={item.product_image_url}
                  sx={{
                    width: { xs: '100%', sm: 200 },
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="primary.main" sx={{ display: 'block' }}>
                        {item.product_category_name}
                      </Typography>
                      <Typography variant="h4" sx={{ mb: 1 }}>{item.product_name}</Typography>
                    </Box>
                    <IconButton 
                      onClick={() => handleRemove(item.product_id)}
                      sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Stack>

                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h5">₹{item.price.toLocaleString()}</Typography>
                      <Typography variant="body2" color="text.secondary">per piece</Typography>
                    </Stack>
                    
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Stack 
                        direction="row" 
                        alignItems="center" 
                        sx={{ 
                          bgcolor: alpha('#000', 0.03), 
                          borderRadius: '12px',
                          p: 0.5
                        }}
                      >
                        <IconButton size="small" onClick={() => handleDecrease(item)}>
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton size="small" onClick={() => handleIncrease(item)} sx={{ color: 'primary.main' }}>
                          <Add fontSize="small" />
                        </IconButton>
                      </Stack>
                      <Button 
                        variant="text" 
                        onClick={() => handleBuy(item)}
                        sx={{ fontWeight: 600, textTransform: 'none' }}
                      >
                        Acquire Piece
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </StyledCard>
          ))}
        </Stack>
      ) : (
        <Box sx={{ py: 15, textAlign: 'center' }}>
          <ShoppingBagOutlined sx={{ fontSize: 80, color: 'text.disabled', mb: 3, opacity: 0.2 }} />
          <Typography variant="h3" gutterBottom>Your collection is empty</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Explore our curated catalog to find your next signature piece.
          </Typography>
          <Button variant="outlined" onClick={() => window.history.back()} sx={{ borderRadius: '12px', px: 4 }}>
            Continue Exploring
          </Button>
        </Box>
      )}

      <BuyProductDialog
        open={isBuyDialogOpen}
        onClose={() => setIsBuyDialogOpen(false)}
        product={selectedProduct}
        isBulk={false}
      />
      <BuyAllDialog
        open={isBuyAllDialogOpen}
        onClose={() => setIsBuyAllDialogOpen(false)}
        products={data}  
        onSuccess={handleBuyAllSuccess}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove from Collection"
        description="Are you sure you want to remove this exquisite piece from your selection?"
        confirmText="Remove Piece"
      />
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Container>
  );
};
