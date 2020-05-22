import React, { useMemo } from "react";
import { Card, Button, Typography, Divider, Row, Col } from "antd";
import { Formik } from "formik";
import { Form, TextField } from "components/formikWrapper";
import * as yup from "yup";
import { UserFormValues } from "interfaces/User";
import { useRegister } from "hooks/api/useAuthApi";
import { useAuthState } from "hooks/store/useAuthStore";
import { Link } from "react-router-dom";
import { ReactComponent as RegisterCover } from "assets/images/register.svg";

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
      <Row align="middle" gutter={30}>
        <Col span={12} style={{ padding: 30, textAlign: "center" }}>
          <RegisterCover width={200} height={200} />
          <Typography.Title level={4}>Welcome</Typography.Title>
          <Typography.Paragraph>
            Join us to start your wonderful development experience
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Register</Typography.Title>
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
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{ marginBottom: 16 }}
              >
                Register Now
              </Button>
              <Link to="/login">
                <Typography.Text>
                  Already have account ? login now
                </Typography.Text>
              </Link>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Card>
  );
};

export default RegisterForm;
