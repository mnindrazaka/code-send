import { Api } from "./Api";

export interface Update extends Api {
  version: string;
  note: string;
  bundleUrl: string;
}
