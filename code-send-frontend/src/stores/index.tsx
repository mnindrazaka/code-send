import React, {
  useReducer,
  createContext,
  Dispatch,
  FunctionComponent
} from "react";
import rootStateAndReducers from "./reducers";
import { RootState } from "./types";
import { Action } from "interfaces/Action";
import { projectInitialState } from "./project/reducers";
import { updateInitialState } from "./update/reducers";

interface RootContextValue {
  state: RootState;
  dispatch: Dispatch<Action>;
}

export const storeContext = createContext<RootContextValue>({
  state: {
    project: projectInitialState,
    update: updateInitialState
  },
  dispatch: () => null
});

const { Provider } = storeContext;

interface StoreProviderProps {
  initialState?: Partial<RootState>;
}

export const StoreProvider: FunctionComponent<StoreProviderProps> = ({
  children,
  initialState
}) => {
  const [rootReducers, rootState] = rootStateAndReducers;
  const [state, dispatch] = useReducer(rootReducers, rootState);
  const providerValue = {
    state: { ...state, ...initialState },
    dispatch
  };
  return <Provider value={providerValue}>{children}</Provider>;
};
