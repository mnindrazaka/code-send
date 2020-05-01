import { Location } from "api/geocoding/geocoding.types";

export interface Update {
  _id: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  note: string;
  location?: Omit<Location, "name">;
  bundleUrl: string;
}

export interface UpdateRequest extends Omit<Update, "bundleUrl"> {
  bundle: Blob;
}
