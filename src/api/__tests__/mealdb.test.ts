import {
  fetchAreas,
  fetchCategories,
  fetchIngredients,
  getMealsByCousine,
  getMealsByIngredient,
  fetchRecommendations,
  fetchMealDetails,
} from '../mealdb';
import { Cousine, IngredientName, MealId } from '@/types/MealsApi';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('mealdb API', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('fetchAreas', () => {
    it('returns areas on successful response', async () => {
      const mockAreas = [{ strArea: 'Italian' }, { strArea: 'Mexican' }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: mockAreas }),
      });

      const result = await fetchAreas();

      expect(result).toEqual(mockAreas);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
      );
    });

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchAreas()).rejects.toThrow('Failed to fetch areas');
    });
  });

  describe('fetchCategories', () => {
    it('returns categories on successful response', async () => {
      const mockCategories = [
        { strCategory: 'Beef' },
        { strCategory: 'Chicken' },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: mockCategories }),
      });

      const result = await fetchCategories();

      expect(result).toEqual(mockCategories);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      );
    });

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchCategories()).rejects.toThrow(
        'Failed to fetch categories'
      );
    });
  });

  describe('fetchIngredients', () => {
    it('returns ingredients on successful response', async () => {
      const mockIngredients = [
        {
          idIngredient: '1',
          strIngredient: 'Chicken',
          strDescription: 'Poultry',
          strThumb: '',
          strType: null,
        },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: mockIngredients }),
      });

      const result = await fetchIngredients();

      expect(result).toEqual(mockIngredients);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
      );
    });

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchIngredients()).rejects.toThrow(
        'Failed to fetch ingredients'
      );
    });
  });

  describe('getMealsByCousine', () => {
    it('returns meals for a cuisine', async () => {
      const mockMeals = [
        { idMeal: '1', strMeal: 'Pizza', strMealThumb: 'thumb.jpg' },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: mockMeals }),
      });

      const result = await getMealsByCousine('Italian' as Cousine);

      expect(result).toEqual(mockMeals);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian'
      );
    });

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(getMealsByCousine('Italian' as Cousine)).rejects.toThrow(
        'Failed to fetch meals by cousine'
      );
    });
  });

  describe('getMealsByIngredient', () => {
    it('returns meals for an ingredient', async () => {
      const mockMeals = [
        { idMeal: '1', strMeal: 'Chicken Curry', strMealThumb: 'thumb.jpg' },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: mockMeals }),
      });

      const result = await getMealsByIngredient('Chicken' as IngredientName);

      expect(result).toEqual(mockMeals);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken'
      );
    });

    it('throws error on failed response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(
        getMealsByIngredient('Chicken' as IngredientName)
      ).rejects.toThrow('Failed to fetch meals by ingredient');
    });
  });

  describe('fetchRecommendations', () => {
    it('returns meals that match both cuisine and ingredient', async () => {
      const cuisineMeals = [
        { idMeal: '1', strMeal: 'Pasta', strMealThumb: 'thumb1.jpg' },
        { idMeal: '2', strMeal: 'Pizza', strMealThumb: 'thumb2.jpg' },
      ];
      const ingredientMeals = [
        { idMeal: '1', strMeal: 'Pasta', strMealThumb: 'thumb1.jpg' },
        { idMeal: '3', strMeal: 'Salad', strMealThumb: 'thumb3.jpg' },
      ];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ meals: cuisineMeals }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ meals: ingredientMeals }),
        });

      const result = await fetchRecommendations(
        'Italian' as Cousine,
        'Tomato' as IngredientName
      );

      // Should only return meal with id '1' (intersection)
      expect(result).toEqual([cuisineMeals[0]]);
    });

    it('returns empty array when no meals match both criteria', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            meals: [
              { idMeal: '1', strMeal: 'Pasta', strMealThumb: 'thumb.jpg' },
            ],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            meals: [
              { idMeal: '2', strMeal: 'Curry', strMealThumb: 'thumb.jpg' },
            ],
          }),
        });

      const result = await fetchRecommendations(
        'Italian' as Cousine,
        'Chicken' as IngredientName
      );

      expect(result).toEqual([]);
    });
  });

  describe('fetchMealDetails', () => {
    it('returns meal details on successful response', async () => {
      const mockMeal = {
        idMeal: '12345',
        strMeal: 'Test Meal',
        strCategory: 'Test',
        strArea: 'Italian',
        strInstructions: 'Cook it',
        strMealThumb: 'thumb.jpg',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: [mockMeal] }),
      });

      const result = await fetchMealDetails('12345' as MealId);

      expect(result).toEqual(mockMeal);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=12345'
      );
    });

    describe('error handling', () => {
      it('throws error on network failure', async () => {
        mockFetch.mockResolvedValueOnce({ ok: false });

        await expect(fetchMealDetails('12345' as MealId)).rejects.toThrow(
          'Failed to fetch the detailed meal, network error'
        );
      });

      it('throws error when meals array is null', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ meals: null }),
        });

        await expect(fetchMealDetails('12345' as MealId)).rejects.toThrow(
          'Failed to fetch the detailed meal, empty response'
        );
      });

      it('throws error when meals array is empty', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ meals: [] }),
        });

        await expect(fetchMealDetails('12345' as MealId)).rejects.toThrow(
          'Failed to fetch the detailed meal, empty response'
        );
      });
    });
  });
});
