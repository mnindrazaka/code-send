import React from "react";
import { Menu, Layout } from "antd";
import { DashboardOutlined, GiftOutlined } from "@ant-design/icons";
import { Route, Redirect, Link, Switch } from "react-router-dom";
import Dashboard from "modules/dashboard";
import Update from "modules/update";

const Page: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>Code Send</Layout.Header>
      <Layout>
        <Layout.Sider>
          <Menu style={{ height: "100%" }}>
            <Menu.Item>
              <Link to="/dashboard">
                <DashboardOutlined />
                Dashboard
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/update">
                <GiftOutlined />
                Update
              </Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content style={{ padding: "30px" }}>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/update" component={Update} />
            <Redirect to="/dashboard" />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Page;
