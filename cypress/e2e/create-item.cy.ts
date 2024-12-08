describe('AddItem Component', () => {
    before(() => {
      Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Hydration failed')) {
          return false; 
        }
      });
    });
    
    it('should show validation errors when leaving all fields blank', () => {
      cy.visit('http://localhost:3000/QA-task/item/create-item');
      cy.url().should('match', /\/QA-task\/item\/create-item\/?$/);
  
      cy.get('form').should('be.visible');
  
      cy.get('[data-cy="submit-button"]').click();
  
      cy.get('[data-cy="name-error"]').should('be.visible').and('contain', 'Name is required');
      cy.get('[data-cy="description-error"]').should('be.visible').and('contain', 'Description is required');
    });
  
    it('should create a new item when submitting with valid data', () => {
        cy.visit('http://localhost:3000/QA-task/item/create-item');

        cy.get('[data-cy="name"]').type('New Item');
        cy.get('[data-cy="description"]').type('This is a description for the new item');
        
        cy.get('[data-cy="submit-button"]').click();
            
        cy.url().should('match', /\/QA-task\/item/); 
      });
      it('should go back when clicking the Back button', () => {
        cy.visit('/QA-task/item/create-item');
        
        cy.get('[data-cy="back-button"]').contains('Back').click();
        cy.url().should('match', /\/QA-task\/item/);
    });

    
  });
  