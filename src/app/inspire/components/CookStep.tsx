'use client';

import Meal from '@/components/meal/meal';
import { useRandomRecommendation } from '@/hooks/useRandomRecommendation';
import { Cousine, IngredientName } from '@/types/MealsApi';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from '@mui/material';

export default function CookStep() {
  const {
    reccomendedMealId,
    moveToNextRecommendation,
    isLoading,
    isError,
    hasReccomendationLeft,
  } = useRandomRecommendation(
    'Italian' as Cousine,
    'Parsley' as IngredientName
  );

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

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load meal recommendations or no meals found
        </Alert>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Box>
    );
  }
  if (!hasReccomendationLeft) {
    return (
      <p>No more options for this combination of cousine and ingrediends :( </p>
    );
  }

  return (
    <Box>
      <Meal idMeal={reccomendedMealId} />
      <Button>I love it</Button>
      <Button onClick={moveToNextRecommendation}>I Don&apos;t like it</Button>
    </Box>
  );
}
