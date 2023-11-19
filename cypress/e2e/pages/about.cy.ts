/* eslint-disable jest/expect-expect */
import { beforeEach, cy, describe, it } from 'local-cypress';

describe('About Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about/');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', "Hey, I'm Aaron Christopher");
  });
});
