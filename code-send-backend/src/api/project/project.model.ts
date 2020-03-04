import { Document, Schema, model } from "mongoose";
import { Project } from "./project.type";

type ProjectDocument = Project & Document;

const projectSchema = new Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
);

export default model<ProjectDocument>("Project", projectSchema);
