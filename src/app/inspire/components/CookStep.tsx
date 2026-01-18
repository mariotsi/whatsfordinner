'use client';

import Meal from '@/components/meal/meal';
import { useRandomRecommendation } from '@/hooks/useRandomRecommendation';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from '@mui/material';
import { useInspireRequired } from '../InspireContext';

export default function CookStep() {
  const { cuisine, ingredient } = useInspireRequired();

  const {
    reccomendedMealId,
    moveToNextRecommendation,
    isLoading,
    isError,
    hasReccomendationLeft,
  } = useRandomRecommendation(cuisine, ingredient);

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
