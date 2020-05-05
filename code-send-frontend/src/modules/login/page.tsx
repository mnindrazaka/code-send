import React from "react";
import { Layout, Row, Col } from "antd";
import LoginForm from "./loginForm";
import useRedirectIfAuthenticated from "hooks/useRedirectIfAuthenticated";

const Page = () => {
  useRedirectIfAuthenticated();
  return (
    <Layout style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }} justify="center" align="middle">
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Layout>
  );
};

export default Page;
