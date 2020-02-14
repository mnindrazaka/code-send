import updateModel from "./updateModel";
import { UpdateRequest } from "@shared/interfaces/Update";

export default class UpdateService {
  createUpdate = async (update: UpdateRequest) => {
    return await updateModel.create(update);
  };

  uploadBundle = async (id: string, bundleUrl: string) => {
    return await updateModel.findByIdAndUpdate(id, { bundleUrl }, { new: true });
  };
}