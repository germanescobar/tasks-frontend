/// <reference types="Cypress" />

const TODO_RESPONSE = {
  statusCode: 201,
  body: {
    _id: 1234567890,
    title: 'Learn',
    completed: false,
  },
};

const ENDPOINT = 'http://localhost:3001/api/tasks';

describe('TodoList', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('its work', () => {
    cy.get('input').should('be.visible');
  });

  it('adds 1 item to todo', () => {
    cy.get('input').type('learn{enter}');
    cy.wait(500);
    cy.contains('Learn');
  });

  // INTERCEPTO
  // it('adds 1 item to todo', () => {
  //   cy.intercept('POST', ENDPOINT, TODO_RESPONSE);
  //   cy.get('input').type('learn{enter}');
  //   cy.wait(500);
  //   cy.contains('Learn');
  // });

  it.skip('adds 1 item to todo', () => {
    cy.get('input').type('learn{enter}');
    cy.contains('Learn');
  });

  it.only('Check Learn options', () => {
    cy.contains('Learn').find('[type="checkbox"]').should('not.be.checked');
    cy.contains('Learn').find('[type="checkbox"]').check();
    cy.contains('Learn').find('[type="checkbox"]').should('be.checked');
    // cy.get('[data-cy="link-completed"]').click();
    // cy.contains('Learn');
  });

  it('Unchecked Learn options', () => {
    cy.xpath('//li[contains(text(),"Learn")]/input').uncheck();
    cy.get('[data-cy="link-completed"]').click();
    cy.xpath('//li[contains(text(),"Learn")]').should('not.exist');
  });
});
