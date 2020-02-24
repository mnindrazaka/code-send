export interface Update {
  version: string;
  note: string;
  bundleUrl: string;
}

export interface UpdateRequest extends Omit<Update, "bundleUrl"> {
  bundle: Blob;
}
