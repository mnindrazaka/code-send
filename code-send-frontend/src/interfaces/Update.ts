import { Api } from "./Api";

export interface Update extends Api {
  version: string;
  note: string;
  bundleUrl: string;
}

export interface UpdateFormValues
  extends Omit<Update, keyof Api | "bundleUrl"> {
  bundle?: Blob;
}
