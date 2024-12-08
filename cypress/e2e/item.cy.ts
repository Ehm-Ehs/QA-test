

describe('Item Component', () => {
   
    beforeEach(() => {
        const authToken = window.localStorage.getItem('authToken');
    
        if (authToken) {
          window.localStorage.setItem('authToken', authToken);
        } else {
          cy.log("No authToken found in localStorage");
        }
    
        cy.intercept("GET", "/item", {
          statusCode: 200,
          body: [
            { id: "1", name: "Item 1", description: "Description 1" },
            { id: "2", name: "Item 2", description: "Description 2" },
          ],
        }).as("getItems");
    
        cy.visit("/QA-task/item");
      });
    
    it('should display a loading state and then render items after data loads', () => {
      cy.visit('http://localhost:3000/QA-task/item');
      cy.url().should('match', /\/QA-task\/item\/?$/);

      const authToken = window.localStorage.getItem('token');

      if (authToken) {
        window.localStorage.setItem('authToken', authToken);
      } else {
        cy.log("No authToken found in localStorage");
      }
      cy.get('[data-cy=loading-indicator]').should('be.visible');
  
      cy.wait("@getItems", { timeout: 10000 });
  
      cy.get('[data-cy=loading-indicator]').should('not.exist');
  
      cy.get('[data-cy=item]').should('have.length', 2);
      cy.get('[data-cy=item-name]').first().should('contain', 'Item 1');
      cy.get('[data-cy=item-description]').first().should('contain', 'Description 1');
    });
    it("should display an error message when there is no authentication", () => {
        cy.visit('http://localhost:3000/QA-task/item');
        cy.url().should('match', /\/QA-task\/item\/?$/);
        cy.wait("@getItems");
    
        cy.get('[data-cy="error-message"]')
          .should('be.visible')
   
      });
  });
  
  