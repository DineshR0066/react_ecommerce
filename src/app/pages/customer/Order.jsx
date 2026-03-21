import React, { useState } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  alpha, 
  Container, 
  Stack 
} from '@mui/material';

import {
  AdminTableLayout,
  useGetAllProductsQuery,
  useCancelOrderMutation,
  DeleteDialog,
  SnackBar,
  StyledCard, 
  StatusLabel,
  AuthButton 
} from '../../../shared';
import { 
  ShoppingBagOutlined, 
  AccessTime, 
  LocationOnOutlined, 
  CancelOutlined 
} from '@mui/icons-material';

export const Order = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const uid = localStorage.getItem('user_id');

  const { data, isLoading, error } = useGetAllProductsQuery({
    page: 1,
    limit: 50, // Show recent orders for a better experience
    uid: uid,
  });

  const [cancelOrder] = useCancelOrderMutation();

  const handleCancel = (row) => {
    setSelectedOrder(row);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedOrder) {
      try {
        await cancelOrder(selectedOrder.order_id).unwrap();
        setSnackMessage('Your engagement has been gracefully withdrawn');
        setSnackSeverity('success');
        setSnackOpen(true);
        setIsDeleteDialogOpen(false);
        setSelectedOrder(null);
      } catch (err) {
        console.error('Failed to cancel order:', err);
        setSnackMessage('Failed to withdraw engagement');
        setSnackSeverity('error');
        setSnackOpen(true);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (isLoading) return <Box sx={{ py: 10, textAlign: 'center' }}><Typography variant="h3">Recalling your history...</Typography></Box>;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" sx={{ mb: 1 }}>Purchase History</Typography>
        <Typography variant="body1" color="text.secondary">
          Refinement across {data?.length || 0} unique acquisitions
        </Typography>
      </Box>

      {data?.length > 0 ? (
        <Stack spacing={4}>
          {data.map((order) => (
            <StyledCard key={order.order_id} sx={{ p: 0, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Box
                  component="img"
                  src={order.product_image_url}
                  sx={{
                    width: { xs: '100%', md: 240 },
                    height: 240,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="overline" color="primary.main" sx={{ display: 'block' }}>
                        Order ID: #{order.order_id.slice(-8).toUpperCase()}
                      </Typography>
                      <Typography variant="h3" sx={{ mb: 0.5 }}>{order.product_name}</Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <StatusLabel color={getStatusColor(order.status)}>
                          {order.status}
                        </StatusLabel>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime sx={{ fontSize: 16 }} /> {order.order_at}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4">₹{((Number(order.product_price) || 0) + (Number(order.freight_value) || 0)).toLocaleString()}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">Entire Acquisition</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={4}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Payment</Typography>
                        <Typography variant="body2" fontWeight={600}>{order.payment_type}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Value</Typography>
                        <Typography variant="body2" fontWeight={600}>₹{Number(order.product_price).toLocaleString()}</Typography>
                      </Box>
                    </Stack>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleCancel(order)}
                      disabled={order.status === 'cancelled' || order.status === 'delivered'}
                      startIcon={<CancelOutlined />}
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 600,
                        '&.Mui-disabled': { opacity: 0 } 
                      }}
                    >
                      Withdraw Order
                    </Button>
                  </Box>
                </Box>
              </Box>
            </StyledCard>
          ))}
        </Stack>
      ) : (
        <Box sx={{ py: 15, textAlign: 'center' }}>
          <ShoppingBagOutlined sx={{ fontSize: 80, color: 'text.disabled', mb: 3, opacity: 0.2 }} />
          <Typography variant="h3" gutterBottom>No history found</Typography>
          <Typography variant="body1" color="text.secondary">
            Your journey with us is just beginning.
          </Typography>
        </Box>
      )}

      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Withdraw Order"
        description="Are you sure you want to gracefully withdraw this engagement? This action is finalized."
        confirmText="Withdraw Acquisition"
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
