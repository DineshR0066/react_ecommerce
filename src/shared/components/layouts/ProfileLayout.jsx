import { 
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { StyledCard } from '../../styled-components';

export const ProfileLayout = ({
  data,
  isLoading = false,
  isError = false,
  fields = [],
  nameKey = 'username',
  roleKey = 'role',
  avatarKey = 'username',
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress thickness={2} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: '12px' }}>Error loading profile.</Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ borderRadius: '12px' }}>Profile data not available.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2, m: 0 }}>
      <StyledCard
        sx={{
          p: { xs: 3, md: 5 },
          mb: 5,
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          gap={4}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                color: 'white',
                fontSize: '3rem',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 8px 24px -8px rgba(0,0,0,0.2)'
              }}
            >
              {data[avatarKey]?.charAt(0).toUpperCase()}
            </Avatar>
            <Box 
              sx={{ 
                position: 'absolute', 
                inset: -4, 
                border: '1px solid', 
                borderColor: 'primary.main', 
                borderRadius: '50%',
                opacity: 0.3
              }} 
            />
          </Box>
          <Box textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography
              variant="h2"
              sx={{ 
                textTransform: 'capitalize',
                mb: 1
              }}
            >
              {data[nameKey]}
            </Typography>
            <Chip
              label={data[roleKey]?.toUpperCase()}
              sx={{ 
                px: 2,
                borderRadius: '8px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                bgcolor: 'primary.main',
                color: 'white',
                border: 'none'
              }}
            />
          </Box>
        </Box>
      </StyledCard>

      <Grid container spacing={4}>
        {fields.map((field, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <StyledCard
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                height: '100%'
              }}
            >
              <Box sx={{ 
                p: 1.5, 
                borderRadius: '12px', 
                background: 'rgba(0,0,0,0.03)',
                color: 'primary.main' 
              }}>
                {field.icon}
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {field.label}
                </Typography>
                <Typography variant="h5">
                  {field.value || 'Not provided'}
                </Typography>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
