/// <reference types="Cypress" />

describe("landing page", () => {
  beforeEach(() => {
    // cy.task('seedDB');
    cy.visit("/");
    cy.checkToken("");
  });
  // ui check for guest page
  it("ensures the guest ui for the landing page displays as expected", () => {
    cy.getById("home-link").should("exist");
    cy.getById("loader-text").should("exist");
    cy.getById("desktop-nav-ul").children().should("have.length", 4);
    cy.getById("loader-text").should("not.exist");

    cy.getById("nav-category").trigger("mouseover").wait(500);
    cy.getById("nav-dropdown-menu-exhibitions")
      .children()
      .should((els) => {
        expect(els.length).to.be.at.least(3);
      });
    cy.getById("landing-title").should("have.text", "Curate Sphere");
    cy.getById("landing-description").should("exist");
    cy.getById("landing-explore-exbs-btn").should("exist");
    cy.getById("landing-search-artworks-btn").should("exist");
  });

  it("check navigation from landing page to areas that do not require auth", () => {
    // explore exbs | main btn
    cy.getById("landing-explore-exbs-btn").click();
    cy.location("pathname").should("eq", "/exhibitions/explore");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");
    // explore exbs | nav hover
    cy.getById("nav-category").trigger("mouseover").wait(500);
    cy.getById("nav-dropdown-item-explore-exhibitions").click();
    cy.location("pathname").should("eq", "/exhibitions/explore");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");
    // create exb | ensure user is prompted to sign in
    cy.getById("nav-category").trigger("mouseover").wait(500);
    cy.getById("nav-dropdown-item-create-exhibition").click();
    cy.location("pathname").should("eq", "/exhibitions/create");
    cy.getById("prompt-sign-in-modal").should("exist");
    // my exbs | ensure user is prompted to sign in
    cy.getById("nav-category").trigger("mouseover").wait(500);
    cy.getById("nav-dropdown-item-my-exhibitions").click();
    cy.location("pathname").should("eq", "/exhibitions/dashboard");
    cy.getById("prompt-sign-in-modal").should("exist");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");
    // explore artworks | main btn
    cy.getById("landing-search-artworks-btn").click();
    cy.location("pathname").should("eq", "/artworks/search");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");
    // search artworks | nav link
    cy.getById("desktop-nav-artwork-search").click();
    cy.location("pathname").should("eq", "/artworks/search");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");
  });

  it("should be able to navigate successfully from footer", () => {
    // explore exbs | footer link
    cy.getById("footer-explore-exbs-link").click();
    cy.location("pathname").should("eq", "/exhibitions/explore");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");
    //  TODO: Write tests for about and contact page when they are made

    // my exbs | footer link
    cy.getById("footer-my-exbs-link").click();
    cy.location("pathname").should("eq", "/exhibitions/dashboard");
    cy.getById("prompt-sign-in-modal").should("exist");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");
    // search artworks | footer link
    cy.getById("footer-search-artworks-link").click();
    cy.location("pathname").should("eq", "/artworks/search");
    cy.getById("home-link").click();
    cy.location("pathname").should("eq", "/");

    // TODO Figure out how to do external navigation tests
    // // cassius github | footer icon
    // cy.getById("github-cassius").click();
    // cy.url().should("eq", "https://github.com/cassius2828");
    // cy.go("back");
    // cy.location("pathname").should("eq", "/");
    // // cassius github | bottom link
    // cy.getById("github-cassius-bottom").click();
    // cy.url().should("eq", "https://github.com/cassius2828");
    // cy.go("back");
    // cy.location("pathname").should("eq", "/");
    // // mollie github | footer icon
    // cy.getById("github-mollie").click();
    // cy.url().should("eq", "https://github.com/molliean");
    // cy.go("back");
    // cy.location("pathname").should("eq", "/");
    // // mollie github | bottom link
    // cy.getById("github-mollie-bottom").click();
    // cy.url().should("eq", "https://github.com/molliean");
    // cy.go("back");
    // cy.location("pathname").should("eq", "/");
  });
});
