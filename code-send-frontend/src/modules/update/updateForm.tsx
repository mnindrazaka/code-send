import React, { useState } from 'react'
import { TextField, Form, FileField } from 'components/formikWrapper'
import { UpdateFormValues } from 'interfaces/Update'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Loader, Dimmer } from 'semantic-ui-react'
import swal from 'sweetalert'
import codeSendService from 'utils/api/codeSendService'
import { useHistory } from 'react-router'

const validationSchema = yup.object().shape({
  version: yup.string().required(),
  note: yup.string().required(),
  bundle: yup.mixed().required()
})

const initialValues: UpdateFormValues = {
  version: '',
  note: ''
}

const UpdateForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = async ({ bundle, ...rest }: UpdateFormValues) => {
    setLoading(true)
    const { data } = await codeSendService.createUpdate(rest)
    await codeSendService.uploadUpdate(data._id, bundle!)
    history.push('/update')
    swal({
      title: 'Success',
      text: 'Update Created',
      icon: 'success'
    })
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

export default UpdateForm
