import { Update } from "interfaces/Update";

export interface UpdateState {
  items: Update[];
  latest?: Update;
  loading: boolean;
  error?: string;
}

export enum UpdateActionTypes {
  GetRequest = "@Update/GetRequest",
  GetSuccess = "@Update/GetSuccess",
  GetError = "@Update/GetError",
  CreateRequest = "@Update/CreateRequest",
  CreateSuccess = "@Update/CreateSuccess",
  CreateError = "@Update/CreateError",
  GetLatestRequest = "@Update/GetLatestRequest",
  GetLatestSuccess = "@Update/GetLatestSuccess",
  GetLatestError = "@Update/GetLatestError"
}
