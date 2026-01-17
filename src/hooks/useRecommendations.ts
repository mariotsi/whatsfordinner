import {
  Cousine,
  fetchIngredients,
  fetchRecommendations,
  IngredientName,
} from '@/api/mealdb';
import { useQuery } from '@tanstack/react-query';

export function useRecommendations(
  cousine: Cousine,
  ingredientName: IngredientName
) {
  return useQuery({
    queryKey: ['recommendations', { cousine, ingredientName }],
    queryFn: () => fetchRecommendations(cousine, ingredientName),
  });
}
