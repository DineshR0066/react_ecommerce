import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  CardContent,
  Card,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Link as MuiLink,
} from '@mui/material';
import { SnackBar, useSignupMutation } from '../../shared';

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

  const textStyle = {
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiInputLabel-root': {
      color: 'black',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        borderWidth: '1px', // default
      },
      '&:hover fieldset': {
        borderColor: 'black',
        borderWidth: '2px', // 👈 thicker on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
        borderWidth: '2px', // 👈 thicker on focus
      },
    },
  };

  const handleSignup = async (data) => {
    if (data.password !== data.confirmPassword) {
      setSnackMessage('Password didnt match');
      setSnackSeverity('error');
      setSnackOpen(true);
      return;
    }
    try {
      const res = await signup(data).unwrap();

      console.log('Signup success:', res.data);
      setSnackMessage('Signup successfull');
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
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Card
        sx={{
          width: 420,
          maxHeight: '80vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          p: 4,
          borderRadius: 12,
          background: 'rgba(229, 216, 234, 0.92)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold">
            SIGNUP
          </Typography>

          <form onSubmit={handleSubmit(handleSignup)}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                {...register('username', { required: 'Username is required' })}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={textStyle}
              />

              <TextField
                label="Email"
                type="email"
                variant="outlined"
                {...register('email', { required: 'email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={textStyle}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={textStyle}
              />

              <TextField
                label="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                {...register('confirmPassword', { required: 'Password is required' })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={textStyle}
              />

              <TextField
                label="ZipCode"
                variant="outlined"
                fullWidth
                {...register('zip_code', { required: 'ZipCode is required' })}
                error={!!errors.zip_code}
                helperText={errors.zip_code?.message}
                sx={textStyle}
              />

              <TextField
                label="City"
                variant="outlined"
                fullWidth
                {...register('city', { required: 'city is required' })}
                error={!!errors.city}
                helperText={errors.city?.message}
                sx={textStyle}
              />

              <TextField
                label="State"
                variant="outlined"
                fullWidth
                {...register('state', { required: 'state is required' })}
                error={!!errors.state}
                helperText={errors.state?.message}
                sx={textStyle}
              />

              <Button type="submit" variant="contained">
                Sign Up
              </Button>
              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <MuiLink component={Link} to="/" fontWeight="bold">
                  {' '}
                  Login
                </MuiLink>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
};
