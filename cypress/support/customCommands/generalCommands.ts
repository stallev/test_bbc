Cypress.Commands.add('verifyPageOpening', pageData => {
  cy.visit(pageData.path);
  cy.get('h1[class*="__title"]');
});
