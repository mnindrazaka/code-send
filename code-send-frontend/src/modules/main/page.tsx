import React from "react";
import { Menu, Layout } from "antd";
import { DashboardOutlined, GiftOutlined } from "@ant-design/icons";
import { Route, Redirect, Link, Switch, useHistory } from "react-router-dom";
import Dashboard from "modules/dashboard";
import Update from "modules/update";
import { NavigationMenuItem } from "interfaces/Navigation";

const navigationMenuItems: NavigationMenuItem[] = [
  {
    path: "/dashboard",
    component: Dashboard,
    title: "Dashboard",
    icon: <DashboardOutlined />
  },
  {
    path: "/update",
    component: Update,
    title: "Update",
    icon: <GiftOutlined />
  }
];

const Navigation = () => {
  const { location } = useHistory();

  const selectedKeys = React.useMemo(() => {
    const key = navigationMenuItems
      .findIndex(({ path }) => location.pathname.includes(path))
      .toString();
    return [key];
  }, [location.pathname]);

  return (
    <Menu style={{ height: "100%" }} selectedKeys={selectedKeys}>
      {navigationMenuItems.map(({ path, title, icon }, index) => (
        <Menu.Item key={index}>
          <Link to={path}>
            {icon}
            {title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

const Content = () => {
  return (
    <Switch>
      {navigationMenuItems.map(({ path, component }, index) => (
        <Route key={index} path={path} component={component} />
      ))}
      <Redirect to={navigationMenuItems[0].path} />
    </Switch>
  );
};

const Page: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>Code Send</Layout.Header>
      <Layout>
        <Layout.Sider>
          <Navigation />
        </Layout.Sider>
        <Layout.Content style={{ padding: "30px" }}>
          <Content />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Page;
