'use client';

import { Cousine, IngredientName } from '@/types/MealsApi';
import { useRecommendations } from '@/hooks/useRecommendations';
import {
  Box,
  Skeleton,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import Meal from '@/components/meal/meal';

export default function CookStep() {
  const {
    data: recommendedMeals = [],
    isLoading,
    isError,
  } = useRecommendations('Italian' as Cousine, 'Parsley' as IngredientName);

  if (isLoading) {
    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Loading meal recommendations...</Typography>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Box>
    );
  }

  if (isError || recommendedMeals.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load meal recommendations or no meals found
        </Alert>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Box>
    );
  }

  return (
    <Box>
      <Meal idMeal={recommendedMeals[0].idMeal} />
    </Box>
  );
}
