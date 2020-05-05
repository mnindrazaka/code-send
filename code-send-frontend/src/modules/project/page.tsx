import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout, Row, Col, Button } from "antd";
import Logo from "components/logo/logo";
import ProjectList from "./projectList";
import ProjectForm from "./projectForm";
import useProtectedRoute from "hooks/useProtectedRoute";
import { useLogout } from "hooks/api/useAuthApi";

const Page: React.FC = () => {
  useProtectedRoute();
  const { logout } = useLogout();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <Row justify="space-between">
          <Col>
            <Logo />
          </Col>
          <Col>
            <Button ghost onClick={logout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Content style={{ padding: "30px" }}>
          <Switch>
            <Route path="/project/list" component={ProjectList} />
            <Route
              path={["/project/create", "/project/edit"]}
              component={ProjectForm}
            />
            <Redirect to="/project/list" />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Page;
