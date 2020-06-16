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
    cy.wait(5000)
  })

  it('can create new project', () => {
    cy.contains('Create New Project').click()
    cy.get('[placeholder="Awesome App"]').type('test project')
    cy.contains('Create Project Now').click()
    cy.wait(2000)
  })

  it('can edit project', () => {
    cy.get('[title="Edit Project"]').click()
    cy.get('[placeholder="Awesome App"]').clear().type('edited test project')
    cy.contains('Edit Project Now').click()
    cy.wait(2000)
  })

  it('can select project', () => {
    cy.contains('edited test project').click({ force: true })
  })

  it('can create global update', () => {
    cy.contains('Update').click()
    cy.contains('Create New Update').click()
    cy.contains('Version').click().type('0.1')
    cy.contains('Note').click().type('first update')
    cy.get('[id="bundle"]').attachFile("example.json");
    cy.contains('Submit').click()
    cy.wait(2000)
  })

  it('can edit update', () => {
    cy.contains('Edit').click()
    cy.get('[id="note"]').clear().type('edited first update')
    cy.contains('Submit').click()
    cy.wait(2000)
  })

  it('can create regional update', () => {
    cy.contains('Create New Update').click()
    cy.contains('Version').click().type('0.2')
    cy.contains('Note').click().type('second update')
    cy.get('[id="bundle"]').attachFile("example.json");
    cy.contains('Release update only on particular location').click()
    cy.contains('Location').click().type('Jawa Timur')
    cy.wait(6000)
    cy.contains('Location').click({ force: true }).type(', Indonesia')
    cy.contains('Submit').click()
    cy.wait(2000)
  })

  it('can see latest update', () => {
    cy.contains('Dashboard').click()
    cy.contains('0.2')
    cy.contains('second update')
  })

  it('can back to project list by clicking logo', () => {
    cy.contains('Code Send').click()
    cy.wait(2000)
  })

  it('can delete project', () => {
    cy.get('[title="Delete Project"]').click()
    cy.contains('Yes').click()
  })

  it('can logout from system', () => {
    cy.contains('Logout').click()
  })
})