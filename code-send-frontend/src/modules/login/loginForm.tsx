import React, { useMemo } from "react";
import { Card, Button, Typography, Divider, Row, Col } from "antd";
import { Formik } from "formik";
import { Form, TextField } from "components/formikWrapper";
import * as yup from "yup";
import { UserFormValues } from "interfaces/User";
import { useLogin } from "hooks/api/useAuthApi";
import { useAuthState } from "hooks/store/useAuthStore";
import { Link } from "react-router-dom";
import { ReactComponent as LoginCover } from "assets/images/login.svg";

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
      <Row align="middle" gutter={30}>
        <Col span={12} style={{ padding: 30, textAlign: "center" }}>
          <LoginCover width={200} height={200} />
          <Typography.Title level={4}>Welcome Back</Typography.Title>
          <Typography.Paragraph>
            Login to continue development
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Login</Typography.Title>
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
              <Button
                style={{ marginBottom: 16 }}
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Login Now
              </Button>
              <Link to="/register">
                <Typography.Text>
                  Don't have account ? create one
                </Typography.Text>
              </Link>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Card>
  );
};

export default LoginForm;
