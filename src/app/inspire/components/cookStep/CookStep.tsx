'use client';

import Meal from '@/components/meal/meal';
import NoMoreRecommendations from './NoMoreRecommendations';
import RecommendationsError from './RecommendationsError';
import RecommendationsLoading from './RecommendationsLoading';
import { useRandomRecommendation } from '@/hooks/useRandomRecommendation';
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

  const handleLike = useCallback(() => {
    addEntry(reccomendedMeal, 'like');
  }, [addEntry, reccomendedMeal]);

  const handleDislike = useCallback(() => {
    addEntry(reccomendedMeal, 'dislike');
  }, [addEntry, reccomendedMeal]);

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
    <Meal
      idMeal={reccomendedMeal.idMeal}
      enableFeedback
      onLike={handleLike}
      onDislike={handleDislike}
      onNewIdea={moveToNextRecommendation}
    />
  );
}
