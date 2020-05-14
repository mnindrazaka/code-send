import { useState, useCallback } from "react";
import codeSendService from "../utils/api/codeSendService";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";
import Geolocation from "@react-native-community/geolocation";

const useCheckUpdate = () => {
  const [update, setUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const checkUpdate = useCallback((projectId: string) => {
    try {
      setLoading(true);
      Geolocation.getCurrentPosition(
        async position => {
          const activeBundle = await bundleManager.getActiveBundle();
          const update = await codeSendService.checkUpdate(
            projectId,
            position.coords.latitude,
            position.coords.longitude,
            activeBundle?.update._id
          );
          if (update) {
            setUpdate(update);
            setError(undefined);
          }
        },
        error => setError(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error, checkUpdate };
};

export default useCheckUpdate;
