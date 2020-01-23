import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'
import { TextField } from '../textField'
import { Formik } from 'formik'
import * as yup from 'yup'

const name = 'username'
const label = 'Username'
const placeholder = 'Enter Username'

const validationSchema = yup.object().shape({
  username: yup.string().required('username required')
})

const { getByText, getByPlaceholderText, findByText } = render(
  <Formik
    initialValues={{ username: '' }}
    onSubmit={jest.fn()}
    validationSchema={validationSchema}
  >
    {() => <TextField label={label} name={name} placeholder={placeholder} />}
  </Formik>
)

test('render label', () => {
  const labelElement = getByText(label)
  expect(labelElement).toBeInTheDocument()
})

test('render value', async () => {
  const inputElement = getByPlaceholderText(placeholder)
  fireEvent.change(inputElement, { target: { value: 'a' } })
  expect(inputElement).toHaveValue('a')
})

test('render error message', async () => {
  const inputElement = getByPlaceholderText(placeholder)
  fireEvent.change(inputElement, { target: { value: 'a' } })
  fireEvent.change(inputElement, { target: { value: '' } })
  const errorElement = await findByText('username required')
  expect(errorElement).toBeInTheDocument()
})
