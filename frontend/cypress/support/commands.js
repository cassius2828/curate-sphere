// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.addQuery('getById', (id) => {
    const getFn = cy.now('get', `[data-cy=${id}]`);
    return () => {
        return getFn();
    };
});

Cypress.Commands.add('checkToken', (token) => {
    if (token) {
      // Check if the token is present and matches the expected value
      cy.window().its('localStorage.token').should('eq', token);
    } else {
      // Check if the token is absent from localStorage
      cy.window().its('localStorage.token').should('not.exist');
    }
  });
