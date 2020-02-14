import { Api } from "./Api";

export interface Update extends Api {
  version: string;
  note: string;
  bundleUrl: string;
}

export type UpdateRequest = Omit<Update, keyof Api | "bundleUrl"> & {
  bundle?: Blob;
};