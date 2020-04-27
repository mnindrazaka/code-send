import { useCallback, useContext } from "react";
import {
  getProjectRequestAction,
  getProjectSuccessAction,
  getProjectErrorAction,
  createProjectRequestAction,
  createProjectSuccessAction,
  createProjectErrorAction,
  editProjectRequestAction,
  editProjectSuccessAction,
  editProjectErrorAction,
  selectProjectAction,
  clearSelectedProjectAction,
  deleteProjectRequestAction,
  deleteProjectSuccessAction,
  deleteProjectErrorAction
} from "stores/project/actions";
import { Project } from "interfaces/Project";
import { storeContext } from "stores";

export const useProjectState = () => {
  const {
    state: { project }
  } = useContext(storeContext);
  return project;
};

export const useProjectAction = () => {
  const { dispatch } = useContext(storeContext);

  const getProjectRequest = useCallback(
    () => dispatch(getProjectRequestAction()),
    [dispatch]
  );

  const getProjectSuccess = useCallback(
    (projects: Project[]) => dispatch(getProjectSuccessAction(projects)),
    [dispatch]
  );

  const getProjectError = useCallback(
    (error: string) => dispatch(getProjectErrorAction(error)),
    [dispatch]
  );

  const createProjectRequest = useCallback(
    () => dispatch(createProjectRequestAction()),
    [dispatch]
  );

  const createProjectSuccess = useCallback(
    (project: Project) => dispatch(createProjectSuccessAction(project)),
    [dispatch]
  );

  const createProjectError = useCallback(
    (error: string) => dispatch(createProjectErrorAction(error)),
    [dispatch]
  );

  const editProjectRequest = useCallback(
    () => dispatch(editProjectRequestAction()),
    [dispatch]
  );

  const editProjectSuccess = useCallback(
    (project: Project) => dispatch(editProjectSuccessAction(project)),
    [dispatch]
  );

  const editProjectError = useCallback(
    (error: string) => dispatch(editProjectErrorAction(error)),
    [dispatch]
  );

  const deleteProjectRequest = useCallback(
    () => dispatch(deleteProjectRequestAction()),
    [dispatch]
  );

  const deleteProjectSuccess = useCallback(
    (id: string) => dispatch(deleteProjectSuccessAction(id)),
    [dispatch]
  );

  const deleteProjectError = useCallback(
    (error: string) => dispatch(deleteProjectErrorAction(error)),
    [dispatch]
  );

  const selectProject = useCallback(
    (project: Project) => dispatch(selectProjectAction(project)),
    [dispatch]
  );

  const clearSelectedProject = useCallback(
    () => dispatch(clearSelectedProjectAction()),
    [dispatch]
  );

  return {
    getProjectRequest,
    getProjectSuccess,
    getProjectError,
    createProjectRequest,
    createProjectSuccess,
    createProjectError,
    editProjectRequest,
    editProjectSuccess,
    editProjectError,
    deleteProjectRequest,
    deleteProjectSuccess,
    deleteProjectError,
    selectProject,
    clearSelectedProject
  };
};
