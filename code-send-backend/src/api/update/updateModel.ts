import { Schema, model, Document } from "mongoose";
import { Update } from "@shared/interfaces/Update";

type UpdateDocument = Update & Document;

const updateSchema = new Schema({
  version: String,
  note: String,
  bundleUrl: String
});

export default model<UpdateDocument>("Update", updateSchema);
