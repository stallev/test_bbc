import { PagesData } from "../support/constants/PagesData";
import { RoutePath } from "../../src/constants/RoutePath";

describe('verify pages opening testing', () => {
  for (let key in PagesData) {
    if ((PagesData as { [key: string]: { path: string; title: string } })[key]?.path) {
      it(`Verify page ${key} opening`, () => {
        cy.verifyPageOpening(PagesData[key]);
      });
    }
  }
  
  it(`Verify upcoming event page opening`, () => {
    cy.visit(RoutePath.Home)
    cy.get('[class*=upcoming-events-list__menu-link]').first()
      .find('a')
      .click();
    cy.get('[class*=upcoming-event__title]').should('be.visible');
  });

  it(`Verify timeline event page opening`, () => {
    cy.visit(RoutePath.Timeline)
    cy.get('[class*=timeline-event__title]').first()
      .click();
    cy.get('h1[class*=timeline-event__title]').should('be.visible');
  });

  it(`Verify pastor page opening`, () => {
    cy.visit(RoutePath.Staff)
    cy.get('[class*=staff-person-card]').first()
      .find('a')
      .click();
    cy.get('[class*=staff-person__name]').should('be.visible');
  });

  it(`Verify blog post page opening`, () => {
    cy.visit(RoutePath.Blog)
    cy.get('[class*=blog-card__title]').first()
      .click();
    cy.get('[class*=pastors-post__title]').should('be.visible');
  });
})
