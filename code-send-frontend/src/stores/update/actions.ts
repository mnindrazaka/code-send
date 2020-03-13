import { action } from "typesafe-actions";
import { UpdateActionTypes } from "./types";
import { Update } from "interfaces/Update";

export const getUpdateRequestAction = () => {
  return action(UpdateActionTypes.GetRequest);
};

export const getUpdateSuccessAction = (updates: Update[]) => {
  return action(UpdateActionTypes.GetSuccess, updates);
};

export const getUpdateErrorAction = (error: string) => {
  return action(UpdateActionTypes.GetError, error);
};

export const getLatestUpdateRequestAction = () => {
  return action(UpdateActionTypes.GetLatestRequest);
};

export const getLatestUpdateSuccessAction = (update: Update) => {
  return action(UpdateActionTypes.GetLatestSuccess, update);
};

export const getLatestUpdateErrorAction = (error: string) => {
  return action(UpdateActionTypes.GetLatestError, error);
};

export const createUpdateRequestAction = () => {
  return action(UpdateActionTypes.CreateRequest);
};

export const createUpdateSuccessAction = (update: Update) => {
  return action(UpdateActionTypes.CreateSuccess, update);
};

export const createUpdateErrorAction = (error: string) => {
  return action(UpdateActionTypes.CreateError, error);
};

export const editUpdateRequestAction = () => {
  return action(UpdateActionTypes.EditRequest);
};

export const editUpdateSuccessAction = (update: Update) => {
  return action(UpdateActionTypes.EditSuccess, update);
};

export const editUpdateErrorAction = (error: string) => {
  return action(UpdateActionTypes.EditError, error);
};

export const selectUpdateAction = (update: Update) => {
  return action(UpdateActionTypes.Select, update);
};

export const clearSelectedUpdateAction = () => {
  return action(UpdateActionTypes.ClearSelected);
};
