import updateModel from "./update.model";
import { UpdateRequest } from "./update.type";
import cloudinary from "cloudinary";

export default class UpdateService {
  getAllUpdates = () => {
    return updateModel.find();
  };

  getLatestUpdate = () => {
    return updateModel.findOne().sort({ _id: -1 });
  };

  createUpdate = (update: UpdateRequest) => {
    return updateModel.create(update);
  };

  uploadBundle = async (id: string, bundleBuffer: Buffer) => {
    const bufferString = bundleBuffer.toString("base64");
    const base64String = `data:application/javascript;base64,${bufferString}`;

    const { url } = await cloudinary.v2.uploader.upload(base64String, {
      resource_type: "raw"
    });

    return updateModel.findByIdAndUpdate(id, { bundleUrl: url }, { new: true });
  };
}
