import React from 'react'
import { Formik } from 'formik'
import { Form } from 'semantic-ui-react'
import { TextField } from 'components/formikWrapper'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  username: yup.string().required()
})

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Formik
          initialValues={{ username: '' }}
          onSubmit={() => {}}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <TextField
                label="Username"
                name="username"
                placeholder="Enter Username"
              />
            </Form>
          )}
        </Formik>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
