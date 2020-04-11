import updateModel from "./update.model";
import { UpdateRequest } from "./update.type";
import { Types } from "mongoose";
import { uploadBundle } from "utils/cloudinary";

export default class UpdateService {
  getAllUpdates = (projectId: string) => {
    return updateModel.find({ project: projectId });
  };

  getLatestUpdate = (projectId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const update = await updateModel
          .findOne({ project: projectId })
          .sort({ _id: -1 });
        if (update) resolve(update);
        else reject({ message: "update not found" });
      } catch (error) {
        reject(error);
      }
    });
  };

  createUpdate = (projectId: string, update: UpdateRequest) => {
    const project = new Types.ObjectId(projectId);
    return updateModel.create({ ...update, project });
  };

  editUpdate = (updateId: string, update: UpdateRequest) => {
    return new Promise(async (resolve, reject) => {
      try {
        const editedUpdate = await updateModel.findByIdAndUpdate(
          updateId,
          update,
          { new: true }
        );
        if (editedUpdate) resolve(editedUpdate);
        else reject({ message: "update not found" });
      } catch (error) {
        reject(error);
      }
    });
  };

  uploadBundle = async (updateId: string, bundleBuffer: Buffer) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = await uploadBundle(bundleBuffer);
        const editedUpdate = await updateModel.findByIdAndUpdate(
          updateId,
          { bundleUrl: url },
          { new: true }
        );
        if (editedUpdate) resolve(editedUpdate);
        else reject({ message: "update not found" });
      } catch (error) {
        reject(error);
      }
    });
  };
}
