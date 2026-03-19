import React from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TablePagination,
  CircularProgress,
  Alert,
} from '@mui/material';

export const AdminTableLayout = ({
  title,
  columns = [],
  data = [],
  page = 0,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  totalCount,
  isLoading = false,
  isError = false,
  headerActions,
  headerContent,
  getRowId = (row) => row.id || row._id,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">An error occurred while fetching data. Please try again.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
        >
          {title}
        </Typography>
        {headerActions && (
          <Box display="flex" gap={1} width={{ xs: '100%', sm: 'auto' }}>
            {headerActions}
          </Box>
        )}
      </Box>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          boxShadow: '0 0 2px 0 rgba(145,158,171,.2), 0 12px 24px -4px rgba(145,158,171,.12)',
          overflow: 'hidden',
        }}
      >
        {headerContent && headerContent}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            overflowX: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Table>
            {/* TABLE HEADER */}
            <TableHead
              sx={{
                backgroundColor: 'primary.main',
              }}
            >
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      borderBottom: '2px solid #9c35c5',
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody
              sx={{
                '& .MuiTableCell-root': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? 'rgba(156,53,197,0.03)' : 'background.paper',
                  color: 'text.primary',
                  borderColor: (theme) =>
                    theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'divider',
                },
              }}
            >
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(156,53,197,0.08)',
                    },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {/* ORDER ID highlight */}
                      {col.key === 'order_id' ? (
                        <Box
                          sx={{
                            color: 'secondary.main',
                            fontWeight: 600,
                          }}
                        >
                          {row[col.key]}
                        </Box>
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        row[col.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalCount ?? (data.length < rowsPerPage ? page * rowsPerPage + data.length : -1)}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            '.MuiTablePagination-toolbar': { px: 2 },
          }}
        />
      </Card>
    </Container>
  );
};
