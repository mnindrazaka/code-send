import { Reducer } from "react";
import { Action } from "interfaces/Action";
import { UpdateState, UpdateActionTypes } from "./types";
import { combineReducers } from "utils/combineReducers";

export const updateInitialState: UpdateState = {
  items: [],
  selected: undefined,
  latest: undefined,
  loading: false,
  error: undefined
};

const itemsReducer: Reducer<UpdateState["items"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case UpdateActionTypes.GetSuccess:
      return [...payload];
    case UpdateActionTypes.CreateSuccess:
      return [...prevState, payload];
    case UpdateActionTypes.EditSuccess: {
      const updates = [...prevState];
      const index = updates.findIndex(update => update._id === payload._id);
      updates[index] = payload;
      return updates;
    }
    default:
      return prevState;
  }
};

const selectedReducer: Reducer<UpdateState["selected"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case UpdateActionTypes.Select:
      return payload;
    case UpdateActionTypes.ClearSelected:
      return undefined;
    default:
      return prevState;
  }
};

const latestReducer: Reducer<UpdateState["latest"], Action> = (
  prevState,
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
  prevState,
  { type }
) => {
  switch (type) {
    case UpdateActionTypes.GetRequest:
    case UpdateActionTypes.CreateRequest:
    case UpdateActionTypes.EditRequest:
    case UpdateActionTypes.GetLatestRequest:
      return true;
    case UpdateActionTypes.GetSuccess:
    case UpdateActionTypes.GetError:
    case UpdateActionTypes.GetLatestSuccess:
    case UpdateActionTypes.GetLatestError:
    case UpdateActionTypes.CreateSuccess:
    case UpdateActionTypes.CreateError:
    case UpdateActionTypes.EditSuccess:
    case UpdateActionTypes.EditError:
      return false;
    default:
      return prevState;
  }
};

const errorReducer: Reducer<UpdateState["error"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case UpdateActionTypes.GetError:
    case UpdateActionTypes.GetLatestError:
    case UpdateActionTypes.CreateError:
    case UpdateActionTypes.EditError:
      return payload;
    case UpdateActionTypes.GetSuccess:
    case UpdateActionTypes.GetLatestSuccess:
    case UpdateActionTypes.CreateSuccess:
    case UpdateActionTypes.EditSuccess:
      return undefined;
    default:
      return prevState;
  }
};

export default combineReducers<UpdateState>({
  items: [itemsReducer, updateInitialState["items"]],
  selected: [selectedReducer, updateInitialState["selected"]],
  latest: [latestReducer, updateInitialState["latest"]],
  loading: [loadingReducer, updateInitialState["loading"]],
  error: [errorReducer, updateInitialState["error"]]
});
