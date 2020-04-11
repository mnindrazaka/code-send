import { useEffect } from "react";
import useCheckUpdate from "./useCheckUpdate";
import useApplyUpdate from "./useApplyUpdate";

const useCodeSend = (projectId: string) => {
  const { update, error, loading } = useCheckUpdate(projectId);
  const { applyUpdate } = useApplyUpdate();

  useEffect(() => {
    if (update && !loading && !error) applyUpdate(update);
  }, [update, error]);
};

export default useCodeSend;
