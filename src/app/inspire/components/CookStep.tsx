'use client';

import Meal from '@/components/meal/meal';
import NoMoreRecommendations from '@/components/meal/NoMoreRecommendations';
import RecommendationsError from '@/components/meal/RecommendationsError';
import RecommendationsLoading from '@/components/meal/RecommendationsLoading';
import { useRandomRecommendation } from '@/hooks/useRandomRecommendation';
import { Box, Button } from '@mui/material';
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
    return <RecommendationsLoading />;
  }

  if (isError) {
    return <RecommendationsError />;
  }

  if (!hasReccomendationLeft) {
    return <NoMoreRecommendations />;
  }

  return (
    <Box>
      <Meal idMeal={reccomendedMealId} />
      <Button>I love it</Button>
      <Button onClick={moveToNextRecommendation}>I Don&apos;t like it</Button>
    </Box>
  );
}
