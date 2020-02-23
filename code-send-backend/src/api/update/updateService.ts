import updateModel from "./updateModel";
import { UpdateRequest } from "./updateType";
import cloudinary from "cloudinary";

export default class UpdateService {
  getAllUpdate = () => {
    return updateModel.find();
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
