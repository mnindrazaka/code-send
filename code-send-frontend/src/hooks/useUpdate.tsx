import { useEffect, useContext } from "react";
import { UpdateFormValues } from "interfaces/Update";
import codeSendService from "utils/api/codeSendService";
import { updateContext } from "contexts/updateContext";
import { projectContext } from "contexts/projectContext";
import { useNotification } from "./useNotification";

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
  } = useContext(updateContext);
  const { selectedProject } = useContext(projectContext);
  const { handleError } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const updates = await codeSendService.getAllUpdates(
          selectedProject?._id || ""
        );
        setUpdates(updates);
        setSuccess(true);
      } catch (error) {
        setError(error.message);
        handleError("Failed", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    setUpdates,
    setLoading,
    setError,
    setSuccess,
    handleError,
    selectedProject
  ]);

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
  } = useContext(updateContext);
  const { selectedProject } = useContext(projectContext);
  const { handleError } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const update = await codeSendService.getLatestUpdate(
          selectedProject?._id || ""
        );
        setLatestUpdate(update);
        setSuccess(true);
      } catch (error) {
        setError(error.message);
        handleError("Failed", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    setLoading,
    setLatestUpdate,
    setSuccess,
    setError,
    handleError,
    selectedProject
  ]);

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
  } = useContext(updateContext);
  const { selectedProject } = useContext(projectContext);
  const { handleError, handleSuccess } = useNotification();

  const createUpdate = async ({ bundle, ...rest }: UpdateFormValues) => {
    try {
      setLoading(true);
      const update = await codeSendService.createUpdate(
        selectedProject?._id || "",
        rest
      );
      await codeSendService.uploadUpdate(
        selectedProject?._id || "",
        update._id,
        bundle!
      );
      setSuccess(true);
      handleSuccess("Success", "Your update is successfully created");
    } catch (error) {
      setError(error.message);
      handleError("Failed", error.message);
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
