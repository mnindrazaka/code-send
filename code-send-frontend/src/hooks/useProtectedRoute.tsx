import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "./store/useAuthStore";

const useProtectedRoute = () => {
  const { username } = useAuthState();
  const history = useHistory();
  useEffect(() => {
    if (!username) history.push("/login");
  }, [history, username]);
};

export default useProtectedRoute;
