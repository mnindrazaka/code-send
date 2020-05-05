import { combineReducers } from "utils/combineReducers";
import authStateAndReducers from "./auth/reducers";
import projectStateAndReducers from "./project/reducers";
import updateStateAndReducers from "./update/reducers";
import { RootState } from "./types";

const [authReducers, authState] = authStateAndReducers;
const [projectReducers, projectState] = projectStateAndReducers;
const [updateReducers, updateState] = updateStateAndReducers;
export default combineReducers<RootState>({
  auth: [authReducers, authState],
  project: [projectReducers, projectState],
  update: [updateReducers, updateState]
});
