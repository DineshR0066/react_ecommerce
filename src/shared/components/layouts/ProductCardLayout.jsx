import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TablePagination,
  Pagination,
  CircularProgress,
  Container,
  CardActionArea,
  Divider,
} from '@mui/material';
import { ProductStyledCard, StatusLabel } from '../../styled-components';

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
        <CircularProgress thickness={2} size={40} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h4" color="text.secondary">Our collection is temporarily unavailable.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2, md: 4 }, py: 2 }}>
      <Grid container spacing={4}>
        {data.length > 0 ? (
          data.map((product) => (
            <Grid item key={product.product_id} sx={{ display: 'flex', justifyContent: 'center' }} xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <ProductStyledCard onClick={() => onCardClick(product)}>
                <CardActionArea
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      className="product-image"
                      sx={{
                        height: 240,
                        width: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      image={
                        product.product_image_url ||
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
                      }
                      alt={product.product_name || 'product'}
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        right: 16,
                        zIndex: 2
                      }}
                    >
                      <StatusLabel color={product.product_qty > 0 ? 'success' : 'error'}>
                        {product.product_qty > 0 ? 'In Stock' : 'Sold Out'}
                      </StatusLabel>
                    </Box>
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: 'primary.main',
                        mb: 1,
                        display: 'block'
                      }}
                    >
                      {product.product_category_name || 'Collection'}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        lineHeight: 1.2,
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.4em'
                      }}
                    >
                      {product.product_name || 'Unnamed Piece'}
                    </Typography>

                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        ₹{Number(product.price).toLocaleString()}
                      </Typography>
                      {product.product_qty > 0 && (
                        <Typography variant="caption" color="text.secondary">
                          {product.product_qty} available
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </ProductStyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h3" gutterBottom>No matches found</Typography>
              <Typography variant="body1" color="text.secondary">Try adjusting your search or filters to explore more of our collection.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 8, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination 
          count={10} // Dummy count for now
          page={page + 1} 
          onChange={(e, value) => onPageChange(e, value - 1)}
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }
            }
          }}
        />
      </Box>
    </Container>
  );
};
