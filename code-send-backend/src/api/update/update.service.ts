import updateModel, { UpdateDocument } from "./update.model";
import { UpdateRequest } from "./update.type";
import updateUtil from "./update.util";
import GeocodingService from "api/geocoding/geocoding.service";
import HttpException from "utils/httpException";

export default class UpdateService {
  getAllUpdates = (projectId: string) => {
    return updateModel.find({ project: projectId });
  };

  getUpdateById = (updateId: string) => {
    return updateModel.findById(updateId);
  };

  getLatestUpdate = (projectId: string) => {
    return new Promise<UpdateDocument | null>(async (resolve, reject) => {
      try {
        const update = await updateModel
          .findOne({ project: projectId })
          .sort({ _id: -1 });
        resolve(update);
      } catch (error) {
        reject(error);
      }
    });
  };

  createUpdate = (projectId: string, update: UpdateRequest) => {
    return updateModel.create({ ...update, project: projectId });
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
        else throw new HttpException(400, "update not found");
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
        const url = await updateUtil.uploadBundle(
          projectId,
          updateId,
          bundleBuffer
        );
        const editedUpdate = await updateModel.findByIdAndUpdate(
          updateId,
          { bundleUrl: url },
          { new: true }
        );
        if (editedUpdate) resolve(editedUpdate);
        else throw new HttpException(400, "update not found");
      } catch (error) {
        reject(error);
      }
    });
  };

  checkUpdate = (
    projectId: string,
    latitude: number,
    longitude: number,
    updateId?: string
  ) => {
    return new Promise<UpdateDocument | null>(async (resolve, reject) => {
      try {
        const currentUpdate = updateId
          ? await this.getUpdateById(updateId)
          : null;
        const latestUpdate = await this.getLatestUpdate(projectId);
        if (!latestUpdate) return resolve(null);

        const isUpdateNewer = currentUpdate
          ? new Date(latestUpdate.createdAt) > new Date(currentUpdate.createdAt)
          : true;
        if (!isUpdateNewer) return resolve(null);

        if (
          latestUpdate.location &&
          latestUpdate.location.latitude &&
          latestUpdate.location.longitude
        ) {
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
          else resolve(null);
        } else {
          resolve(latestUpdate);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}
