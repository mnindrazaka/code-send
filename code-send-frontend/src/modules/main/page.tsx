import React from "react";
import { Menu, Layout, Dropdown, Button } from "antd";
import {
  DashboardOutlined,
  GiftOutlined,
  DownOutlined
} from "@ant-design/icons";
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

  const selectedKeys = React.useMemo(() => {
    return items.findIndex(item => item.name === selected?.name).toString();
  }, [items, selected]);

  const renderMenu = () => {
    return (
      <Menu selectedKeys={[selectedKeys]} data-testid="project-selector-button">
        {items.map((item, index) => (
          <Menu.Item
            key={index}
            onClick={() => selectProject(item)}
            data-testid="project-selector-item"
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={renderMenu()}>
      <Button>
        {selected?.name} <DownOutlined />
      </Button>
    </Dropdown>
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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <ProjectSelector />
      </Layout.Header>
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
