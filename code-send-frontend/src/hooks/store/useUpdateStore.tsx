import { useCallback, useContext } from "react";
import {
  getUpdateRequestAction,
  getUpdateSuccessAction,
  getUpdateErrorAction,
  createUpdateRequestAction,
  createUpdateSuccessAction,
  createUpdateErrorAction,
  getLatestUpdateRequestAction,
  getLatestUpdateSuccessAction,
  getLatestUpdateErrorAction,
  editUpdateRequestAction,
  editUpdateSuccessAction,
  editUpdateErrorAction,
  selectUpdateAction,
  clearSelectedUpdateAction
} from "stores/update/actions";
import { Update } from "interfaces/Update";
import { storeContext } from "stores";

export const useUpdateState = () => {
  const {
    state: { update }
  } = useContext(storeContext);
  return update;
};

export const useUpdateAction = () => {
  const { dispatch } = useContext(storeContext);

  const getUpdateRequest = useCallback(
    () => dispatch(getUpdateRequestAction()),
    [dispatch]
  );

  const getUpdateSuccess = useCallback(
    (updates: Update[]) => dispatch(getUpdateSuccessAction(updates)),
    [dispatch]
  );

  const getUpdateError = useCallback(
    (error: string) => dispatch(getUpdateErrorAction(error)),
    [dispatch]
  );

  const getLatestUpdateRequest = useCallback(
    () => dispatch(getLatestUpdateRequestAction()),
    [dispatch]
  );

  const getLatestUpdateSuccess = useCallback(
    (update: Update) => dispatch(getLatestUpdateSuccessAction(update)),
    [dispatch]
  );

  const getLatestUpdateError = useCallback(
    (error: string) => dispatch(getLatestUpdateErrorAction(error)),
    [dispatch]
  );

  const createUpdateRequest = useCallback(
    () => dispatch(createUpdateRequestAction()),
    [dispatch]
  );

  const createUpdateSuccess = useCallback(
    (Update: Update) => dispatch(createUpdateSuccessAction(Update)),
    [dispatch]
  );

  const createUpdateError = useCallback(
    (error: string) => dispatch(createUpdateErrorAction(error)),
    [dispatch]
  );

  const editUpdateRequest = useCallback(
    () => dispatch(editUpdateRequestAction()),
    [dispatch]
  );

  const editUpdateSuccess = useCallback(
    (Update: Update) => dispatch(editUpdateSuccessAction(Update)),
    [dispatch]
  );

  const editUpdateError = useCallback(
    (error: string) => dispatch(editUpdateErrorAction(error)),
    [dispatch]
  );

  const selectUpdate = useCallback(
    (update: Update) => dispatch(selectUpdateAction(update)),
    [dispatch]
  );

  const clearSelectedUpdate = useCallback(
    () => dispatch(clearSelectedUpdateAction()),
    [dispatch]
  );

  return {
    getUpdateRequest,
    getUpdateSuccess,
    getUpdateError,
    getLatestUpdateRequest,
    getLatestUpdateSuccess,
    getLatestUpdateError,
    createUpdateRequest,
    createUpdateSuccess,
    createUpdateError,
    editUpdateRequest,
    editUpdateSuccess,
    editUpdateError,
    selectUpdate,
    clearSelectedUpdate
  };
};
