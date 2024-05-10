/* eslint-disable jest/expect-expect */
import { beforeEach, cy, Cypress, describe, it } from 'local-cypress';

Cypress.on('uncaught:exception', (err) => {
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #329/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
  // Enable uncaught exception failures for other errors
});

describe('About Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about/');
  });

  it('should display correct heading', () => {
    cy.get('h1').should('contain', "Hey, I'm Aaron Christopher");
  });
});

Cypress.on('uncaught:exception', () => {});
