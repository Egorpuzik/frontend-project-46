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
const buildDiff = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  return allKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    return { key, type: 'updated', oldValue: data1[key], newValue: data2[key] };
  });
};

// Main function to generate difference between two files
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  // Check if files are identical
  if (_.isEqual(file1, file2)) {
    return 'The files are identical.';
  }

  const diff = buildDiff(file1, file2);

  console.log('Generated diff:', JSON.stringify(diff, null, 2));

  const formatter = formats[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  // Ensure the diff is correctly formatted as an array
  if (!Array.isArray(diff)) {
    throw new TypeError('Expected diff to be an array');
  }

  return formatter(diff);
};

export default genDiff;


