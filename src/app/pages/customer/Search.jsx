import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  Badge,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Catalog } from './Catalog';
import { FilterDrawer } from './FilterDrawer';
import { useGetAllCategoryQuery } from '../../../shared';
import { StyledTextField } from '../../../shared/styled-components/StyledComponents';

export const Search = () => {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoryQuery();

  const handleSearch = () => {
    setSearchTerm(input);
    setSelectedCategory('');
    setFilters(null);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? '' : categoryName);
    setSearchTerm('');
    setInput('');
    setFilters(null);
  };

  return (
    <Box sx={{ py: 4, px: 0 }}>
      {/* Editorial Title */}
      <Typography 
        variant="h1" 
        sx={{ 
          mb: 5, 
          textAlign: 'left',
          fontSize: { xs: '3rem', md: '4.5rem' },
          opacity: 0.9
        }}
      >
        Discover <br />
        <Box component="span" sx={{ color: 'primary.main', fontStyle: 'italic' }}>Curated</Box> Excellence
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 5 }}>
        <StyledTextField
          fullWidth
          placeholder="What are you looking for today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main', ml: 1, opacity: 0.6 }} />
              </InputAdornment>
            ),
          }}
        />
        {searchTerm && (
          <Badge color="primary" variant="dot" invisible={!filters}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setIsDrawerOpen(true)}
              sx={{ 
                height: 60, 
                px: 3,
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                backdropFilter: 'blur(8px)',
                whiteSpace: 'nowrap' 
            }}
            >
              Filters
            </Button>
          </Badge>
        )}
      </Box>

      <FilterDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onFilterChange={(newFilter) => setFilters(newFilter)}
        currentFilter={filters}
      />

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          pb: 4,
          pt: 1,
          gap: 2,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Button
          variant={selectedCategory === '' ? 'contained' : 'text'}
          onClick={() => handleCategoryClick('')}
          sx={{ 
            borderRadius: '12px', 
            flexShrink: 0,
            px: 4,
            fontWeight: 600,
            transition: 'all 0.3s ease',
            ...(selectedCategory !== '' && { color: 'text.secondary' })
          }}
        >
          Explore All
        </Button>
        {!categoriesLoading &&
          categories?.map((cat) => {
            const categoryName = typeof cat === 'string' ? cat : cat.category_name;
            const categoryId = typeof cat === 'string' ? cat : cat.category_id || cat.category_name;
            const displayLabel = categoryName
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            const isActive = selectedCategory === categoryName;

            return (
              <Button
                key={categoryId}
                variant={isActive ? 'contained' : 'text'}
                onClick={() => handleCategoryClick(categoryName)}
                sx={{
                  borderRadius: '12px',
                  flexShrink: 0,
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 3,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  ...(isActive ? {
                    boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2)'
                  } : {
                    color: 'text.secondary',
                    '&:hover': { background: alpha('#4F7C82', 0.05), color: 'primary.main' }
                  })
                }}
              >
                {displayLabel}
              </Button>
            );
          })}
      </Box>

      <Catalog searchTerm={searchTerm} selectedCategory={selectedCategory} filters={filters} />
    </Box>
  );
};
