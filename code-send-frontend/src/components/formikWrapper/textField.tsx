import React, { useCallback } from "react";
import { Input, Form } from "antd";
import { useField } from "formik";

interface TextFieldProps {
  label: string;
  name: string;
  type?: "text" | "password";
}

export const TextField: React.FC<TextFieldProps> = ({ name, label, type }) => {
  const [field, meta] = useField({ name });
  const renderInput = useCallback(() => {
    switch (type) {
      case "text":
        return <Input {...field} id={name} />;
      case "password":
        return <Input.Password {...field} id={name} />;
      default:
        return <Input {...field} id={name} />;
    }
  }, [type, name, field]);
  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={meta.error && "error"}
      help={meta.error}
      htmlFor={name}
    >
      {renderInput()}
    </Form.Item>
  );
};
