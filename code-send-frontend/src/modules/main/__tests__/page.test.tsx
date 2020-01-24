import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'
import Page from '../page'
import { BrowserRouter } from 'react-router-dom'

const { container, getByTestId, findByTestId } = render(
  <BrowserRouter>
    <Page />
  </BrowserRouter>
)

test('render correctly', () => {
  expect(container).toBeInTheDocument()
})

test('move to dashboard page', async () => {
  const menuItemElement = getByTestId('menu-item-dashboard')
  fireEvent.click(menuItemElement)
  const pageElement = await findByTestId('page-dashboard')
  expect(pageElement).toBeInTheDocument()
})

test('move to update page', async () => {
  const menuItemElement = getByTestId('menu-item-update')
  fireEvent.click(menuItemElement)
  const pageElement = await findByTestId('page-update')
  expect(pageElement).toBeInTheDocument()
})
