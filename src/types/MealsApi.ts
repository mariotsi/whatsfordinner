import { Branded } from '@/types/Common';

export type Cousine = Branded<string, 'cousine'>;
export type Category = Branded<string, 'category'>;
export type IngredientName = Branded<string, 'ingredientName'>;
export type MealId = Branded<string, 'mealId'>;

export type CousineObject = {
  strArea: Cousine;
};

export type CousinesResponse = {
  meals: CousineObject[];
};

export type CategoryObject = {
  strCategory: Category;
};

export type CategoriesResponse = {
  meals: CategoryObject[];
};

export type Ingredient = {
  idIngredient: string;
  strDescription: string | null;
  strIngredient: IngredientName;
  strThumb: string;
  strType: string | null;
};

export type IngredientsResponse = {
  meals: Ingredient[];
};

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: MealId;
};

export type MealFilterResponse = {
  meals: Meal[];
};

export type DetailedMeal = {
  idMeal: MealId;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strIngredient1: IngredientName;
  strIngredient2: IngredientName;
  strIngredient3: IngredientName;
  strIngredient4: IngredientName;
  strIngredient5: IngredientName;
  strIngredient6: IngredientName;
  strIngredient7: IngredientName;
  strIngredient8: IngredientName;
  strIngredient9: IngredientName;
  strIngredient10: IngredientName;
  strIngredient11: IngredientName;
  strIngredient12: IngredientName;
  strIngredient13: IngredientName;
  strIngredient14: IngredientName;
  strIngredient15: IngredientName;
  strIngredient16: IngredientName;
  strIngredient17: IngredientName;
  strIngredient18: IngredientName;
  strIngredient19: IngredientName;
  strIngredient20: IngredientName;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

export type DetailedMealResponse = {
  meals: DetailedMeal[];
};
