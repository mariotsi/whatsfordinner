import { HistoryEntry, mockMealDetails } from '../fixtures/history-entries';

const HISTORY_KEY = 'meals_history';
const MEALDB_API_BASE = 'https://www.themealdb.com/api/json/v1/1';

Cypress.Commands.add('seedHistory', (entries: HistoryEntry[]) => {
  cy.window().then((win) => {
    win.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  });
});

Cypress.Commands.add('clearHistory', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem(HISTORY_KEY);
  });
});

Cypress.Commands.add('interceptMealDetails', () => {
  cy.intercept('GET', `${MEALDB_API_BASE}/lookup.php*`, (req) => {
    const url = new URL(req.url);
    const mealId = url.searchParams.get('i');
    const meal = mealId ? mockMealDetails[mealId] : null;
    req.reply({ meals: meal ? [meal] : null });
  }).as('getMealDetails');
});
