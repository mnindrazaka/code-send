import { ProjectFormValues, Project } from "interfaces/Project";
import { UpdateFormValues, Update } from "interfaces/Update";
import Service from "./service";

const baseURL = process.env.REACT_APP_CODE_SEND_SERVICE_URL as string;
const service = new Service(baseURL);

const getallProjects = () => {
  return service.get<Project[]>("/project");
};

const createProject = (project: ProjectFormValues) => {
  return service.post<Project>("/project", project);
};

const editProject = (projectId: string, project: ProjectFormValues) => {
  return service.put<Project>(`/project/${projectId}`, project);
};

const getAllUpdates = (projectId: string) => {
  return service.get<Update[]>(`/project/${projectId}/update`);
};

const getLatestUpdate = (projectId: string) => {
  return service.get<Update>(`/project/${projectId}/update/latest`);
};

const createUpdate = (projectId: string, update: UpdateFormValues) => {
  return service.post<Update>(`/project/${projectId}/update`, update);
};

const uploadUpdate = (projectId: string, updateId: string, bundle: Blob) => {
  const formData = new FormData();
  formData.append("bundle", bundle);
  return service.put<Update>(
    `/project/${projectId}/update/${updateId}/bundle`,
    formData
  );
};

export default {
  baseURL,
  getallProjects,
  createProject,
  editProject,
  getAllUpdates,
  getLatestUpdate,
  createUpdate,
  uploadUpdate
};
