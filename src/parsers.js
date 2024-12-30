import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const readFile = (filepath) => {
  try {
    return fs.readFileSync(filepath, 'utf-8');
  } catch (err) {
    throw new Error(`Unable to read file: ${filepath}. Error: ${err.message}`);
  }
};

const parse = (content, extname) => {
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

const parseFile = (filepath) => {
  const extname = path.extname(filepath);
  const content = readFile(filepath);
  return parse(content, extname);
};

export default parseFile;

