/* eslint-disable no-unused-vars */
// Cypress E2E Support File
// Tempat untuk custom commands dan global configuration

// Custom command untuk login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Prevent uncaught exception from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
