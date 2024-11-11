import fs from 'fs';
import path from 'path';

export const parseFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileData);
};
