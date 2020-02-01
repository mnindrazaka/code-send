import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useField } from 'formik'

interface FileFieldProps {
  label: string
  name: string
}

const FileField: React.FC<FileFieldProps> = ({ label, name }) => {
  const [field, meta, helper] = useField<File>({ name })
  let inputFile: HTMLInputElement | null = null

  const isError = () => {
    return meta.error !== undefined
  }

  const handleButtonClick = () => {
    inputFile && inputFile.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    helper.setValue(selectedFile!)
  }

  const renderInput = () => {
    return (
      <input
        id={label}
        type="file"
        ref={ref => (inputFile = ref)}
        hidden
        onChange={handleFileChange}
        onBlur={field.onBlur}
      />
    )
  }

  const renderButton = () => {
    return (
      <Button
        type="button"
        icon="upload"
        content="Choose File"
        negative={isError()}
        basic
        onClick={handleButtonClick}
        style={{ marginRight: 10 }}
      />
    )
  }

  const renderMessage = () => {
    const message = isError() ? meta.error : field.value ? field.value.name : ''
    return (
      message && (
        <Message negative={isError()} compact size="tiny">
          {message}
        </Message>
      )
    )
  }

  return (
    <Form.Field error={isError()}>
      <label htmlFor={label}>{label}</label>
      {renderInput()}
      {renderButton()}
      {renderMessage()}
    </Form.Field>
  )
}

export default FileField
