import { Router } from "express";
import ProjectController from "./project.controller";

const projectRouter = Router();
const projectController = new ProjectController();

projectRouter.get("/", projectController.index);
projectRouter.post("/", projectController.store);

export default projectRouter;
