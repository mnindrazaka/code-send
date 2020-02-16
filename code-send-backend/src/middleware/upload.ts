import multer from "multer";

const storage = multer.memoryStorage();

export default function upload(field: string) {
  return multer({ storage }).single(field);
}
