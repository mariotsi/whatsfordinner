import { fetchIngredients } from '@/api/mealdb';
import { useQuery } from '@tanstack/react-query';

export function useIngredients() {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  });
}
