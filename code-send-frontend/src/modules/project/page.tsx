import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import Logo from "components/logo/logo";
import ProjectList from "./projectList";
import ProjectForm from "./projectForm";

const Page: React.FC = () => {
  return (
    <div data-testid="page-project">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header>
          <Row justify="space-between">
            <Col>
              <Logo />
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
    </div>
  );
};

export default Page;
