import { getIngredients } from '../meal';
import { IngredientName } from '@/types/MealsApi';
import { createMockMeal } from '@/test-utils/mockData';

describe('meal utilities', () => {
  describe('getIngredients', () => {
    it('returns empty array for meal with no ingredients', () => {
      const meal = createMockMeal();
      const result = getIngredients(meal);
      expect(result).toEqual([]);
    });

    it('extracts ingredients with measures', () => {
      const meal = createMockMeal({
        strIngredient1: 'Chicken' as IngredientName,
        strMeasure1: '500g',
        strIngredient2: 'Garlic' as IngredientName,
        strMeasure2: '3 cloves',
      });

      const result = getIngredients(meal);

      expect(result).toEqual([
        { ingredient: 'Chicken', measure: '500g' },
        { ingredient: 'Garlic', measure: '3 cloves' },
      ]);
    });

    it('trims whitespace from ingredients and measures', () => {
      const meal = createMockMeal({
        strIngredient1: '  Chicken  ' as IngredientName,
        strMeasure1: '  500g  ',
      });

      const result = getIngredients(meal);

      expect(result).toEqual([{ ingredient: 'Chicken', measure: '500g' }]);
    });

    it('skips empty string ingredients', () => {
      const meal = createMockMeal({
        strIngredient1: 'Chicken' as IngredientName,
        strMeasure1: '500g',
        strIngredient2: '' as IngredientName,
        strMeasure2: '100g',
        strIngredient3: 'Garlic' as IngredientName,
        strMeasure3: '2 cloves',
      });

      const result = getIngredients(meal);

      expect(result).toHaveLength(2);
      expect(result[0].ingredient).toBe('Chicken');
      expect(result[1].ingredient).toBe('Garlic');
    });

    it('handles missing measure gracefully', () => {
      const meal = createMockMeal({
        strIngredient1: 'Salt' as IngredientName,
      });

      const result = getIngredients(meal);

      expect(result).toEqual([{ ingredient: 'Salt', measure: '' }]);
    });

    it('skips whitespace-only ingredients', () => {
      const meal = createMockMeal({
        strIngredient1: '   ' as IngredientName,
        strMeasure1: '500g',
      });

      const result = getIngredients(meal);

      expect(result).toEqual([]);
    });
  });
});
