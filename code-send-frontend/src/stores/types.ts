import { ProjectState } from "./project/types";
import { UpdateState } from "./update/types";
import { AuthState } from "./auth/types";

export interface RootState {
  auth: AuthState;
  project: ProjectState;
  update: UpdateState;
}
