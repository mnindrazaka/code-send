import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'
import { TextField } from '../textField'
import { Formik } from 'formik'
import * as yup from 'yup'

const name = 'username'
const label = 'Username'

const validationSchema = yup.object().shape({
  username: yup.string().required('username required')
})

const { getByLabelText, findByText } = render(
  <Formik
    initialValues={{ username: '' }}
    onSubmit={jest.fn()}
    validationSchema={validationSchema}
  >
    {() => <TextField label={label} name={name} />}
  </Formik>
)

describe('text field', () => {
  it('can change text value', async () => {
    const inputElement = getByLabelText(label)
    fireEvent.change(inputElement, { target: { value: 'mockValue' } })
    expect(inputElement).toHaveValue('mockValue')
  })

  it('can show error message', async () => {
    const inputElement = getByLabelText(label)
    fireEvent.change(inputElement, { target: { value: 'mockValue' } })
    fireEvent.change(inputElement, { target: { value: '' } })
    const errorElement = await findByText('username required')
    expect(errorElement).toBeInTheDocument()
  })
})
