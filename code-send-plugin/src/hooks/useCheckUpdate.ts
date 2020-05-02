import { useState, useCallback } from "react";
import codeSendService from "../utils/api/codeSendService";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";

const useCheckUpdate = () => {
  const [update, setUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const checkUpdate = useCallback(async (projectId: string) => {
    try {
      setLoading(true);
      const activeBundle = await bundleManager.getActiveBundle();
      const update = await codeSendService.checkUpdate(
        projectId,
        -7.756928,
        113.211502,
        activeBundle?.update._id
      );
      if (update) {
        setUpdate(update);
        setError(undefined);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error, checkUpdate };
};

export default useCheckUpdate;
