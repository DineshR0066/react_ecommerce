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
  styled,
  alpha,
} from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 0,
  boxShadow: 'none',
  border: 'none',
  backgroundColor: 'transparent',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.primary.main, 0.04)
      : alpha(theme.palette.primary.main, 0.06),
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 700,
  fontSize: '11px',
  textTransform: 'uppercase',
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  letterSpacing: '0.06em',
  whiteSpace: 'nowrap',
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
    transition: 'background-color 0.15s ease',
  },
  '&:last-child td': {
    borderBottom: 'none',
  },
}));

const DataCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  fontSize: '13.5px',
  color: theme.palette.text.primary,
}));

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
        <CircularProgress color="primary" thickness={3} size={36} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: '12px' }}>
          An error occurred while fetching data. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {(title || headerActions) && (
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={2}
          mb={3}
        >
          {title && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
          )}
          {headerActions && (
            <Box display="flex" gap={1.5} width={{ xs: '100%', sm: 'auto' }}>
              {headerActions}
            </Box>
          )}
        </Box>
      )}

      <Card
        elevation={0}
        sx={{
          borderRadius: '16px',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(255,255,255,0.85)'
              : 'rgba(16,23,25,0.85)',
          backdropFilter: 'blur(16px)',
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          overflow: 'hidden',
        }}
      >
        {headerContent && (
          <Box sx={{ borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}` }}>
            {headerContent}
          </Box>
        )}

        <StyledTableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }}>
            <StyledTableHead>
              <TableRow>
                {columns.map((col) => (
                  <HeaderCell key={col.key}>{col.label}</HeaderCell>
                ))}
              </TableRow>
            </StyledTableHead>

            <TableBody>
              {data.map((row, index) => (
                <StyledRow key={getRowId(row) || index}>
                  {columns.map((col) => (
                    <DataCell key={col.key}>
                      {col.key === 'order_id' ? (
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          #{row[col.key]}
                        </Typography>
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        row[col.key]
                      )}
                    </DataCell>
                  ))}
                </StyledRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <DataCell colSpan={columns.length} align="center" sx={{ py: 10 }}>
                    <Typography variant="body2" color="text.secondary">
                      No data found
                    </Typography>
                  </DataCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <TablePagination
          component="div"
          count={totalCount ?? (data.length < rowsPerPage ? page * rowsPerPage + data.length : -1)}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            py: 0.5,
            px: 2,
            borderTop: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'text.secondary',
            },
          }}
        />
      </Card>
    </Container>
  );
};
