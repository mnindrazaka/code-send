import { useState, useCallback } from "react";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";
import { Alert } from "react-native";
import interactionManager from "../utils/interactionManager";

const useApplyUpdate = (useConfirmation?: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>();
  const [error, setError] = useState<string>();

  const downloadBundle = useCallback(
    async (update: Update) => {
      setLoading(true);
      const filename = await bundleManager.downloadBundle(update);
      bundleManager.setActiveBundle({ filename, update });
      setFilename(filename);
      setError(undefined);
    },
    [bundleManager]
  );

  const reloadBundle = useCallback(() => {
    bundleManager.reloadBundle();
  }, [bundleManager]);

  const applyUpdate = useCallback(async (update: Update) => {
    try {
      if (!useConfirmation) {
        await downloadBundle(update);
        reloadBundle();
        return;
      }

      Alert.alert(
        "Update",
        `There is an update for version ${update.version}, download now ?`,
        [
          {
            text: "yes",
            onPress: async () => {
              interactionManager.showMessage("Downloading update");
              await downloadBundle(update);
              reloadBundle();
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
    } catch (error) {
      setError(error);
      setFilename(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  return { filename, loading, error, applyUpdate };
};

export default useApplyUpdate;
