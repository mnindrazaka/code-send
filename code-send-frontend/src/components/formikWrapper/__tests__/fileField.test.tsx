import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'
import FileField from '../fileField'
import * as yup from 'yup'
import { Formik } from 'formik'

const validationSchema = yup.object().shape({
  bundle: yup.mixed().required('bundle required')
})

const { getByPlaceholderText, getByText, findByText } = render(
  <Formik
    initialValues={{}}
    onSubmit={jest.fn()}
    validationSchema={validationSchema}
  >
    {() => <FileField label="Bundle" name="bundle" />}
  </Formik>
)

describe('file field', () => {
  it('has choose file button', () => {
    const buttonElement = getByText('Choose File')
    fireEvent.click(buttonElement)
    expect(buttonElement).toBeInTheDocument()
  })

  it('can change file name', async () => {
    const mockFile = new File(['mock content'], 'index.bundle.js')

    const inputElement = getByPlaceholderText('input file')
    fireEvent.change(inputElement, { target: { files: [mockFile] } })

    const valueElement = await findByText('index.bundle.js')
    expect(valueElement).toBeInTheDocument()
  })
})
