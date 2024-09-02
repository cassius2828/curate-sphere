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
  // it("should prompt user to create exhibitions", () => {
  // cy.getById("user-exbs-btn").click();
  // cy.getById("exb-card").should("not.exist");
  // cy.getById("no-user-exbs-text").should("exist");
  // cy.getById("exb-dashboard-add-new-exb-btn").click();
  // cy.location("pathname").should("eq", "/exhibitions/create");
  // cy.visit("/artworks/search");
  // cy.getById("art-gallery-card").should("have.length", 12);
  // cy.getById("add-artwork-plus").first().click();
  // cy.getById("modal-create-first-exb-prompt-btn").should("exist");
  // cy.getById("default-modal-close").click();
  // cy.getById("default-modal").should("not.exist");
  // cy.get('[data-cy="art-gallery-card"] img').first().click();
  // cy.location("pathname").should("match", /^\/artwork\/.*/);
  // cy.getById("art-detail-action-btn-plus").click()
  // cy.getById("modal-create-first-exb-prompt-btn").should("exist");

  // });

  it("should create new exb and add artworks to new exb", () => {
    cy.visit("/exhibitions/create");
    // create exb 1
    cy.get('[data-cy="exb-form"] #title').type("Test Exb Title");
    cy.get('[data-cy="exb-form"] #description').type(
      "Test description for a very cool and interesting exhibition"
    );
    cy.get('[data-cy="exb-form"] #location').type("San Mateo, CA");
    cy.get('[data-cy="exb-form"] #startDate').type("2024-09-02");
    cy.get('[data-cy="exb-form"] #endDate').type("2024-09-13");
    cy.get('[data-cy="exb-form"] button').click();
    // check new exb details
    cy.location("pathname").should("eq", "/exhibitions/dashboard");
    cy.visit("/exhibitions/create");
    // create exb 2
    cy.get('[data-cy="exb-form"] #title').type("Test Exb Title 2");
    cy.get('[data-cy="exb-form"] #description').type(
      "Test description for a very cool and interesting exhibitio number 2"
    );
    cy.get('[data-cy="exb-form"] #location').type("San Francisco, CA");
    cy.get('[data-cy="exb-form"] #startDate').type("2024-10-01");
    cy.get('[data-cy="exb-form"] #endDate').type("2024-11-12");
    cy.get('[data-cy="exb-form"] button').click();
    // check new exb details
    cy.location("pathname").should("eq", "/exhibitions/dashboard");
    cy.getById("exb-card").should("have.length", 2);
    cy.getById("exb-card-title").first().should('have.text', 'Test Exb Title')
    cy.getById("exb-card-date").first().should('have.text', 'Date: Sep 2, 2024 - Sep 13, 2024')
    cy.getById("exb-card-location").first().should('have.text', 'San Mateo, CA')
  });
  // it("should have blank values for new profile sections", () => {
  // cy.visit("/artworks/search");

  // });
  // it("should be able to logout and log back in", () => {
  //   cy.getById("desktop-nav-logout").click();
  //   cy.loginUser("Jerry", "123");
  // });
});
