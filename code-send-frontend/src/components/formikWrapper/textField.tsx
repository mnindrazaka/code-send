import React from 'react'
import { Form } from 'semantic-ui-react'
import { useField } from 'formik'

interface TextFieldProps {
  label: string
  name: string
  placeholder: string
}

export const TextField: React.FC<TextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField({ name })
  return <Form.Input {...props} {...field} error={meta.error} />
}
