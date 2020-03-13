import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import UpdateLog from "./updateLog";
import UpdateForm from "./updateForm";

const Page: React.FC = () => {
  return (
    <Switch>
      <Route path="/update/log" component={UpdateLog} />
      <Route path={["/update/create", "/update/edit"]} component={UpdateForm} />
      <Redirect to="/update/log" />
    </Switch>
  );
};

export default Page;
