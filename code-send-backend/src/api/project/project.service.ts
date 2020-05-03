import projectModel, { ProjectDocument } from "./project.model";
import { ProjectRequest } from "./project.type";
import { Types } from "mongoose";

export default class ProjectService {
  getAllProjects = (userId: string) => {
    return projectModel.find({ user: userId });
  };

  createProject = (userId: string, project: ProjectRequest) => {
    const user = new Types.ObjectId(userId);
    return projectModel.create({ ...project, user });
  };

  editProject = (projectId: string, project: ProjectRequest) => {
    return new Promise<ProjectDocument>(async (resolve, reject) => {
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

  deleteProject = (projectId: string) => {
    return new Promise<ProjectDocument>(async (resolve, reject) => {
      try {
        const deletedProject = await projectModel.findByIdAndDelete(projectId);
        if (deletedProject) resolve(deletedProject);
        else reject({ message: "project not found" });
      } catch (error) {
        reject(error);
      }
    });
  };
}
