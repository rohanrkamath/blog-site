// ** models
import FileModel from "@/models/FileModel";

// ** config
import { UPLOAD_PATH_URL } from "@/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";
const generateFileUrl = (file: FileModel) =>
  `${API_URL}/uploads/${file.path ? `${file.path}/` : ""}${file.filename}`;

export default generateFileUrl;
