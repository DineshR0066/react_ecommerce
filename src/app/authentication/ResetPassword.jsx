import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  CardContent,
  Box,
  Card,
  Typography,
  Stack,
  Button,
  Link as MuiLink,
  TextField,
} from '@mui/material';
import { AuthButton, SnackBar, StyledTextField, useResetPasswordMutation } from '../../shared';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword] = useResetPasswordMutation();

  const handleReset = async (data) => {
    try {
      await resetPassword({ email, newPassword: data.newPassword, token });

      setSnackMessage('Password resetted successfully');
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to reset');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '70vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decoration */}
      <Box
        className="liquid-shape"
        sx={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '380px',
          height: '380px',
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <StyledCard 
        sx={{ 
          width: '100%', 
          maxWidth: 480, 
          zIndex: 1,
          p: { xs: 4, md: 6 },
        }}
      >
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 1 }}
        >
          New Beginnings
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 5, letterSpacing: '0.02em' }}
        >
          Create a strong password to re-enter our collection.
        </Typography>

        <form onSubmit={handleSubmit(handleReset)}>
          <Stack spacing={4}>
            <StyledTextField
              type="password"
              label="New Password"
              fullWidth
              placeholder="Enter new password"
              {...register('newPassword', { required: 'Password is required' })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            
            <StyledTextField
              type="password"
              label="Confirm New Password"
              fullWidth
              placeholder="Confirm new password"
              {...register('confirmNewPassword', { 
                required: 'Confirmation is required',
                validate: (value, formValues) => value === formValues.newPassword || "Passwords don't match"
              })}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword?.message}
            />

            <AuthButton
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Set New Password
            </AuthButton>
          </Stack>
        </form>
      </StyledCard>
      
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
};
