const url = process.env.LOCAL_URL;
describe('CustomModal Component', () => {
    beforeEach(() => {
      // Visit a page where the CustomModal component is rendered
      cy.visit("http://localhost:3000");
    });
  
    it('displays the modal when open prop is true', () => {
      // Check if the modal is initially closed
      cy.get('.fc-event').first().click();
      // Trigger an action that opens the modal (e.g., clicking a button that triggers modal open)
  
      // Check if the modal is now visible
      cy.get('[data-testid="custom-modal"]').should('be.visible');
    });
  
    it('displays the correct title', () => {
      // Trigger an action that opens the modal (e.g., clicking a button that triggers modal open)  
      // Check if the modal title is displayed and contains the correct text
      cy.get('.fc-event').first().click();
      cy.get('[data-testid="modal-title"]').should('have.class', 'MuiDialogTitle-root');;
    });
  
    it('closes the modal when the close button is clicked', () => {
      // Trigger an action that opens the modal (e.g., clicking a button that triggers modal open)
    //   cy.get('[data-testid="open-modal-button"]').click();
  
      // Check if the modal is visible
      cy.get('.fc-event').first().click();
      cy.get('[data-testid="custom-modal"]').should('be.visible');
  
      // Click on the close button
      cy.get('[data-testid="modal-button"]').click();
  
      // Check if the modal is now closed
    });
  
    // Add more test cases based on your component's functionality and requirements
  });
  