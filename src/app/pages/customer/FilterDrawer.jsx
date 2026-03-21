import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Divider, 
  Drawer, 
  Button, 
  IconButton,
  alpha 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const priceRanges = [
  { label: 'Exquisite (Under ₹100)', min: 0, max: 100 },
  { label: 'Refined (₹100 - ₹200)', min: 100, max: 200 },
  { label: 'Signature (₹200 - ₹300)', min: 200, max: 300 },
  { label: 'Elite (₹300 - ₹400)', min: 300, max: 400 },
  { label: 'Prestige (₹400 - ₹500)', min: 400, max: 500 },
  { label: 'Grand (₹500 and above)', min: 500, max: 999999 },
];

export const FilterDrawer = ({ open, onClose, onFilterChange, currentFilter }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: 380 }, 
          p: 4,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3">Selection</Typography>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="overline" sx={{ color: 'primary.main', mb: 2, display: 'block', letterSpacing: '0.1em' }}>
        Price Range
      </Typography>
      
      <List sx={{ mb: 4 }}>
        {priceRanges.map((range) => {
          const isSelected = currentFilter?.label === range.label;
          return (
            <ListItem key={range.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => {
                  onFilterChange(range);
                  onClose();
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  transition: 'all 0.3s ease',
                  border: '1px solid transparent',
                  '&.Mui-selected': {
                    backgroundColor: alpha('#4F7C82', 0.1),
                    borderColor: alpha('#4F7C82', 0.2),
                    '&:hover': {
                      backgroundColor: alpha('#4F7C82', 0.15),
                    },
                  },
                  '&:hover': {
                    backgroundColor: alpha('#000', 0.02),
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <ListItemText 
                  primary={range.label} 
                  primaryTypographyProps={{ 
                    variant: 'body1',
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? 'primary.main' : 'text.primary'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto' }}>
        {currentFilter && (
          <Button
            fullWidth
            variant="text"
            onClick={() => {
              onFilterChange(null);
              onClose();
            }}
            sx={{ 
              py: 2,
              color: 'text.secondary',
              '&:hover': { color: 'error.main', background: alpha('#f44336', 0.05) }
            }}
          >
            Reset Selection
          </Button>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{ py: 2, borderRadius: '12px', mt: 1 }}
        >
          See Results
        </Button>
      </Box>
    </Drawer>
  );
};
