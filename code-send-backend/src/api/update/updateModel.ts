import { Schema, model } from "mongoose";

export default model(
  "Update",
  new Schema({
    version: String,
    note: String,
    bundleUrl: String
  })
);
