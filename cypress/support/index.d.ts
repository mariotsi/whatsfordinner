/// <reference types="cypress" />

import { HistoryEntry } from '../fixtures/history-entries';

declare global {
  namespace Cypress {
    interface Chainable {
      seedHistory(entries: HistoryEntry[]): Chainable<void>;
      clearHistory(): Chainable<void>;
      interceptMealDetails(): Chainable<void>;
    }
  }
}

export {};
