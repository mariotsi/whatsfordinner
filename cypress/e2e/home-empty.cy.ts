describe('Home Page Empty State', () => {
  beforeEach(() => {
    cy.clearHistory();
  });

  it('displays empty state and navigates to inspire flow', () => {
    cy.visit('/');

    cy.contains('Feeling hungry?').should('be.visible');
    cy.contains('button', 'Get Inspired').click();
    cy.url().should('include', '/inspire/cuisines');
  });
});
