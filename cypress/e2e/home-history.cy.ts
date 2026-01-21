import { mockHistoryEntries } from '../fixtures/history-entries';

describe('Home Page with History', () => {
  beforeEach(() => {
    cy.interceptMealDetails();
    cy.seedHistory(mockHistoryEntries);
    cy.visit('/');
  });

  describe('History list display', () => {
    it('displays all history entries with meal name, cuisine, ingredient, timestamp, and vote icon', () => {
      cy.get('[aria-label="Recently viewed meals"]').should('be.visible');

      mockHistoryEntries.forEach((entry) => {
        const testId = `history-row-${entry.idMeal}-${entry.isoTimestamp}`;

        cy.get(`[data-testid="${testId}"]`).within(() => {
          cy.contains(entry.strMeal).should('be.visible');
          cy.contains(entry.inputCuisine).should('be.visible');
          cy.contains(entry.inputIngredient.toLowerCase()).should('be.visible');

          const voteLabel = entry.vote === 'like' ? 'Liked' : 'Disliked';
          cy.get(`[aria-label="${voteLabel}"]`).should('exist');
          cy.contains('span', 'ago').should('exist');
        });

        cy.get(`[data-testid="${testId}"]`)
          .contains('span', 'ago')
          .as('relativeTime')
          .trigger('mouseover');
        cy.get('[role="tooltip"]')
          .should('be.visible')
          .and('contain', entry.expectedTooltip);
        cy.get('@relativeTime').trigger('mouseout');
      });
    });
  });

  describe('History entry selection on desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('shows first entry detail by default and updates when clicking another entry', () => {
      const thirdEntryTestId = `history-row-${mockHistoryEntries[2].idMeal}-${mockHistoryEntries[2].isoTimestamp}`;

      cy.wait('@getMealDetails');
      cy.get('[data-testid="meal-detail-header"]').should(
        'contain',
        mockHistoryEntries[0].strMeal
      );

      cy.get(`[data-testid="${thirdEntryTestId}"]`).click();

      cy.wait('@getMealDetails');
      cy.get('[data-testid="meal-detail-header"]').should(
        'contain',
        mockHistoryEntries[2].strMeal
      );
    });
  });
});
