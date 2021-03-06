import { Response, NextFunction } from "express";
import { Request } from "api/type";
import ProjectService from "./project.service";
import HttpException from "utils/httpException";
const projectService = new ProjectService();

export default class ProjectController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const projects = await projectService.getAllProjects(userId);
      res.send(projects);
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message));
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const project = await projectService.createProject(userId, req.body);
      res.send(project);
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message));
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const project = await projectService.editProject(projectId, req.body);
      res.send(project);
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message));
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const project = await projectService.deleteProject(projectId);
      res.send(project);
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message));
    }
  };
}
