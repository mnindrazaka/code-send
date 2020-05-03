import { Document, Schema, model } from "mongoose";
import { User } from "./user.type";

export type UserDocument = User & Document;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: String
  },
  {
    timestamps: true
  }
);

export default model<UserDocument>("User", userSchema);
