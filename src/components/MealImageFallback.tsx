'use client';

import { Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { FC } from 'react';

const MealImageFallback: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 3,
      textAlign: 'center',
    }}
  >
    <RestaurantIcon
      sx={{ fontSize: 64, color: 'text.disabled' }}
      aria-hidden="true"
    />
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>
      Someone must have eaten this image because we can&apos;t find it anymore
    </Typography>
  </Box>
);

export default MealImageFallback;
