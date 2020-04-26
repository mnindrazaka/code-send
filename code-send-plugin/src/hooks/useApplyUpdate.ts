import { useState, useCallback } from "react";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";
import { Alert } from "react-native";
import interactionManager from "../utils/interactionManager";

const useApplyUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>();
  const [error, setError] = useState<string>();

  const applyUpdate = useCallback((update: Update) => {
    try {
      Alert.alert("Update", "There is an update, download now ?", [
        {
          text: "yes",
          onPress: async () => {
            interactionManager.showMessage("Downloading update");
            setLoading(true);
            const filename = await bundleManager.downloadBundle(update);
            bundleManager.setActiveBundle({ filename, update });
            setFilename(filename);
            setError(undefined);

            Alert.alert(
              "Update Downloaded",
              "Your update is ready, apply update now ?",
              [
                {
                  text: "yes",
                  onPress: () => {
                    bundleManager.reloadBundle();
                  }
                },
                {
                  text: "no",
                  onPress: () => {
                    interactionManager.showMessage(
                      "Your update will be applied on next app start"
                    );
                  }
                }
              ]
            );
          }
        },
        {
          text: "no"
        }
      ]);
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
