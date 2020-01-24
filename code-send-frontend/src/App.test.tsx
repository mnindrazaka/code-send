import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('render correctly', () => {
  const { container } = render(<App />)
  expect(container).toBeInTheDocument()
})
