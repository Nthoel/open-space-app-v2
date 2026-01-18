/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is too short
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display register page correctly', () => {
    // Verify register page elements
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Daftar').should('be.visible');
  });

  it('should display alert when name is empty', () => {
    // Fill email and password only
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify alert muncul
    cy.on('window:alert', (text) => {
      expect(text).to.contains('nama');
    });
  });

  it('should display alert when email is empty', () => {
    // Fill name and password only
    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify alert muncul
    cy.on('window:alert', (text) => {
      expect(text).to.contains('email');
    });
  });

  it('should display alert when password is too short', () => {
    // Fill with short password
    cy.get('input[type="text"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('12345');
    cy.get('button[type="submit"]').click();

    // Verify error muncul (toast atau alert)
    cy.on('window:alert', (text) => {
      expect(text).to.contains('6');
    });
  });
});
