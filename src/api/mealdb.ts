import { Branded } from '@/utils/common';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export type Cousine = Branded<string, 'cousine'>;
export type Category = Branded<string, 'category'>;
export type IngredientName = Branded<string, 'ingredientName'>;
export type MealId = Branded<string, 'mealId'>;

export type CousineObject = {
  strArea: Cousine;
};

type CousinesResponse = {
  meals: CousineObject[];
};

export type CategoryObject = {
  strCategory: Category;
};

type CategoriesResponse = {
  meals: CategoryObject[];
};

export type Ingredient = {
  idIngredient: string;
  strDescription: string | null;
  strIngredient: IngredientName;
  strThumb: string;
  strType: string | null;
};

type IngredientsResponse = {
  meals: Ingredient[];
};

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: MealId;
};

type MealFilterResponse = {
  meals: Meal[];
};

export async function fetchAreas(): Promise<CousineObject[]> {
  const response = await fetch(`${BASE_URL}/list.php?a=list`);

  if (!response.ok) {
    throw new Error('Failed to fetch areas');
  }

  const data: CousinesResponse = await response.json();
  return data.meals;
}

export async function fetchCategories(): Promise<CategoryObject[]> {
  const response = await fetch(`${BASE_URL}/list.php?c=list`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data: CategoriesResponse = await response.json();
  return data.meals;
}

export async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetch(`${BASE_URL}/list.php?i=list`);

  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }

  const data: IngredientsResponse = await response.json();
  return data.meals;
}

export async function getMealsByCousine(cousine: Cousine): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/filter.php?a=${cousine}`);

  if (!response.ok) {
    throw new Error('Failed to fetch meals by cousine');
  }

  const data: MealFilterResponse = await response.json();
  return data.meals;
}

export async function getMealsByIngredient(
  ingredientName: IngredientName
): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/filter.php?i=${ingredientName}`);

  if (!response.ok) {
    throw new Error('Failed to fetch meals by ingredient');
  }

  const data: MealFilterResponse = await response.json();
  return data.meals;
}

export async function fetchRecommendations(
  cousine: Cousine,
  ingredientName: IngredientName
): Promise<Meal[]> {
  const [mealsByCousine, mealsByIngredient] = await Promise.all([
    getMealsByCousine(cousine),
    getMealsByIngredient(ingredientName),
  ]);

  const mealsIdReccomendedByIngredient = new Set(
    mealsByIngredient.map(({ idMeal }) => idMeal)
  );
  return mealsByCousine.filter(({ idMeal }) =>
    mealsIdReccomendedByIngredient.has(idMeal)
  );
}
