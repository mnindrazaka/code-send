import React, { useMemo, useCallback } from "react";
import { Card, Button, Typography, Divider } from "antd";
import { Formik } from "formik";
import { Form, TextField } from "components/formikWrapper";
import * as yup from "yup";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required()
    });
  }, []);

  const initialValues: LoginFormValues = useMemo(() => {
    return { username: "", password: "" };
  }, []);

  const handleSubmit = useCallback((values: LoginFormValues) => {
    console.log(values);
  }, []);

  return (
    <Card>
      <Typography.Title level={4}>Login</Typography.Title>
      <Typography.Paragraph strong>
        Welcome back to code send
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
          <Divider />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default LoginForm;
