import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { render } from '@testing-library/react'

export const renderFormik = (input: React.ReactNode, name: string) => {
  const validationSchema = yup.object().shape({
    [name]: yup.mixed().required('input required')
  })

  return render(
    <Formik
      initialValues={{ [name]: '' }}
      onSubmit={jest.fn()}
      validationSchema={validationSchema}
    >
      {() => input}
    </Formik>
  )
}
