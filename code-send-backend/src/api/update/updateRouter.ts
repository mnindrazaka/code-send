import { Router } from "express";
import UpdateController from "./updateController";
import upload from "middleware/upload";

const updateRouter = Router();
const updateController = new UpdateController();

updateRouter.post("/", updateController.store);
updateRouter.put(
  "/:id/bundle",
  upload("bundle"),
  updateController.uploadBundle
);

export default updateRouter;
