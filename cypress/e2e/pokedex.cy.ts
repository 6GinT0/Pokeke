it('Non auth user tries to purchase Random Pokemon', () => {
  cy.visit('/pokedex')
  cy.url().should('include', '/login')
})
it('Auth user tries to access to pokedex page', () => {
  cy.testRegister('test', 'test@test.com', '12345678', '12345678')
  cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl)
  cy.visit('/pokedex')
  cy.get('.card')
  cy.task('deleteTestUser', { email: 'test@test.com' })
})
