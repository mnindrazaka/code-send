import { useState, useCallback, useEffect } from "react";
import codeSendService from "../utils/api/codeSendService";
import bundleManager from "../utils/bundleManager";
import { Update } from "../interfaces/Update";
import Geolocation, {
  GeolocationResponse,
  GeolocationError
} from "@react-native-community/geolocation";
import { CodeSendOptions } from "./useCodeSend";
import { Alert } from "react-native";

const useCheckUpdate = (options: CodeSendOptions) => {
  const [update, setUpdate] = useState<Update>();
  const [location, setLocation] = useState<GeolocationResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleGeolocationError = useCallback(
    (error: GeolocationError) => {
      setError(error.message);
      if (options.showErrorMessage)
        Alert.alert("Geolocation Error", error.message);
    },
    [options.showErrorMessage]
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(setLocation, handleGeolocationError, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }, []);

  const checkUpdate = useCallback(
    async (projectId: string) => {
      try {
        setLoading(true);
        const activeBundle = await bundleManager.getActiveBundle();
        if (!location) return;
        const update = await codeSendService.checkUpdate(
          projectId,
          location.coords.latitude,
          location.coords.longitude,
          activeBundle?.update._id
        );
        if (update) {
          setUpdate(update);
          setError(undefined);
        }
      } catch (error) {
        setError(error.message);
        if (options.showErrorMessage)
          Alert.alert("Check Update Failed", error.message);
      } finally {
        setLoading(false);
      }
    },
    [location, options.showErrorMessage]
  );

  return { update, loading, error, checkUpdate };
};

export default useCheckUpdate;
