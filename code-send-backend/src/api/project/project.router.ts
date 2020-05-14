import { Router } from "express";
import ProjectController from "./project.controller";
import verifyToken from "middleware/verifyToken";

const projectRouter = Router();
const projectController = new ProjectController();
const baseUrl = "/project";

projectRouter.get(baseUrl, verifyToken, projectController.index);
projectRouter.post(baseUrl, verifyToken, projectController.store);
projectRouter.put(`${baseUrl}/:projectId`, verifyToken, projectController.edit);
projectRouter.delete(
  `${baseUrl}/:projectId`,
  verifyToken,
  projectController.destroy
);

export default projectRouter;
