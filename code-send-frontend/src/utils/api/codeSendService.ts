import { UpdateFormValues } from "interfaces/Update";
import Service from "./service";

const baseURL = process.env.REACT_APP_CODE_SEND_SERVICE_URL as string;
const service = new Service(baseURL);

const getAllUpdates = () => {
  return service.get("/update");
};

const getLatestUpdate = () => {
  return service.get("/update/latest");
};

const createUpdate = (update: UpdateFormValues) => {
  return service.post("/update", update);
};

const uploadUpdate = (id: string, bundle: Blob) => {
  const formData = new FormData();
  formData.append("bundle", bundle);
  return service.put(`/update/${id}/bundle`, formData);
};

export default {
  baseURL,
  getAllUpdates,
  getLatestUpdate,
  createUpdate,
  uploadUpdate
};
