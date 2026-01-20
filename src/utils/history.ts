import { HistoryEntry } from '@/types/History';

const HISTORY_KEY = 'meals_history';

/**
 * Retrieves meal history from localStorage.
 *
 * This works for limited data in set i.e. we expire history after X days.
 * If it can grow indefinitely the JSON parse may freeze the browser and we'll need to handle it differently.
 * However since localStorage is limited in space by nature and this is just an example integration.
 * The solution to handle indefinitely large data would be to send it to a WebWorker for parsing in another thread.
 *
 * Uses requestIdleCallback to defer parsing to browser idle time.
 *
 * @returns Promise resolving to array of history entries
 */
export const getHistory = (): Promise<HistoryEntry[]> => {
  return new Promise((resolve) => {
    const parse = () => {
      try {
        const data = localStorage.getItem(HISTORY_KEY);
        if (!data) {
          resolve([]);
          return;
        }
        resolve(JSON.parse(data) as HistoryEntry[]);
      } catch {
        // Most probably the history got corrupted, remove the data and start fresh
        localStorage.removeItem(HISTORY_KEY);
        resolve([]);
      }
    };
    requestIdleCallback(parse);
  });
};

/**
 * Saves history entries to localStorage.
 */
export const saveHistory = (entries: HistoryEntry[]): void => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
};

/**
 * Clears all history from localStorage.
 */
export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};
