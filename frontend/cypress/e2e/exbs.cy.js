describe('exhibition flows', () => {
it('should check the content and functionality of the my exhibition page', () => {
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
});
});