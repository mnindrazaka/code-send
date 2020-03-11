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

export const StoreProvider: FunctionComponent = ({ children }) => {
  const [rootReducers, rootState] = rootStateAndReducers;
  const [state, dispatch] = useReducer(rootReducers, rootState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
