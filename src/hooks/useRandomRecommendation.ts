import { Cousine, IngredientName, MealId } from '@/types/MealsApi';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useRecommendations } from './useRecommendations';

export function useRandomRecommendation(
  cousine: Cousine,
  ingredientName: IngredientName
) {
  const {
    data: recommendedMeals = [],
    isLoading,
    isError,
  } = useRecommendations(cousine, ingredientName);

  const [discardedMealIds, setDiscardedMealId] = useState<MealId[]>([]);
  // eslint-disable-next-line react-hooks/purity -- Safe: useRef returns a stable object after the first render
  const randomIndexRef = useRef(Math.random());

  const availableReccomandations = useMemo(
    () =>
      recommendedMeals.filter(
        ({ idMeal }) => !discardedMealIds.includes(idMeal)
      ),
    [discardedMealIds, recommendedMeals]
  );

  const reccomendedMeal = useMemo(
    () =>
      availableReccomandations[
        Math.floor(randomIndexRef.current * availableReccomandations.length)
      ],
    [availableReccomandations]
  );

  const moveToNextRecommendation = useCallback(() => {
    randomIndexRef.current = Math.random();
    setDiscardedMealId((previouslyDiscardedMealIds) => [
      ...previouslyDiscardedMealIds,
      reccomendedMeal?.idMeal,
    ]);
  }, [reccomendedMeal]);

  return {
    isLoading,
    isError,
    reccomendedMeal,
    moveToNextRecommendation,
    hasReccomendationLeft: !!availableReccomandations.length,
  };
}
