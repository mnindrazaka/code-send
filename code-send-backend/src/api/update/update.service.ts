import updateModel from "./update.model";
import { UpdateRequest } from "./update.type";
import cloudinary from "cloudinary";
import { Types } from "mongoose";

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

  uploadBundle = async (updateId: string, bundleBuffer: Buffer) => {
    const bufferString = bundleBuffer.toString("base64");
    const base64String = `data:application/javascript;base64,${bufferString}`;

    const { url } = await cloudinary.v2.uploader.upload(base64String, {
      resource_type: "raw"
    });

    return updateModel.findByIdAndUpdate(
      updateId,
      { bundleUrl: url },
      { new: true }
    );
  };
}
