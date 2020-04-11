import { useState } from "react";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";

const useApplyUpdate = async (update: Update) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  try {
    setLoading(true);
    const filename = await bundleManager.downloadBundle(update);
    bundleManager.setActiveBundle({ filename, update });
    bundleManager.reloadBundle();
    setSuccess(true);
  } catch (error) {
    setError(error);
    setSuccess(false);
  } finally {
    setLoading(false);
  }

  return { loading, success, error };
};

export default useApplyUpdate;
