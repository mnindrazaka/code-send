import { combineReducers } from "utils/combineReducers";
import projectStateAndReducers from "./project/reducers";
import updateStateAndReducers from "./update/reducers";
import { RootState } from "./types";

const [projectReducers, projectState] = projectStateAndReducers;
const [updateReducers, updateState] = updateStateAndReducers;
export default combineReducers<RootState>({
  project: [projectReducers, projectState],
  update: [updateReducers, updateState]
});
