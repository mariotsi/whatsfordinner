import { fetchCategories } from '@/api/mealdb';
import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    select: (data) => data.map((c) => c.strCategory),
  });
}
