import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useField } from 'formik'

interface FileFieldProps {
  label: string
  name: string
}

const FileField: React.FC<FileFieldProps> = ({ label, name }) => {
  const [field, meta, helper] = useField<File>({ name })
  let inputFile: HTMLInputElement | null = null

  const handleButtonClick = () => {
    inputFile && inputFile.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    helper.setValue(selectedFile!)
  }

  const renderInput = () => {
    return (
      <>
        <label htmlFor={label}>{label}</label>
        <input
          id={label}
          type="file"
          ref={ref => (inputFile = ref)}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          onBlur={field.onBlur}
        />
      </>
    )
  }

  const renderButton = () => {
    return (
      <>
        <Button type="button" primary basic onClick={handleButtonClick}>
          Choose File
        </Button>
        <label>{field.value && field.value.name}</label>
      </>
    )
  }

  return (
    <Form.Field error={meta.error}>
      {renderInput()}
      {renderButton()}
    </Form.Field>
  )
}

export default FileField
