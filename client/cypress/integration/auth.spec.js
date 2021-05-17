import Chance from "chance";
const chance = new Chance();

describe("Auth app", function () {
  const user = {
    email: chance.email(),
    password: "test432",
  };
  const email = chance.email();

  describe("Signup", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3000/api/test/reset");
      cy.request("POST", "http://localhost:3000/api/auth/signup", user);
      cy.clearCookies();

      cy.visit("http://localhost:3001/signup");
    });

    it("Signup page can be opened", function () {
      cy.contains("Join thousands of learners from around the world");
      cy.contains("or continue with these social profile");
    });

    it("user can signup", function () {
      cy.get("[data-cy=email]").type(email);
      cy.get("[data-cy=password]").type(user.password);
      cy.get("[data-cy=submit]").click();
      cy.url().should("include", "/me");
      cy.contains(email);
    });

    it("email, password is required message", function () {
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("Email is required.");
      cy.contains("Password is required.");
    });

    it("user can't signup if email is invalid and see validation message", function () {
      cy.get("[data-cy=email]").type("email");
      cy.get("[data-cy=password]").type(user.password);
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("Please enter a valid email address.");
    });

    it("user can't signup if password is invalid and see validation message", function () {
      cy.get("[data-cy=email]").type(email);
      cy.get("[data-cy=password]").type("prd");
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("Minimum password length: 5, allowed chars a-z A-Z 0-9");
    });

    it("user can't signup if email is already taken", function () {
      cy.get("[data-cy=email]").type(user.email);
      cy.get("[data-cy=password]").type("prd");
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("Minimum password length: 5, allowed chars a-z A-Z 0-9");
    });

    it("user can navigate to login page", function () {
      cy.get("[data-cy=signUp__link]").click();
      cy.url().should("include", "/signin");
      cy.contains("Login");
    });
  });

  describe("Login", function () {
    before(function () {
      cy.request("POST", "http://localhost:3000/api/test/reset");
      cy.request("POST", "http://localhost:3000/api/auth/signup", user);
    });

    beforeEach(function () {
      cy.clearCookies();
      cy.visit("http://localhost:3001/signin");
    });

    it("Login page can be opened", function () {
      cy.url().should("include", "/signin");
      cy.contains("Login");
    });

    it("user can login", function () {
      cy.get("[data-cy=email]").type(user.email);
      cy.get("[data-cy=password]").type(user.password);
      cy.get("[data-cy=submit]").click();
      cy.url().should("include", "/me");
      cy.contains(user.email);
    });

    it("email, password is required message", function () {
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("Email is required.");
      cy.contains("Password is required.");
    });

    it("user can't login if email is invalid and see validation message", function () {
      cy.get("[data-cy=email]").type("email");
      cy.get("[data-cy=password]").type(user.password);
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("Please enter a valid email address.");
    });

    it("user can't login if password is incorrect and see error", function () {
      cy.get("[data-cy=email]").type(user.email);
      cy.get("[data-cy=password]").type("prd");
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("incorrect email or password");
    });

    it("user can't login if email isn't in db", function () {
      cy.get("[data-cy=email]").type(email);
      cy.get("[data-cy=password]").type("prasdd");
      cy.get("[data-cy=submit]").click();
      cy.url().should("not.include", "/me");
      cy.contains("incorrect email or password");
    });

    it("user can navigate to signup page", function () {
      cy.get("[data-cy=login__link]").click();
      cy.url().should("include", "/signup");
      cy.contains("Join thousands of learners from around the world");
      cy.contains("or continue with these social profile");
    });
  });
});
