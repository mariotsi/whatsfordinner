import { getHistory, saveHistory, clearHistory } from '../history';
import { HistoryEntry } from '@/types/History';
import { Cousine, IngredientName, MealId } from '@/types/MealsApi';

describe('history utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const createMockEntry = (
    id: string,
    vote: 'like' | 'dislike'
  ): HistoryEntry => ({
    idMeal: id as MealId,
    strMeal: `Test Meal ${id}`,
    strMealThumb: `https://example.com/meal${id}.jpg`,
    isoTimestamp: new Date().toISOString(),
    vote,
    inputCuisine: 'Italian' as Cousine,
    inputIngredient: 'Chicken' as IngredientName,
  });

  describe('saveHistory', () => {
    it('saves history entries to localStorage', () => {
      const entries = [createMockEntry('1', 'like')];
      saveHistory(entries);

      const stored = localStorage.getItem('meals_history');
      expect(stored).not.toBeNull();
      expect(JSON.parse(stored!)).toEqual(entries);
    });

    it('saves empty array', () => {
      saveHistory([]);

      const stored = localStorage.getItem('meals_history');
      expect(JSON.parse(stored!)).toEqual([]);
    });
  });

  describe('getHistory', () => {
    it('returns empty array when no history exists', async () => {
      const result = await getHistory();
      expect(result).toEqual([]);
    });

    it('retrieves saved history entries', async () => {
      const entries = [
        createMockEntry('1', 'like'),
        createMockEntry('2', 'dislike'),
      ];
      localStorage.setItem('meals_history', JSON.stringify(entries));

      const result = await getHistory();
      expect(result).toEqual(entries);
    });

    it('returns empty array and clears corrupted data', async () => {
      localStorage.setItem('meals_history', 'invalid json{');

      const result = await getHistory();
      expect(result).toEqual([]);
      expect(localStorage.getItem('meals_history')).toBeNull();
    });
  });

  describe('clearHistory', () => {
    it('removes history from localStorage', () => {
      const entries = [createMockEntry('1', 'like')];
      localStorage.setItem('meals_history', JSON.stringify(entries));

      clearHistory();

      expect(localStorage.getItem('meals_history')).toBeNull();
    });
  });
});
