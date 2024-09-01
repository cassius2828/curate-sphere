describe("authentication flows", () => {

  it("register a new user", () => {
    cy.visit("/");
    cy.getById("desktop-nav-login").click();
    cy.get('#username').type('Larry');
    cy.get('#password').type('123');
    cy.get('[type="submit"]').click();
  });
});
