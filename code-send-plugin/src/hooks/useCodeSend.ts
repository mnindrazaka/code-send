import { useEffect, useState } from "react";
import useCheckUpdate from "./useCheckUpdate";
import useApplyUpdate from "./useApplyUpdate";
import { Bundle } from "../interfaces/Bundle";

export type CodeSendOptions = {
  showDownloadConfirmation: boolean;
  showDownloadProgress: boolean;
  showErrorMessage: boolean;
};

export const defaultOptions: CodeSendOptions = {
  showDownloadConfirmation: true,
  showDownloadProgress: true,
  showErrorMessage: true
};

type Status = "standby" | "checking" | "downloading";

const useCodeSend = (
  projectId: string,
  options: CodeSendOptions = defaultOptions
) => {
  const [status, setStatus] = useState<Status>("standby");
  const [error, setError] = useState<string>();
  const [bundle, setBundle] = useState<Bundle>();

  const {
    update,
    loading: checkLoading,
    error: checkError,
    checkUpdate
  } = useCheckUpdate(options);
  const {
    filename,
    loading: applyLoading,
    error: applyError,
    applyUpdate
  } = useApplyUpdate(options);

  useEffect(() => {
    checkUpdate(projectId);
  }, [checkUpdate, projectId]);

  useEffect(() => {
    if (update) applyUpdate(update);
  }, [update]);

  useEffect(() => {
    if (update && filename) setBundle({ filename, update });
  }, [update, filename]);

  useEffect(() => {
    if (checkLoading) setStatus("checking");
    else setStatus("standby");
  }, [checkLoading]);

  useEffect(() => {
    if (applyLoading) setStatus("downloading");
    else setStatus("standby");
  }, [applyLoading]);

  useEffect(() => {
    setError(checkError);
  }, [checkError]);

  useEffect(() => {
    setError(applyError);
  }, [applyError]);

  return { bundle, error, status };
};

export default useCodeSend;
