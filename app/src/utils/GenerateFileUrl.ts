// ** models
import FileModel from "@/models/FileModel";

// ** config
import { UPLOAD_PATH_URL } from "@/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";

const generateFileUrl = (file: FileModel) => {
  // Use the API endpoint to serve files instead of static file serving
  const url = `${API_URL}/api/file/serve/${file.filename}`;
  console.log("Generated file URL:", url);
  console.log("File data:", file);
  return url;
};

export default generateFileUrl;
