describe('Item Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/QA-task/login/');
      cy.get('[data-cy="username"]').type('demi@gmail.com');
      cy.get('[data-cy="password"]').type('clockwise');
      cy.get('[data-cy="submit"]').click();
      cy.get('[data-cy="item-page-element"]', { timeout: 10000 }).should('be.visible');
      cy.url().should('match', /\/QA-task\/item/);
    });
  
    it('should display a loading state and then render items after data loads', () => {
      cy.visit('http://localhost:3000/QA-task/item');
      cy.url().should('match', /\/QA-task\/item\/?$/);
      cy.get('[data-cy="loading-indicator"]').should('be.visible');
      cy.get('[data-cy="loading-indicator"]').should('not.exist');
      cy.get('[data-cy="item"]').should('have.length', 1);
      cy.get('[data-cy="item-name"]').first().should('exist');
      cy.get('[data-cy="item-description"]').first().should('exist');
    });
  
    it('should successfully update an item', () => {
      cy.get('[data-cy="update"]').click();
      cy.get('div').contains('Update Item').should('exist');
      cy.get('[data-cy="name"]').type('New Item');
      cy.get('[data-cy="description"]').type('This is a description for the new item');
      cy.get('[data-cy="submit-button"]').click();
      cy.url().should('match', /\/QA-task\/item/);
    });
  
    it('should close the modal and go back when clicking the Cancel button', () => {
      cy.get('[data-cy="update"]').click();
      cy.get('div').contains('Update Item').should('exist');
      cy.get('[data-cy="cancel-button"]').contains('Cancel').click();
      cy.get('[data-cy="item-page-element"]').should('be.visible');
      cy.url().should('match', /\/QA-task\/item/);
    });
  });
  