import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render } from '@testing-library/react'
import UpdateForm from '../updateForm'

const { container } = render(<UpdateForm />)

test('render correctly', async () => {
  expect(container).toBeInTheDocument()
})
