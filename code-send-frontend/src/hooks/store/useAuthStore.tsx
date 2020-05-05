import { useCallback, useContext } from "react";
import {
  loginRequestAction,
  loginSuccessAction,
  loginErrorAction,
  registerRequestAction,
  registerSuccessAction,
  registerErrorAction,
  logoutRequestAction,
  logoutSuccessAction,
  logoutErrorAction
} from "stores/auth/actions";
import { storeContext } from "stores";

export const useAuthState = () => {
  const {
    state: { auth }
  } = useContext(storeContext);
  return auth;
};

export const useAuthAction = () => {
  const { dispatch } = useContext(storeContext);

  const loginRequest = useCallback(() => dispatch(loginRequestAction()), [
    dispatch
  ]);

  const loginSuccess = useCallback(
    (username: string) => dispatch(loginSuccessAction(username)),
    [dispatch]
  );

  const loginError = useCallback(
    (error: string) => dispatch(loginErrorAction(error)),
    [dispatch]
  );

  const registerRequest = useCallback(() => dispatch(registerRequestAction()), [
    dispatch
  ]);

  const registerSuccess = useCallback(() => dispatch(registerSuccessAction()), [
    dispatch
  ]);

  const registerError = useCallback(
    (error: string) => dispatch(registerErrorAction(error)),
    [dispatch]
  );

  const logoutRequest = useCallback(() => dispatch(logoutRequestAction()), [
    dispatch
  ]);

  const logoutSuccess = useCallback(() => dispatch(logoutSuccessAction()), [
    dispatch
  ]);

  const logoutError = useCallback(
    (error: string) => dispatch(logoutErrorAction(error)),
    [dispatch]
  );

  return {
    loginRequest,
    loginSuccess,
    loginError,
    registerRequest,
    registerSuccess,
    registerError,
    logoutRequest,
    logoutSuccess,
    logoutError
  };
};
