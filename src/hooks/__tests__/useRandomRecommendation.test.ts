import { renderHook, waitFor, act } from '@testing-library/react';
import { useRandomRecommendation } from '../useRandomRecommendation';
import { QueryWrapperForTests } from '@/test-utils/QueryWrapperForTests';
import * as mealdbApi from '@/api/mealdb';
import { Meal, Cousine, IngredientName, MealId } from '@/types/MealsApi';

jest.mock('@/api/mealdb');

const mockFetchRecommendations = jest.mocked(mealdbApi.fetchRecommendations);

const mockCuisine = 'Italian' as Cousine;
const mockIngredient = 'Chicken' as IngredientName;

const mockMeals: Meal[] = [
  { idMeal: '1' as MealId, strMeal: 'Meal One', strMealThumb: 'thumb1.jpg' },
  { idMeal: '2' as MealId, strMeal: 'Meal Two', strMealThumb: 'thumb2.jpg' },
  { idMeal: '3' as MealId, strMeal: 'Meal Three', strMealThumb: 'thumb3.jpg' },
];

const renderUseRandomRecommendation = () =>
  renderHook(() => useRandomRecommendation(mockCuisine, mockIngredient), {
    wrapper: QueryWrapperForTests,
  });

describe('useRandomRecommendation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches recommendations and returns a random meal', async () => {
    mockFetchRecommendations.mockResolvedValue(mockMeals);

    const { result } = renderUseRandomRecommendation();

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.reccomendedMeal).toBeDefined();
    expect(mockMeals.map((m) => m.idMeal)).toContain(
      result.current.reccomendedMeal?.idMeal
    );
    expect(result.current.hasReccomendationLeft).toBe(true);
  });

  it('gives new recommendation until they are all seen', async () => {
    mockFetchRecommendations.mockResolvedValue(mockMeals);

    const { result } = renderUseRandomRecommendation();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const seenIds = new Set<string>();
    const firstMealId = result.current.reccomendedMeal?.idMeal;
    expect(firstMealId).toBeDefined();
    seenIds.add(firstMealId!);

    // Move to second recommendation
    act(() => {
      result.current.moveToNextRecommendation();
    });

    const secondMealId = result.current.reccomendedMeal?.idMeal;
    expect(secondMealId).toBeDefined();
    expect(seenIds.has(secondMealId!)).toBe(false);
    seenIds.add(secondMealId!);
    expect(result.current.hasReccomendationLeft).toBe(true);

    // Move to third recommendation
    act(() => {
      result.current.moveToNextRecommendation();
    });

    const thirdMealId = result.current.reccomendedMeal?.idMeal;
    expect(thirdMealId).toBeDefined();
    expect(seenIds.has(thirdMealId!)).toBe(false);
    seenIds.add(thirdMealId!);
    expect(result.current.hasReccomendationLeft).toBe(true);

    // Discard the last one. Should have no more recommendations
    act(() => {
      result.current.moveToNextRecommendation();
    });

    expect(result.current.hasReccomendationLeft).toBe(false);
    expect(result.current.reccomendedMeal).toBeUndefined();

    // Calling moveToNextRecommendation again has no effect
    act(() => {
      result.current.moveToNextRecommendation();
    });

    expect(result.current.hasReccomendationLeft).toBe(false);
    expect(result.current.reccomendedMeal).toBeUndefined();
  });

  it('handles error when API call fails', async () => {
    mockFetchRecommendations.mockRejectedValue(
      new Error('Failed to fetch recommendations')
    );

    const { result } = renderUseRandomRecommendation();

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.reccomendedMeal).toBeUndefined();
    expect(result.current.hasReccomendationLeft).toBe(false);
  });
});
