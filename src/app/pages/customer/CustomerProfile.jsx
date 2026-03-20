import React, { useState } from 'react';
import {
  useCustomerDetailsQuery,
  useUserDashboardQuery,
  useEditProfileMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  SnackBar,
  ProfileLayout,
  EditProfileDialog,
} from '../../../shared';
import { Email, LocationOn, Home, Map } from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Button, Paper, Typography } from '@mui/material';

export const CustomerProfile = () => {
  const { data, error, isLoading } = useCustomerDetailsQuery();
  const { data: dashboard } = useUserDashboardQuery();
  const [editProfile] = useEditProfileMutation();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const fields = [
    { icon: <Email color="primary" />, label: 'Email Address', value: data?.email },
    {
      icon: <Home color="primary" />,
      label: 'Address',
      value: `${data?.addresses?.length || 0} saved`,
    },
  ];

  const [deleteAddress] = useDeleteAddressMutation();

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };
  const handleDeleteAddress = async (addressId) => {
    try {
      const uid = localStorage.getItem('user_id');
      await deleteAddress({ uid, data: { _id: addressId } }).unwrap();
      setSnackMessage('Address deleted successfully');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      setSnackMessage(err?.data?.message || 'Delete failed');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleEditOpen}>
          Edit Profile
        </Button>
      </Box>
      <ProfileLayout data={data} isLoading={isLoading} isError={!!error} fields={fields} />
      <EditProfileDialog
        open={openEdit}
        onClose={handleClose}
        userType="customer"
        initialData={data}
        onSave={async ({ email, newAddress }) => {
          try {
            const uid = localStorage.getItem('user_id');
            const dataToSubmit = {
              email,
              addresses: newAddress ? [...data.addresses, newAddress] : data.addresses,
            };
            await editProfile({ uid, data: dataToSubmit }).unwrap();
            setOpenEdit(false);
            setSnackMessage('Profile updated successfully');
            setSnackSeverity('success');
            setSnackOpen(true);
          } catch (err) {
            setSnackMessage(err?.data?.message || 'Update failed');
            setSnackSeverity('error');
            setSnackOpen(true);
          }
        }}
        onDeleteAddress={handleDeleteAddress}
      />

      <Box sx={{ mt: 5, px: 2 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Customer Dashboard
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3,1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(156,53,197,0.2)',
              background: 'rgba(156,53,197,0.05)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total Spent
            </Typography>

            <Typography variant="h4" sx={{ color: '#9c35c5', fontWeight: 700 }}>
              ₹{dashboard?.total_spent || 0}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(156,53,197,0.2)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {dashboard?.total_orders || 0}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(156,53,197,0.2)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Delivered Orders
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {dashboard?.delivered_orders || 0}
            </Typography>
          </Paper>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Status
            </Typography>

            <PieChart
              height={260}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: dashboard?.delivered_orders || 0,
                      label: 'Delivered',
                      color: '#4caf50',
                    },
                    {
                      id: 1,
                      value: (dashboard?.total_orders || 0) - (dashboard?.delivered_orders || 0),
                      label: 'Pending',
                      color: '#9c35c5',
                    },
                  ],
                },
              ]}
            />
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Orders Overview
            </Typography>

            <BarChart
              height={260}
              xAxis={[
                {
                  scaleType: 'band',
                  data: ['Orders', 'Delivered'],
                },
              ]}
              series={[
                {
                  data: [dashboard?.total_orders || 0, dashboard?.delivered_orders || 0],
                  color: '#9c35c5',
                },
              ]}
            />
          </Paper>
        </Box>
      </Box>

      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
};
