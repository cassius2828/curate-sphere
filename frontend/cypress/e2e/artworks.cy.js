describe("artwork flows", () => {
  beforeEach(() => {
    cy.visit("/artworks/search");
  });
  //   it("should search artworks and handle filter sizes", () => {
  //     // van gogh search
  //     cy.getById("art-search-input").type("van gogh");
  //     cy.getById("total-artworks-available").should("not.have.text", "244696");
  //     cy.getById("displayed-artworks").should("have.text", "12");
  //     cy.getById("art-gallery-card").should("have.length", 12);
  //     // american search
  //     cy.getById("art-search-input").type("american");
  //     cy.getById("total-artworks-available").should("not.have.text", "244696");
  //     cy.getById("displayed-artworks").should("have.text", "12");
  //     cy.getById("art-gallery-card").should("have.length", 12);

  //     // load more
  //     cy.getById("load-more-btn").click();
  //     cy.getById("displayed-artworks").should("have.text", "24");
  //     cy.getById("art-gallery-card").should("have.length", 24);
  //     // filter size 100
  //     cy.getById("filter-size-select").select("100");
  //     cy.getById("displayed-artworks").should("have.text", "100");
  //     cy.getById("art-gallery-card").should("have.length", 100);
  //     // load more
  //     cy.getById("load-more-btn").click();
  //     cy.getById("displayed-artworks").should("have.text", "200");
  //     cy.getById("art-gallery-card").should("have.length", 200);
  //     // filter size 24
  //     cy.getById("filter-size-select").select("24");
  //     cy.getById("displayed-artworks").should("have.text", "24");
  //     cy.getById("art-gallery-card").should("have.length", 24);
  //     // filter size 50
  //     cy.getById("filter-size-select").select("50");
  //     cy.getById("displayed-artworks").should("have.text", "50");
  //     cy.getById("art-gallery-card").should("have.length", 50);
  //     // reset filter
  //     cy.getById("reset-filter-btn").click();
  //     cy.getById("total-artworks-available").should("have.text", "244696");
  //     cy.getById("displayed-artworks").should("have.text", "12");
  //     cy.getById("art-gallery-card").should("have.length", 12);
  //   });

  it("should test combination of filters set", () => {
    cy.getById("filter-btn").wait(2000).click();
    // click first category
    cy.getById("filter-dropdown-ul").children().first().find("svg").click();
    // click first checkbox of subcategories
    cy.getById("subcategory-dropdown-ul")
      .children()
      .first()
      .find('[data-cy="subcategory-checkbox"]')
      .click();
    //   artworks displayed
    cy.getById("displayed-artworks").should("have.text", "0");
    cy.getById("art-gallery-card").should("have.length", 0);
    // compare that two filters yield more results than one filter
    cy.getById("subcategory-dropdown-ul")
      .children()
      .eq(1)
      .find('[data-cy="subcategory-checkbox"]')
      .click();
    //   store first value of artworks available
    cy.getById("total-artworks-available")
      .should("not.have.text", "0")
      .invoke("text")
      .as("totalArtworksWithOneFilter");
    // add second filter
    cy.getById("subcategory-dropdown-ul")
      .children()
      .eq(2)
      .find('[data-cy="subcategory-checkbox"]')
      .click();
    // store second value of artworks available
    // and compare values to each other
    cy.get("@totalArtworksWithOneFilter").then((initialValue) => {
      cy.getById("total-artworks-available")
        .should("not.have.text", "633")
        .invoke("text")
        .then((newValue) => {
          const initialNum = parseInt(initialValue, 10);
          const newNum = parseInt(newValue, 10);
          expect(newNum).to.be.greaterThan(initialNum);
        });
    });
    cy.getById("total-artworks-available")
    .should("exist")
    .invoke("text").as('latestValueOfTotalArtworks').then(val => cy.log(val)) // 1256
    // click the first checkbox again to remove that filter
    cy.getById("subcategory-dropdown-ul")
      .children()
      .eq(1)
      .find('[data-cy="subcategory-checkbox"]')
      .click();
    // ensure the result list is different than when only the first box was clicked
    cy.get("@latestValueOfTotalArtworks")
      .should("exist")
      .then((initialValue) => {
        cy.log(initialValue, ' <-- inital vbalue')
        cy.getById("total-artworks-available")
          .should("not.have.text", "633")
          .and("not.have.text", "244696")
          .invoke("text")
          .then((newValue) => {
            const initialNum = parseInt(initialValue, 10);
            const newNum = parseInt(newValue, 10);
            expect(newNum).to.not.equal(initialNum);
          });
      });
  });
});
