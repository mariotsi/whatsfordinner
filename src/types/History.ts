import { Cousine, IngredientName, Meal } from './MealsApi';

export interface HistoryEntry extends Meal {
  isoTimestamp: string;
  vote: 'like' | 'dislike';
  inputCuisine: Cousine;
  inputIngredient: IngredientName;
}
