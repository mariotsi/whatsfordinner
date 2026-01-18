'use client';

import { Cousine, IngredientName } from '@/types/MealsApi';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

type InspireState = {
  cuisine: Cousine | null;
  ingredient: IngredientName | null;
};

interface InspireContextValue extends InspireState {
  setCuisine: (cuisine: Cousine | null) => void;
  setIngredient: (ingredient: IngredientName | null) => void;
  reset: () => void;
}

const InspireContext = createContext<InspireContextValue | null>(null);

const initialState: InspireState = {
  cuisine: null,
  ingredient: null,
};

export function InspireProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InspireState>(initialState);

  const setCuisine = useCallback(
    (cuisine: Cousine | null) => setState((prev) => ({ ...prev, cuisine })),
    []
  );

  const setIngredient = useCallback(
    (ingredient: IngredientName | null) =>
      setState((prev) => ({ ...prev, ingredient })),
    []
  );

  const reset = useCallback(() => setState(initialState), []);

  return (
    <InspireContext.Provider
      value={{ ...state, setCuisine, setIngredient, reset }}
    >
      {children}
    </InspireContext.Provider>
  );
}

export function useInspire() {
  const context = useContext(InspireContext);
  if (!context) {
    throw new Error('useInspire must be used within InspireProvider');
  }
  return context;
}

// Needed to typenarrow the cousing and ingredient in the cook step.
// Due to che validation in the page.tsx it should never throw from the CookStep
export function useInspireRequired(): {
  cuisine: Cousine;
  ingredient: IngredientName;
} {
  const { cuisine, ingredient } = useInspire();
  if (!cuisine || !ingredient) {
    throw new Error(
      'useInspireRequired requires both cuisine and ingredient to be set'
    );
  }
  return { cuisine, ingredient };
}
