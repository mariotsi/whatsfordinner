import { mockHistoryEntries } from '../fixtures/history-entries';

describe('Mobile Navigation', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.interceptMealDetails();
    cy.seedHistory(mockHistoryEntries);
  });

  describe('Mobile history list behavior', () => {
    it('displays history list without inline meal detail on mobile', () => {
      cy.visit('/');

      cy.get('[aria-label="Recently viewed meals"]').should('be.visible');
      mockHistoryEntries.forEach((entry) => {
        cy.contains(entry.strMeal).should('be.visible');
      });
      cy.get('[data-testid="meal-detail"]').should('not.exist');
    });

    it('navigates to meal detail page when clicking a history entry', () => {
      cy.visit('/');

      cy.get('[aria-label="Recently viewed meals"]').should('be.visible');

      const firstEntry = mockHistoryEntries[0];
      const testId = `history-row-${firstEntry.idMeal}-${firstEntry.isoTimestamp}`;

      cy.get(`[data-testid="${testId}"]`).click();

      cy.url().should('include', `/meal/${firstEntry.idMeal}`);
      cy.wait('@getMealDetails');
      cy.get('[data-testid="meal-detail-header"]').should(
        'contain',
        firstEntry.strMeal
      );
    });
  });

  describe('Meal detail page on mobile', () => {
    it('displays meal details with back navigation that returns to home', () => {
      const mealId = mockHistoryEntries[0].idMeal;

      cy.visit(`/meal/${mealId}`);

      cy.wait('@getMealDetails');
      cy.get('[data-testid="meal-detail-header"]').should(
        'contain',
        mockHistoryEntries[0].strMeal
      );

      cy.contains('Back to home').click();

      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('[aria-label="Recently viewed meals"]').should('be.visible');
    });
  });
});
