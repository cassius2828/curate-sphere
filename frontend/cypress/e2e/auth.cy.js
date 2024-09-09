// * set 1
describe("successful authentication flows", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginUser("Larry", "123");
  });
  // test 1
  it("login and navigate to user exhibitions", () => {
    cy.getById("user-exbs-btn").click();
    cy.location("pathname").should("eq", "/exhibitions/dashboard");
  });
  // test 2
  it("login and navigate to create exhibition", () => {
    cy.getById("nav-category").trigger("mouseover").wait(500);
    cy.getById("nav-dropdown-item-create-exhibition").click();
    cy.location("pathname").should("eq", "/exhibitions/create");
    cy.getById("prompt-sign-in-modal").should("not.exist");
    cy.getById("manage-exb-form-title").should("exist");
    cy.getById("exb-form").within(() => cy.get("div").should("have.length", 6));
    cy.getById("exb-form").contains("Exhibition Title");
    cy.getById("exb-form").contains("Location");
    cy.getById("exb-form").contains("Description");
    cy.getById("exb-form").contains("Start Date");
    cy.getById("exb-form").contains("End Date");
  });
  // test 3
  it("login and navigate to user profile", () => {
    cy.getById("desktop-nav-profile").click();
    cy.location("pathname").should("eq", "/profiles/1");
    cy.getById("header-img").should("exist");
    cy.getById("profile-img").should("exist");
    cy.getById("profile-username").should("have.text", "Larry");
    cy.getById("profile-bio").contains("Larry, an art enthusiast");
    cy.getById("profile-user-exbs-btn").should("exist");
    cy.getById("profile-action-btn-container")
      .children()
      .should("have.length", 2);
  });
  // test 4
  it("should login and logout", () => {
    cy.getById("desktop-nav-logout").click();
    cy.getById("desktop-nav-login").should("exist");
    cy.getById("desktop-nav-register").should("exist");
  });
});

// * set 2
describe("register a new user", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("/");
    cy.registerUser("Jerry", "jerry@gmail.com", "123");
  });
  // test 1
  it("should prompt user to create exhibitions", () => {
    cy.getById("user-exbs-btn").click();
    cy.getById("exb-card").should("not.exist");
    cy.getById("no-user-exbs-text").should("exist");
    cy.getById("exb-dashboard-add-new-exb-btn").click();
    cy.location("pathname").should("eq", "/exhibitions/create");
    cy.visit("/artworks/search");
    cy.getById("art-gallery-card").should("have.length", 12);
    cy.getById("add-artwork-plus").first().click();
    cy.getById("modal-create-first-exb-prompt-btn").should("exist");
    cy.getById("default-modal-close").click();
    cy.getById("default-modal").should("not.exist");
    cy.get('[data-cy="art-gallery-card"] img').first().click();
    cy.location("pathname").should("match", /^\/artwork\/.*/);
    cy.getById("art-detail-action-btn-plus").click();
    cy.getById("modal-create-first-exb-prompt-btn").should("exist");
  });
  // test 2
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
    cy.getById("default-modal").should("exist");
    cy.getById("exb-search").type("Title 2");
    cy.getById("exb-list").children().should("have.length", 1);
    cy.get('[data-cy="exb-list"] li').first().click();
    cy.getById("success-message").should("exist");
    cy.get('[data-cy="exb-list"] li').first().click();
    cy.getById("error-message").should("exist");
    cy.getById("default-modal-close").click();
    //  load more artworks

    // edit exb
  });
  // test 3
  it("should have blank values for new profile sections", () => {
    cy.visit("/profiles/4");

    // Check the header image src
    cy.getById("header-img").should(
      "have.attr",
      "src",
      "https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149158441.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724544000&semt=ais_hybrid"
    );

    // Check the profile image src
    cy.getById("profile-img").should(
      "have.attr",
      "src",
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    );
    cy.getById("profile-exb-count").should("have.text", "Exhibitions: 0");
    cy.getById("profile-bio").contains("Feeling inspired");
    cy.getById("profile-action-btn-container")
      .children()
      .should("have.length", 2);
    // check initial form state
    cy.getById("profile-action-btn-container")
      .children()
      .contains("Edit Profile")
      .should("be.visible")
      .click();
    cy.get("form").children().should("have.length", 6);
    cy.get("form #currentPassword").should("not.exist");
    cy.get("form #username").should("have.value", "Jerry");
    cy.get("form #email").should("have.value", "jerry@gmail.com");
    cy.get("form #bio").should("have.value", "");
    cy.get("form #bio").type("this is a test bio for Jerry");
    cy.get("form #headerImg").attachFile("test-header.png");
    cy.get("form #profileImg").attachFile("test-profile.png");
    cy.getById("profile-form-action-btns")
      .children()
      .contains("Update")
      .click();
    // check passwords
    cy.getById("profile-action-btn-container")
      .children()
      .contains("Password")
      .should("be.visible")
      .click();
    // ensure info form is not shown
    cy.get("form #username").should("not.exist");
    // check password form inputs
    cy.get("form #currentPassword").should("have.value", "");
    cy.get("form #newPassword").should("have.value", "");
    cy.get("form #confirmPassword").should("have.value", "");
  });
  // test 4
  it("should properly handle all errors and response messages in edit profile and change password inputs", () => {
    cy.visit("/profiles/4");
    cy.getById("profile-action-btn-container")
      .children()
      .contains("Edit Profile")
      .should("be.visible")
      .click();
    cy.get("form #username").clear();
    cy.getById("profile-form-action-btns")
      .children()
      .contains("Update")
      .click();
    // try submiting without a username
    cy.getById("error-message").should(
      "have.text",
      "Username field cannot be left empty"
    );
    cy.get("form #username").type("Jerry222");
    cy.get("form #email").clear();
    cy.get("form #email").type("Jerry222");
    cy.get("form #email").should("have.class", "border-red-500");
    cy.getById("profile-form-action-btns")
      .children()
      .contains("Update")
      .click();
    // try submitting with an invalid email address
    cy.getById("error-message").should(
      "have.text",
      "Please submit a valid email address. (e.g example@gmail.com)"
    );
    cy.get("form #email").clear();
    cy.get("form #email").type("jericho44356@gmail.com");
    // try valid update and get success message
    cy.get("form #bio").type("Here is a sample bio for jerry");
    cy.getById("profile-form-action-btns")
      .children()
      .contains("Update")
      .click();

    cy.getById("success-message").should(
      "have.text",
      "Confirmation email sent to jericho44356@gmail.com. Your email will remain as jerry@gmail.com until you confirm this change."
    );
    // sign in as Jane (no email address)
    cy.getById("desktop-nav-logout").click();
    cy.loginUser("Jane", "123");
    cy.visit("/profiles/2");
    cy.getById("profile-action-btn-container")
      .children()
      .contains("Edit Profile")
      .should("be.visible")
      .click();
    // update without making any changes
    cy.getById("profile-form-action-btns")
      .children()
      .contains("Update")
      .click();
    // success message for no changes
    cy.getById("success-message").should("have.text", "No changes were made");
    // type and send email
    cy.get("form #email").type("Jane123@gmail.com");
    cy.getById("profile-form-action-btns")
      .children()
      .contains("Update")
      .click();
    // success message for changing email for first time
    cy.getById("success-message").contains(
      "You will not have an email adress in the system until you confirm this change."
    );
  });

  // test 5
  it("should properly handle all errors and response messages in change password inputs ", () => {
    cy.visit("/profiles/4");
    cy.getById("profile-action-btn-container")
      .children()
      .contains("Password")
      .click();
    //
    cy.get("form #currentPassword").type("123");
    cy.get("form #newPassword").type("123");
    cy.get("form #confirmPassword").type("123");
    cy.get("form div").last().children().contains("Change").click();
    cy.getById("error-message").should(
      "have.text",
      "Please choose a different password than your current one to update your password"
    );
    cy.getById("reset-password-fields").click();
    // check if form border is red for invalid
    // current
    cy.get("form #currentPassword").type("123");
    cy.get("form #currentPassword").clear("");
    cy.get("form #currentPassword").should("have.class", "border-red-500");
    // new
    cy.get("form #newPassword").type("123");
    cy.get("form #newPassword").clear("");
    cy.get("form #newPassword").should("have.class", "border-red-500");
    // confirm
    cy.get("form #confirmPassword").type("123");
    cy.get("form #confirmPassword").clear("");
    cy.get("form #confirmPassword").should("have.class", "border-red-500");
    cy.get("form #currentPassword").clear();
    cy.get("form #newPassword").clear();
    cy.get("form #confirmPassword").clear();
    // check if fields are not filled out
    cy.get("form div").last().children().contains("Change").click();
    cy.getById("error-message").should(
      "have.text",
      "Please fill in all fields"
    );
    // test that passwords do not match
    cy.get("form #currentPassword").type("123");
    cy.get("form #newPassword").type("12345");
    cy.get("form #confirmPassword").type("12399");
    cy.get("form div").last().children().contains("Change").click();
    cy.getById("error-message").should("have.text", "Passwords do not match");

    // successfully change password
    cy.get("form #currentPassword").clear();
    cy.get("form #newPassword").clear();
    cy.get("form #confirmPassword").clear();
    cy.get("form #currentPassword").type("123");
    cy.get("form #newPassword").type("abc");
    cy.get("form #confirmPassword").type("abc");
    cy.get("form div").last().children().contains("Change").click();
    cy.getById("error-message").should("not.exist");
    cy.getById("success-message").should(
      "have.text",
      "Password updated successfully"
    );
    // reset btn
    cy.getById("reset-password-fields").click();
    cy.get("form #currentPassword").should("have.value", "");
    cy.get("form #newPassword").should("have.value", "");
    cy.get("form #confirmPassword").should("have.value", "");
    // cancel btn
    cy.get("form #currentPassword").type("123");
    cy.get("form #newPassword").type("abc");
    cy.get("form #confirmPassword").type("abc");
    cy.get("form div").last().children().contains("Cancel").click();
    cy.location("pathname").should("eq", "/");
  });
  // test 6
  it("should be able to logout and log back in", () => {
    cy.getById("desktop-nav-logout").click();
    cy.loginUser("Jerry", "123");
  });
});
("");
