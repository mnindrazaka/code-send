import { Location } from "api/geocoding/geocoding.types";

export interface Update {
  version: string;
  note: string;
  location?: Location;
  bundleUrl: string;
}

export interface UpdateRequest extends Omit<Update, "bundleUrl"> {
  bundle: Blob;
}
