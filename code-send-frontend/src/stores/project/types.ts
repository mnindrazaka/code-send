import { Project } from "interfaces/Project";

export interface ProjectState {
  items: Project[];
  selected?: Project;
  loading: boolean;
  error?: string;
}

export enum ProjectActionTypes {
  GetRequest = "@Project/GetRequest",
  GetSuccess = "@Project/GetSuccess",
  GetError = "@Project/GetError",
  CreateRequest = "@Project/CreateRequest",
  CreateSuccess = "@Project/CreateSuccess",
  CreateError = "@Project/CreateError",
  EditRequest = "@Project/EditRequest",
  EditSuccess = "@Project/EditSuccess",
  EditError = "@Project/EditError",
  Select = "@Project/Select"
}
