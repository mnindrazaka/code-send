import React, { useMemo } from "react";
import { Card, Button, Typography, Divider } from "antd";
import { Formik } from "formik";
import { Form, TextField } from "components/formikWrapper";
import * as yup from "yup";
import { UserFormValues } from "interfaces/User";
import { useRegister } from "hooks/api/useAuthApi";
import { useAuthState } from "hooks/store/useAuthStore";

interface RegisterFormValues extends UserFormValues {
  passwordConfirmation: string;
}

const RegisterForm = () => {
  const { loading } = useAuthState();
  const { register } = useRegister();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
      passwordConfirmation: yup
        .string()
        .required()
        .label("password confirmation")
        .oneOf([yup.ref("password"), null], "password must match")
    });
  }, []);

  const initialValues: RegisterFormValues = useMemo(() => {
    return { username: "", password: "", passwordConfirmation: "" };
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
        onSubmit={register}
      >
        <Form>
          <TextField name="username" label="Username" />
          <TextField name="password" label="Password" type="password" />
          <TextField
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
          />
          <Divider />
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default RegisterForm;
