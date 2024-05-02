declare namespace Cypress {
  interface Chainable {
    verifyPageOpening(pageData: PageProps): void;
  }
}
