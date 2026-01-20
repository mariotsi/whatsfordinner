import { DetailedMeal, IngredientName } from '@/types/MealsApi';

export type IngredientPair = {
  ingredient: IngredientName;
  measure: string;
};

const MAX_INGREDIENTS = 20;

export function getIngredients(meal: DetailedMeal): IngredientPair[] {
  const results: IngredientPair[] = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i++) {
    const ingredientKey = `strIngredient${i}` as keyof DetailedMeal;
    const measureKey = `strMeasure${i}` as keyof DetailedMeal;

    const rawIngredient = meal[ingredientKey];
    const rawMeasure = meal[measureKey];

    // Data is a bit brittle, many ingredients are empty string
    const trimmedRawIngredient = rawIngredient?.trim();
    if (!!trimmedRawIngredient) {
      results.push({
        ingredient: trimmedRawIngredient as IngredientName,
        measure: rawMeasure ? rawMeasure.trim() : '',
      });
    }
  }

  return results;
}
