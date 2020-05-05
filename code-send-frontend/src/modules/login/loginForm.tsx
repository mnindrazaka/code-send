import React, { useMemo } from "react";
import { Card, Button, Typography, Divider } from "antd";
import { Formik } from "formik";
import { Form, TextField } from "components/formikWrapper";
import * as yup from "yup";
import { UserFormValues } from "interfaces/User";
import { useLogin } from "hooks/api/useAuthApi";
import { useAuthState } from "hooks/store/useAuthStore";

const LoginForm = () => {
  const { loading } = useAuthState();
  const { login } = useLogin();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required()
    });
  }, []);

  const initialValues: UserFormValues = useMemo(() => {
    return { username: "", password: "" };
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
        onSubmit={login}
      >
        <Form>
          <TextField name="username" label="Username" />
          <TextField name="password" label="Password" type="password" />
          <Divider />
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default LoginForm;
