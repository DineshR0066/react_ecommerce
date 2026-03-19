import React from 'react';
import { useState } from 'react';
import { Stack, Button, Container, IconButton } from '@mui/material';
import {
  useCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
  AdminTableLayout,
  BuyProductDialog,
  DeleteDialog,
  SnackBar,
} from '../../../shared';
import { Add, Remove } from '@mui/icons-material';

export const Cart = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    page: page + 1,
    limit: rowsPerPage,
  });

  const columns = [
    {
      key: 'product_category_name',
      label: 'product category',
    },
    {
      key: 'product_image_url',
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
      key: 'price',
      label: 'Price',
    },
    {
      key: 'product_weight_g',
      label: 'Weight',
    },
    {
      key: 'product_height_cm',
      label: 'Height',
    },
    {
      key: 'product_width_cm',
      label: 'Width',
    },
    {
      key: 'product_qty',
      label: 'Stock',
    },
    {
      key: 'quantity',
      label: 'Quantity',
      render: (row) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => handleDecrease(row)}>
            <Remove />
          </IconButton>

          <span>{row.quantity}</span>

          <IconButton onClick={() => handleIncrease(row)}>
            <Add />
          </IconButton>
        </Stack>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleRemove(row.product_id)}
          >
            Remove from cart
          </Button>
          <Button size="small" variant="outlined" color="primary" onClick={() => handleBuy(row)}>
            Buy
          </Button>
        </Stack>
      ),
    },
  ];

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsBuyDialogOpen(true);
  };

  const handleBuyAll = () => {
    if (!data || data.length === 0) {
      setSnackMessage('Cart is empty');
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

      setSnackMessage('All items purchased successfully');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to purchase all items');
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
      setSnackMessage('Item removed from cart');
      setSnackSeverity('success');
      setSnackOpen(true);
      setIsDeleteDialogOpen(false);
      setSelectedProductId(null);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to remove item');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const handlePurchaseSuccess = async () => {
    if (selectedProduct) {
      try {
        await remove({
          uid: localStorage.getItem('user_id'),
          pid: selectedProduct.product_id,
        }).unwrap();
      } catch (err) {
        console.error('Failed to remove item from cart after purchase:', err);
      }
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
      const newQty = row.quantity - 1;

      if (newQty <= 0) {
        await remove({
          uid: localStorage.getItem('user_id'),
          pid: row.product_id,
        }).unwrap();
      } else {
        await updateCart({
          uid: localStorage.getItem('user_id'),
          pid: row.product_id,
          qty: newQty,
        }).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handleBuyAll}>
          Buy All
        </Button>
      </Stack>

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
      <BuyProductDialog
        open={isBuyDialogOpen}
        onClose={() => setIsBuyDialogOpen(false)}
        product={selectedProduct}
        isBulk={false}
        onSuccess={handlePurchaseSuccess}
      />
      <BuyProductDialog
        open={isBuyAllDialogOpen}
        onClose={() => setIsBuyAllDialogOpen(false)}
        product={data}
        isBulk={true}
        onSuccess={handleBuyAllSuccess}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        description="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
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
