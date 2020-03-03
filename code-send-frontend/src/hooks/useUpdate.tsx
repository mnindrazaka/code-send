import { useState, useEffect, useCallback } from "react";
import { Update, UpdateFormValues } from "interfaces/Update";
import codeSendService from "utils/api/codeSendService";
import { notification } from "antd";

const useUpdate = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [latestUpdate, setLatestUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  const handleSuccessIndicator = useCallback(
    (title: string, description: string) => {
      notification.success({
        message: title,
        description
      });
    },
    []
  );

  const handleErrorIndicator = useCallback(
    (title: string, description: string) => {
      notification.error({
        message: title,
        description
      });
    },
    []
  );

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
    setSuccess,
    handleSuccessIndicator,
    handleErrorIndicator
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
    success,
    handleErrorIndicator
  } = useUpdate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const updates = await codeSendService.getAllUpdates();
        setUpdates(updates);
        setSuccess(true);
      } catch (error) {
        setError(error.message);
        handleErrorIndicator("Failed", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setUpdates, setLoading, setError, setSuccess, handleErrorIndicator]);

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
    success,
    handleErrorIndicator
  } = useUpdate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const update = await codeSendService.getLatestUpdate();
        setLatestUpdate(update);
        setSuccess(true);
      } catch (error) {
        setError(error.message);
        handleErrorIndicator("Failed", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading, setLatestUpdate, setSuccess, setError, handleErrorIndicator]);

  return { latestUpdate, loading, error, success };
};

export const useCreateUpdate = () => {
  const {
    setLoading,
    setError,
    setSuccess,
    loading,
    error,
    success,
    handleSuccessIndicator,
    handleErrorIndicator
  } = useUpdate();

  const createUpdate = async ({ bundle, ...rest }: UpdateFormValues) => {
    try {
      setLoading(true);
      const { _id } = await codeSendService.createUpdate(rest);
      await codeSendService.uploadUpdate(_id, bundle!);
      setSuccess(true);
      handleSuccessIndicator("Success", "Your update is successfully created");
    } catch (error) {
      setError(error.message);
      handleErrorIndicator("Failed", error.message);
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
