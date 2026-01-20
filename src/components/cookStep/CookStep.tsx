'use client';

import Meal from '@/components/meal/meal';
import NoMoreRecommendations from './NoMoreRecommendations';
import RecommendationsError from './RecommendationsError';
import RecommendationsLoading from './RecommendationsLoading';
import { useRandomRecommendation } from '@/hooks/useRandomRecommendation';
import { Box, Button, Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useInspireRequired } from '@/app/inspire/InspireContext';
import { useHistoryContext } from '@/components/history/HistoryContext';
import { useCallback } from 'react';

export default function CookStep() {
  const { cuisine, ingredient } = useInspireRequired();
  const { addEntry } = useHistoryContext();

  const {
    reccomendedMeal,
    moveToNextRecommendation,
    isLoading,
    isError,
    hasReccomendationLeft,
  } = useRandomRecommendation(cuisine, ingredient);

  const handleDislike = useCallback(() => {
    addEntry(reccomendedMeal, 'dislike');
    moveToNextRecommendation();
  }, [addEntry, moveToNextRecommendation, reccomendedMeal]);

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
      <Meal idMeal={reccomendedMeal.idMeal} />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }} justifyContent="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<ThumbUpIcon />}
          onClick={() => addEntry(reccomendedMeal, 'like')}
        >
          I love it
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<ThumbDownIcon />}
          onClick={handleDislike}
        >
          Show me another
        </Button>
      </Stack>
    </Box>
  );
}
