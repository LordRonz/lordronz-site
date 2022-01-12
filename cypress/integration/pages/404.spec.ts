import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Not Found Page', () => {
  beforeEach(() => {
    cy.visit({ url: 'http://localhost:3000/404/', failOnStatusCode: false });
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', '404');
    cy.get('h2').should('contain', 'Page Not Found');
  });
});
