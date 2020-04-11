import { useState, useCallback } from "react";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";

const useApplyUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>();
  const [error, setError] = useState<string>();

  const applyUpdate = useCallback(async (update: Update) => {
    try {
      setLoading(true);
      const filename = await bundleManager.downloadBundle(update);
      bundleManager.setActiveBundle({ filename, update });
      bundleManager.reloadBundle();
      setFilename(filename);
      setError(undefined);
    } catch (error) {
      setError(error);
      setFilename(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  return { filename, loading, error, applyUpdate };
};

export default useApplyUpdate;
