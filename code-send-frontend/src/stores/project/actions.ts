import { action } from "typesafe-actions";
import { ProjectActionTypes } from "./types";
import { Project } from "interfaces/Project";

export const getProjectRequestAction = () => {
  return action(ProjectActionTypes.GetRequest);
};

export const getProjectSuccessAction = (projects: Project[]) => {
  return action(ProjectActionTypes.GetSuccess, projects);
};

export const getProjectErrorAction = (error: string) => {
  return action(ProjectActionTypes.GetError, error);
};

export const createProjectRequestAction = () => {
  return action(ProjectActionTypes.CreateRequest);
};

export const createProjectSuccessAction = (project: Project) => {
  return action(ProjectActionTypes.CreateSuccess, project);
};

export const createProjectErrorAction = (error: string) => {
  return action(ProjectActionTypes.CreateError, error);
};

export const editProjectRequestAction = () => {
  return action(ProjectActionTypes.EditRequest);
};

export const editProjectSuccessAction = (project: Project) => {
  return action(ProjectActionTypes.EditSuccess, project);
};

export const editProjectErrorAction = (error: string) => {
  return action(ProjectActionTypes.EditError, error);
};

export const selectProjectAction = (project: Project) => {
  return action(ProjectActionTypes.Select, project);
};

export const clearSelectedProjectAction = () => {
  return action(ProjectActionTypes.ClearSelected);
};
