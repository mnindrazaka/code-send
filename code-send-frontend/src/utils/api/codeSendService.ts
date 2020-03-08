import { ProjectFormValues } from "interfaces/Project";
import { UpdateFormValues } from "interfaces/Update";
import Service from "./service";

const baseURL = process.env.REACT_APP_CODE_SEND_SERVICE_URL as string;
const service = new Service(baseURL);

const getallProjects = () => {
  return service.get("/project");
};

const createProject = (project: ProjectFormValues) => {
  return service.post("/project", project);
};

const getAllUpdates = (projectId: string) => {
  return service.get(`/project/${projectId}/update`);
};

const getLatestUpdate = (projectId: string) => {
  return service.get(`/project/${projectId}/update/latest`);
};

const createUpdate = (projectId: string, update: UpdateFormValues) => {
  return service.post(`/project/${projectId}/update`, update);
};

const uploadUpdate = (projectId: string, updateId: string, bundle: Blob) => {
  const formData = new FormData();
  formData.append("bundle", bundle);
  return service.put(
    `/project/${projectId}/update/${updateId}/bundle`,
    formData
  );
};

export default {
  baseURL,
  getallProjects,
  createProject,
  getAllUpdates,
  getLatestUpdate,
  createUpdate,
  uploadUpdate
};
