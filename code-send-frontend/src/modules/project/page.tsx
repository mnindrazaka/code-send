import React from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import ProjectList from "./projectList";
import ProjectForm from "./projectForm";
import { Layout, Row, Col, Typography } from "antd";

const Page: React.FC = () => {
  return (
    <div data-testid="page-project">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header>
          <Row justify="space-between">
            <Col>
              <Link to="/project">
                <Typography.Text strong style={{ color: "white" }}>
                  Code Send
                </Typography.Text>
              </Link>
            </Col>
          </Row>
        </Layout.Header>
        <Layout>
          <Layout.Content style={{ padding: "30px" }}>
            <Switch>
              <Route path="/project/list" component={ProjectList} />
              <Route path="/project/create" component={ProjectForm} />
              <Route render={() => <Redirect to="/project/list" />} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Page;
