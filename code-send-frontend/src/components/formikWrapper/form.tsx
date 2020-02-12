import React from "react";
import { Form as SemanticForm } from "semantic-ui-react";
import { useFormikContext } from "formik";

export const Form: React.FC = ({ children }) => {
  const { handleSubmit } = useFormikContext();
  return <SemanticForm onSubmit={handleSubmit}>{children}</SemanticForm>;
};
