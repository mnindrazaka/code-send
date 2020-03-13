import { useEffect } from "react";
import { UpdateFormValues } from "interfaces/Update";
import codeSendService from "utils/api/codeSendService";
import { useNotification } from "../useNotification";
import { useUpdateAction } from "../store/useUpdateStore";
import { useProjectState } from "../store/useProjectStore";
import { useHistory } from "react-router-dom";

export const useGetAllUpdate = () => {
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
};

export const useGetLatestUpdate = () => {
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
};

export const useCreateUpdate = () => {
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

  return { createUpdate };
};

export const useEditUpdate = () => {
  const project = useProjectState();
  const {
    editUpdateRequest,
    editUpdateSuccess,
    editUpdateError
  } = useUpdateAction();
  const { handleError, handleSuccess } = useNotification();
  const { push } = useHistory();

  const editUpdate = async (
    updateId: string,
    { bundle, ...rest }: UpdateFormValues
  ) => {
    try {
      editUpdateRequest();
      const update = await codeSendService.editUpdate(
        project.selected?._id || "",
        updateId,
        rest
      );
      editUpdateSuccess(update);
      handleSuccess("Success", "Your update is successfully edited");
      push("/update");
    } catch (error) {
      editUpdateError(error.message);
      handleError("Failed", error.message);
    }
  };

  return { editUpdate };
};
