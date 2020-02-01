import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import UpdateForm from '../updateForm'

const history = createMemoryHistory()
const { getByLabelText, getByText, findByTestId } = render(
  <Router history={history}>
    <UpdateForm />
  </Router>
)

describe('update form', () => {
  it('can show loading after submit', async () => {
    const inputVersionElement = getByLabelText('Version')
    const inputNoteElement = getByLabelText('Note')
    const inputBundleElement = getByLabelText('Bundle')
    const submitElement = getByText('Submit')

    const mockFile = new File(['mock content'], 'index.bundle.js')

    fireEvent.change(inputVersionElement, { target: { value: 'mockVersion' } })
    fireEvent.change(inputNoteElement, { target: { value: 'mockNote' } })
    fireEvent.change(inputBundleElement, { target: { files: [mockFile] } })
    fireEvent.click(submitElement)

    const loadingElement = await findByTestId('loading')
    expect(loadingElement).toBeInTheDocument()
  })
})
