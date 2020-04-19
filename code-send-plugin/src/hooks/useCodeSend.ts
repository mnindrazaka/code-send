import { useEffect } from "react";
import useCheckUpdate from "./useCheckUpdate";
import useApplyUpdate from "./useApplyUpdate";
import bundleManager from "../utils/bundleManager";

const useCodeSend = (projectId: string) => {
  const { update, error, loading } = useCheckUpdate(projectId);
  const { applyUpdate } = useApplyUpdate();

  bundleManager.toast("tolong dong yang ini jalan");

  useEffect(() => {
    bundleManager.toast("testing apakah berjalan");
    if (update && !loading && !error) applyUpdate(update);
  }, [update, loading, error]);

  return { update, error, loading };
};

export default useCodeSend;
