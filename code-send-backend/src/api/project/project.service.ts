import projectModel from "./project.model";
import { ProjectRequest } from "./project.type";

export default class ProjectService {
  getAllProjects = () => {
    return projectModel.find();
  };

  createProject = (project: ProjectRequest) => {
    return projectModel.create(project);
  };
}
