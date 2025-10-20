describe('Authentication', () => {
  it('Non auth user visit pokedex page redirect to login', () => {
    cy.visit('/pokedex')
    cy.url().should('include', '/login')
  })
  it('When user can login should fail', () => {
    cy.visit('/auth/login')
    cy.testLogin('test@test.com', '12345678')
    cy.get('.p-toast-message-error').contains('Error')
  })
  it('When user can register', () => {
    cy.visit('/auth/signup')
    cy.testRegister('test', 'test@test.com', '12345678', '12345678')
    cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl)
  })
  it('When user can register should fail', () => {
    cy.visit('/auth/signup')
    cy.testRegister('test', 'test@test.com', '12345678', '12345678')
    cy.get('.p-toast-message-error').contains('Error')
  })
  it('When user can login', () => {
    cy.visit('/auth/login')
    cy.testLogin('test@test.com', '12345678')
    cy.loginWithEmailAndPassword('test@test.com', '12345678')
    cy.url().should('contains', Cypress.config().baseUrl)
  })
  it('When user can logout', () => {
    cy.visit('/')
    cy.viewport(1280, 720)
    cy.contains('button', 'Logout').click()
    cy.url().should('include', '/login')
  })
  it('Delete auth user', () => {
    cy.task('deleteTestUser', { email: 'test@test.com' })
    cy.visit('/pokedex')
    cy.url().should('include', '/login')
  })
})
