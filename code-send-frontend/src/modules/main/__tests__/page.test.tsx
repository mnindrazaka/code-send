import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render } from '@testing-library/react'
import Page from '../page'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const history = createMemoryHistory()
const { findByTestId } = render(
  <Router history={history}>
    <Page />
  </Router>
)

describe('main', () => {
  it('can move to dashboard page', async () => {
    history.push('/dashboard')
    const pageElement = await findByTestId('page-dashboard')
    expect(pageElement).toBeInTheDocument()
  })

  it('can move to update page', async () => {
    history.push('/update')
    const pageElement = await findByTestId('page-update')
    expect(pageElement).toBeInTheDocument()
  })
})
