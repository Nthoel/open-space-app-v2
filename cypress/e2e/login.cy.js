/**
 * - Login spec
 *   - should display login page correctly
 *   - should display error when email is empty
 *   - should display error when password is empty
 *   - should display error toast when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // Verify login page elements
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Masuk').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // Click login button without filling email
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify alert atau toast muncul
    cy.on('window:alert', (text) => {
      expect(text).to.contains('email');
    });
  });

  it('should display alert when password is empty', () => {
    // Fill email only
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();

    // Verify alert atau toast muncul
    cy.on('window:alert', (text) => {
      expect(text).to.contains('password');
    });
  });

  it('should display error toast when email and password are wrong', () => {
    // Fill wrong credentials
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Verify error toast appears (Toastify)
    cy.get('.Toastify', { timeout: 10000 }).should('exist');
  });

  it('should display homepage when email and password are correct', () => {
    // Fill correct credentials (gunakan akun test yang sudah ada)
    cy.get('input[type="email"]').type('testcypress@test.com');
    cy.get('input[type="password"]').type('testcypress123');
    cy.get('button[type="submit"]').click();

    // Verify redirect to homepage atau success toast
    cy.url({ timeout: 10000 }).should('not.include', '/login');
  });
});
