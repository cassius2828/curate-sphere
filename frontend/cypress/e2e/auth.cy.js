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
    cy.registerUser("Jerry", "jerry@gmail.com", "123");
  });
  // it("should register a new user", () => {

  // });
  it("should prompt user to create exhibitions", () => {
    cy.getById("user-exbs-btn").click();
    cy.getById("exb-card").should("not.exist");
    cy.getById("exb-dashboard-add-new-exb-btn").click();
    cy.location("pathname").should("eq", "/exhibitions/create");
  });
  // it("should have blank values for new profile sections", () => {

  // });
  // it("should be able to logout and log back in", () => {
  //   cy.getById("desktop-nav-logout").click();
  //   cy.loginUser("Jerry", "123");
  // });
});
