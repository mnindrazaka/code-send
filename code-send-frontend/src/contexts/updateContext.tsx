import React, {
  createContext,
  useState,
  useCallback,
  FunctionComponent,
  Dispatch,
  SetStateAction
} from "react";
import { notification } from "antd";
import { Update } from "interfaces/Update";

interface UpdateContextValue {
  updates: Update[];
  setUpdates: Dispatch<SetStateAction<Update[]>>;
  latestUpdate?: Update;
  setLatestUpdate: Dispatch<SetStateAction<Update | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error?: string;
  setError: Dispatch<SetStateAction<string | undefined>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  handleSuccessIndicator: (title: string, description: string) => void;
  handleErrorIndicator: (title: string, description: string) => void;
}

export const updateContext = createContext<UpdateContextValue>({
  updates: [],
  setUpdates: () => null,
  latestUpdate: undefined,
  setLatestUpdate: () => null,
  loading: false,
  setLoading: () => null,
  error: undefined,
  setError: () => null,
  success: false,
  setSuccess: () => null,
  handleSuccessIndicator: () => null,
  handleErrorIndicator: () => null
});

const { Provider } = updateContext;

export const UpdateProvider: FunctionComponent = ({ children }) => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [latestUpdate, setLatestUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  const handleSuccessIndicator = useCallback(
    (title: string, description: string) => {
      notification.success({
        message: title,
        description
      });
    },
    []
  );

  const handleErrorIndicator = useCallback(
    (title: string, description: string) => {
      notification.error({
        message: title,
        description
      });
    },
    []
  );

  return (
    <Provider
      value={{
        updates,
        setUpdates,
        latestUpdate,
        setLatestUpdate,
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        handleSuccessIndicator,
        handleErrorIndicator
      }}
    >
      {children}
    </Provider>
  );
};
