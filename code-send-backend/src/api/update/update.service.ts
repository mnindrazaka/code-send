import updateModel, { UpdateDocument } from "./update.model";
import { UpdateRequest } from "./update.type";
import { Types } from "mongoose";
import { uploadBundle } from "utils/cloudinary";
import GeocodingService from "api/geocoding/geocoding.service";

export default class UpdateService {
  getAllUpdates = (projectId: string) => {
    return updateModel.find({ project: projectId });
  };

  getUpdateById = (updateId: string) => {
    return updateModel.findById(updateId);
  };

  getLatestUpdate = (projectId: string) => {
    return new Promise<UpdateDocument>(async (resolve, reject) => {
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
    return new Promise<UpdateDocument>(async (resolve, reject) => {
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

  uploadBundle = (
    projectId: string,
    updateId: string,
    bundleBuffer: Buffer
  ) => {
    return new Promise<UpdateDocument>(async (resolve, reject) => {
      try {
        const url = await uploadBundle(projectId, updateId, bundleBuffer);
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

  checkUpdate = (
    projectId: string,
    updateId: string,
    latitude: number,
    longitude: number
  ) => {
    return new Promise<UpdateDocument>(async (resolve, reject) => {
      try {
        const currentUpdate = await this.getUpdateById(updateId);
        const latestUpdate = await this.getLatestUpdate(projectId);

        if (!currentUpdate?.createdAt) return;
        const isUpdateNewer =
          new Date(latestUpdate.createdAt) > new Date(currentUpdate.createdAt);
        if (!isUpdateNewer) return;

        if (latestUpdate.location) {
          const geocodingService = new GeocodingService();
          const userLocationName = await geocodingService.reverse(
            latitude,
            longitude
          );
          const latestUpdateLocationName = await geocodingService.reverse(
            latestUpdate.location.latitude,
            latestUpdate.location.longitude
          );
          if (userLocationName === latestUpdateLocationName)
            resolve(latestUpdate);
        } else {
          resolve(latestUpdate);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}
