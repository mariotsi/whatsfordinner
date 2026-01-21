import { renderHook, waitFor } from '@testing-library/react';
import { useCategories } from '../useCategories';
import { QueryWrapperForTests } from '@/test-utils/QueryWrapperForTests';
import * as mealdbApi from '@/api/mealdb';
import { Category, CategoryObject } from '@/types/MealsApi';

jest.mock('@/api/mealdb');

const mockFetchCategories = jest.mocked(mealdbApi.fetchCategories);

describe('useCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and transforms category data', async () => {
    const mockCategories: CategoryObject[] = [
      { strCategory: 'Beef' as Category },
      { strCategory: 'Chicken' as Category },
      { strCategory: 'Dessert' as Category },
    ];
    mockFetchCategories.mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories(), {
      wrapper: QueryWrapperForTests,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(['Beef', 'Chicken', 'Dessert']);
    expect(mockFetchCategories).toHaveBeenCalledTimes(1);
  });

  it('handles error when API call fails', async () => {
    mockFetchCategories.mockRejectedValue(
      new Error('Failed to fetch categories')
    );

    const { result } = renderHook(() => useCategories(), {
      wrapper: QueryWrapperForTests,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Failed to fetch categories');
  });
});
