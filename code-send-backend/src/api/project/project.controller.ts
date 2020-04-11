import { Request, Response, NextFunction } from "express";
import ProjectService from "./project.service";
import HttpException from "utils/httpException";
const projectService = new ProjectService();

export default class ProjectController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await projectService.getAllProjects();
      res.send(projects);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.createProject(req.body);
      res.send(project);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const project = await projectService.editProject(projectId, req.body);
      res.send(project);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}
