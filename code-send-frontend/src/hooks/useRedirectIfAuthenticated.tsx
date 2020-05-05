import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "./store/useAuthStore";

const useRedirectIfAuthenticated = () => {
  const { username } = useAuthState();
  const history = useHistory();
  useEffect(() => {
    if (username) history.push("/project");
  }, [history, username]);
};

export default useRedirectIfAuthenticated;
