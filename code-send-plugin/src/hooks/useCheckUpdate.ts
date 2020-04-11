import { useState, useCallback, useEffect } from "react";
import codeSendService from "../utils/api/codeSendService";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";

const useCheckUpdate = (projectId: string) => {
  const [update, setUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const isDateNewer = useCallback(
    (dateOneString: string, dateTwoString: string) => {
      const dateOne = new Date(dateOneString);
      const dateTwo = new Date(dateTwoString);
      return dateOne > dateTwo;
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const update = await codeSendService.getLatestUpdate(projectId);
        const activeBundle = await bundleManager.getActiveBundle();

        if (
          !activeBundle ||
          isDateNewer(update.createdAt, activeBundle.update.createdAt)
        )
          setUpdate(update);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId]);

  return { update, loading, error };
};

export default useCheckUpdate;
