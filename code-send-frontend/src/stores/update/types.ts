import { Update } from "interfaces/Update";

export interface UpdateState {
  items: Update[];
  selected?: Update;
  latest?: Update;
  loading: boolean;
  error?: string;
}

export enum UpdateActionTypes {
  GetRequest = "@Update/GetRequest",
  GetSuccess = "@Update/GetSuccess",
  GetError = "@Update/GetError",
  GetLatestRequest = "@Update/GetLatestRequest",
  GetLatestSuccess = "@Update/GetLatestSuccess",
  GetLatestError = "@Update/GetLatestError",
  CreateRequest = "@Update/CreateRequest",
  CreateSuccess = "@Update/CreateSuccess",
  CreateError = "@Update/CreateError",
  EditRequest = "@Update/EditRequest",
  EditSuccess = "@Update/EditSuccess",
  EditError = "@Update/EditError",
  Select = "@Update/Select",
  ClearSelected = "@Update/ClearSelected"
}
