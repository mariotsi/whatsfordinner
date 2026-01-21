export interface HistoryEntry {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  isoTimestamp: string;
  vote: 'like' | 'dislike';
  inputCuisine: string;
  inputIngredient: string;
  expectedTooltip?: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export const mockHistoryEntries: HistoryEntry[] = [
  {
    idMeal: '52771',
    strMeal: 'Spaghetti Carbonara',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    isoTimestamp: '2024-01-15T12:00:00.000Z',
    vote: 'like',
    inputCuisine: 'Italian',
    inputIngredient: 'Pasta',
    expectedTooltip: 'Jan 15, 2024',
  },
  {
    idMeal: '52772',
    strMeal: 'Teriyaki Chicken',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    isoTimestamp: '2023-06-20T18:30:00.000Z',
    vote: 'dislike',
    inputCuisine: 'Japanese',
    inputIngredient: 'Chicken',
    expectedTooltip: 'Jun 20, 2023',
  },
  {
    idMeal: '527732',
    strMeal: 'Pad Thai',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
    isoTimestamp: '2022-11-05T10:15:00.000Z',
    vote: 'like',
    inputCuisine: 'Thai',
    inputIngredient: 'Noodles',
    expectedTooltip: 'Nov 5, 2022',
  },
];

export const mockMealDetails: Record<string, MealDetail> = {
  '52771': {
    idMeal: '52771',
    strMeal: 'Spaghetti Carbonara',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strInstructions: 'Cook pasta. Mix eggs with cheese. Combine.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=test1',
  },
  '52772': {
    idMeal: '52772',
    strMeal: 'Teriyaki Chicken',
    strCategory: 'Chicken',
    strArea: 'Japanese',
    strInstructions: 'Marinate chicken. Grill. Serve with rice.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=test2',
  },
  '527732': {
    idMeal: '527732',
    strMeal: 'Pad Thai',
    strCategory: 'Noodles',
    strArea: 'Thai',
    strInstructions: 'Soak noodles. Stir fry with sauce. Add toppings.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=test3',
  },
};
