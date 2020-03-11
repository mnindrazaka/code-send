import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ProjectList from "./projectList";
import ProjectForm from "./projectForm";
import { Layout } from "antd";

const Page: React.FC = () => {
  return (
    <div data-testid="page-project">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header>Code Send</Layout.Header>
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
