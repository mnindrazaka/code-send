import React from "react";
import Main from "modules/main";
import { BrowserRouter } from "react-router-dom";
import { ProjectProvider } from "contexts/projectContext";
import { UpdateProvider } from "contexts/updateContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <UpdateProvider>
          <Main />
        </UpdateProvider>
      </ProjectProvider>
    </BrowserRouter>
  );
};

export default App;
