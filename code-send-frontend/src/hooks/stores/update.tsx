import { useState, useEffect } from "react";
import { Update, UpdateFormValues } from "interfaces/Update";
import codeSendService from "utils/api/codeSendService";

const useUpdate = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [latestUpdate, setLatestUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  return {
    updates,
    setUpdates,
    latestUpdate,
    setLatestUpdate,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess
  };
};

export const useGetAllUpdate = () => {
  const {
    setUpdates,
    setLoading,
    setError,
    setSuccess,
    updates,
    loading,
    error,
    success
  } = useUpdate();

  useEffect(() => {
    setLoading(true);
    codeSendService
      .getAllUpdates()
      .then(updates => {
        setUpdates(updates);
        setSuccess(true);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [setUpdates, setLoading, setError, setSuccess]);

  return { updates, loading, error, success };
};

export const useGetLatestUpdate = () => {
  const {
    setLatestUpdate,
    setLoading,
    setError,
    setSuccess,
    latestUpdate,
    loading,
    error,
    success
  } = useUpdate();

  useEffect(() => {
    setLoading(true);
    codeSendService
      .getLatestUpdate()
      .then(update => {
        setLatestUpdate(update);
        setSuccess(true);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [setLatestUpdate, setLoading, setError, setSuccess]);

  return { latestUpdate, loading, error, success };
};

export const useCreateUpdate = () => {
  const {
    setLoading,
    setError,
    setSuccess,
    loading,
    error,
    success
  } = useUpdate();

  const createUpdate = async ({ bundle, ...rest }: UpdateFormValues) => {
    try {
      setLoading(true);
      const { _id } = await codeSendService.createUpdate(rest);
      await codeSendService.uploadUpdate(_id, bundle!);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createUpdate,
    loading,
    error,
    success
  };
};
