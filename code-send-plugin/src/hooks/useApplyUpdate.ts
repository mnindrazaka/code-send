import { useState, useCallback } from "react";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";
import { Alert } from "react-native";
import interactionManager from "../utils/interactionManager";
import { CodeSendOptions } from "./useCodeSend";

const useApplyUpdate = (options: CodeSendOptions) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>();
  const [error, setError] = useState<string>();

  const downloadBundle = useCallback(
    async (update: Update) => {
      try {
        setLoading(true);
        const filename = await bundleManager.downloadBundle(
          update,
          options.showDownloadProgress
        );
        bundleManager.setActiveBundle({ filename, update });
        setFilename(filename);
        setError(undefined);
        bundleManager.reloadBundle();
      } catch (error) {
        setError(error);
        setFilename(undefined);
        if (options.showErrorMessage)
          Alert.alert("Download Update Failed", error);
      } finally {
        setLoading(false);
      }
    },
    [options.showErrorMessage]
  );

  const applyUpdate = useCallback(
    async (update: Update) => {
      if (!options.showDownloadConfirmation) {
        await downloadBundle(update);
        return;
      }

      Alert.alert(
        "Update Found",
        `There is an update for version ${update.version} with release note : ${update.note}. Download now ?`,
        [
          {
            text: "yes",
            onPress: async () => {
              interactionManager.showMessage("Downloading update");
              await downloadBundle(update);
              interactionManager.showMessage(
                "Update will be applied after you restart your application"
              );
            }
          },
          {
            text: "no"
          }
        ]
      );
    },
    [options.showDownloadConfirmation]
  );

  return { filename, loading, error, applyUpdate };
};

export default useApplyUpdate;
