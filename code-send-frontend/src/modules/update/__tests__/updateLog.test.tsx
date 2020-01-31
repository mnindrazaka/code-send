import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import UpdateLog from '../updateLog'

const { container } = render(
  <BrowserRouter>
    <UpdateLog />
  </BrowserRouter>
)

describe('update log', () => {
  it('can render correctly', async () => {
    expect(container).toBeInTheDocument()
  })
})