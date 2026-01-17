import { Branded } from '@/utils/common';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export type Area = Branded<string, 'area'>;
export type Category = Branded<string, 'category'>;
export type Ingredient = Branded<string, 'ingredient'>;

export interface AreaObject {
  strArea: Area;
}

interface AreasResponse {
  meals: AreaObject[];
}

export interface CategoryObject {
  strCategory: Category;
}

interface CategoriesResponse {
  meals: CategoryObject[];
}

export interface IngredientObject {
  strIngredient: Ingredient;
}

interface IngredientsResponse {
  meals: IngredientObject[];
}

export async function fetchAreas(): Promise<AreaObject[]> {
  const response = await fetch(`${BASE_URL}/list.php?a=list`);

  if (!response.ok) {
    throw new Error('Failed to fetch areas');
  }

  const data: AreasResponse = await response.json();
  return data.meals;
}

export async function fetchCategories(): Promise<CategoryObject[]> {
  const response = await fetch(`${BASE_URL}/list.php?c=list`);

  if (!response.ok) {
    throw new Error('Failed to fetch areas');
  }

  const data: CategoriesResponse = await response.json();
  return data.meals;
}

export async function fetchIngredients(): Promise<IngredientObject[]> {
  const response = await fetch(`${BASE_URL}/list.php?I=list`);

  if (!response.ok) {
    throw new Error('Failed to fetch areas');
  }

  const data: IngredientsResponse = await response.json();
  return data.meals;
}
