import { ProjectState } from "./project/types";
import { UpdateState } from "./update/types";

export interface RootState {
  project: ProjectState;
  update: UpdateState;
}
