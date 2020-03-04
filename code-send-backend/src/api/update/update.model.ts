import { Schema, model, Document } from "mongoose";
import { Update } from "./update.type";

type UpdateDocument = Update & Document;

const updateSchema = new Schema(
  {
    version: String,
    note: String,
    bundleUrl: String
  },
  {
    timestamps: true
  }
);

export default model<UpdateDocument>("Update", updateSchema);