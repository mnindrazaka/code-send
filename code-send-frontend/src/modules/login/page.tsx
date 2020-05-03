import React from "react";
import { Layout, Row, Col } from "antd";
import LoginForm from "./loginForm";

const Page = () => {
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
