import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const extname = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');

  switch (extname) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file format: ${extname}`);
  }
};

export default parse;
