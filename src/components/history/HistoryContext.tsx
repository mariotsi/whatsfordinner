'use client';

import { HistoryEntry } from '@/types/History';
import { Cousine, IngredientName, Meal } from '@/types/MealsApi';
import {
  getHistory,
  saveHistory,
  clearHistory as clearHistoryStorage,
} from '@/utils/history';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

interface HistoryContextValue {
  history: HistoryEntry[];
  isLoading: boolean;
  selectedEntry: HistoryEntry | null;
  selectEntry: (entry: HistoryEntry | null) => void;
  addEntry: (
    meal: Meal,
    vote: 'like' | 'dislike',
    inputCuisine: Cousine,
    inputIngredient: IngredientName
  ) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  const selectEntry = useCallback((entry: HistoryEntry | null) => {
    setSelectedEntry(entry);
  }, []);

  const addEntry = useCallback(
    (
      meal: Meal,
      vote: HistoryEntry['vote'],
      inputCuisine: Cousine,
      inputIngredient: IngredientName
    ) => {
      const entry: HistoryEntry = {
        ...meal,
        isoTimestamp: new Date().toISOString(),
        vote,
        inputCuisine,
        inputIngredient,
      };

      setHistory((prev) => {
        const updated = [entry, ...prev];
        saveHistory(updated);
        return updated;
      });
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    setSelectedEntry(null);
    clearHistoryStorage();
  }, []);

  useEffect(() => {
    getHistory().then((data) => {
      setHistory(data);
      setSelectedEntry(data[0] ?? null);
      setIsLoading(false);
    });
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history,
        isLoading,
        selectedEntry,
        selectEntry,
        addEntry,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext must be used within HistoryProvider');
  }
  return context;
};
