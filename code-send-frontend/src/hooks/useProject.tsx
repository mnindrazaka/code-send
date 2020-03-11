import { useEffect } from "react";
import { ProjectFormValues, Project } from "interfaces/Project";
import codeSendService from "utils/api/codeSendService";
import { useNotification } from "hooks/useNotification";
import { useProjectState, useProjectAction } from "./useStore";
import { useHistory } from "react-router-dom";

export const useGetAllProject = () => {
  const { items, loading, error } = useProjectState();
  const {
    getProjectRequest,
    getProjectSuccess,
    getProjectError
  } = useProjectAction();
  const { handleError } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        getProjectRequest();
        const projects = await codeSendService.getallProjects();
        getProjectSuccess(projects);
      } catch (error) {
        getProjectError(error.message);
        handleError("Failed", error.message);
      }
    })();
  }, [getProjectRequest, getProjectSuccess, getProjectError, handleError]);

  return { items, loading, error };
};

export const useCreateProject = () => {
  const { loading, error } = useProjectState();
  const {
    createProjectRequest,
    createProjectSuccess,
    createProjectError
  } = useProjectAction();
  const { handleSuccess, handleError } = useNotification();
  const { push } = useHistory();

  const createProject = async (projectFormValues: ProjectFormValues) => {
    try {
      createProjectRequest();
      const project = await codeSendService.createProject(projectFormValues);
      createProjectSuccess(project);
      handleSuccess("Success", "Your project is successfully created");
      push("/project");
    } catch (error) {
      createProjectError(error.message);
      handleError("Failed", error.message);
    }
  };

  return {
    createProject,
    loading,
    error
  };
};

export const useSelectProject = () => {
  const projectAction = useProjectAction();
  const { push } = useHistory();

  const selectProject = (project: Project) => {
    projectAction.selectProject(project);
    push("/dashboard");
  };

  return { selectProject };
};
