import React, { useRef } from "react";
import { Form, Button, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useField } from "formik";

interface FileFieldProps {
  label?: React.ReactNode;
  name: string;
}

export const FileField: React.FC<FileFieldProps> = ({ label, name }) => {
  const [field, meta, helper] = useField<File>({ name });
  const inputFileRef = useRef<HTMLInputElement>(null);

  const isError = () => {
    return meta.error !== undefined;
  };

  const handleButtonClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    helper.setValue(selectedFile!);
  };

  const renderInput = () => {
    return (
      <input
        id={name}
        type="file"
        ref={inputFileRef}
        hidden
        onChange={handleFileChange}
        onBlur={field.onBlur}
      />
    );
  };

  const renderButton = () => {
    return (
      <Button onClick={handleButtonClick} style={{ marginRight: 15 }}>
        <UploadOutlined /> Choose File
      </Button>
    );
  };

  const renderMessage = () => {
    const message = isError()
      ? meta.error
      : field.value
      ? field.value.name
      : "";

    return (
      <Typography.Text type={isError() ? "danger" : "secondary"}>
        {message}
      </Typography.Text>
    );
  };

  return (
    <Form.Item label={label} htmlFor={name}>
      {renderInput()}
      {renderButton()}
      {renderMessage()}
    </Form.Item>
  );
};
