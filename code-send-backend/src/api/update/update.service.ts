import updateModel from "./update.model";
import { UpdateRequest } from "./update.type";
import { Types } from "mongoose";
import { uploadBundle } from "utils/cloudinary";

export default class UpdateService {
  getAllUpdates = (projectId: string) => {
    return updateModel.find({ project: projectId });
  };

  getLatestUpdate = (projectId: string) => {
    return updateModel.findOne({ project: projectId }).sort({ _id: -1 });
  };

  createUpdate = (projectId: string, update: UpdateRequest) => {
    const project = new Types.ObjectId(projectId);
    return updateModel.create({ ...update, project });
  };

  editUpdate = (updateId: string, update: UpdateRequest) => {
    return updateModel.findByIdAndUpdate(updateId, update, { new: true });
  };

  uploadBundle = async (updateId: string, bundleBuffer: Buffer) => {
    const url = await uploadBundle(bundleBuffer);
    return updateModel.findByIdAndUpdate(
      updateId,
      { bundleUrl: url },
      { new: true }
    );
  };
}
