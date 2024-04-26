describe("auth", () => {
  it("can login", () => {
    const email = "fwaef@example.com";
    const password = "faweaewfaewfwafe";
    cy.intercept("/api/v1/auth/validate", {
      body: { statusCode: 401 },
      statusCode: 401,
    });
    cy.intercept("/api/v1/products", { body: [] });
    cy.intercept("/api/v1/auth/signin", {
      body: { statusCode: 200 },
      statusCode: 200,
    }).as("signin");
    cy.visit("/");
    cy.get("[data-testid=auth-email-input]").type(email);
    cy.get("[data-testid=auth-password-input]").type(password);
    cy.get("[data-testid=login-button]").click();
    cy.wait("@signin").then((interception) => {
      expect(interception.request.method).to.eq("POST");
      expect(interception.request.body).to.deep.equal({
        email: email,
        password: password,
      });
    });
  });
});
