describe('register page', () => {
  before(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Hydration failed')) {
        return false; 
      }
    });
  });

  it('should show validation errors when leaving all fields blank', () => {
    cy.visit('http://localhost:3000'); 
    cy.get('form').should('be.visible'); 

    cy.get('[data-cy="submit"]').click();

 cy.get('[data-cy="error-username"]', { timeout: 8000 }).should('be.visible');

 cy.get('[data-cy="error-password"]', { timeout: 8000 }).should('be.visible');
  });

  it('should redirect the user to a success page when filling the forms and clicking submit', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="username"]').type('demi@gmail.com');
    cy.get('[data-cy="password"]').type('clockwise');

    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/QA-task\/login/);
 
  });
});
