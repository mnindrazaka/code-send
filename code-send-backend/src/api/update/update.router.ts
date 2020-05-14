import { Router } from "express";
import UpdateController from "./update.controller";
import upload from "middleware/upload";
import verifyToken from "middleware/verifyToken";

const updateRouter = Router();
const updateController = new UpdateController();
const baseUrl = "/project/:projectId/update";

updateRouter.get(baseUrl, verifyToken, updateController.index);
updateRouter.get(`${baseUrl}/latest`, verifyToken, updateController.latest);
updateRouter.post(baseUrl, verifyToken, updateController.store);
updateRouter.put(`${baseUrl}/:updateId`, verifyToken, updateController.edit);
updateRouter.put(
  `${baseUrl}/:updateId/bundle`,
  verifyToken,
  upload("bundle"),
  updateController.uploadBundle
);
updateRouter.post(`${baseUrl}/check`, updateController.check);

export default updateRouter;
