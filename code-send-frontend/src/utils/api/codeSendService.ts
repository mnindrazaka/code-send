import { ProjectFormValues, Project } from "interfaces/Project";
import { UpdateFormValues, Update } from "interfaces/Update";
import { Location } from "interfaces/Geocoding";
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

const deleteProject = (projectId: string) => {
  return service.delete<Project>(`/project/${projectId}`);
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

const editUpdate = (
  projectId: string,
  updateId: string,
  update: UpdateFormValues
) => {
  return service.put<Update>(
    `/project/${projectId}/update/${updateId}`,
    update
  );
};

const uploadUpdate = (projectId: string, updateId: string, bundle: Blob) => {
  const formData = new FormData();
  formData.append("bundle", bundle);
  return service.put<Update>(
    `/project/${projectId}/update/${updateId}/bundle`,
    formData
  );
};

const checkUpdate = (
  projectId: string,
  latitude: number,
  longitude: number,
  updateId?: string
) => {
  return service.post<Update | undefined>(
    `/project/${projectId}/update/check`,
    { latitude, longitude, updateId }
  );
};

const forwardGeocoding = (query: string) => {
  return service.post<Location[]>("/geocoding/forward", { query });
};

const reverseGeocoding = (latitude: number, longitude: number) => {
  return service.post<string>("/geocoding/reverse", { latitude, longitude });
};

export default {
  baseURL,
  getallProjects,
  createProject,
  editProject,
  deleteProject,
  getAllUpdates,
  getLatestUpdate,
  createUpdate,
  editUpdate,
  uploadUpdate,
  checkUpdate,
  forwardGeocoding,
  reverseGeocoding
};
