import { Api } from "./Api";
import { Location } from "./Geocoding";

export interface Update extends Api {
  version: string;
  note: string;
  bundleUrl: string;
  location?: Location;
}

export interface UpdateFormValues
  extends Omit<Update, keyof Api | "bundleUrl"> {
  bundle?: Blob;
}
