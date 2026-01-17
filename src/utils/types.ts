import { IngredientName } from '@/api/mealdb';

export type RecommendationsQueryKey = readonly [
  'recommendations',
  { cousine: string; ingredientName: IngredientName },
];
