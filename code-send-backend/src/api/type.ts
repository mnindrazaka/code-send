import { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
  [key: string]: any;
}
