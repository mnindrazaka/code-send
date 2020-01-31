import React from 'react'
import { Form, Input } from 'semantic-ui-react'
import { useField } from 'formik'

interface TextFieldProps {
  label: string
  name: string
}

export const TextField: React.FC<TextFieldProps> = ({ name, label }) => {
  const [field, meta] = useField({ name })
  return (
    <Form.Field
      id={name}
      label={label}
      control={Input}
      error={meta.error}
      {...field}
    ></Form.Field>
  )
}
