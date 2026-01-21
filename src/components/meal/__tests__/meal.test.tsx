import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meal from '../meal';
import { QueryWrapperForTests } from '@/test-utils/QueryWrapperForTests';
import { createMockMeal } from '@/test-utils/mockData';
import { MealId, IngredientName } from '@/types/MealsApi';

// Mock the useMeal hook
jest.mock('@/hooks/useMeal');

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({
    src,
    alt,
    onLoad,
    onError,
    // Filter out Next.js specific props that shouldn't be passed to img
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unoptimized,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fill,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    priority,
    ...props
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    onError?: () => void;
    unoptimized?: boolean;
    fill?: boolean;
    priority?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-testid="next-image"
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
  return MockImage;
});

const mockMeal = createMockMeal({
  strMeal: 'Test Pasta',
  strCategory: 'Pasta',
  strInstructions: 'Cook the pasta. Add sauce. Serve hot.',
  strMealThumb: 'https://example.com/pasta.jpg',
  strYoutube: 'https://www.youtube.com/watch?v=abc123',
  strIngredient1: 'Pasta' as IngredientName,
  strIngredient2: 'Tomato Sauce' as IngredientName,
  strMeasure1: '200g',
  strMeasure2: '1 cup',
  strSource: 'https://example.com/recipe',
});

import { useMeal } from '@/hooks/useMeal';
const mockUseMeal = jest.mocked(useMeal);

describe('Meal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseMeal.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} />
      </QueryWrapperForTests>
    );

    expect(screen.getByText('Loading the perfect meal...')).toBeInTheDocument();
  });

  it('renders error state with message', () => {
    mockUseMeal.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Network error'),
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} />
      </QueryWrapperForTests>
    );

    expect(screen.getByText('Oops, something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('renders not found state when meal is null', () => {
    mockUseMeal.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} />
      </QueryWrapperForTests>
    );

    expect(screen.getByText('Meal not found')).toBeInTheDocument();
  });

  it('renders meal title and category', () => {
    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} />
      </QueryWrapperForTests>
    );

    expect(screen.getByText('Test Pasta')).toBeInTheDocument();
    expect(screen.getByText('Pasta • Italian')).toBeInTheDocument();
  });

  it('renders meal instructions', () => {
    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} />
      </QueryWrapperForTests>
    );

    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(
      screen.getByText('Cook the pasta. Add sauce. Serve hot.')
    ).toBeInTheDocument();
  });

  it('renders feedback buttons when enableFeedback is true', () => {
    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} enableFeedback />
      </QueryWrapperForTests>
    );

    expect(
      screen.getByText('Did it match your preference?')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /new idea/i })
    ).toBeInTheDocument();
  });

  it('calls onLike and disables buttons when Yes is clicked', async () => {
    const user = userEvent.setup();
    const onLike = jest.fn();

    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} enableFeedback onLike={onLike} />
      </QueryWrapperForTests>
    );

    await user.click(screen.getByRole('button', { name: 'Yes' }));

    expect(onLike).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Yes' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'No' })).toBeDisabled();
  });

  it('calls onDislike and disables buttons when No is clicked', async () => {
    const user = userEvent.setup();
    const onDislike = jest.fn();

    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} enableFeedback onDislike={onDislike} />
      </QueryWrapperForTests>
    );

    await user.click(screen.getByRole('button', { name: 'No' }));

    expect(onDislike).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Yes' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'No' })).toBeDisabled();
  });

  it('calls onNewIdea when New idea button is clicked', async () => {
    const user = userEvent.setup();
    const onNewIdea = jest.fn();

    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} enableFeedback onNewIdea={onNewIdea} />
      </QueryWrapperForTests>
    );

    await user.click(screen.getByRole('button', { name: /new idea/i }));

    expect(onNewIdea).toHaveBeenCalledTimes(1);
  });

  it('renders source link when available', () => {
    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} />
      </QueryWrapperForTests>
    );

    const sourceLink = screen.getByRole('link', {
      name: /view original source/i,
    });
    expect(sourceLink).toHaveAttribute('href', 'https://example.com/recipe');
  });

  it('renders YouTube video when available', () => {
    mockUseMeal.mockReturnValue({
      data: mockMeal,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useMeal>);

    render(
      <QueryWrapperForTests>
        <Meal idMeal={'12345' as MealId} />
      </QueryWrapperForTests>
    );

    const iframe = screen.getByTitle('Video tutorial for Test Pasta');
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/abc123'
    );
  });
});
