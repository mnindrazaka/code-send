import { Router } from "express";
import ProjectController from "./project.controller";

const projectRouter = Router();
const projectController = new ProjectController();
const baseUrl = "/project";

projectRouter.get(baseUrl, projectController.index);
projectRouter.post(baseUrl, projectController.store);
projectRouter.put(`${baseUrl}/:projectId`, projectController.edit);
projectRouter.delete(`${baseUrl}/:projectId`, projectController.destroy);

export default projectRouter;
