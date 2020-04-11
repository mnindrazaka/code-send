import projectModel from "./project.model";
import { ProjectRequest } from "./project.type";

export default class ProjectService {
  getAllProjects = () => {
    return projectModel.find();
  };

  createProject = (project: ProjectRequest) => {
    return projectModel.create(project);
  };

  editProject = (projectId: string, project: ProjectRequest) => {
    return new Promise(async (resolve, reject) => {
      try {
        const editedProject = await projectModel.findByIdAndUpdate(
          projectId,
          project,
          { new: true }
        );
        if (editedProject) resolve(editedProject);
        else reject({ message: "project not found" });
      } catch (error) {
        reject(error);
      }
    });
  };
}
