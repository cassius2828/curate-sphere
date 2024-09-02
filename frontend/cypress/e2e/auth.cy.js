describe("successful authentication flows", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginUser("Larry", "123");
  });
  // it("login a new user", () => {});
  // it("login and navigate to user exhibitions", () => {
  //   cy.getById("user-exb-btn").click();
  //   cy.location("pathname").should("eq", "/exhibitions/dashboard");
  // });
  // it("login and navigate to create exhibition", () => {
  //   cy.getById("nav-category").trigger("mouseover").wait(500);
  //   cy.getById("nav-dropdown-item-create-exhibition").click();
  //   cy.location("pathname").should("eq", "/exhibitions/create");
  //   cy.getById("prompt-sign-in-modal").should("not.exist");
  //   cy.getById("manage-exb-form-title").should("exist");
  //   cy.getById("exb-form").within(() => cy.get("div").should("have.length", 6));
  //   cy.getById("exb-form").contains("Exhibition Title");
  //   cy.getById("exb-form").contains("Location");
  //   cy.getById("exb-form").contains("Description");
  //   cy.getById("exb-form").contains("Start Date");
  //   cy.getById("exb-form").contains("End Date");
  // });

  // it("login and navigate to user profile", () => {
  //   cy.getById("desktop-nav-profile").click();
  //   cy.location("pathname").should("eq", "/profiles/1");
  //   cy.getById("header-img").should("exist");
  //   cy.getById("profile-img").should("exist");
  //   cy.getById("profile-username").should("have.text", "Larry");
  //   cy.getById("profile-bio").contains("Larry, an art enthusiast");
  //   cy.getById("profile-user-exbs-btn").should("exist");
  //   cy.getById("profile-action-btn-container")
  //     .children()
  //     .should("have.length", 2);
  // });

  // it('should login and logout', () => {
  //   cy.getById("desktop-nav-logout").click();
  //   cy.getById("desktop-nav-login").should('exist')
  //   cy.getById("desktop-nav-register").should('exist')
  // });
});

describe("register a new user", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("/");
  });
  it("should register a new user", () => {
    cy.getById("desktop-nav-register").click();
    cy.get("#username").type("Jerry");
    cy.get("#password").type("123");
    cy.get("#confirmPassword").type("123");
    cy.get('[type="submit"]').click();
    cy.location("pathname").should("eq", "/");
    cy.getById("welcome-message").contains("Jerry");
  });
  it("check to see if db is seeded before each test", () => {
    cy.getById("desktop-nav-register").click();
    cy.get("#username").type("Jerry");
    cy.get("#password").type("123");
    cy.get("#confirmPassword").type("123");
    cy.get('[type="submit"]').click();
    cy.location("pathname").should("eq", "/");
    cy.getById("welcome-message").contains("Jerry");
  });
});
