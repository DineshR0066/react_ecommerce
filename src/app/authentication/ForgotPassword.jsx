import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CardContent, Typography, Card, Stack, Box, TextField, Button } from '@mui/material';
import { SnackBar, useForgotPasswordMutation } from '../../shared';

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
      const res = await forgotPassword(data).unwrap();
      console.log(res.data);
      setSnackMessage('Mail sent if existed');
      setSnackSeverity('info');
      setSnackOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error(err);
      setSnackMessage('Invalid mail');
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
        borderWidth: '1px', 
      },
      '&:hover fieldset': {
        borderColor: 'black',
        borderWidth: '2px', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
        borderWidth: '2px', 
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
      <Card
        sx={{
          p: 4,
          borderRadius: 12,
          background: 'rgba(229, 216, 234, 0.92)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" fontWeight="bold">
            FORGET PASSWORD
          </Typography>

          <form onSubmit={handleSubmit(handlePassword)}>
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

              <Button variant="contained" type="submit" fullWidth sx={{ py: 1.5, borderRadius: 2 }}>
                Send Reset Link
              </Button>

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
