describe('Inspire Flow', () => {
  beforeEach(() => {
    cy.clearHistory();
  });

  it('completes the full inspire flow: cuisine → ingredient → cook with feedback', () => {
    cy.visit('/inspire/cuisines');

    cy.get('input[role="combobox"]').should('be.visible');
    cy.contains('label', 'What cuisine do you fancy?').should('be.visible');
    cy.contains('button', 'Next').should('be.disabled');

    cy.get('input[role="combobox"]').type('Italian');
    cy.contains('[role="option"]', 'Italian').click();
    cy.contains('button', 'Next').should('not.be.disabled').click();

    cy.url().should('include', '/inspire/ingredients');
    cy.get('input[role="combobox"]').should('be.visible');
    cy.contains('label', "What's the main ingredient").should('be.visible');
    cy.contains('button', 'Next').should('be.disabled');

    cy.get('input[role="combobox"]').type('Garlic');
    cy.contains('[role="option"]', 'Garlic').click();
    cy.contains('button', 'Next').should('not.be.disabled').click();

    cy.url().should('include', '/inspire/cook');
    cy.get('[class*="MuiCard-root"]').should('be.visible');
    cy.get('[class*="MuiCardHeader-title"]').should('be.visible');

    cy.contains('button', 'Yes').click();
    cy.window().then((win) => {
      const history = JSON.parse(
        win.localStorage.getItem('meals_history') || '[]'
      );
      expect(history).to.have.length(1);
      expect(history[0].vote).to.equal('like');
    });

    cy.contains('button', 'New idea').click();
    cy.get('[class*="MuiCard-root"]').should('be.visible');
    cy.contains('button', 'No').click();
    cy.window().then((win) => {
      const history = JSON.parse(
        win.localStorage.getItem('meals_history') || '[]'
      );
      expect(history).to.have.length(2);
      expect(history[0].vote).to.equal('dislike');
    });
  });

  it('shows "we are out of ideas" state when all recommendations are viewed', () => {
    cy.visit('/inspire/cuisines');

    cy.get('input[role="combobox"]').type('Italian');
    cy.contains('[role="option"]', 'Italian').click();
    cy.contains('button', 'Next').should('not.be.disabled').click();

    cy.get('input[role="combobox"]').type('Garlic');
    cy.contains('[role="option"]', 'Garlic').click();
    cy.contains('button', 'Next').should('not.be.disabled').click();

    cy.url().should('include', '/inspire/cook');

    const clickUntilExhausted = () => {
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("New idea")').length > 0) {
          cy.contains('button', 'New idea').click();
          cy.wait(500);
          clickUntilExhausted();
        }
      });
    };

    clickUntilExhausted();
    cy.contains("Oh no, we've run out of ideas!").should('be.visible');
  });
});
