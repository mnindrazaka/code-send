import { Update } from "../../interfaces/Update";
import Service from "./service";

const baseURL = "http://code-send.herokuapp.com";
const service = new Service(baseURL);

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

export default { checkUpdate };
