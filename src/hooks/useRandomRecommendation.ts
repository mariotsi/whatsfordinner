import { Cousine, IngredientName, MealId } from '@/types/MealsApi';
import { useCallback, useMemo, useState } from 'react';
import { useRecommendations } from './useRecommendations';

export function useRandomRecommendation(
  cousine: Cousine,
  ingredientName: IngredientName
) {
  const {
    data: recommendedMeals = new Set(),
    isLoading,
    isError,
  } = useRecommendations(cousine, ingredientName);
  const [discardedMeals, setDiscardedMeal] = useState<MealId[]>([]);
  const availableReccomandations = useMemo(
    () => [...recommendedMeals.difference(new Set(discardedMeals))],
    [discardedMeals, recommendedMeals]
  );
  const reccomendedMealId = useMemo(
    () =>
      availableReccomandations[
        Math.floor(Math.random() * availableReccomandations.length)
      ],
    [availableReccomandations]
  );

  const moveToNextRecommendation = useCallback(
    () =>
      setDiscardedMeal((previouslyDiscardedMeals) => [
        ...previouslyDiscardedMeals,
        reccomendedMealId,
      ]),
    [reccomendedMealId]
  );
  return {
    isLoading,
    isError,
    reccomendedMealId,
    moveToNextRecommendation,
    hasReccomendationLeft: !!availableReccomandations.length,
  };
}
