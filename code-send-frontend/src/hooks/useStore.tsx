import { useContext, useCallback } from "react";
import { storeContext } from "stores";
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
  selectProjectAction
} from "stores/project/actions";
import { Project } from "interfaces/Project";
import {
  getUpdateRequestAction,
  getUpdateSuccessAction,
  getUpdateErrorAction,
  createUpdateRequestAction,
  createUpdateSuccessAction,
  createUpdateErrorAction,
  getLatestUpdateRequestAction,
  getLatestUpdateSuccessAction,
  getLatestUpdateErrorAction,
  editUpdateRequestAction,
  editUpdateSuccessAction,
  editUpdateErrorAction
} from "stores/update/actions";
import { Update } from "interfaces/Update";

export const useStore = () => {
  const store = useContext(storeContext);
  return store;
};

export const useProjectState = () => {
  const {
    state: { project }
  } = useStore();
  return project;
};

export const useProjectAction = () => {
  const { dispatch } = useStore();

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

  const selectProject = useCallback(
    (project: Project) => dispatch(selectProjectAction(project)),
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
    selectProject
  };
};

export const useUpdateState = () => {
  const {
    state: { update }
  } = useStore();
  return update;
};

export const useUpdateAction = () => {
  const { dispatch } = useStore();

  const getUpdateRequest = useCallback(
    () => dispatch(getUpdateRequestAction()),
    [dispatch]
  );

  const getUpdateSuccess = useCallback(
    (updates: Update[]) => dispatch(getUpdateSuccessAction(updates)),
    [dispatch]
  );

  const getUpdateError = useCallback(
    (error: string) => dispatch(getUpdateErrorAction(error)),
    [dispatch]
  );

  const getLatestUpdateRequest = useCallback(
    () => dispatch(getLatestUpdateRequestAction()),
    [dispatch]
  );

  const getLatestUpdateSuccess = useCallback(
    (update: Update) => dispatch(getLatestUpdateSuccessAction(update)),
    [dispatch]
  );

  const getLatestUpdateError = useCallback(
    (error: string) => dispatch(getLatestUpdateErrorAction(error)),
    [dispatch]
  );

  const createUpdateRequest = useCallback(
    () => dispatch(createUpdateRequestAction()),
    [dispatch]
  );

  const createUpdateSuccess = useCallback(
    (Update: Update) => dispatch(createUpdateSuccessAction(Update)),
    [dispatch]
  );

  const createUpdateError = useCallback(
    (error: string) => dispatch(createUpdateErrorAction(error)),
    [dispatch]
  );

  const editUpdateRequest = useCallback(
    () => dispatch(editUpdateRequestAction()),
    [dispatch]
  );

  const editUpdateSuccess = useCallback(
    (Update: Update) => dispatch(editUpdateSuccessAction(Update)),
    [dispatch]
  );

  const editUpdateError = useCallback(
    (error: string) => dispatch(editUpdateErrorAction(error)),
    [dispatch]
  );

  return {
    getUpdateRequest,
    getUpdateSuccess,
    getUpdateError,
    getLatestUpdateRequest,
    getLatestUpdateSuccess,
    getLatestUpdateError,
    createUpdateRequest,
    createUpdateSuccess,
    createUpdateError,
    editUpdateRequest,
    editUpdateSuccess,
    editUpdateError
  };
};
