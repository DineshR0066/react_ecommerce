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
        <CircularProgress />
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={1}>
        {data.length > 0 ? (
          data.map((product) => (
            <Grid item key={product.product_id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: 350, // Strict fixed height
                  width: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 8,
                  },
                }}
              >
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
                      height: 200,
                      width: 200,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                    image={
                      product.product_image_url ||
                      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
                    } // Use a better fallback
                    alt={product.product_name || 'product'}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflowY: 'auto',
                      padding: 2,
                      // Hide scrollbar
                      '&::-webkit-scrollbar': { display: 'none' },
                      msOverflowStyle: 'none',
                      scrollbarWidth: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        overflowY: 'auto',
                        mb: 1,
                        flexGrow: 1,
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ lineHeight: 1.2, mb: 1 }}
                      >
                        {product.product_name || 'No description'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {product.product_category_name || 'Uncategorized'}
                      </Typography>
                    </Box>

                    <Box sx={{ flexShrink: 0 }}>
                      <Divider sx={{ mb: 1 }} />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="h6" color="primary" fontWeight={700}>
                          ₹{product.price}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontWeight: 600 }}
                        >
                          Stock: {product.product_qty}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          component="div"
          count={-1} // Since we might not have total count from some APIs, or we can pass it as a prop
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[15, 30, 45, 60]}
        />
      </Box>
    </Container>
  );
};
