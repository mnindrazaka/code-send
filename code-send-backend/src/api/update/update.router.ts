import { Router } from "express";
import UpdateController from "./update.controller";
import upload from "middleware/upload";

const updateRouter = Router();
const updateController = new UpdateController();

updateRouter.get("/", updateController.index);
updateRouter.get("/latest", updateController.latest);
updateRouter.post("/", updateController.store);
updateRouter.put(
  "/:id/bundle",
  upload("bundle"),
  updateController.uploadBundle
);

export default updateRouter;
