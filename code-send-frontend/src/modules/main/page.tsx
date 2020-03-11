import React from "react";
import { Menu, Layout, Row, Col, Typography, Select } from "antd";
import { DashboardOutlined, GiftOutlined } from "@ant-design/icons";
import { Route, Redirect, Link, Switch, useHistory } from "react-router-dom";
import Dashboard from "modules/dashboard";
import Update from "modules/update";
import { NavigationMenuItem } from "interfaces/Navigation";
import { useProjectState } from "hooks/useStore";
import { useSelectProject } from "hooks/useProject";

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

const ProjectSelector = () => {
  const { items, selected } = useProjectState();
  const { selectProject } = useSelectProject();

  const handleChange = (value: string) => {
    const project = items.find(item => item._id === value);
    if (project) selectProject(project);
  };

  return (
    <Select
      placeholder="Select Project"
      value={selected?._id}
      onChange={handleChange}
      style={{ minWidth: 130 }}
    >
      {items.map((item, index) => (
        <Select.Option key={index} value={item._id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

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
  const { selected } = useProjectState();
  return selected ? (
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
          <Col>
            <ProjectSelector />
          </Col>
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <Navigation />
        </Layout.Sider>
        <Layout.Content>
          <Content />
        </Layout.Content>
      </Layout>
    </Layout>
  ) : (
    <Redirect to="/project" />
  );
};

export default Page;
