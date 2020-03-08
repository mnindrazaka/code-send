import React, {
  createContext,
  useState,
  useCallback,
  FunctionComponent,
  Dispatch,
  SetStateAction
} from "react";
import { notification } from "antd";
import { Project } from "interfaces/Project";

interface ProjectContextValue {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  selectedProject?: Project;
  setSelectedProject: Dispatch<SetStateAction<Project | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error?: string;
  setError: Dispatch<SetStateAction<string | undefined>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

export const projectContext = createContext<ProjectContextValue>({
  projects: [],
  setProjects: () => null,
  selectedProject: undefined,
  setSelectedProject: () => null,
  loading: false,
  setLoading: () => null,
  error: undefined,
  setError: () => null,
  success: false,
  setSuccess: () => null
});

const { Provider } = projectContext;

export const ProjectProvider: FunctionComponent = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Provider
      value={{
        projects,
        setProjects,
        selectedProject,
        setSelectedProject,
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess
      }}
    >
      {children}
    </Provider>
  );
};
