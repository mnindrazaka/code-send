import { Update } from "../../interfaces/Update";
import Service from "./service";

const baseURL = "http://code-send.herokuapp.com";
const service = new Service(baseURL);

const getLatestUpdate = (projectId: string) => {
  return service.get<Update>(`/project/${projectId}/update/latest`);
};

export default { getLatestUpdate };
