import cloudinary from "cloudinary";

export const initCloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
};

export const uploadBundle = (bundleBuffer: Buffer) => {
  const bufferString = bundleBuffer.toString("base64");
  const base64String = `data:application/javascript;base64,${bufferString}`;

  return cloudinary.v2.uploader
    .upload(base64String, {
      resource_type: "raw"
    })
    .then(value => value.url);
};
