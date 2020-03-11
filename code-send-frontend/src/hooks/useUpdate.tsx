import { useEffect } from "react";
import { UpdateFormValues } from "interfaces/Update";
import codeSendService from "utils/api/codeSendService";
import { useNotification } from "./useNotification";
import { useUpdateState, useProjectState, useUpdateAction } from "./useStore";
import { useHistory } from "react-router-dom";

export const useGetAllUpdate = () => {
  const { items, loading, error } = useUpdateState();
  const project = useProjectState();
  const {
    getUpdateRequest,
    getUpdateSuccess,
    getUpdateError
  } = useUpdateAction();
  const { handleError } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        getUpdateRequest();
        const updates = await codeSendService.getAllUpdates(
          project.selected?._id || ""
        );
        getUpdateSuccess(updates);
      } catch (error) {
        getUpdateError(error.message);
        handleError("Failed", error.message);
      }
    })();
  }, [
    getUpdateRequest,
    getUpdateSuccess,
    getUpdateError,
    handleError,
    project.selected
  ]);

  return { items, loading, error };
};

export const useGetLatestUpdate = () => {
  const { latest, loading, error } = useUpdateState();
  const project = useProjectState();
  const {
    getLatestUpdateRequest,
    getLatestUpdateSuccess,
    getLatestUpdateError
  } = useUpdateAction();
  const { handleError } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        getLatestUpdateRequest();
        const update = await codeSendService.getLatestUpdate(
          project.selected?._id || ""
        );
        getLatestUpdateSuccess(update);
      } catch (error) {
        getLatestUpdateError(error.message);
        handleError("Failed", error.message);
      }
    })();
  }, [
    getLatestUpdateRequest,
    getLatestUpdateSuccess,
    getLatestUpdateError,
    handleError,
    project.selected
  ]);

  return { latest, loading, error };
};

export const useCreateUpdate = () => {
  const { loading, error } = useUpdateState();
  const project = useProjectState();
  const {
    createUpdateRequest,
    createUpdateSuccess,
    createUpdateError
  } = useUpdateAction();
  const { handleError, handleSuccess } = useNotification();
  const { push } = useHistory();

  const createUpdate = async ({ bundle, ...rest }: UpdateFormValues) => {
    try {
      createUpdateRequest();
      let update = await codeSendService.createUpdate(
        project.selected?._id || "",
        rest
      );
      update = await codeSendService.uploadUpdate(
        project.selected?._id || "",
        update._id,
        bundle!
      );
      createUpdateSuccess(update);
      handleSuccess("Success", "Your update is successfully created");
      push("/update");
    } catch (error) {
      createUpdateError(error.message);
      handleError("Failed", error.message);
    }
  };

  return {
    createUpdate,
    loading,
    error
  };
};
