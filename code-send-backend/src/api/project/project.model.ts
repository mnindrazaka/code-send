import { Document, Schema, model } from "mongoose";
import { Project } from "./project.type";

export type ProjectDocument = Project & Document;

const projectSchema = new Schema(
  {
    name: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default model<ProjectDocument>("Project", projectSchema);
