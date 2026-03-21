import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Stack, Box, Link as MuiLink } from '@mui/material';
import { SnackBar, useForgotPasswordMutation } from '../../shared';
import { StyledCard, StyledTextField, AuthButton } from '../../shared/styled-components/StyledComponents';

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgotPassword] = useForgotPasswordMutation();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const navigate = useNavigate();

  const handlePassword = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      setSnackMessage('Email sent if it exists');
      setSnackSeverity('info');
      setSnackOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err);
      setSnackMessage('Invalid email');
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
          top: '20%',
          left: '-10%',
          width: '350px',
          height: '350px',
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
          Restore Access
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 5, letterSpacing: '0.02em' }}
        >
          Enter your email to receive a secure password reset link.
        </Typography>

        <form onSubmit={handleSubmit(handlePassword)}>
          <Stack spacing={4}>
            <StyledTextField
              label="Email Address"
              fullWidth
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <AuthButton 
              variant="contained" 
              type="submit" 
              fullWidth 
              size="large"
              sx={{ mt: 2 }}
            >
              Send Reset Link
            </AuthButton>

            <Box sx={{ textAlign: 'center' }}>
              <MuiLink 
                component={Link} 
                to="/login" 
                variant="overline"
                sx={{ 
                  color: 'text.secondary', 
                  textDecoration: 'none', 
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s'
                }}
              >
                Return to Login
              </MuiLink>
            </Box>
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
