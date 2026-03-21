import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Stack,
  Typography,
  Link as MuiLink,
  Box,
} from '@mui/material';
import { SnackBar, useLoginMutation } from '../../shared';
import { StyledCard, StyledTextField, AuthButton } from '../../shared/styled-components/StyledComponents';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'seller') {
      navigate('/seller/seller-profile');
    }

    if (role === 'customer') {
      navigate('/customer/search');
    }

    if (role === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      localStorage.setItem('email', res.user.email);
      localStorage.setItem('role', res.user.role);
      localStorage.setItem('user_id', res.user.user_id);
      const role = res.user.role;

      setSnackMessage('Login successful');
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        if (role === 'seller') navigate('/seller/seller-profile');
        if (role === 'customer') navigate('/customer/search');
        if (role === 'admin') navigate('/admin');
      }, 1000);
    } catch (err) {
      console.error(err);
      setSnackMessage('Login failed');
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
          top: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      
      <StyledCard 
        sx={{ 
          width: '100%', 
          maxWidth: 420, 
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
          Welcome Back
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 5, letterSpacing: '0.02em' }}
        >
          Enter your credentials to access your luxury experience.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <StyledTextField
              label="Email Address"
              fullWidth
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Box>
              <StyledTextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Box sx={{ textAlign: 'right', mt: 1.5 }}>
                <MuiLink 
                  component={Link} 
                  to="/forgot-password" 
                  variant="overline" 
                  sx={{ 
                    color: 'text.secondary',
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  Forgot password?
                </MuiLink>
              </Box>
            </Box>

            <AuthButton
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign In
            </AuthButton>

            <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
              New to our collection?{' '}
              <MuiLink 
                component={Link} 
                to="/signup" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 600, 
                  textDecoration: 'none', 
                  '&:hover': { textDecoration: 'underline' } 
                }}
              >
                Create Account
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
