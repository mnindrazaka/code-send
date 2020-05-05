import { action } from "typesafe-actions";
import { AuthActionTypes } from "./types";

export const loginRequestAction = () => {
  return action(AuthActionTypes.LoginRequest);
};

export const loginSuccessAction = (username: string) => {
  return action(AuthActionTypes.LoginSuccess, username);
};

export const loginErrorAction = (error: string) => {
  return action(AuthActionTypes.LoginError, error);
};

export const registerRequestAction = () => {
  return action(AuthActionTypes.RegisterRequest);
};

export const registerSuccessAction = () => {
  return action(AuthActionTypes.RegisterSuccess);
};

export const registerErrorAction = (error: string) => {
  return action(AuthActionTypes.RegisterError, error);
};

export const logoutRequestAction = () => {
  return action(AuthActionTypes.LogoutRequest);
};

export const logoutSuccessAction = () => {
  return action(AuthActionTypes.LogoutSuccess);
};

export const logoutErrorAction = (error: string) => {
  return action(AuthActionTypes.LogoutError, error);
};
