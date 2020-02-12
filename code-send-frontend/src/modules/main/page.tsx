import React from "react";
import { Menu, Grid } from "semantic-ui-react";
import { Link, Route, Redirect } from "react-router-dom";
import Dashboard from "modules/dashboard";
import Update from "modules/update";

const Page: React.FC = () => {
  return (
    <>
      <Menu>
        <Menu.Item header>Code Send</Menu.Item>
      </Menu>

      <Grid columns={2}>
        <Grid.Column width={3}>
          <Menu vertical>
            <Menu.Item
              as={Link}
              to="/dashboard"
              data-testid="menu-item-dashboard"
            >
              Dashboard
            </Menu.Item>
            <Menu.Item as={Link} to="/update" data-testid="menu-item-update">
              Update Log
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/update" component={Update} />
          <Route render={() => <Redirect to="/dashboard" />} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Page;
