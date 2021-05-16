describe("Auth app", function () {
  const email = "amigo@gta.vi";
  const password = "amigofuego";

  describe("Signup", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3001/signup");
    });

    it("Signup page can be opened", function () {
      cy.contains("Join thousands of learners from around the world");
      cy.contains("or continue with these social profile");
    });

    it("user can signup", function () {
      cy.get("input[name='email']").type(email);
      cy.get("input[name='password']").type(password);
      cy.get(".auth__submit").click();
      cy.url().should("include", "/me");
      cy.contains(email);
    });

    it("user can't signup if email is invalid and see validation message", function () {
      cy.get("input[name='email']").type("email");
      cy.get("input[name='password']").type(password);
      cy.get(".auth__submit").click();
      cy.url().should("not.include", "/me");
      cy.contains("Please enter a valid email address.");
    });

    it("user can't signup if password is invalid and see validation message", function () {
      cy.get("input[name='email']").type(email);
      cy.get("input[name='password']").type("prd");
      cy.get(".auth__submit").click();
      cy.url().should("not.include", "/me");
      cy.contains("Minimum password length: 5, allowed chars a-z A-Z 0-9");
    });

    it("user can't signup if email is already taken", function () {
      cy.get("input[name='email']").type(email);
      cy.get("input[name='password']").type("prd");
      cy.get(".auth__submit").click();
      cy.url().should("not.include", "/me");
      cy.contains("Minimum password length: 5, allowed chars a-z A-Z 0-9");
    });

    it("user can navigate to login page", function () {
      cy.get(".signUp__link").click();
      cy.url().should("include", "/signin");
      cy.contains("Login");
    });
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3001/signin");
    });

    it("Login page can be opened", function () {
      cy.url().should("include", "/signin");
      cy.contains("Login");
    });

    it("user can login", function () {
      cy.get("input[name='email']").type(email);
      cy.get("input[name='password']").type(password);
      cy.get(".auth__submit").click();
      cy.url().should("include", "/me");
      cy.contains(email);
    });

    it("user can't login if email is invalid and see validation message", function () {
      cy.get("input[name='email']").type("email");
      cy.get("input[name='password']").type(password);
      cy.get(".auth__submit").click();
      cy.url().should("not.include", "/me");
      cy.contains("Please enter a valid email address.");
    });

    it("user can't login if password is incorrect and see error", function () {
      cy.get("input[name='email']").type(email);
      cy.get("input[name='password']").type("prd");
      cy.get(".auth__submit").click();
      cy.url().should("not.include", "/me");
      cy.contains("incorrect email or password");
    });

    it("user can't login if email isn't in db", function () {
      cy.get("input[name='email']").type(email + "i");
      cy.get("input[name='password']").type("prasdd");
      cy.get(".auth__submit").click();
      cy.url().should("not.include", "/me");
      cy.contains("incorrect email or password");
    });

    it("user can navigate to signup page", function () {
      cy.get(".login__link").click();
      cy.url().should("include", "/signup");
      cy.contains("Join thousands of learners from around the world");
      cy.contains("or continue with these social profile");
    });
  });
});
