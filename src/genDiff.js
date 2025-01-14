import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

// Mapping formats to their corresponding formatters
const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

// Function to read and parse files
const parseFile = (filePath) => {
  if (typeof filePath !== 'string') {
    throw new TypeError(`Expected a string for filePath, received ${typeof filePath}`);
  }
  const fullPath = path.resolve(process.cwd(), filePath); // Absolute path
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const fileData = fs.readFileSync(fullPath, 'utf8'); // Read file content
  const extname = path.extname(fullPath); // Get file extension

  switch (extname) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
    case '.yml':
      return yaml.load(fileData);
    default:
      throw new Error(`Unsupported file format: ${extname}`);
  }
};

// Generate differences between two objects
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (typeof filepath1 !== 'string' || typeof filepath2 !== 'string') {
    throw new TypeError(`Expected strings for file paths, received ${typeof filepath1} and ${typeof filepath2}`);
  }
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);


  // Check if files are identical
  if (_.isEqual(file1, file2)) {
    return 'The files are identical.';
  }

  const allKeys = _.union(Object.keys(file1), Object.keys(file2)).sort(); // Unique and sorted keys

  const diff = allKeys.map((key) => {
    if (!_.has(file2, key)) {
      return { key, type: 'removed', value: file1[key] };
    }
    if (!_.has(file1, key)) {
      return { key, type: 'added', value: file2[key] };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { key, type: 'unchanged', value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, type: 'nested', children: genDiff(file1[key], file2[key], format) };
    }
    return { key, type: 'updated', oldValue: file1[key], newValue: file2[key] };
  });

  // Select formatter
  const formatter = formats[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatter(diff);
};

export default genDiff;
