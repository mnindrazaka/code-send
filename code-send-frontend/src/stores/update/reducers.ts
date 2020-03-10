import { Reducer } from "react";
import { Action } from "interfaces/Action";
import { UpdateState, UpdateActionTypes } from "./types";
import { combineReducers } from "utils/combineReducers";

export const updateInitialState: UpdateState = {
  items: [],
  latest: undefined,
  loading: false,
  error: undefined
};

const itemsReducer: Reducer<UpdateState["items"], Action> = (
  prevState = updateInitialState["items"],
  { type, payload }
) => {
  switch (type) {
    case UpdateActionTypes.GetSuccess:
      return [...payload];
    case UpdateActionTypes.CreateSuccess:
      return [...prevState, payload];
    default:
      return prevState;
  }
};

const latestReducer: Reducer<UpdateState["latest"], Action> = (
  prevState = updateInitialState["latest"],
  { type, payload }
) => {
  switch (type) {
    case UpdateActionTypes.GetLatestSuccess:
      return payload;
    default:
      return prevState;
  }
};

const loadingReducer: Reducer<UpdateState["loading"], Action> = (
  prevState = updateInitialState["loading"],
  { type }
) => {
  switch (type) {
    case UpdateActionTypes.GetRequest:
    case UpdateActionTypes.CreateRequest:
    case UpdateActionTypes.GetLatestRequest:
      return true;
    case UpdateActionTypes.GetSuccess:
    case UpdateActionTypes.GetError:
    case UpdateActionTypes.CreateSuccess:
    case UpdateActionTypes.CreateError:
    case UpdateActionTypes.GetLatestSuccess:
    case UpdateActionTypes.GetLatestError:
      return false;
    default:
      return prevState;
  }
};

const errorReducer: Reducer<UpdateState["error"], Action> = (
  prevState = updateInitialState["error"],
  { type, payload }
) => {
  switch (type) {
    case UpdateActionTypes.GetError:
    case UpdateActionTypes.CreateError:
    case UpdateActionTypes.GetLatestError:
      return payload;
    case UpdateActionTypes.GetSuccess:
    case UpdateActionTypes.CreateSuccess:
    case UpdateActionTypes.GetLatestSuccess:
      return undefined;
    default:
      return prevState;
  }
};

export default combineReducers<UpdateState>({
  items: [itemsReducer, updateInitialState["items"]],
  latest: [latestReducer, updateInitialState["latest"]],
  loading: [loadingReducer, updateInitialState["loading"]],
  error: [errorReducer, updateInitialState["error"]]
});
