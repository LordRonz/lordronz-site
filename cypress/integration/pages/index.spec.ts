import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', 'Henlo there');
  });
});
