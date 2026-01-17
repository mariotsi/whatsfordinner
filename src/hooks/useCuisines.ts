import { useQuery } from '@tanstack/react-query';
import { fetchAreas } from '@/api/mealdb';

export function useCuisines() {
  return useQuery({
    queryKey: ['cuisines'],
    queryFn: fetchAreas,
    select: (data) => data.map((c) => c.strArea),
  });
}
