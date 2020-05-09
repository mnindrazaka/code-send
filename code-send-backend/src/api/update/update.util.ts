import cloudinary from "cloudinary";

const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

export const initCloudinaryConfig = () => {
  cloudinary.v2.config(config);
};

export const uploadBundle = async (
  projectId: string,
  updateId: string,
  bundleBuffer: Buffer
) => {
  const bufferString = bundleBuffer.toString("base64");
  const base64String = `data:application/javascript;base64,${bufferString}`;

  const value = await cloudinary.v2.uploader.upload(base64String, {
    resource_type: "raw",
    public_id: `${projectId}/${updateId}.js`
  });
  return value.secure_url;
};

export default {
  uploadBundle,
  initCloudinaryConfig
};
