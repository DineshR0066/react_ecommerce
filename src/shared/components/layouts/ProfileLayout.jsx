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
  alpha,
} from '@mui/material';
import { Person } from '@mui/icons-material';

export const ProfileLayout = ({
  data,
  isLoading = false,
  isError = false,
  fields = [],
  nameKey = 'username',
  roleKey = 'role',
  avatarKey = 'username',
  actions,
  maxWidth = 'md',
  containerSx = {},
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress color="primary" thickness={3} size={36} />
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
    <Container maxWidth={maxWidth} sx={{ py: 4, ...containerSx }}>
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          borderRadius: '16px',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(255,255,255,0.85)'
              : 'rgba(16,23,25,0.85)',
          backdropFilter: 'blur(16px)',
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        {/* HEADER */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={3}
          mb={3.5}
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            gap={2.5}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                color: 'primary.main',
                fontSize: '2rem',
                fontWeight: 700,
                border: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              {data[avatarKey]?.charAt(0).toUpperCase()}
            </Avatar>
            <Box textAlign={{ xs: 'center', sm: 'left' }}>
              <Typography
                variant="h4"
                fontWeight={800}
                gutterBottom
                sx={{
                  textTransform: 'capitalize',
                  letterSpacing: '-0.02em',
                  mb: 0.5,
                }}
              >
                {data[nameKey]}
              </Typography>
              <Chip
                label={data[roleKey]?.toUpperCase()}
                size="small"
                icon={<Person sx={{ fontSize: '0.8rem !important' }} />}
                sx={(theme) => ({
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  '& .MuiChip-icon': { color: 'primary.main' },
                })}
              />
            </Box>
          </Box>
          {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
        </Box>

        <Divider sx={{ mb: 3, opacity: 0.4 }} />

        {/* FIELDS */}
        <Grid container spacing={2}>
          {fields.map((field, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.07),
                  },
                }}
              >
                {field.icon}
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" fontWeight={600}>
                    {field.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={500} sx={{ mt: 0.25 }}>
                    {field.value || 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};
