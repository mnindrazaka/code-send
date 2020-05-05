import { useCallback } from "react";
import { UserFormValues } from "interfaces/User";
import codeSendService from "utils/api/codeSendService";
import { useNotification } from "hooks/useNotification";
import { useHistory } from "react-router-dom";
import { saveToken, removeToken } from "utils/auth";
import { useAuthAction } from "hooks/store/useAuthStore";

export const useRegister = () => {
  const { registerRequest, registerSuccess, registerError } = useAuthAction();
  const { handleSuccess, handleError } = useNotification();
  const history = useHistory();

  const register = useCallback(
    async (user: UserFormValues) => {
      try {
        registerRequest();
        await codeSendService.register(user);
        registerSuccess();
        handleSuccess("Success", "Your account is successfully registered");
        history.push("/login");
      } catch (error) {
        registerError(error.message);
        handleError("Failed", error.message);
      }
    },
    [
      history,
      handleError,
      handleSuccess,
      registerRequest,
      registerSuccess,
      registerError
    ]
  );

  return { register };
};

export const useLogin = () => {
  const { loginRequest, loginSuccess, loginError } = useAuthAction();
  const { handleSuccess, handleError } = useNotification();
  const history = useHistory();

  const login = useCallback(
    async (user: UserFormValues) => {
      try {
        loginRequest();
        const { token } = await codeSendService.login(user);
        saveToken(token);
        loginSuccess(user.username);
        handleSuccess("Success", "You are successfully logged in");
        history.push("/project");
      } catch (error) {
        loginError(error.message);
        handleError("Failed", error.message);
      }
    },
    [
      history,
      handleSuccess,
      handleError,
      loginRequest,
      loginSuccess,
      loginError
    ]
  );

  return { login };
};

export const useLogout = () => {
  const { logoutRequest, logoutSuccess, logoutError } = useAuthAction();
  const { handleSuccess, handleError } = useNotification();
  const history = useHistory();

  const logout = useCallback(() => {
    try {
      logoutRequest();
      removeToken();
      logoutSuccess();
      handleSuccess("Success", "You are successfully logged out");
      history.push("/login");
    } catch (error) {
      logoutError(error.message);
      handleError("Failed", error.message);
    }
  }, [
    history,
    handleSuccess,
    handleError,
    logoutRequest,
    logoutSuccess,
    logoutError
  ]);

  return { logout };
};
