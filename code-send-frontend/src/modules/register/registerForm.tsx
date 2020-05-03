import React, { useMemo, useCallback } from "react";
import { Card, Button, Typography, Divider } from "antd";
import { Formik } from "formik";
import { Form, TextField } from "components/formikWrapper";
import * as yup from "yup";

interface RegisterFormValues {
  username: string;
  password: string;
  confirmationPassword: string;
}

const RegisterForm = () => {
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
      confirmationPassword: yup
        .string()
        .required()
        .label("confirmation password")
    });
  }, []);

  const initialValues: RegisterFormValues = useMemo(() => {
    return { username: "", password: "", confirmationPassword: "" };
  }, []);

  const handleSubmit = useCallback((values: RegisterFormValues) => {
    console.log(values);
  }, []);

  return (
    <Card>
      <Typography.Title level={4}>Register</Typography.Title>
      <Typography.Paragraph strong>
        Join to code send to start your development
      </Typography.Paragraph>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField name="username" label="Username" />
          <TextField name="password" label="Password" type="password" />
          <TextField
            name="confirmationPassword"
            label="Confirmation Password"
            type="password"
          />
          <Divider />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default RegisterForm;
