import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import { SnackBar, useSignupMutation } from '../../shared';
import { StyledCard, StyledTextField, AuthButton } from '../../shared/styled-components/StyledComponents';

export const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const [signup] = useSignupMutation();

  const handleSignup = async (data) => {
    if (data.password !== data.confirmPassword) {
      setSnackMessage('Passwords do not match');
      setSnackSeverity('error');
      setSnackOpen(true);
      return;
    }
    try {
      await signup(data).unwrap();
      setSnackMessage('Signup successful');
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        navigate('/products');
      }, 1000);
    } catch (err) {
      console.error(err);
      const message = err?.data?.message || 'Signup failed';
      setSnackMessage(message);
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
        minHeight: '85vh',
        position: 'relative',
        overflow: 'hidden',
        py: 4
      }}
    >
      {/* Background Decoration */}
      <Box
        className="liquid-shape"
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <StyledCard
        sx={{
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          zIndex: 1,
          p: { xs: 4, md: 6 },
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 1 }}
        >
          Join Our Collection
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 5, letterSpacing: '0.02em' }}
        >
          Begin your journey into a world of refined commerce.
        </Typography>

        <form onSubmit={handleSubmit(handleSignup)}>
          <Stack spacing={3}>
            <StyledTextField
              label="Username"
              fullWidth
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <StyledTextField
              label="Email Address"
              type="email"
              fullWidth
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <StyledTextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <StyledTextField
                label="Confirm Password"
                type="password"
                fullWidth
                {...register('confirmPassword', { required: 'Confirm Password is required' })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Stack>

            <Stack direction="row" spacing={3}>
              <StyledTextField
                label="Zip Code"
                fullWidth
                {...register('zip_code', { required: 'Required' })}
                error={!!errors.zip_code}
              />
              <StyledTextField
                label="City"
                fullWidth
                {...register('city', { required: 'Required' })}
                error={!!errors.city}
              />
            </Stack>

            <StyledTextField
              label="State"
              fullWidth
              {...register('state', { required: 'State is required' })}
              error={!!errors.state}
              helperText={errors.state?.message}
            />

            <AuthButton 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ mt: 2 }}
            >
              Create Account
            </AuthButton>

            <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
              Already a member?{' '}
              <MuiLink 
                component={Link} 
                to="/login" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 600, 
                  textDecoration: 'none', 
                  '&:hover': { textDecoration: 'underline' } 
                }}
              >
                Sign In
              </MuiLink>
            </Typography>
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
