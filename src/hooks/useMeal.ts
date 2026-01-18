import { fetchMealDetails } from '@/api/mealdb';
import { MealId } from '@/types/MealsApi';
import { useQuery } from '@tanstack/react-query';

export function useMeal(idMeal: MealId) {
  return useQuery({
    queryKey: ['meal', idMeal],
    queryFn: () => fetchMealDetails(idMeal),
  });
}
