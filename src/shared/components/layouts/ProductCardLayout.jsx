import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TablePagination,
  CircularProgress,
  Container,
  CardActionArea,
  alpha,
} from '@mui/material';
import { ProductStyledCard } from '../../styled-components';

export const ProductCardLayout = ({
  data = [],
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  isLoading,
  isError,
  onCardClick,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress thickness={3} size={36} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">Failed to load products.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 0 }}>
      <Grid container spacing={3} justifyContent="flex-start">
        {data.length > 0 ? (
          data.map((product, index) => (
            <Grid
              item
              key={product.product_id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                animation: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                animationDelay: `${index * 0.06}s`,
                opacity: 0,
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
              xs={12} sm={6} md={4} lg={3} xl={2}
            >
              <ProductStyledCard>
                <CardActionArea
                  onClick={() => onCardClick(product)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 155,
                      width: '100%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      transition: 'transform 0.4s ease',
                    }}
                    image={
                      product.product_image_url ||
                      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
                    }
                    alt={product.product_name || 'product'}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 1.75,
                      '&:last-child': { pb: 1.75 },
                    }}
                  >
                    <Box sx={{ mb: 1, flexGrow: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          lineHeight: 1.3,
                          mb: 0.4,
                          fontWeight: 600,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {product.product_name || 'No title'}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', fontWeight: 500 }}
                      >
                        {product.product_category_name || 'Uncategorized'}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto',
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.9rem' }}
                      >
                        ₹{product.price}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: product.product_qty > 0
                            ? (theme) => alpha(theme.palette.success.main, 0.1)
                            : (theme) => alpha(theme.palette.error.main, 0.1),
                          color: product.product_qty > 0 ? 'success.main' : 'error.main',
                          px: 0.875,
                          py: 0.25,
                          borderRadius: '20px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          border: (theme) =>
                            `1px solid ${product.product_qty > 0
                              ? alpha(theme.palette.success.main, 0.2)
                              : alpha(theme.palette.error.main, 0.2)}`,
                        }}
                      >
                        {product.product_qty > 0 ? `${product.product_qty}` : 'Out'}
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </ProductStyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 10 }}>
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          component="div"
          count={-1}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[10, 15, 20, 25]}
          sx={{
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'text.secondary',
            },
          }}
        />
      </Box>
    </Container>
  );
};
