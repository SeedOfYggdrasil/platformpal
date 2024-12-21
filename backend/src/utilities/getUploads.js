import fs from 'fs';
import path from 'path';

const uploadDir = path.join(new URL('.', import.meta.url).pathname, '../backend/upload');

function getUploads() {
  try {
    const files = fs.readdirSync(uploadDir);
    return files.map(file => path.join(uploadDir, file));
  } catch (error) {
    console.error("Error reading upload directory:", error);
    return [];
  }
}

export default getUploads;
