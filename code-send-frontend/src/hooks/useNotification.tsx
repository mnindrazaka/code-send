import { useCallback } from "react";
import { notification } from "antd";

export const useNotification = () => {
  const handleSuccess = useCallback((title: string, description: string) => {
    notification.success({
      message: title,
      description
    });
  }, []);

  const handleError = useCallback((title: string, description: string) => {
    notification.error({
      message: title,
      description
    });
  }, []);

  return {
    handleSuccess,
    handleError
  };
};
