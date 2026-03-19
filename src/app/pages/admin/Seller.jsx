import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  AdminTableLayout,
  DeleteDialog,
  useGetAllSellerQuery,
  useDeleteSellerMutation,
  useAddSellerMutation,
} from '../../../shared';

export const Sellers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sellerToDelete, setSellerToDelete] = useState(null);

  const [deleteSeller] = useDeleteSellerMutation();
  const { data, isLoading, isError } = useGetAllSellerQuery({
    page: page + 1,
    limit: rowsPerPage,
  });
  const [addSeller, { isLoading: isAdding }] = useAddSellerMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      city: '',
      state: '',
      zip_code: '',
    },
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onAddSellerSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        zip_code: Number(formData.zip_code),
      };
      await addSeller(payload).unwrap();
      handleClose();
    } catch (err) {
      console.error('Failed to add seller', err);
    }
  };

  const openDeleteDialog = (id) => {
    setSellerToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSeller(sellerToDelete).unwrap();
    } catch (err) {
      console.error('Failed to delete seller', err);
    } finally {
      setDeleteDialogOpen(false);
      setSellerToDelete(null);
    }
  };

  // ── Column definitions ──
  const columns = [
    {
      key: 'seller_name',
      label: 'Name',
      render: (row) => (
        <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
          {row.seller_name}
        </Typography>
      ),
    },
    { key: 'seller_email', label: 'Email' },
    { key: 'seller_state', label: 'State' },
    { key: 'seller_city', label: 'City' },
    { key: 'seller_zip_code', label: 'Zipcode' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Tooltip title="Delete seller">
          <IconButton color="error" size="small" onClick={() => openDeleteDialog(row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <AdminTableLayout
        title="Sellers"
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
        isError={isError}
        getRowId={(row) => row.id}
        headerActions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              fontWeight: 600,
            }}
          >
            Add Seller
          </Button>
        }
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Seller</DialogTitle>
        <DialogContent
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Username"
            fullWidth
            required
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min 6 characters' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Box display="flex" gap={2}>
            <TextField label="City" fullWidth {...register('city')} />
            <TextField label="State" fullWidth {...register('state')} />
          </Box>
          <TextField label="Zipcode" fullWidth {...register('zip_code')} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onAddSellerSubmit)} disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Seller"
        description="Are you sure you want to delete this seller?"
        confirmText="Delete Seller"
        cancelText="Cancel"
      />
    </>
  );
};
