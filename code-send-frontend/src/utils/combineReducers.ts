import { Reducer } from "react";
import { Action } from "interfaces/Action";

type Reducers<T extends object> = {
  [key in keyof T]: [Reducer<T[key], Action>, T[key]];
};

export const combineReducers = <T extends object>(
  reducers: Reducers<T>
): [Reducer<T, Action>, T] => {
  type key = keyof T;

  const reducerKeys = (Object.keys(reducers) as unknown) as [key];
  const reducerValues = Object.values(reducers) as [
    Reducer<T[key], Action>,
    T[key]
  ][];

  const stateMap = new Map<keyof T, T[key]>();
  const reducersMap = new Map<keyof T, Reducer<T[key], Action>>();

  reducerKeys.forEach((key, index) => {
    stateMap.set(key, reducerValues[index][1]);
  });

  reducerValues.forEach((value, index) => {
    reducersMap.set(reducerKeys[index], value[0]);
  });

  return [
    (state: T, action: Action) => {
      let hasStateChanged = false;
      const newState = new Map<keyof T, T[key]>();
      let nextStateForCurrentKey: T[keyof T];

      reducerKeys.forEach(reducerKey => {
        const currentReducer = reducersMap.get(reducerKey);
        const prevStateForCurrentKey = state[reducerKey];

        if (!currentReducer) return;

        nextStateForCurrentKey = currentReducer(prevStateForCurrentKey, action);
        hasStateChanged =
          hasStateChanged || nextStateForCurrentKey !== prevStateForCurrentKey;
        newState.set(reducerKey, nextStateForCurrentKey);
      });

      return hasStateChanged ? (Object.fromEntries(newState) as T) : state;
    },
    Object.fromEntries(stateMap) as T
  ];
};
