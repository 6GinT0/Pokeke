/// <reference types="cypress" />

Cypress.Commands.add('testLogin', (email, password) => {
  cy.visit('/auth/login')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('testRegister', (displayName, email, password, confirmPassword) => {
  cy.visit('/auth/signup')
  cy.get('#displayName').type(displayName)
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('#confirmPassword').type(confirmPassword)
  cy.get('button[type="submit"]').click()
})
