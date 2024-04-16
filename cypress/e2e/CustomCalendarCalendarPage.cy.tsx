import React from 'react'
import CalendarPage from '../../src/components/CustomCalendar/CustomCalendar'

describe('CalendarPage Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays the calendar correctly', () => {
    // Check if the calendar is visible
    cy.get('.fc').should('be.visible');

    // Check if the initial view is set to dayGridMonth
    cy.get('.fc-header-toolbar').should('contain', 'April');
  });

  it('opens modal when adding a workout', () => {
    // Click on a date to add a workout
    cy.get('.fc-daygrid-day').first().click();

    // Check if the modal for adding a workout is opened
    cy.get('.MuiDialog-container').should('be.visible');

    // Check if the modal contains necessary elements
    cy.get('.MuiDialogTitle-root').should('contain', 'Add Workout');
    cy.get('[data-testid="workout-name-textfield"]').should('exist');

    // Check if the label of the TextField contains the workout name
    cy.get('[data-testid="workout-name-textfield"] label').should('contain.text', 'Workout Name');
    cy.get('input[type="date"]').should('exist').and('be.disabled');
    cy.contains('button', 'Submit').should('exist').and('be.visible');
  });

  it('opens modal when adding an exercise', () => {
    // Click on a workout event to add an exercise
    cy.get('.fc-event').first().click();

    // Check if the modal for adding an exercise is opened
    cy.get('.MuiDialog-container').should('be.visible');

    // Check if the modal contains necessary elements
    cy.get('.MuiDialogTitle-root').should('contain', 'Add Exercise');
    cy.get('[data-testid="exercise-name-textfield"]').should('exist');

    // Check if the label of the TextField contains the workout name
    cy.get('[data-testid="exercise-name-textfield"] label').should('contain.text', 'Exercise Name');
    cy.get('[data-testid="Add Exercise"]').should('exist');

    // Check if the IconButton contains the "add circle" icon
    cy.get('[data-testid="Add Exercise"] svg').should('have.class', 'MuiSvgIcon-root');
    cy.get('[data-testid="Add Exercise"]').should('have.class', 'MuiIconButton-root');
    cy.get('[data-testid="Add Exercise"] svg path').should('have.attr', 'd');
  });

  it('prevents adding duplicate workouts on the same date', () => {
    // Drag an existing workout event to another date
    cy.get('.fc-event').first().trigger('dragstart');
    cy.get('.fc-daygrid-day').eq(3).trigger('drop');

    // Check if an alert is shown indicating duplicate workout
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Cannot add duplicate workout');
    });
  });

  // Add more test cases based on your application requirements
});