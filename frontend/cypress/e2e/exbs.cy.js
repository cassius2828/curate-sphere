describe("exhibition flows", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("/");

  })
  it("should check the content and functionality of the my exhibition page", () => {
    cy.loginUser("Larry", "123")
  //  cy.getById("user-exbs-btn").click()
  //   // check add new exb btn
  //   cy.getById("exb-dashboard-add-new-exb-btn").should("exist");
  //   // check cards and content of cards
  //   cy.getById("exb-card").then((el) => {
  //     cy.wrap(el)
  //       .first()
  //       .within(() => {
  //         cy.get("span").its("length").should("be.gte", 3);
  //         cy.getById("exb-card-title").should("exist");
  //         cy.getById("exb-card-date").should("exist");
  //         cy.getById("exb-card-location").should("exist");
  //         cy.get("img").should("exist");
  //         cy.getById("exb-card-view-details-btn").should("exist");
  //       });
  //   });
  //   // check search input and sort select
  //   cy.getById("exb-dashboard-search-exb-input").should("exist");
  //   cy.getById("exb-dashboard-sort-select").should("exist");
  });

//   it("should create new exb and add artworks to new exb", () => {
//     // init test env

//     cy.registerUser("Jerry", "jerry@gmail.com", "123");
//     cy.visit("/exhibitions/create");
//     // create exb 1
//     cy.get('[data-cy="exb-form"] #title').type("Test Exb Title");
//     cy.get('[data-cy="exb-form"] #description').type(
//       "Test description for a very cool and interesting exhibition"
//     );
//     cy.get('[data-cy="exb-form"] #location').type("San Mateo, CA");
//     cy.get('[data-cy="exb-form"] #startDate').type("2024-09-02");
//     cy.get('[data-cy="exb-form"] #endDate').type("2024-09-13");
//     cy.get('[data-cy="exb-form"] button').click();
//     // check new exb details
//     cy.location("pathname").should("eq", "/exhibitions/dashboard");
//     cy.visit("/exhibitions/create");
//     // create exb 2
//     cy.get('[data-cy="exb-form"] #title').type("Test Exb Title 2");
//     cy.get('[data-cy="exb-form"] #description').type(
//       "Test description for a very cool and interesting exhibitio number 2"
//     );
//     cy.get('[data-cy="exb-form"] #location').type("San Francisco, CA");
//     cy.get('[data-cy="exb-form"] #startDate').type("2024-10-01");
//     cy.get('[data-cy="exb-form"] #endDate').type("2024-11-12");
//     cy.get('[data-cy="exb-form"] button').click();
//     // check new exb details
//     cy.location("pathname").should("eq", "/exhibitions/dashboard");
//     cy.getById("exb-card").should("have.length", 2);
//     cy.getById("exb-card-title").first().should("have.text", "Test Exb Title");
//     cy.getById("exb-card-date")
//       .first()
//       .should("have.text", "Date: Sep 2, 2024 - Sep 13, 2024");
//     cy.getById("exb-card-location")
//       .first()
//       .should("have.text", "Location: San Mateo, CA");
//     // ensure the default image is presented
//     cy.get('[data-cy="exb-card"] img')
//       .first()
//       .should("have.attr", "src")
//       .then((src) =>
//         expect(src).to.contain(
//           "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
//         )
//       );
//     // look at details inside the newly created exb
//     cy.getById("exb-card-view-details-btn").first().click();
//     cy.getById("exb-detail-no-artworks-message").should("exist");
//     cy.getById("edit-exb-btn").click();
//     // edit exb 1
//     cy.get('[data-cy="exb-form"] #title').clear();
//     cy.get('[data-cy="exb-form"] #title').type("Updated | Test Exb Title");
//     cy.get('[data-cy="exb-form"] #description').clear();
//     cy.get('[data-cy="exb-form"] #description').type(
//       "Updated | Test description for a very cool and interesting exhibition"
//     );
//     cy.get('[data-cy="exb-form"] #location').clear();
//     cy.get('[data-cy="exb-form"] #location').type("New York, NY");
//     cy.get('[data-cy="exb-form"] #startDate').clear();
//     cy.get('[data-cy="exb-form"] #startDate').type("2024-01-01");
//     cy.get('[data-cy="exb-form"] #endDate').clear();
//     cy.get('[data-cy="exb-form"] #endDate').type("2024-12-31");
//     cy.get('[data-cy="exb-form"] button').should(
//       "have.text",
//       "Update Exhibition"
//     );
//     cy.get('[data-cy="exb-form"] button').click();
//     //  add artworks to exbs
//     cy.visit("/artworks/search");
//     cy.getById("add-artwork-plus").first().click();
//     // cy.getById("default-modal").should("exist");
//     cy.getById("exb-search").type("Title 2");
//     cy.getById("exb-list").children().should("have.length", 1);
//     cy.get('[data-cy="exb-list"] li').first().click();
//     cy.getById("success-message").should("exist");
//     cy.get('[data-cy="exb-list"] li').first().click();
//     cy.getById("error-message").should("exist");
//     cy.getById("default-modal-close").click();
//     //  check artwork in exb
//     cy.visit("exhibition/7");
//     cy.getById("remove-artwork-from-exb").click();
//     cy.getById("confirm-delete-modal")
//       .should("exist")
//       .find("p")
//       .contains(
//         "Are you sure you want to remove this artwork from your exhibition?"
//       );
// cy.getById("action-btns").children().should('have.length', 2);
// cy.getById("action-btns").children().first().should('have.text', 'cancel').click()
// // now delete artwork from exb
// cy.getById("remove-artwork-from-exb").click();
// cy.getById("action-btns").children().last().should('have.text', 'confirm').click();


//     // edit exb
//   });
});
