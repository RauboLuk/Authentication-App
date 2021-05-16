describe("Auth app", function () {
  const email = "amigo@gta.vi";
  const password = "amigofuego";

  beforeEach(function () {
    cy.visit("http://localhost:3001");
  });

  it("front page can be opened", function () {
    cy.contains("Join thousands of learners from around the world");
    cy.contains("or continue with these social profile");
  });

  // it("user can signup", function () {
  //   cy.get("input[name='email']").type(email);
  //   cy.get("input[name='password']").type(password);
  //   cy.get(".auth__submit").click();
  //   cy.url().should("include", "/me");
  //   cy.contains(email);
  // });

  it("user can't signup if email is invalid and see validation message", function () {
    cy.get("input[name='email']").type("email");
    cy.get("input[name='password']").type(password);
    cy.get(".auth__submit").click();
    cy.url().should("not.include", "/me");
    cy.contains("Please enter a valid email address.");
  });

  it("user navigate to login page", function () {
    cy.get(".signUp__link").click();
    cy.url().should("include", "/signIn");
    cy.contains("Login");
  });
});
