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

  //   it("should test combination of filters set", () => {
  //     cy.getById("filter-btn").wait(2000).click();
  //     // click first category
  //     cy.getById("filter-dropdown-ul").children().first().find("svg").click();
  //     // click first checkbox of subcategories
  //     cy.getById("subcategory-dropdown-ul")
  //       .children()
  //       .first()
  //       .find('[data-cy="subcategory-checkbox"]')
  //       .click();
  //     //   artworks displayed
  //     cy.getById("displayed-artworks").should("have.text", "0");
  //     cy.getById("art-gallery-card").should("have.length", 0);
  //     // compare that two filters yield more results than one filter
  //     cy.getById("subcategory-dropdown-ul")
  //       .children()
  //       .eq(1)
  //       .find('[data-cy="subcategory-checkbox"]')
  //       .click();
  //     //   store first value of artworks available
  //     cy.getById("total-artworks-available")
  //       .should("not.have.text", "0")
  //       .invoke("text")
  //       .then((initialValue) => {
  //         cy.getById("subcategory-dropdown-ul")
  //           .children()
  //           .eq(2)
  //           .find('[data-cy="subcategory-checkbox"]')
  //           .click();
  //         cy.getById("total-artworks-available")
  //           .should("not.have.text", initialValue)
  //           .invoke("text")
  //           .then((newValue) => {
  //             const initialNum = parseInt(initialValue, 10);
  //             const newNum = parseInt(newValue, 10);
  //             expect(newNum).to.be.greaterThan(initialNum);
  //             // click the first checkbox again to remove that filter
  //             cy.getById("subcategory-dropdown-ul")
  //               .children()
  //               .eq(1)
  //               .find('[data-cy="subcategory-checkbox"]')
  //               .click();
  //             cy.getById("total-artworks-available")
  //               .should("not.have.text", initialValue)
  //               .and("not.have.text", newValue)
  //               .invoke("text")
  //               .then((latestValue) => {
  //                 const firstNum = parseInt(initialValue, 10);
  //                 const secondNum = parseInt(newValue, 10);
  //                 const latestNum = parseInt(latestValue, 10);
  //                 // expect(newNum).to.be.greaterThan(initialNum);
  //                 expect(latestNum).to.not.equal(firstNum);
  //                 expect(latestNum).to.not.equal(secondNum);
  //               });
  //           });
  //       });

  //     // add second filter

  //     // store second value of artworks available
  //     // and compare values to each other
  //   });
  //   it("should be able to search multiple filters from search bar then select them", () => {
  //     // Open the filter menu and wait for it to load
  //     cy.getById("filter-btn").wait(2000).click();

  //     // Click the 5th category to open its subcategories
  //     cy.getById("filter-dropdown-ul").children().eq(4).find("svg").click();

  //     // Search for subcategories containing "roman" and check the number of results
  //     cy.getById("subcategory-search-input").type("roman");
  //     cy.getById("subcategory-dropdown-ul").children().should("have.length", 12);

  //     // Clear the search input
  //     cy.getById("subcategory-search-input").clear("");

  //     // Search for subcategories containing "british", select the first result, and apply the filter
  //     cy.getById("subcategory-search-input").type("british");
  //     cy.getById("subcategory-dropdown-ul")
  //       .children()
  //       .should("have.length", 1)
  //       .first()
  //       .find("div")
  //       .click();

  //     // Verify the total number of artworks available is not the default 244696 after applying the filter
  //     cy.getById("total-artworks-available")
  //       .should("not.have.text", "244696")
  //       .invoke("text")
  //       .then((firstValue) => {
  //         // Open the 2nd category and search for subcategories containing "albums"
  //         cy.getById("filter-dropdown-ul").children().eq(1).find("svg").click();
  //         cy.getById("filter-dropdown-ul").find("input").first().type("albums");

  //         // Select the first result and apply the filter
  //         cy.getById("subcategory-dropdown-ul")
  //           .children()
  //           .first()
  //           .should("have.length", 1)
  //           .first()
  //           .find("div")
  //           .click();

  //         // Verify the total number of artworks changes after applying the second filter
  //         cy.getById("total-artworks-available")
  //           .should("not.have.text", firstValue)
  //           .invoke("text")
  //           .then((secondValue) => {
  //             const firstNum = parseInt(firstValue, 10);
  //             const secondNum = parseInt(secondValue, 10);

  //             // Assert that the number of artworks decreased after applying the second filter
  //             expect(firstNum).to.be.greaterThan(secondNum);

  //             // Clear the search input and search for subcategories containing "painti"
  //             cy.getById("subcategory-search-input").first().clear("");
  //             cy.getById("subcategory-search-input").first().type("painti");

  //             // Select the first result and apply the filter
  //             cy.getById("subcategory-dropdown-ul")
  //               .children()
  //               .first()
  //               .should("have.length", 1)
  //               .first()
  //               .find("div")
  //               .click();

  //             // Verify the total number of artworks changes after applying the third filter
  //             cy.getById("total-artworks-available")
  //               .should("not.have.text", secondValue)
  //               .invoke("text")
  //               .then((thirdValue) => {
  //                 const thirdNum = parseInt(thirdValue, 10);

  //                 // Assert that the number of artworks increased after the third filter
  //                 expect(thirdNum).to.be.greaterThan(secondNum);

  //                 // Assert that the number of artworks after the third filter is less than the first filter
  //                 expect(thirdNum).to.be.lessThan(firstNum);
  //               });
  //           });
  //       });
  //   });
  //   it("should be able to toggle between list displays and still select and filter artworks | desktop", () => {
  //     cy.get("#art-display-style").select("list");
  //     cy.get("tr").should("have.length", 13);
  //     cy.get("th").should("have.length", 7);
  //     cy.getById("add-artwork-list-row-btn").first().should("exist").click();
  //     cy.getById("prompt-sign-in-modal").should("exist");
  //     cy.getById("close-prompt-modal").should("exist").click();
  //     cy.getById("art-details-list-row-btn").first().click();
  //     cy.getById("artwork-detail-header").children().should("have.length", 3);
  //     cy.getById("artwork-detail-header")
  //       .children()
  //       .eq(1)
  //       .find("h1")
  //       .should("not.be.empty");
  //     cy.getById("artwork-detail-header")
  //       .children()
  //       .eq(1)
  //       .find("span")
  //       .should("not.be.empty");
  //     cy.getById("art-detail-img-section").wait(500).find("img");
  //     cy.getById("art-detail-action-btns-ul").children().should("have.length", 3);
  //     cy.getById("art-info-title-section").should("have.length", 5);
  //     cy.getById("art-detail-people-label").should("not.be.empty");
  //     cy.getById("art-detail-people-content").should("not.be.empty");
  //     cy.getById("art-detail-other-label").should("not.be.empty");
  //     cy.getById("art-detail-other-content").should("not.be.empty");
  //     // click add artwork btn
  //     cy.getById("art-detail-action-btn-plus").click();
  //     cy.getById("close-prompt-modal").should("exist").click();
  //     // TODO: Change copy link to an alert rather than a modal you must close

  //     cy.confirmToolTip("plus");
  //     cy.confirmToolTip("link");
  //     cy.confirmToolTip("asterisk");
  //   });
  it("should allow logged in user to do all operations on artwork list and art detail", () => {
    cy.task("db:seed");
    cy.loginUser("Larry", "123");
    cy.visit("/artworks/search");
    cy.get("#art-display-style").select("list");
    cy.getById("add-artwork-list-row-btn").first().should("exist").click();
    cy.getById("default-modal").find("input").type("abstract");
    cy.getById("default-modal").find("li").click();
    cy.getById("success-message").should("exist");
    cy.getById("default-modal").find("li").click();
    cy.getById("error-message").should("exist");
    cy.getById("default-modal-close").click();
    cy.getById("art-details-list-row-btn").first().click();
    cy.getById("art-detail-action-btns-ul").children().should("have.length", 5);
    cy.confirmToolTip("user");
    cy.confirmToolTip("mountain");
    //     // TODO: Change copy link to an alert rather than a modal you must close

    // cy.getById(`art-detail-action-btn-user`).click()
    // cy.getById(`art-detail-action-btn-mountain`).click()

    cy.getById("art-detail-back-btn").click();
    cy.location("pathname").should("eq", "/artworks/search");
  });
});
