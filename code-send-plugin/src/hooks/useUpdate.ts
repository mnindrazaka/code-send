import { useEffect, useState, useCallback } from "react";
import codeSendService from "../utils/api/codeSendService";
import {
  getActiveBundle,
  setActiveBundle,
  downloadBundle,
  reloadBundle
} from "../utils/bundle";
import { Update } from "../interfaces/Update";

export const useCheckUpdate = (projectId: string) => {
  const [update, setUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const isDateNewer = useCallback(
    (dateString: string, newDateString: string) => {
      const date = new Date(dateString);
      const newDate = new Date(newDateString);
      return date < newDate;
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const update = await codeSendService.getLatestUpdate(projectId);
        const activeBundle = await getActiveBundle();
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
  }, [isDateNewer]);

  return { update, loading, error };
};

export const useApplyUpdate = async (update: Update) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  try {
    setLoading(true);
    const filename = await downloadBundle(update);
    setActiveBundle({ filename, update });
    reloadBundle();
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }

  return { loading, error };
};
