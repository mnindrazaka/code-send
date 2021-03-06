import { Reducer } from "react";
import { Action } from "interfaces/Action";
import { ProjectState, ProjectActionTypes } from "./types";
import { combineReducers } from "utils/combineReducers";

export const projectInitialState: ProjectState = {
  items: [],
  selected: undefined,
  loading: false,
  error: undefined
};

const itemsReducer: Reducer<ProjectState["items"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case ProjectActionTypes.GetSuccess:
      return [...payload];
    case ProjectActionTypes.CreateSuccess:
      return [...prevState, payload];
    case ProjectActionTypes.EditSuccess:
      return prevState.map(project =>
        project._id === payload._id ? payload : project
      );
    case ProjectActionTypes.DeleteSuccess:
      return prevState.filter(project => project._id !== payload);
    default:
      return prevState;
  }
};

const selectedReducer: Reducer<ProjectState["selected"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case ProjectActionTypes.Select:
      return payload;
    case ProjectActionTypes.ClearSelected:
      return undefined;
    default:
      return prevState;
  }
};

const loadingReducer: Reducer<ProjectState["loading"], Action> = (
  prevState,
  { type }
) => {
  switch (type) {
    case ProjectActionTypes.GetRequest:
    case ProjectActionTypes.CreateRequest:
    case ProjectActionTypes.EditRequest:
    case ProjectActionTypes.DeleteRequest:
      return true;
    case ProjectActionTypes.GetSuccess:
    case ProjectActionTypes.GetError:
    case ProjectActionTypes.CreateSuccess:
    case ProjectActionTypes.CreateError:
    case ProjectActionTypes.EditSuccess:
    case ProjectActionTypes.EditError:
    case ProjectActionTypes.DeleteSuccess:
    case ProjectActionTypes.DeleteError:
      return false;
    default:
      return prevState;
  }
};

const errorReducer: Reducer<ProjectState["error"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case ProjectActionTypes.GetError:
    case ProjectActionTypes.CreateError:
    case ProjectActionTypes.EditError:
    case ProjectActionTypes.DeleteError:
      return payload;
    case ProjectActionTypes.GetSuccess:
    case ProjectActionTypes.CreateSuccess:
    case ProjectActionTypes.EditSuccess:
    case ProjectActionTypes.DeleteSuccess:
      return undefined;
    default:
      return prevState;
  }
};

export default combineReducers<ProjectState>({
  items: [itemsReducer, projectInitialState["items"]],
  selected: [selectedReducer, projectInitialState["selected"]],
  loading: [loadingReducer, projectInitialState["loading"]],
  error: [errorReducer, projectInitialState["error"]]
});
