import React from "react";
import Register from "modules/register";
import Login from "modules/login";
import Project from "modules/project";
import Main from "modules/main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StoreProvider } from "stores";

const App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <StoreProvider>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/project" component={Project} />
          <Route path="/" component={Main} />
        </Switch>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
