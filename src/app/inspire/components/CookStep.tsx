'use client';

import { Cousine, IngredientName } from '@/types/MealsApi';
import { useRecommendations } from '@/hooks/useRecommendations';
import { Box } from '@mui/material';

export default function CookStep() {
  const {
    data: recommendedMeals = [],
    isLoading,
    isError,
  } = useRecommendations('Italian' as Cousine, 'Parsley' as IngredientName);
  return (
    <Box>
      {recommendedMeals.map((a) => (
        <p key={a.idMeal}>{a.strMeal}</p>
      ))}
    </Box>
  );
}
