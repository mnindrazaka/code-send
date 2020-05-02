import { Router } from "express";
import UpdateController from "./update.controller";
import upload from "middleware/upload";

const updateRouter = Router();
const updateController = new UpdateController();
const baseUrl = "/project/:projectId/update";

updateRouter.get(baseUrl, updateController.index);
updateRouter.get(`${baseUrl}/latest`, updateController.latest);
updateRouter.post(baseUrl, updateController.store);
updateRouter.put(`${baseUrl}/:updateId`, updateController.edit);
updateRouter.put(
  `${baseUrl}/:updateId/bundle`,
  upload("bundle"),
  updateController.uploadBundle
);
updateRouter.post(`${baseUrl}/check`, updateController.check);

export default updateRouter;
