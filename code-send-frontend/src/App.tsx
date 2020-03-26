import React from "react";
import Project from "modules/project";
import Main from "modules/main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StoreProvider } from "stores";

const App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <StoreProvider>
        <Switch>
          <Route path="/project" component={Project} />
          <Route path="/" component={Main} />
        </Switch>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
