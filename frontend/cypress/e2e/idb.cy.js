describe("clearing cache in settings", () => {
  it("should clear all cache stores and then delete db successfully", () => {
    cy.visit("/").wait(3000);
    cy.getById("desktop-nav-settings").click();
    //  reset artworks, check modal
    cy.getById("resetArtworks").find("button").click();
    cy.getById("alert").should("have.class", "text-green-500");
    //  reset exhibitions, check modal
    cy.getById("resetExhibitions").find("button").click();
    cy.getById("alert").should("have.class", "text-green-500");
    //  reset artworks, check modal
    cy.getById("resetFilters").find("button").click();
    cy.getById("alert").should("have.class", "text-green-500");
    //  reset artworks, check modal
    cy.getById("resetData").find("button").click();
    cy.getById("alert").should("have.class", "text-green-500");
  });
});
