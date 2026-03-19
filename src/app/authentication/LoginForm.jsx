import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Link as MuiLink,
  TextField,
  Box,
} from '@mui/material';
import { SnackBar, useLoginMutation } from '../../shared';

export const LoginForm = () => {
  // const [error, setError] = useState("");

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

      console.log('Login success:', res);
      setSnackMessage('login successfull');
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        if (role === 'seller') {
          navigate('/seller/seller-profile');
        }
        if (role === 'customer') {
          navigate('/customer/search');
        }
        if (role === 'admin') {
          navigate('/admin');
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      // setError("Invalid");
      setSnackMessage('login failed');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Card
        sx={{
          p: 4,
          borderRadius: 12,
          background: 'rgba(229, 216, 234, 0.92)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent>
          <Typography variant="h3" align="center" color="black" fontWeight="bold">
            LOGIN
          </Typography>

          {/* {error && <Typography color="error" align="center">{error}</Typography>} */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...register('email', { required: 'Email is required' })}
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

              <Box sx={{ textAlign: 'right' }}>
                <MuiLink component={Link} to="/forgot-password" variant="body2">
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                {' '}
                Login
              </Button>

              <Typography variant="body2" align="center" color="black">
                Don't have an account?{' '}
                <MuiLink component={Link} to="/signup" fontWeight="bold">
                  Signup
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
