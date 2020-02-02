import multer from 'multer'

export default function upload(dest: string, field: string) {
  return multer({ dest }).single(field)
}
