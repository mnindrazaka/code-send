import { Request } from "express";
import { User } from "./user/user.type";

export interface AuthenticatedRequest extends Request {
  user: User;
}
