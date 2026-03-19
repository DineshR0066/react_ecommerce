import React, { useState } from 'react';
import { Button } from '@mui/material';

import {
  AdminTableLayout,
  useGetAllProductsQuery,
  useCancelOrderMutation,
  DeleteDialog,
  SnackBar,
} from '../../../shared';

export const Order = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const uid = localStorage.getItem('user_id');

  const { data, isLoading, error } = useGetAllProductsQuery({
    page: page + 1,
    limit: rowsPerPage,
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
        setSnackMessage('Order cancelled successfully');
        setSnackSeverity('success');
        setSnackOpen(true);
        setIsDeleteDialogOpen(false);
        setSelectedOrder(null);
      } catch (err) {
        console.error('Failed to cancel order:', err);
        setSnackMessage('Failed to cancel order');
        setSnackSeverity('error');
        setSnackOpen(true);
      }
    }
  };

  const columns = [
    {
      key: 'product_name',
      label: 'Category',
    },
    {
      key: 'Product_img',
      label: 'Image',
      render: (row) => (
        <img
          src={row.product_image_url}
          alt="product"
          style={{ height: '100px', width: '100px', objectFit: 'cover' }}
        />
      ),
    },
    {
      key: 'order_at',
      label: 'Ordered At',
    },
    {
      key: 'product_price',
      label: 'Product Price',
    },
    {
      key: 'freight_value',
      label: 'Freight value',
    },
    {
      key: 'total_price',
      label: 'Price',
      render: (row) => {
        const total = (row.product_price || 0) + (row.freight_value || 0);
        return `₹ ${total.toFixed(2)}`;
      },
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'payment_type',
      label: 'Payment',
    },
    {
      key: 'Installation',
      label: 'Installation',
    },
    {
      key: 'action',
      label: 'Action',
      render: (row) => {
        return (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleCancel(row)}
            disabled={row.status === 'cancelled' || row.status === 'delivered'}
          >
            Cancel
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <AdminTableLayout
        columns={columns}
        data={data || []}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        isLoading={isLoading}
        isError={!!error}
        getRowId={(row) => row.product_id}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Order"
        description="Are you sure you want to cancel this order?"
        confirmText="Yes, Cancel"
        cancelText="No, Keep"
      />
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </>
  );
};
