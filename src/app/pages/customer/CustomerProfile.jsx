import { useState } from 'react';
// import { useAddAddressMutation, useCustomerDetailsQuery, useEditProfileMutation, useUserDashboardQuery } from '../../../shared';
import { 
  useCustomerDetailsQuery,
  useUserDashboardQuery,
  useEditProfileMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  SnackBar,
  ProfileLayout,
  StyledTextField,
  AuthButton,
  StyledCard
} from '../../../shared';
import { Email, LocationOn, Home, Map } from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  alpha
} from '@mui/material';

export const CustomerProfile = () => {
  const { data, error, isLoading } = useCustomerDetailsQuery();
  const { data: dashboard } = useUserDashboardQuery();
  const [editProfile] = useEditProfileMutation();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const lastAddress = data?.addresses?.[data.addresses.length - 1];
  const addressDisplay = lastAddress
    ? `${lastAddress.address_line}, ${lastAddress.city}, ${lastAddress.state}`
    : 'No address curated';

  const fields = [
    { icon: <Email />, label: 'Digital Identity', value: data?.email },
    {
      icon: <Home />,
      label: 'Primary Residence',
      value: addressDisplay,
    },
  ];

  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const [newAddress, setNewAddress] = useState({
    address_line: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const [openEdit, setOpenEdit] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  const handleEditOpen = () => {
    setFormData({
      email: data?.email || '',
    });
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = async () => {
    const uid = localStorage.getItem("user_id");
    try {
      if (!newAddress.address_line || !newAddress.city || !newAddress.state || !newAddress.zip_code) {
        setSnackMessage("Please refine all address fields");
        setSnackSeverity("error");
        setSnackOpen(true);
        return;
      }
      await addAddress({ uid, data: newAddress }).unwrap();
      setSnackMessage("Address added to your collection");
      setSnackSeverity("success");
      setSnackOpen(true);
      setNewAddress({ address_line: "", city: "", state: "", zip_code: "" });
    } catch (err) {
      setSnackMessage("Failed to expand collection");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  };

  const handleDeleteAddress = async (id) => {
    const uid = localStorage.getItem('user_id');
    try {
      await deleteAddress({ uid, data: { _id: id } }).unwrap();
      setSnackMessage('Address removed');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      setSnackMessage('Action failed');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const uid = localStorage.getItem('user_id');
      await editProfile({
        uid: uid,
        data: {
          email: formData.email,
        },
      }).unwrap();
      setOpenEdit(false);
      setSnackMessage('Profile refined');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      console.error('Update failed:', err);
      setSnackMessage(err.data?.message || 'Update failed');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4, px: 2 }}>
        <Button 
          variant="outlined" 
          onClick={handleEditOpen}
          sx={{ borderRadius: '12px', px: 4 }}
        >
          Refine Profile
        </Button>
      </Box>

      <ProfileLayout data={data} isLoading={isLoading} isError={!!error} fields={fields} />

      <Dialog 
        open={openEdit} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: '24px', 
            p: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ variant: 'h3', textAlign: 'center' }}>Refine Your Identity</DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={4}>
            <StyledTextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />

            <Box>
              <Typography variant="h4" sx={{ mb: 2 }}>Collection of Residences</Typography>
              <Stack spacing={2}>
                {data?.addresses?.map((addr) => (
                  <Box
                    key={addr._id}
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body2">
                      {addr.address_line}, {addr.city}, {addr.state}
                    </Typography>
                    <Button 
                      size="small" 
                      color="error" 
                      onClick={() => handleDeleteAddress(addr._id)}
                      sx={{ minWidth: 'auto', p: 1 }}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>Curate New Residence</Typography>
              <Stack spacing={3}>
                <StyledTextField
                  label="Address Line"
                  fullWidth
                  value={newAddress.address_line}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })}
                />
                <Stack direction="row" spacing={3}>
                  <StyledTextField
                    label="City"
                    fullWidth
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                  <StyledTextField
                    label="State"
                    fullWidth
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  />
                </Stack>
                <StyledTextField
                  label="Zip Code"
                  fullWidth
                  value={newAddress.zip_code}
                  onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })}
                />
                <Button 
                  variant="text" 
                  onClick={handleAddAddress}
                  sx={{ fontWeight: 600 }}
                >
                  Add to Collection
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 4, gap: 2 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
            Dismiss
          </Button>
          <AuthButton onClick={handleSubmit} sx={{ px: 6 }}>
            Commit Changes
          </AuthButton>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 8, px: 2 }}>
        <Typography variant="h2" sx={{ mb: 6 }}>Dashboard Overview</Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[
            { label: 'Total Acquisition', value: `₹${Number(dashboard?.total_spent || 0).toLocaleString()}`, color: 'primary.main' },
            { label: 'Total Engagements', value: dashboard?.total_orders || 0, color: 'text.primary' },
            { label: 'Finalized Journeys', value: dashboard?.delivered_orders || 0, color: 'text.primary' }
          ].map((stat, i) => (
            <Grid item xs={12} md={4} key={i}>
              <StyledCard sx={{ p: 4 }}>
                <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h1" sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ mb: 4 }}>Engagement Status</Typography>
              <PieChart
                height={300}
                series={[
                  {
                    data: [
                      { id: 0, value: dashboard?.delivered_orders || 0, label: 'Finalized', color: '#4F7C82' },
                      { id: 1, value: (dashboard?.total_orders || 0) - (dashboard?.delivered_orders || 0), label: 'In Progress', color: alpha('#4F7C82', 0.2) },
                    ],
                    innerRadius: 80,
                    paddingAngle: 5,
                    cornerRadius: 10,
                  },
                ]}
              />
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ mb: 4 }}>Acquisition Growth</Typography>
              <BarChart
                height={300}
                xAxis={[{ scaleType: 'band', data: ['Journeys', 'Finalizations'] }]}
                series={[
                  {
                    data: [dashboard?.total_orders || 0, dashboard?.delivered_orders || 0],
                    color: '#4F7C82',
                  },
                ]}
                borderRadius={12}
              />
            </StyledCard>
          </Grid>
        </Grid>
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
