import React, { FunctionComponent } from "react";
import { ProjectProvider } from "./projectContext";
import { UpdateProvider } from "./updateContext";

export const AppProvider: FunctionComponent = ({ children }) => {
  return (
    <ProjectProvider>
      <UpdateProvider>{children}</UpdateProvider>
    </ProjectProvider>
  );
};
