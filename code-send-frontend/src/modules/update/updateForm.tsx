import React, { useState } from 'react'
import { TextField, Form } from 'components/formikWrapper'
import { UpdateFormValues } from 'interfaces/Update'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Loader, Dimmer } from 'semantic-ui-react'
import { callApi } from 'utils/api/callApi'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import FileField from 'components/formikWrapper/fileField'

const validationSchema = yup.object().shape({
  version: yup.string().required(),
  note: yup.string().required(),
  bundle: yup.mixed().required()
})

const initialValues: UpdateFormValues = {
  version: '',
  note: ''
}

const UpdateForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: UpdateFormValues) => {
    setLoading(true)
    await callApi('/update', 'post', values)
    history.push('/update')
  }

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField name="version" label="Version" />
          <TextField name="note" label="Note" />
          <FileField name="bundle" label="Bundle" />
          <Button type="submit" primary>
            Submit
          </Button>
        </Form>
      </Formik>
    )
  }

  const renderLoading = () => {
    return (
      <Dimmer active inverted data-testid="loading">
        <Loader inverted size="medium">
          Submitting Update
        </Loader>
      </Dimmer>
    )
  }

  return (
    <div data-testid="page-update-form">
      {loading ? renderLoading() : renderForm()}
    </div>
  )
}

export default withRouter(UpdateForm)
