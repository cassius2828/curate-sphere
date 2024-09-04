describe("artwork flows", () => {
  beforeEach(() => {
    cy.visit("/artworks/search");
    // Clears all IndexedDB databases in Cypress
  });
  // test 1
  it("should search artworks and handle filter sizes", () => {
    // van gogh search
    cy.getById("art-search-input").type("van gogh");
    cy.getById("total-artworks-available").should("not.have.text", "244696");
    cy.getById("displayed-artworks").should("have.text", "12");
    cy.getById("art-gallery-card").should("have.length", 12);
    // american search
    cy.getById("art-search-input").type("american");
    cy.getById("total-artworks-available").should("not.have.text", "244696");
    cy.getById("displayed-artworks").should("have.text", "12");
    cy.getById("art-gallery-card").should("have.length", 12);

    // load more
    cy.getById("load-more-btn").click();
    cy.getById("displayed-artworks").should("have.text", "24");
    cy.getById("art-gallery-card").should("have.length", 24);
    // filter size 100
    cy.getById("filter-size-select").select("100");
    cy.getById("displayed-artworks").should("have.text", "100");
    cy.getById("art-gallery-card").should("have.length", 100);
    // load more
    cy.getById("load-more-btn").click();
    cy.getById("displayed-artworks").should("have.text", "200");
    cy.getById("art-gallery-card").should("have.length", 200);
    // filter size 24
    cy.getById("filter-size-select").select("24");
    cy.getById("displayed-artworks").should("have.text", "24");
    cy.getById("art-gallery-card").should("have.length", 24);
    // filter size 50
    cy.getById("filter-size-select").select("50");
    cy.getById("displayed-artworks").should("have.text", "50");
    cy.getById("art-gallery-card").should("have.length", 50);
    // reset filter
    cy.getById("reset-filter-btn").click();
    cy.getById("total-artworks-available").should("have.text", "244696");
    cy.getById("displayed-artworks").should("have.text", "12");
    cy.getById("art-gallery-card").should("have.length", 12);
  });
  // test 2
  it("should test combination of filters set", () => {
    // Open the filter dropdown
    cy.getById("filter-btn").wait(2000).click();

    // Click the first category in the dropdown
    cy.getById("filter-dropdown-ul").children().first().find("svg").click();

    // Click the first checkbox of the subcategories to apply the first filter
    cy.getById("subcategory-dropdown-ul")
      .children()
      .first()
      .find('[data-cy="subcategory-checkbox"]')
      .click();

    // Check that no artworks are displayed after applying the first filter
    cy.getById("displayed-artworks").should("have.text", "0");
    cy.getById("art-gallery-card").should("have.length", 0);

    // Click the second checkbox to apply a second filter
    cy.getById("subcategory-dropdown-ul")
      .children()
      .eq(1)
      .find('[data-cy="subcategory-checkbox"]')
      .click();

    // Store the number of artworks available after applying two filters
    cy.getById("total-artworks-available")
      .should("not.have.text", "0")
      .invoke("text")
      .then((initialValue) => {
        // Click the third checkbox to apply a third filter
        cy.getById("subcategory-dropdown-ul")
          .children()
          .eq(2)
          .find('[data-cy="subcategory-checkbox"]')
          .click();

        // Ensure the number of artworks available changes after applying the third filter
        cy.getById("total-artworks-available")
          .should("not.have.text", initialValue)
          .invoke("text")
          .then((newValue) => {
            const initialNum = parseInt(initialValue, 10);
            const newNum = parseInt(newValue, 10);

            // Verify that the number of artworks increases after applying the third filter
            expect(newNum).to.be.greaterThan(initialNum);

            // Click the second checkbox again to remove the second filter
            cy.getById("subcategory-dropdown-ul")
              .children()
              .eq(1)
              .find('[data-cy="subcategory-checkbox"]')
              .click();

            // Verify that the number of artworks changes after removing the second filter
            cy.getById("total-artworks-available")
              .should("not.have.text", initialValue)
              .and("not.have.text", newValue)
              .invoke("text")
              .then((latestValue) => {
                const firstNum = parseInt(initialValue, 10);
                const secondNum = parseInt(newValue, 10);
                const latestNum = parseInt(latestValue, 10);

                // Ensure the number of artworks available is different from when only the first filter was applied
                expect(latestNum).to.not.equal(firstNum);
                // Ensure the number of artworks available is different from when two filters were applied
                expect(latestNum).to.not.equal(secondNum);
              });
          });
      });

    // add second filter

    // store second value of artworks available
    // and compare values to each other
  });
  // test 3
  it("should be able to search multiple filters from search bar then select them", () => {
    // Open the filter menu and wait for it to load
    cy.getById("filter-btn").wait(3000).click();

    // Click the 5th category to open its subcategories
    cy.getById("filter-dropdown-ul").children().eq(4).find("svg").click();

    // Search for subcategories containing "roman" and check the number of results
    cy.getById("subcategory-search-input").type("roman");
    cy.getById("subcategory-dropdown-ul").children().should("have.length", 12);

    // Clear the search input
    cy.getById("subcategory-search-input").clear("");

    // Search for subcategories containing "british", select the first result, and apply the filter
    cy.getById("subcategory-search-input").type("british");
    cy.getById("subcategory-dropdown-ul")
      .children()
      .should("have.length", 1)
      .first()
      .find("div")
      .click();

    // Verify the total number of artworks available is not the default 244696 after applying the filter
    cy.getById("total-artworks-available")
      .should("not.have.text", "244696")
      .invoke("text")
      .then((firstValue) => {
        // Open the 2nd category and search for subcategories containing "albums"
        cy.getById("filter-dropdown-ul").children().eq(1).find("svg").click();
        cy.getById("filter-dropdown-ul").find("input").first().type("albums");

        // Select the first result and apply the filter
        cy.getById("subcategory-dropdown-ul")
          .children()
          .first()
          .should("have.length", 1)
          .first()
          .find("div")
          .click();

        // Verify the total number of artworks changes after applying the second filter
        cy.getById("total-artworks-available")
          .should("not.have.text", firstValue)
          .invoke("text")
          .then((secondValue) => {
            const firstNum = parseInt(firstValue, 10);
            const secondNum = parseInt(secondValue, 10);

            // Assert that the number of artworks decreased after applying the second filter
            expect(firstNum).to.be.greaterThan(secondNum);

            // Clear the search input and search for subcategories containing "painti"
            cy.getById("subcategory-search-input").first().clear("");
            cy.getById("subcategory-search-input").first().type("painti");

            // Select the first result and apply the filter
            cy.getById("subcategory-dropdown-ul")
              .children()
              .first()
              .should("have.length", 1)
              .first()
              .find("div")
              .click();

            // Verify the total number of artworks changes after applying the third filter
            cy.getById("total-artworks-available")
              .should("not.have.text", secondValue)
              .invoke("text")
              .then((thirdValue) => {
                const thirdNum = parseInt(thirdValue, 10);

                // Assert that the number of artworks increased after the third filter
                expect(thirdNum).to.be.greaterThan(secondNum);

                // Assert that the number of artworks after the third filter is less than the first filter
                expect(thirdNum).to.be.lessThan(firstNum);
              });
          });
      });
    cy.getById("filter-btn").click();
    cy.getById("filter-btn").click();
    cy.getById("filter-dropdown-ul").children().eq(4).find("svg").click();
    cy.getById("checkbox-category-name")
      .contains("British")
      .parent()
      .children()
      .first()
      .click();
    cy.getById("total-artworks-available").should("have.text", "6375");
    cy.getById("filter-dropdown-ul").children().eq(1).find("svg").click();
    cy.getById("checkbox-category-name")
      .contains("Albums")
      .parent()
      .children()
      .first()
      .contains("X");

    // reset filter and check if check boxes still exist (they should not)
    cy.getById("reset-filter-btn").click();
    cy.getById("total-artworks-available").should("have.text", "244696");
    cy.getById("filter-dropdown-ul").should("not.exist");
    cy.getById("filter-btn").click();
    cy.getById("filter-dropdown-ul").children().eq(1).find("svg").click();
    cy.getById("checkbox-category-name")
      .contains("Albums")
      .parent()
      .children()
      .first()
      .find("span")
      .should("not.have.text", "X");
  });
  // test 4
  it("should be able to toggle between list displays and still select and filter artworks | desktop", () => {
    // Select 'list' display style
    cy.get("#art-display-style").select("list");

    // Check the list view has correct number of rows and columns
    cy.get("tr").should("have.length", 13);
    cy.get("th").should("have.length", 7);

    // Attempt to add an artwork and expect a sign-in prompt
    cy.getById("add-artwork-list-row-btn").first().should("exist").click();
    cy.getById("prompt-sign-in-modal").should("exist");
    cy.getById("close-prompt-modal").should("exist").click();

    // View details of the first artwork
    cy.getById("art-details-list-row-btn").first().click();

    // Check artwork detail header contains expected number of children
    cy.getById("artwork-detail-header").children().should("have.length", 3);

    // Ensure artwork title (h1) and classification (span) are not empty
    cy.getById("artwork-detail-header")
      .children()
      .eq(1)
      .find("h1")
      .should("not.be.empty");
    cy.getById("artwork-detail-header")
      .children()
      .eq(1)
      .find("span")
      .should("not.be.empty");

    // Verify artwork image is present
    cy.getById("art-detail-img-section").wait(500).find("img");

    // Check the number of action buttons
    cy.getById("art-detail-action-btns-ul").children().should("have.length", 3);

    // Verify there are 5 art info title sections
    cy.getById("art-info-title-section").should("have.length", 5);

    // Ensure people and other detail sections are not empty
    cy.getById("art-detail-people-label").should("not.be.empty");
    cy.getById("art-detail-people-content").should("not.be.empty");
    cy.getById("art-detail-other-label").should("not.be.empty");
    cy.getById("art-detail-other-content").should("not.be.empty");

    // Click 'add artwork' button and handle sign-in prompt
    cy.getById("art-detail-action-btn-plus").click();
    cy.getById("close-prompt-modal").should("exist").click();

    // Confirm tooltips for specific buttons
    cy.confirmToolTip("plus");
    cy.confirmToolTip("link");
    cy.confirmToolTip("asterisk");
  });

  // test 5
  it("should allow logged in user to do all operations on artwork list and art detail", () => {
    // Seed the database and log in as a user
    cy.task("db:seed");
    cy.loginUser("Larry", "123");

    // Navigate to the artwork search page
    cy.visit("/artworks/search");

    // Change display style to list view
    cy.get("#art-display-style").select("list");

    // Add an artwork from the list and search for an exhibition to add it to
    cy.getById("add-artwork-list-row-btn").first().should("exist").click();
    cy.getById("default-modal").find("input").type("abstract");

    // Select the first exhibition from search results and confirm success
    cy.getById("default-modal").find("li").click();
    cy.getById("success-message").should("exist");

    // Try adding the same artwork to the same exhibition and expect an error
    cy.getById("default-modal").find("li").click();
    cy.getById("error-message").should("exist");

    // Close the modal after adding artwork
    cy.getById("default-modal-close").click();

    // View details of the first artwork from the list
    cy.getById("art-details-list-row-btn").first().click();

    // Check that there are 5 action buttons available in the art detail section
    cy.getById("art-detail-action-btns-ul").children().should("have.length", 5);

    // Confirm tooltips for specific action buttons
    cy.confirmToolTip("user");
    cy.confirmToolTip("mountain");

    // TODO: Change copy link to an alert rather than a modal you must close

    // Check profile button functionality and handle alerts
    cy.getById(`art-detail-action-btn-user`).click();
    cy.getById("alert")
      .invoke("text")
      .then((text) =>
        expect(text).to.satisfy(
          (t) => t.includes("success") || t.includes("No image url")
        )
      )
      .wait(1200);
    cy.getById("alert").should("not.exist");

    // Check header button functionality and handle alerts
    cy.getById(`art-detail-action-btn-mountain`).click();
    cy.getById("alert")
      .invoke("text")
      .then((text) =>
        expect(text).to.satisfy(
          (t) => t.includes("success") || t.includes("No image url")
        )
      )
      .wait(1200);
    cy.getById("alert").should("not.exist");

    // return to home page with back btn
    cy.getById("art-detail-back-btn").click();
    cy.location("pathname").should("eq", "/artworks/search");
  });
});
