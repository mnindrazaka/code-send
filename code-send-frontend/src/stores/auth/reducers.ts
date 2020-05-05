import { Reducer } from "react";
import { Action } from "interfaces/Action";
import { AuthState, AuthActionTypes } from "./types";
import { combineReducers } from "utils/combineReducers";
import { getUser } from "utils/auth";

export const authInitialState: AuthState = {
  username: getUser()?.username,
  loading: false,
  error: undefined
};

const usernameReducer: Reducer<AuthState["username"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case AuthActionTypes.LoginSuccess:
      return payload;
    case AuthActionTypes.LogoutSuccess:
      return undefined;
    default:
      return prevState;
  }
};

const loadingReducer: Reducer<AuthState["loading"], Action> = (
  prevState,
  { type }
) => {
  switch (type) {
    case AuthActionTypes.LoginRequest:
    case AuthActionTypes.RegisterRequest:
    case AuthActionTypes.LogoutRequest:
      return true;
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.LoginError:
    case AuthActionTypes.RegisterSuccess:
    case AuthActionTypes.RegisterError:
    case AuthActionTypes.LogoutSuccess:
    case AuthActionTypes.LogoutError:
      return false;
    default:
      return prevState;
  }
};

const errorReducer: Reducer<AuthState["error"], Action> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case AuthActionTypes.LoginError:
    case AuthActionTypes.RegisterError:
    case AuthActionTypes.LogoutError:
      return payload;
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.RegisterSuccess:
    case AuthActionTypes.LogoutSuccess:
      return undefined;
    default:
      return prevState;
  }
};

export default combineReducers<AuthState>({
  username: [usernameReducer, authInitialState["username"]],
  loading: [loadingReducer, authInitialState["loading"]],
  error: [errorReducer, authInitialState["error"]]
});
