describe("exhibition flows", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("/");
  });
  // test 1
  it("should check the content and functionality of the my exhibition page", () => {
    cy.loginUser("Larry", "123");
    cy.getById("user-exbs-btn").click();
    // check add new exb btn
    cy.getById("exb-dashboard-add-new-exb-btn").should("exist");
    // check cards and content of cards
    cy.getById("exb-card").then((el) => {
      cy.wrap(el)
        .first()
        .within(() => {
          cy.get("span").its("length").should("be.gte", 3);
          cy.getById("exb-card-title").should("exist");
          cy.getById("exb-card-date").should("exist");
          cy.getById("exb-card-location").should("exist");
          cy.get("img").should("exist");
          cy.getById("exb-card-view-details-btn").should("exist");
        });
    });
    // check search input and sort select
    cy.getById("exb-dashboard-search-exb-input").should("exist");
    cy.getById("exb-dashboard-sort-select").should("exist");
    // logout;
    cy.getById("desktop-nav-logout").click();
  });
  // test 2
  it("should create new exb, add artworks to new exb, delete an artwork from the exb and finally delete the exb", () => {
    // init test env

    cy.registerUser("Jerry", "jerry@gmail.com", "123");
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
    cy.getById("exb-card-title").first().should("have.text", "Test Exb Title");
    cy.getById("exb-card-date")
      .first()
      .should("have.text", "Date: Sep 2, 2024 - Sep 13, 2024");
    cy.getById("exb-card-location")
      .first()
      .should("have.text", "Location: San Mateo, CA");
    // ensure the default image is presented
    cy.get('[data-cy="exb-card"] img')
      .first()
      .should("have.attr", "src")
      .then((src) =>
        expect(src).to.contain(
          "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
        )
      );
    // look at details inside the newly created exb
    cy.getById("exb-card-view-details-btn").first().click();
    cy.getById("exb-detail-no-artworks-message").should("exist");
    cy.getById("edit-exb-btn").click();
    // edit exb 1
    cy.get('[data-cy="exb-form"] #title').clear();
    cy.get('[data-cy="exb-form"] #title').type("Updated | Test Exb Title");
    cy.get('[data-cy="exb-form"] #description').clear();
    cy.get('[data-cy="exb-form"] #description').type(
      "Updated | Test description for a very cool and interesting exhibition"
    );
    cy.get('[data-cy="exb-form"] #location').clear();
    cy.get('[data-cy="exb-form"] #location').type("New York, NY");
    cy.get('[data-cy="exb-form"] #startDate').clear();
    cy.get('[data-cy="exb-form"] #startDate').type("2024-01-01");
    cy.get('[data-cy="exb-form"] #endDate').clear();
    cy.get('[data-cy="exb-form"] #endDate').type("2024-12-31");
    cy.get('[data-cy="exb-form"] button').should(
      "have.text",
      "Update Exhibition"
    );
    cy.get('[data-cy="exb-form"] button').click();
    //  add artworks to exbs
    cy.visit("/artworks/search");
    cy.getById("add-artwork-plus").first().click();
    // cy.getById("default-modal").should("exist");
    cy.getById("exb-search").type("Title 2");
    cy.getById("exb-list").children().should("have.length", 1);
    cy.get('[data-cy="exb-list"] li').first().click();
    cy.getById("success-message").should("exist");
    cy.get('[data-cy="exb-list"] li').first().click();
    cy.getById("error-message").should("exist");
    cy.getById("default-modal-close").click();
    //  check artwork in exb
    cy.visit("exhibition/9");
    cy.getById("remove-artwork-from-exb").click();
    cy.getById("confirm-delete-modal")
      .should("exist")
      .find("p")
      .contains(
        "Are you sure you want to remove this artwork from your exhibition?"
      );
    cy.getById("action-btns").children().should("have.length", 2);
    cy.getById("action-btns")
      .children()
      .first()
      .should("have.text", "cancel")
      .click();
    // now delete artwork from exb
    cy.getById("remove-artwork-from-exb").click();
    cy.getById("action-btns")
      .children()
      .last()
      .should("have.text", "confirm")
      .click();
    cy.getById("delete-exb-btn").click();
    cy.getById("exb-card").should("have.length", 1);
    // edit exb
  });
  // test 3
  it("should sort and search user exbs as expected", () => {
    cy.loginUser("Larry", "123");
    cy.getById("user-exbs-btn").click();
    // impressionist
    cy.getById("exb-dashboard-search-exb-input").type("impress");
    cy.getById("exb-card").should("have.length", 1).contains("Impress");
    cy.getById("exb-dashboard-search-exb-input").clear();
    cy.getById("exb-card").should("have.length", 4);
    // art expo search
    cy.getById("exb-dashboard-search-exb-input").type("art e");
    cy.getById("exb-card").should("have.length", 2).contains("Art E");
    cy.getById("exb-dashboard-search-exb-input").clear();
    cy.getById("exb-card").should("have.length", 4);
    // check newest sort
    cy.getById("exb-dashboard-sort-select").select("newest");
    cy.getById("exb-card").first().contains("Abstract Wonders");
    cy.getById("exb-card").eq(1).contains("Modern Art Expo");

    // check oldest sort
    cy.getById("exb-dashboard-sort-select").select("oldest");
    cy.getById("exb-card").eq(1).contains("Abstract Wonders");
    cy.getById("exb-card").first().contains("Modern Art Expo");

    // check a to z sort
    cy.getById("exb-dashboard-sort-select").select("a-z");
    cy.getById("exb-card").first().contains("Abstract Wonders");
    cy.getById("exb-card").eq(1).contains("Renaissance Art Expo");

    // check z to a sort
    cy.getById("exb-dashboard-sort-select").select("z-a");
    cy.getById("exb-card").eq(1).contains("Abstract Wonders");
    cy.getById("exb-card").first().contains("Renaissance Art Expo");

    // try to add duplicate artwork in exb
    cy.getById("exb-card-view-details-btn").first().click().wait(1000);
    cy.getById("exb-artwork-card").first().find("img").click();
    cy.getById("art-detail-action-btn-plus").click();
    cy.getById("exb-list").find("li").first().contains("Ren").click();
    cy.getById("error-message").should("exist");
    cy.getById("exb-list").find("li").eq(1).contains("Mod").click();
    cy.getById("success-message").should("exist");
    cy.getById("exb-search").type("Abstract");
    cy.getById("exb-list")
      .find("li")
      .should("have.length", 1)
      .contains("Abstract")
      .click();
    cy.getById("success-message").should("exist");
    cy.getById("exb-search").clear();
    cy.getById("exb-list").find("li").should("have.length", 4);
    cy.getById("default-modal-close").click();
  });
  // test 4
  it("should be able to navigate explore exbs and display only exbs that do not belong to the signed in user", () => {
    cy.loginUser("Larry", "123");
    // navigate to explore exbs
    cy.getById("nav-category").trigger("mouseover").wait(500);
    cy.getById("nav-dropdown-item-explore-exhibitions").click();
    cy.getById("exb-card").should("have.length", 3);
    // beyond search
    cy.getById("exb-explore-search-exb-input").type("beyon");
    cy.getById("exb-card").should("have.length", 1).contains("Beyond");
    cy.getById("exb-explore-search-exb-input").clear();
    cy.getById("exb-card").should("have.length", 3);
    // check newest sort
    cy.getById("exb-explore-sort-select").select("newest");
    cy.getById("exb-card").first().contains("Beyond");
    cy.getById("exb-card").last().contains("Expo");
    // check oldest sort
    cy.getById("exb-explore-sort-select").select("oldest");
    cy.getById("exb-card").last().contains("Beyond");
    cy.getById("exb-card").first().contains("Expo");
    // check a-z sort
    cy.getById("exb-explore-sort-select").select("a-z");
    cy.getById("exb-card").first().contains("Beyond");
    cy.getById("exb-card").last().contains("Expo");
    // check z-a sort
    cy.getById("exb-explore-sort-select").select("z-a");
    cy.getById("exb-card").last().contains("Beyond");
    cy.getById("exb-card").first().contains("Expo");
    // try to add duplicate artwork in exb
    cy.getById("exb-card-view-details-btn").first().click().wait(1000);
    cy.getById("exb-artwork-card").first().find("img").click();
    cy.getById("art-detail-action-btn-plus").click();
    cy.getById("exb-list").find("li").first().click();
    cy.getById("success-message").should("exist");
    cy.getById("exb-list").find("li").first().click();
    cy.getById("error-message").should("exist");
  });
});
