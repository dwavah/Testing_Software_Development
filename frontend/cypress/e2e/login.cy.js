describe('User Login Flow', () => {
    it('should login the user successfully', () => {
      cy.visit('http://localhost:3000/');  // Home page, since form is there now
  
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="password"]').type('TestPass123');
      cy.get('button[type="submit"]').click();
  
      // Assertion to check if logged in
      cy.contains('Welcome, testuser');  // Now should appear on success
    });
  });