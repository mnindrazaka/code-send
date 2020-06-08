/// <reference types="cypress" />

describe("workflow", () => {
  before(() => {
    cy.clearCookie('token')
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("token")
  })

  it('can fill register form', () => {
    cy.contains("Don't have account ? create one").click()

    cy.contains('Username').click().type('usertest')
    cy.contains('Password').click().type('usertest')
    cy.contains('Password Confirmation').click().type('usertest')

    cy.contains("Already have account ? login now").click()
  })

  it('can login to system', () => {
    cy.contains('Username').click().type('usertest')
    cy.contains('Password').click().type('usertest')
    cy.contains('Login Now').click()
    cy.wait(500)
  })

  it('can create new project', () => {
    cy.contains('Create New Project').click()
    cy.get('[placeholder="Awesome App"]').type('test project')
    cy.contains('Create Project Now').click()
  })

  it('can edit project', () => {
    cy.get('[title="Edit Project"]').click()
    cy.get('[placeholder="Awesome App"]').clear().type('edited test project')
    cy.contains('Edit Project Now').click()
  })

  it('can delete project', () => {
    cy.get('[title="Delete Project"]').click()
    cy.contains('Yes').click()
  })
})