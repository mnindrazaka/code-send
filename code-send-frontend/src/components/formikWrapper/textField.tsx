import React from "react";
import { Input, Form } from "antd";
import { useField } from "formik";

interface TextFieldProps {
  label: string;
  name: string;
}

export const TextField: React.FC<TextFieldProps> = ({ name, label }) => {
  const [field, meta] = useField({ name });
  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={meta.error && "error"}
      help={meta.error}
      htmlFor={name}
    >
      <Input {...field} id={name} />
    </Form.Item>
  );
};
