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
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const fileData = fs.readFileSync(absolutePath, 'utf8');
  const extname = path.extname(absolutePath);

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
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  // Check if files are identical
  if (_.isEqual(file1, file2)) {
    return 'The files are identical.';
  }

  const allKeys = _.union(Object.keys(file1), Object.keys(file2)).sort();

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
      return { key, type: 'nested', children: genDiff(file1[key], file2[key], 'stylish') };
    }
    return { key, type: 'updated', oldValue: file1[key], newValue: file2[key] };
  });

  const formatter = formats[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatter(diff);
};

export default genDiff;
