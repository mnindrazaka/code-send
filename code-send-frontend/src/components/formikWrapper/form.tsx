import React from "react";
import { Form as AntdForm } from "antd";
import { useFormikContext } from "formik";

export const Form: React.FC = ({ children }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AntdForm onSubmitCapture={handleSubmit} layout="vertical">
      {children}
    </AntdForm>
  );
};
