import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import UpdateLog from "./updateLog";
import UpdateForm from "./updateForm";

const Page: React.FC = () => {
  return (
    <div data-testid="page-update">
      <Switch>
        <Route path="/update/log" component={UpdateLog} />
        <Route path="/update/create" component={UpdateForm} />
        <Route render={() => <Redirect to="/update/log" />} />
      </Switch>
    </div>
  );
};

export default Page;
