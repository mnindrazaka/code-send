import { Request, Response } from "express";
import ProjectService from "./project.service";
import HttpException from "utils/httpException";
const projectService = new ProjectService();

export default class ProjectController {
  index = async (req: Request, res: Response) => {
    try {
      const projects = await projectService.getAllProjects();
      res.send(projects);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  store = async (req: Request, res: Response) => {
    try {
      const project = await projectService.createProject(req.body);
      res.send(project);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const project = await projectService.editProject(projectId, req.body);
      res.send(project);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };
}
